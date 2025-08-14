import axios from "axios";
import TranzilaPayment from "../../../../DB/models/TranzilaPayment.model.js";
import Invoice from "../../../../DB/models/Invoice.model.js";
import Customer from "../../../../DB/models/Customer.model.js";
import UserModel from "../../../../DB/models/user.model.js";
import AuditLogModel from "../../../../DB/models/AuditLog.model.js";
import { createNotification, sendNotificationLogic, } from "../../notification/controller/notification.controller.js";
const logAudit = async ({ userId, action, entity, entityId, userName, oldValue = null, newValue = null, }) => {
    try {
        await AuditLogModel.create({
            user: userId,
            action,
            entity,
            entityId,
            oldValue,
            newValue,
            userName,
        });
    }
    catch (error) {
        console.error("Failed to create audit log:", error);
    }
};
// Tranzila API configuration
const TRANZILA_CONFIG = {
    baseURL: process.env.TRANZILA_API_URL ||
        "https://secure5.tranzila.com/cgi-bin/tranzila31.cgi",
    supplier: process.env.TRANZILA_SUPPLIER_ID,
    terminal: process.env.TRANZILA_TERMINAL_ID,
    password: process.env.TRANZILA_PASSWORD,
};
// Create direct payment
export const createDirectPayment = async (req, res, next) => {
    try {
        const { invoiceId, customerId, amount, currency = "ILS", description, customerEmail, customerPhone, returnUrl, cancelUrl, } = req.body;
        // Validate invoice exists
        const invoice = await Invoice.findById(invoiceId);
        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        // Validate customer exists
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        // Check if payment amount exceeds remaining balance
        if (amount > invoice.balanceDue) {
            return res.status(400).json({
                message: `Payment amount (${amount}) exceeds remaining balance (${invoice.balanceDue})`,
            });
        }
        // Check if invoice is already paid
        if (invoice.balanceDue <= 0) {
            return res.status(400).json({
                message: "Invoice is already fully paid",
            });
        }
        // Create Tranzila payment record
        const tranzilaPayment = new TranzilaPayment({
            invoice: invoiceId,
            customer: customerId,
            amount,
            currency,
            description: description || `Payment for invoice ${invoice.invoiceNumber}`,
            customerEmail: customerEmail || customer.email,
            customerPhone: customerPhone || customer.phone,
            returnUrl: returnUrl || `${process.env.FRONTEND_URL}/payment/success`,
            cancelUrl: cancelUrl || `${process.env.FRONTEND_URL}/payment/cancel`,
            createdBy: req.user._id,
        });
        await tranzilaPayment.save();
        // Prepare Tranzila API request
        const tranzilaRequest = {
            supplier: TRANZILA_CONFIG.supplier,
            terminal: TRANZILA_CONFIG.terminal,
            password: TRANZILA_CONFIG.password,
            sum: amount,
            currency: currency,
            payment_simple: "1",
            payment_type: "1", // Credit card
            ccno: "", // Will be filled by customer
            expmonth: "",
            expyear: "",
            myid: tranzilaPayment.paymentId,
            cred_type: "1", // Regular credit
            tranmode: "1", // Regular transaction
            oref: invoice.invoiceNumber,
            uref: customer.name,
            lang: "he", // Hebrew
            email: tranzilaPayment.customerEmail,
            phone: tranzilaPayment.customerPhone,
            return_url: tranzilaPayment.returnUrl,
            cancel_url: tranzilaPayment.cancelUrl,
        };
        // Make request to Tranzila API
        const response = await axios.post(TRANZILA_CONFIG.baseURL, tranzilaRequest, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        // Parse Tranzila response
        const responseData = response.data;
        if (responseData.Response === "000") {
            // Success - payment form created
            tranzilaPayment.paymentUrl = responseData.url || responseData.payment_url;
            tranzilaPayment.tranzilaResponse = responseData;
            await tranzilaPayment.save();
            // Send notification
            const findUser = await UserModel.findById(req.user._id);
            const message = `${findUser.name} created Tranzila payment ${tranzilaPayment.paymentId} for invoice ${invoice.invoiceNumber} - Amount: ${amount} ${currency}`;
            await sendNotificationLogic({
                senderId: req.user._id,
                message,
            });
            // Log audit
            await logAudit({
                userId: req.user._id,
                action: `Create Tranzila Payment by ${findUser.name}`,
                userName: findUser.name,
                entity: "TranzilaPayment",
                entityId: tranzilaPayment._id,
                newValue: {
                    paymentId: tranzilaPayment.paymentId,
                    amount,
                    currency,
                    status: tranzilaPayment.status,
                },
            });
            return res.status(200).json({
                success: true,
                message: "Payment created successfully",
                data: {
                    paymentId: tranzilaPayment.paymentId,
                    paymentUrl: tranzilaPayment.paymentUrl,
                    amount,
                    currency,
                    status: tranzilaPayment.status,
                    invoiceNumber: invoice.invoiceNumber,
                    customerName: customer.name,
                },
            });
        }
        else {
            // Failed to create payment
            tranzilaPayment.status = "failed";
            tranzilaPayment.errorMessage =
                responseData.ResponseText || "Failed to create payment";
            tranzilaPayment.failedAt = new Date();
            tranzilaPayment.tranzilaResponse = responseData;
            await tranzilaPayment.save();
            return res.status(400).json({
                success: false,
                message: "Failed to create payment",
                error: responseData.ResponseText || "Unknown error",
            });
        }
    }
    catch (error) {
        console.error("Error creating direct payment:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};
// Get payment status
export const getPaymentStatus = async (req, res, next) => {
    try {
        const { paymentId } = req.params;
        const payment = await TranzilaPayment.findOne({ paymentId })
            .populate("invoice")
            .populate("customer")
            .populate("createdBy", "name email");
        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found",
            });
        }
        // If payment is still pending, check with Tranzila
        if (payment.status === "pending" && payment.tranzilaTransactionId) {
            try {
                const statusRequest = {
                    supplier: TRANZILA_CONFIG.supplier,
                    terminal: TRANZILA_CONFIG.terminal,
                    password: TRANZILA_CONFIG.password,
                    tranid: payment.tranzilaTransactionId,
                    action: "status",
                };
                const response = await axios.post(TRANZILA_CONFIG.baseURL, statusRequest, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                });
                const statusData = response.data;
                if (statusData.Response === "000") {
                    // Update payment status based on Tranzila response
                    if (statusData.status === "approved") {
                        payment.status = "completed";
                        payment.completedAt = new Date();
                    }
                    else if (statusData.status === "declined") {
                        payment.status = "failed";
                        payment.failedAt = new Date();
                        payment.errorMessage =
                            statusData.ResponseText || "Payment declined";
                    }
                    payment.tranzilaResponse = statusData;
                    await payment.save();
                }
            }
            catch (statusError) {
                console.error("Error checking payment status:", statusError);
            }
        }
        return res.status(200).json({
            success: true,
            data: {
                paymentId: payment.paymentId,
                status: payment.status,
                amount: payment.amount,
                currency: payment.currency,
                description: payment.description,
                createdAt: payment.createdAt,
                completedAt: payment.completedAt,
                failedAt: payment.failedAt,
                errorMessage: payment.errorMessage,
                invoice: payment.invoice,
                customer: payment.customer,
                createdBy: payment.createdBy,
                paymentUrl: payment.paymentUrl,
            },
        });
    }
    catch (error) {
        console.error("Error getting payment status:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};
// Refund direct payment
export const refundDirectPayment = async (req, res, next) => {
    try {
        const { paymentId } = req.params;
        const { amount, reason } = req.body;
        const payment = await TranzilaPayment.findOne({ paymentId })
            .populate("invoice")
            .populate("customer");
        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found",
            });
        }
        if (payment.status !== "completed") {
            return res.status(400).json({
                success: false,
                message: "Payment must be completed to refund",
            });
        }
        if (payment.status === "refunded") {
            return res.status(400).json({
                success: false,
                message: "Payment has already been refunded",
            });
        }
        const refundAmount = amount || payment.amount;
        if (refundAmount > payment.amount) {
            return res.status(400).json({
                success: false,
                message: "Refund amount cannot exceed original payment amount",
            });
        }
        // Make refund request to Tranzila
        const refundRequest = {
            supplier: TRANZILA_CONFIG.supplier,
            terminal: TRANZILA_CONFIG.terminal,
            password: TRANZILA_CONFIG.password,
            tranid: payment.tranzilaTransactionId,
            action: "refund",
            sum: refundAmount,
            reason: reason || "Customer request",
        };
        const response = await axios.post(TRANZILA_CONFIG.baseURL, refundRequest, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        const responseData = response.data;
        if (responseData.Response === "000") {
            // Refund successful
            payment.status = "refunded";
            payment.refundAmount = refundAmount;
            payment.refundReason = reason || "Customer request";
            payment.refundedAt = new Date();
            payment.updatedBy = req.user._id;
            payment.tranzilaResponse = responseData;
            await payment.save();
            // Send notification
            const findUser = await UserModel.findById(req.user._id);
            const message = `${findUser.name} refunded Tranzila payment ${payment.paymentId} - Amount: ${refundAmount} ${payment.currency}`;
            await sendNotificationLogic({
                senderId: req.user._id,
                message,
            });
            // Log audit
            await logAudit({
                userId: req.user._id,
                action: `Refund Tranzila Payment by ${findUser.name}`,
                userName: findUser.name,
                entity: "TranzilaPayment",
                entityId: payment._id,
                oldValue: { status: "completed" },
                newValue: { status: "refunded", refundAmount, refundReason: reason },
            });
            return res.status(200).json({
                success: true,
                message: "Payment refunded successfully",
                data: {
                    paymentId: payment.paymentId,
                    refundAmount,
                    refundReason: reason,
                    status: payment.status,
                },
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Failed to refund payment",
                error: responseData.ResponseText || "Unknown error",
            });
        }
    }
    catch (error) {
        console.error("Error refunding payment:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};
// Get payment history
export const getPaymentHistory = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, status, startDate, endDate } = req.query;
        const skip = (page - 1) * limit;
        const query = {};
        // Add filters
        if (status) {
            query.status = status;
        }
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) {
                query.createdAt.$gte = new Date(startDate);
            }
            if (endDate) {
                query.createdAt.$lte = new Date(endDate);
            }
        }
        const payments = await TranzilaPayment.find(query)
            .populate("invoice", "invoiceNumber totalAmount balanceDue")
            .populate("customer", "name email phone")
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));
        const total = await TranzilaPayment.countDocuments(query);
        const totalPages = Math.ceil(total / limit);
        return res.status(200).json({
            success: true,
            data: {
                payments,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages,
                    totalItems: total,
                    itemsPerPage: parseInt(limit),
                },
            },
        });
    }
    catch (error) {
        console.error("Error getting payment history:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};
//# sourceMappingURL=TranzilaPayment.controller.js.map