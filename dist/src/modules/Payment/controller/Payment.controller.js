import Payment from "../../../../DB/models/Payment.model.js";
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
// Create payment
export const createPayment = async (req, res, next) => {
    try {
        const { invoiceId, customerId, paymentMethod, paymentAmount, paymentDate, notes, referenceNumber, } = req.body;
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
        if (paymentAmount > invoice.balanceDue) {
            return res.status(400).json({
                message: `Payment amount (${paymentAmount}) exceeds remaining balance (${invoice.balanceDue})`,
            });
        }
        // Check if invoice is already paid
        if (invoice.balanceDue <= 0) {
            return res.status(400).json({
                message: "Invoice is already fully paid",
            });
        }
        const newPayment = new Payment({
            invoice: invoiceId,
            customer: customerId,
            paymentMethod,
            paymentAmount,
            paymentDate: paymentDate ? new Date(paymentDate) : new Date(),
            notes,
            referenceNumber,
            createdBy: req.user._id,
        });
        const savedPayment = await newPayment.save();
        // Send notification
        const findUser = await UserModel.findById(req.user._id);
        const message = `${findUser.name} recorded payment ${savedPayment.paymentNumber} for invoice ${invoice.invoiceNumber} - Amount: ${paymentAmount}`;
        await sendNotificationLogic({
            senderId: req.user._id,
            message,
        });
        // Log audit
        await logAudit({
            userId: req.user._id,
            action: `Create Payment by ${findUser.name}`,
            userName: findUser.name,
            entity: "Payment",
            entityId: savedPayment._id,
            oldValue: null,
            newValue: savedPayment.toObject(),
        });
        return res.status(201).json({
            message: "Payment recorded successfully",
            payment: savedPayment,
        });
    }
    catch (error) {
        console.error("Error creating payment:", error);
        next(error);
    }
};
// Get all payments with pagination and filters
export const getAllPayments = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, status, customerId, invoiceId, paymentMethod, startDate, endDate, search, } = req.query;
        const filter = {};
        if (status)
            filter.status = status;
        if (customerId)
            filter.customer = customerId;
        if (invoiceId)
            filter.invoice = invoiceId;
        if (paymentMethod)
            filter.paymentMethod = paymentMethod;
        if (startDate || endDate) {
            filter.paymentDate = {};
            if (startDate)
                filter.paymentDate.$gte = new Date(startDate);
            if (endDate)
                filter.paymentDate.$lte = new Date(endDate);
        }
        if (search) {
            filter.$or = [
                { paymentNumber: { $regex: search, $options: "i" } },
                { referenceNumber: { $regex: search, $options: "i" } },
                { notes: { $regex: search, $options: "i" } },
            ];
        }
        const skip = (page - 1) * limit;
        const payments = await Payment.find(filter)
            .populate("invoice", "invoiceNumber totalAmount balanceDue")
            .populate("customer", "first_name last_name phone_number")
            .populate("createdBy", "name")
            .sort({ paymentDate: -1 })
            .skip(skip)
            .limit(parseInt(limit));
        const total = await Payment.countDocuments(filter);
        return res.status(200).json({
            message: "Payments retrieved successfully",
            payments,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalItems: total,
                itemsPerPage: parseInt(limit),
            },
        });
    }
    catch (error) {
        console.error("Error getting payments:", error);
        next(error);
    }
};
// Get payment by ID
export const getPaymentById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const payment = await Payment.findById(id)
            .populate("invoice", "invoiceNumber totalAmount balanceDue description")
            .populate("customer", "first_name last_name phone_number email")
            .populate("createdBy", "name")
            .populate("updatedBy", "name");
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        return res.status(200).json({
            message: "Payment retrieved successfully",
            payment,
        });
    }
    catch (error) {
        console.error("Error getting payment:", error);
        next(error);
    }
};
// Update payment
export const updatePayment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const payment = await Payment.findById(id);
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        // Store old values for audit
        const oldValues = payment.toObject();
        // Update the payment
        const updatedPayment = await Payment.findByIdAndUpdate(id, {
            ...updateData,
            updatedBy: req.user._id,
        }, { new: true });
        // Send notification
        const findUser = await UserModel.findById(req.user._id);
        const invoice = await Invoice.findById(updatedPayment.invoice);
        const message = `${findUser.name} updated payment ${updatedPayment.paymentNumber} for invoice ${invoice.invoiceNumber}`;
        await sendNotificationLogic({
            senderId: req.user._id,
            message,
        });
        // Log audit
        await logAudit({
            userId: req.user._id,
            action: `Update Payment by ${findUser.name}`,
            userName: findUser.name,
            entity: "Payment",
            entityId: updatedPayment._id,
            oldValue: oldValues,
            newValue: updatedPayment.toObject(),
        });
        return res.status(200).json({
            message: "Payment updated successfully",
            payment: updatedPayment,
        });
    }
    catch (error) {
        console.error("Error updating payment:", error);
        next(error);
    }
};
// Delete payment
export const deletePayment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const payment = await Payment.findById(id);
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        // Check if payment is completed (cannot delete completed payments)
        if (payment.status === "Completed") {
            return res.status(400).json({
                message: "Cannot delete completed payments",
            });
        }
        const deletedPayment = await Payment.findByIdAndDelete(id);
        // Send notification
        const findUser = await UserModel.findById(req.user._id);
        const invoice = await Invoice.findById(deletedPayment.invoice);
        const message = `${findUser.name} deleted payment ${deletedPayment.paymentNumber} for invoice ${invoice.invoiceNumber}`;
        await sendNotificationLogic({
            senderId: req.user._id,
            message,
        });
        // Log audit
        await logAudit({
            userId: req.user._id,
            action: `Delete Payment by ${findUser.name}`,
            userName: findUser.name,
            entity: "Payment",
            entityId: deletedPayment._id,
            oldValue: deletedPayment.toObject(),
            newValue: null,
        });
        return res.status(200).json({
            message: "Payment deleted successfully",
            payment: deletedPayment,
        });
    }
    catch (error) {
        console.error("Error deleting payment:", error);
        next(error);
    }
};
// Get payments by customer
export const getPaymentsByCustomer = async (req, res, next) => {
    try {
        const { customerId } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        const payments = await Payment.find({ customer: customerId })
            .populate("invoice", "invoiceNumber totalAmount balanceDue")
            .populate("createdBy", "name")
            .sort({ paymentDate: -1 })
            .skip(skip)
            .limit(parseInt(limit));
        const total = await Payment.countDocuments({ customer: customerId });
        return res.status(200).json({
            message: "Customer payments retrieved successfully",
            payments,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalItems: total,
                itemsPerPage: parseInt(limit),
            },
        });
    }
    catch (error) {
        console.error("Error getting customer payments:", error);
        next(error);
    }
};
// Get payments by invoice
export const getPaymentsByInvoice = async (req, res, next) => {
    try {
        const { invoiceId } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        const payments = await Payment.find({ invoice: invoiceId })
            .populate("customer", "first_name last_name")
            .populate("createdBy", "name")
            .sort({ paymentDate: -1 })
            .skip(skip)
            .limit(parseInt(limit));
        const total = await Payment.countDocuments({ invoice: invoiceId });
        return res.status(200).json({
            message: "Invoice payments retrieved successfully",
            payments,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalItems: total,
                itemsPerPage: parseInt(limit),
            },
        });
    }
    catch (error) {
        console.error("Error getting invoice payments:", error);
        next(error);
    }
};
// Get payment statistics
export const getPaymentStats = async (req, res, next) => {
    try {
        const { startDate, endDate, paymentMethod } = req.query;
        const filter = {};
        if (startDate || endDate) {
            filter.paymentDate = {};
            if (startDate)
                filter.paymentDate.$gte = new Date(startDate);
            if (endDate)
                filter.paymentDate.$lte = new Date(endDate);
        }
        if (paymentMethod)
            filter.paymentMethod = paymentMethod;
        const stats = await Payment.aggregate([
            { $match: { ...filter, status: "Completed" } },
            {
                $group: {
                    _id: null,
                    totalPayments: { $sum: 1 },
                    totalAmount: { $sum: "$paymentAmount" },
                    averageAmount: { $avg: "$paymentAmount" },
                },
            },
        ]);
        const methodBreakdown = await Payment.aggregate([
            { $match: { ...filter, status: "Completed" } },
            {
                $group: {
                    _id: "$paymentMethod",
                    count: { $sum: 1 },
                    totalAmount: { $sum: "$paymentAmount" },
                },
            },
        ]);
        const dailyStats = await Payment.aggregate([
            { $match: { ...filter, status: "Completed" } },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$paymentDate" },
                    },
                    count: { $sum: 1 },
                    totalAmount: { $sum: "$paymentAmount" },
                },
            },
            { $sort: { _id: -1 } },
            { $limit: 30 },
        ]);
        return res.status(200).json({
            message: "Payment statistics retrieved successfully",
            stats: stats[0] || {
                totalPayments: 0,
                totalAmount: 0,
                averageAmount: 0,
            },
            methodBreakdown,
            dailyStats,
        });
    }
    catch (error) {
        console.error("Error getting payment stats:", error);
        next(error);
    }
};
// Refund payment
export const refundPayment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { refundAmount, reason } = req.body;
        const payment = await Payment.findById(id);
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        if (payment.status !== "Completed") {
            return res.status(400).json({
                message: "Only completed payments can be refunded",
            });
        }
        if (refundAmount > payment.paymentAmount) {
            return res.status(400).json({
                message: "Refund amount cannot exceed original payment amount",
            });
        }
        // Update payment status to refunded
        payment.status = "Refunded";
        payment.notes = payment.notes
            ? `${payment.notes}\nRefund: ${reason}`
            : `Refund: ${reason}`;
        payment.updatedBy = req.user._id;
        await payment.save();
        // Send notification
        const findUser = await UserModel.findById(req.user._id);
        const invoice = await Invoice.findById(payment.invoice);
        const message = `${findUser.name} refunded payment ${payment.paymentNumber} for invoice ${invoice.invoiceNumber} - Amount: ${refundAmount}`;
        await sendNotificationLogic({
            senderId: req.user._id,
            message,
        });
        // Log audit
        await logAudit({
            userId: req.user._id,
            action: `Refund Payment by ${findUser.name}`,
            userName: findUser.name,
            entity: "Payment",
            entityId: payment._id,
            oldValue: { status: "Completed" },
            newValue: { status: "Refunded", refundAmount, reason },
        });
        return res.status(200).json({
            message: "Payment refunded successfully",
            payment,
        });
    }
    catch (error) {
        console.error("Error refunding payment:", error);
        next(error);
    }
};
//# sourceMappingURL=Payment.controller.js.map