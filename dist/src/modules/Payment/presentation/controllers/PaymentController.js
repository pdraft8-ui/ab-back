import { CreatePaymentUseCase } from "../../application/usecases/CreatePaymentUseCase.js";
import { GetAllPaymentsUseCase } from "../../application/usecases/GetAllPaymentsUseCase.js";
import { RefundPaymentUseCase } from "../../application/usecases/RefundPaymentUseCase.js";
export class PaymentController {
    constructor(createPaymentUseCase, getAllPaymentsUseCase, refundPaymentUseCase, paymentRepository) {
        this.createPaymentUseCase = createPaymentUseCase;
        this.getAllPaymentsUseCase = getAllPaymentsUseCase;
        this.refundPaymentUseCase = refundPaymentUseCase;
        this.paymentRepository = paymentRepository;
    }
    async createPayment(req, res, next) {
        try {
            const paymentData = req.body;
            const userId = req.user.id;
            const userName = req.user.name || req.user.email;
            const payment = await this.createPaymentUseCase.execute(paymentData, userId, userName);
            res.status(201).json({
                success: true,
                message: "Payment created successfully",
                data: payment,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getAllPayments(req, res, next) {
        try {
            const filters = {
                status: req.query.status,
                paymentMethod: req.query.paymentMethod,
                customerId: req.query.customerId,
                invoiceId: req.query.invoiceId,
                startDate: req.query.startDate,
                endDate: req.query.endDate,
                skip: parseInt(req.query.skip) || 0,
                limit: parseInt(req.query.limit) || 50,
            };
            const payments = await this.getAllPaymentsUseCase.execute(filters);
            res.status(200).json({
                success: true,
                message: "Payments retrieved successfully",
                data: payments,
                pagination: {
                    skip: filters.skip,
                    limit: filters.limit,
                    total: payments.length,
                },
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getPaymentById(req, res, next) {
        try {
            const { id } = req.params;
            const payment = await this.paymentRepository.getPaymentById(id);
            if (!payment) {
                return res.status(404).json({
                    success: false,
                    message: "Payment not found",
                });
            }
            res.status(200).json({
                success: true,
                message: "Payment retrieved successfully",
                data: payment,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async updatePayment(req, res, next) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const userId = req.user.id;
            updateData.updatedBy = userId;
            const payment = await this.paymentRepository.updatePayment(id, updateData);
            if (!payment) {
                return res.status(404).json({
                    success: false,
                    message: "Payment not found",
                });
            }
            res.status(200).json({
                success: true,
                message: "Payment updated successfully",
                data: payment,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async deletePayment(req, res, next) {
        try {
            const { id } = req.params;
            const payment = await this.paymentRepository.deletePayment(id);
            if (!payment) {
                return res.status(404).json({
                    success: false,
                    message: "Payment not found",
                });
            }
            res.status(200).json({
                success: true,
                message: "Payment deleted successfully",
                data: payment,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getPaymentsByCustomer(req, res, next) {
        try {
            const { customerId } = req.params;
            const payments = await this.paymentRepository.getPaymentsByCustomer(customerId);
            res.status(200).json({
                success: true,
                message: "Customer payments retrieved successfully",
                data: payments,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getPaymentsByInvoice(req, res, next) {
        try {
            const { invoiceId } = req.params;
            const payments = await this.paymentRepository.getPaymentsByInvoice(invoiceId);
            res.status(200).json({
                success: true,
                message: "Invoice payments retrieved successfully",
                data: payments,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getPaymentStats(req, res, next) {
        try {
            const filters = {
                status: req.query.status,
                paymentMethod: req.query.paymentMethod,
                customerId: req.query.customerId,
                invoiceId: req.query.invoiceId,
            };
            const stats = await this.paymentRepository.getPaymentStats(filters);
            res.status(200).json({
                success: true,
                message: "Payment statistics retrieved successfully",
                data: stats,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async refundPayment(req, res, next) {
        try {
            const { id } = req.params;
            const refundData = req.body;
            const userId = req.user.id;
            const userName = req.user.name || req.user.email;
            const payment = await this.refundPaymentUseCase.execute(id, refundData, userId, userName);
            res.status(200).json({
                success: true,
                message: "Payment refunded successfully",
                data: payment,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
//# sourceMappingURL=PaymentController.js.map