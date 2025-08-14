import { CreateTranzilaPaymentUseCase } from "../../application/usecases/CreateTranzilaPaymentUseCase.js";
export class TranzilaPaymentController {
    constructor(createTranzilaPaymentUseCase, paymentRepository, tranzilaService, notificationService) {
        this.createTranzilaPaymentUseCase = createTranzilaPaymentUseCase;
        this.paymentRepository = paymentRepository;
        this.tranzilaService = tranzilaService;
        this.notificationService = notificationService;
    }
    // Create direct payment
    async createDirectPayment(req, res, next) {
        try {
            const paymentData = req.body;
            const userId = req.user._id;
            const result = await this.createTranzilaPaymentUseCase.execute(paymentData, userId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error("Create direct payment error:", error);
            return res.status(400).json({
                success: false,
                message: error.message || "Failed to create payment",
            });
        }
    }
    // Get payment status
    async getPaymentStatus(req, res, next) {
        try {
            const { paymentId } = req.params;
            const payment = await this.paymentRepository.findTranzilaPaymentByPaymentId(paymentId);
            if (!payment) {
                return res.status(404).json({
                    success: false,
                    message: "Payment not found",
                });
            }
            // If payment is still pending and has transaction ID, check with Tranzila
            if (payment.isPending() && payment.hasTranzilaTransactionId()) {
                const statusResult = await this.tranzilaService.checkPaymentStatus(payment.tranzilaTransactionId);
                if (statusResult.success) {
                    // Update payment status based on Tranzila response
                    if (statusResult.status === "approved") {
                        payment.markAsCompleted(statusResult.transactionId);
                    }
                    else if (statusResult.status === "declined") {
                        payment.markAsFailed(statusResult.error || "Payment declined");
                    }
                    await this.paymentRepository.updateTranzilaPayment(payment.id, {
                        status: payment.status,
                        tranzilaTransactionId: payment.tranzilaTransactionId,
                        completedAt: payment.completedAt,
                        failedAt: payment.failedAt,
                        errorMessage: payment.errorMessage,
                        tranzilaResponse: statusResult.data,
                    });
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
                    paymentUrl: payment.paymentUrl,
                    tranzilaTransactionId: payment.tranzilaTransactionId,
                },
            });
        }
        catch (error) {
            console.error("Get payment status error:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }
    // Refund payment
    async refundPayment(req, res, next) {
        try {
            const { paymentId } = req.params;
            const { amount, reason } = req.body;
            const userId = req.user._id;
            const payment = await this.paymentRepository.findTranzilaPaymentByPaymentId(paymentId);
            if (!payment) {
                return res.status(404).json({
                    success: false,
                    message: "Payment not found",
                });
            }
            if (!payment.canBeRefunded()) {
                return res.status(400).json({
                    success: false,
                    message: "Payment cannot be refunded",
                });
            }
            const refundAmount = amount || payment.amount;
            if (!payment.validateRefundAmount(refundAmount)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid refund amount",
                });
            }
            // Process refund with Tranzila
            const refundResult = await this.tranzilaService.processRefund(payment.tranzilaTransactionId, refundAmount, reason);
            if (refundResult.success) {
                // Update payment status
                payment.markAsRefunded(refundAmount, reason);
                payment.updatedBy = userId;
                await this.paymentRepository.updateTranzilaPayment(payment.id, {
                    status: payment.status,
                    refundAmount: payment.refundAmount,
                    refundReason: payment.refundReason,
                    refundedAt: payment.refundedAt,
                    updatedBy: payment.updatedBy,
                    tranzilaResponse: refundResult.data,
                });
                // Send notification
                await this.notificationService.sendRefundNotification(payment, refundAmount, reason);
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
                    message: "Failed to process refund",
                    error: refundResult.error,
                });
            }
        }
        catch (error) {
            console.error("Refund payment error:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }
    // Get payment history
    async getPaymentHistory(req, res, next) {
        try {
            const { page = 1, limit = 10, status, startDate, endDate } = req.query;
            const filters = {
                status,
                startDate,
                endDate,
                skip: (page - 1) * limit,
                limit: parseInt(limit),
            };
            const payments = await this.paymentRepository.getAllTranzilaPayments(filters);
            const total = await this.paymentRepository
                .getAllTranzilaPayments({ ...filters, skip: 0, limit: 1000 })
                .then((p) => p.length);
            return res.status(200).json({
                success: true,
                data: {
                    payments: payments.map((payment) => ({
                        id: payment.id,
                        paymentId: payment.paymentId,
                        status: payment.status,
                        amount: payment.amount,
                        currency: payment.currency,
                        description: payment.description,
                        createdAt: payment.createdAt,
                        completedAt: payment.completedAt,
                        failedAt: payment.failedAt,
                        refundAmount: payment.refundAmount,
                        refundReason: payment.refundReason,
                    })),
                    pagination: {
                        currentPage: parseInt(page),
                        totalPages: Math.ceil(total / limit),
                        totalItems: total,
                        itemsPerPage: parseInt(limit),
                    },
                },
            });
        }
        catch (error) {
            console.error("Get payment history error:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }
}
//# sourceMappingURL=TranzilaPaymentController.js.map