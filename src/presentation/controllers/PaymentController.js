import { CreatePaymentUseCase } from "../../core/usecases/CreatePaymentUseCase.js";
import { GetAllPaymentsUseCase } from "../../core/usecases/GetAllPaymentsUseCase.js";
import { RefundPaymentUseCase } from "../../core/usecases/RefundPaymentUseCase.js";

export class PaymentController {
  constructor(
    createPaymentUseCase,
    getAllPaymentsUseCase,
    refundPaymentUseCase,
    paymentRepository
  ) {
    this.createPaymentUseCase = createPaymentUseCase;
    this.getAllPaymentsUseCase = getAllPaymentsUseCase;
    this.refundPaymentUseCase = refundPaymentUseCase;
    this.paymentRepository = paymentRepository;
  }

  async createPayment(req, res, next) {
    try {
      const paymentData = req.body;
      const userId = req.user._id;
      const userName = req.user.name;

      const payment = await this.createPaymentUseCase.execute(
        paymentData,
        userId,
        userName
      );

      res.status(201).json({
        success: true,
        message: "Payment created successfully",
        data: payment,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllPayments(req, res, next) {
    try {
      const filters = req.query;
      const result = await this.getAllPaymentsUseCase.execute(filters);

      res.status(200).json({
        success: true,
        message: "Payments retrieved successfully",
        data: result.payments,
        pagination: result.pagination,
      });
    } catch (error) {
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
    } catch (error) {
      next(error);
    }
  }

  async updatePayment(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      updateData.updatedBy = req.user._id;

      const payment = await this.paymentRepository.updatePayment(
        id,
        updateData
      );

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
    } catch (error) {
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
    } catch (error) {
      next(error);
    }
  }

  async getPaymentsByCustomer(req, res, next) {
    try {
      const { customerId } = req.params;
      const filters = req.query;

      const payments = await this.paymentRepository.getPaymentsByCustomer(
        customerId,
        filters
      );

      res.status(200).json({
        success: true,
        message: "Customer payments retrieved successfully",
        data: payments,
      });
    } catch (error) {
      next(error);
    }
  }

  async getPaymentsByInvoice(req, res, next) {
    try {
      const { invoiceId } = req.params;
      const filters = req.query;

      const payments = await this.paymentRepository.getPaymentsByInvoice(
        invoiceId,
        filters
      );

      res.status(200).json({
        success: true,
        message: "Invoice payments retrieved successfully",
        data: payments,
      });
    } catch (error) {
      next(error);
    }
  }

  async getPaymentStats(req, res, next) {
    try {
      const filters = req.query;
      const stats = await this.paymentRepository.getPaymentStats(filters);

      res.status(200).json({
        success: true,
        message: "Payment statistics retrieved successfully",
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  }

  async refundPayment(req, res, next) {
    try {
      const { id } = req.params;
      const refundData = req.body;
      const userId = req.user._id;
      const userName = req.user.name;

      const payment = await this.refundPaymentUseCase.execute(
        id,
        refundData,
        userId,
        userName
      );

      res.status(200).json({
        success: true,
        message: "Payment refunded successfully",
        data: payment,
      });
    } catch (error) {
      next(error);
    }
  }
}
