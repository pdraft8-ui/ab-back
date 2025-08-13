import { IPaymentRepository } from "../../core/interfaces/IPaymentRepository.js";
import Payment from "../../../DB/models/Payment.model.js";
import TranzilaPayment from "../../../DB/models/TranzilaPayment.model.js";
import { Payment as PaymentEntity } from "../../core/entities/Payment.entity.js";
import { TranzilaPayment as TranzilaPaymentEntity } from "../../core/entities/TranzilaPayment.entity.js";

export class MongoPaymentRepository extends IPaymentRepository {
  // Generic Payment methods
  async createPayment(paymentData) {
    try {
      const payment = new Payment(paymentData);
      const savedPayment = await payment.save();
      return this.mapToEntity(savedPayment);
    } catch (error) {
      throw error;
    }
  }

  async getPaymentById(id) {
    try {
      const payment = await Payment.findById(id)
        .populate("invoice", "invoiceNumber balanceDue")
        .populate("customer", "name email phone")
        .populate("createdBy", "name")
        .populate("updatedBy", "name");

      return payment ? this.mapToEntity(payment) : null;
    } catch (error) {
      throw error;
    }
  }

  async getAllPayments(filters = {}) {
    try {
      const {
        page = 1,
        limit = 10,
        status,
        customerId,
        invoiceId,
        paymentMethod,
        startDate,
        endDate,
        search,
      } = filters;

      const query = {};

      // Apply filters
      if (status) query.status = status;
      if (customerId) query.customer = customerId;
      if (invoiceId) query.invoice = invoiceId;
      if (paymentMethod) query.paymentMethod = paymentMethod;

      // Date range filter
      if (startDate || endDate) {
        query.paymentDate = {};
        if (startDate) query.paymentDate.$gte = new Date(startDate);
        if (endDate) query.paymentDate.$lte = new Date(endDate);
      }

      // Search filter
      if (search) {
        query.$or = [
          { paymentNumber: { $regex: search, $options: "i" } },
          { notes: { $regex: search, $options: "i" } },
          { referenceNumber: { $regex: search, $options: "i" } },
        ];
      }

      const skip = (page - 1) * limit;

      const [payments, total] = await Promise.all([
        Payment.find(query)
          .populate("invoice", "invoiceNumber balanceDue")
          .populate("customer", "name email phone")
          .populate("createdBy", "name")
          .populate("updatedBy", "name")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit),
        Payment.countDocuments(query),
      ]);

      return {
        payments: payments.map((payment) => this.mapToEntity(payment)),
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async updatePayment(id, updateData) {
    try {
      const payment = await Payment.findByIdAndUpdate(
        id,
        { ...updateData, updatedAt: new Date() },
        { new: true }
      )
        .populate("invoice", "invoiceNumber balanceDue")
        .populate("customer", "name email phone")
        .populate("createdBy", "name")
        .populate("updatedBy", "name");

      return payment ? this.mapToEntity(payment) : null;
    } catch (error) {
      throw error;
    }
  }

  async deletePayment(id) {
    try {
      const payment = await Payment.findByIdAndDelete(id);
      return payment ? this.mapToEntity(payment) : null;
    } catch (error) {
      throw error;
    }
  }

  async getPaymentsByCustomer(customerId, filters = {}) {
    try {
      const query = { customer: customerId, ...filters };
      const payments = await Payment.find(query)
        .populate("invoice", "invoiceNumber balanceDue")
        .populate("customer", "name email phone")
        .populate("createdBy", "name")
        .populate("updatedBy", "name")
        .sort({ createdAt: -1 });

      return payments.map((payment) => this.mapToEntity(payment));
    } catch (error) {
      throw error;
    }
  }

  async getPaymentsByInvoice(invoiceId, filters = {}) {
    try {
      const query = { invoice: invoiceId, ...filters };
      const payments = await Payment.find(query)
        .populate("invoice", "invoiceNumber balanceDue")
        .populate("customer", "name email phone")
        .populate("createdBy", "name")
        .populate("updatedBy", "name")
        .sort({ createdAt: -1 });

      return payments.map((payment) => this.mapToEntity(payment));
    } catch (error) {
      throw error;
    }
  }

  async getPaymentStats(filters = {}) {
    try {
      const { startDate, endDate, paymentMethod } = filters;
      const query = {};

      if (startDate || endDate) {
        query.paymentDate = {};
        if (startDate) query.paymentDate.$gte = new Date(startDate);
        if (endDate) query.paymentDate.$lte = new Date(endDate);
      }

      if (paymentMethod) query.paymentMethod = paymentMethod;

      const stats = await Payment.aggregate([
        { $match: query },
        {
          $group: {
            _id: null,
            totalPayments: { $sum: 1 },
            totalAmount: { $sum: "$paymentAmount" },
            averageAmount: { $avg: "$paymentAmount" },
            completedPayments: {
              $sum: { $cond: [{ $eq: ["$status", "Completed"] }, 1, 0] },
            },
            failedPayments: {
              $sum: { $cond: [{ $eq: ["$status", "Failed"] }, 1, 0] },
            },
            refundedPayments: {
              $sum: { $cond: [{ $eq: ["$status", "Refunded"] }, 1, 0] },
            },
          },
        },
      ]);

      const methodStats = await Payment.aggregate([
        { $match: query },
        {
          $group: {
            _id: "$paymentMethod",
            count: { $sum: 1 },
            totalAmount: { $sum: "$paymentAmount" },
          },
        },
      ]);

      return {
        overview: stats[0] || {
          totalPayments: 0,
          totalAmount: 0,
          averageAmount: 0,
          completedPayments: 0,
          failedPayments: 0,
          refundedPayments: 0,
        },
        byMethod: methodStats,
      };
    } catch (error) {
      throw error;
    }
  }

  async refundPayment(id, refundData) {
    try {
      const payment = await Payment.findById(id);
      if (!payment) {
        throw new Error("Payment not found");
      }

      payment.status = "Refunded";
      payment.notes = payment.notes
        ? `${payment.notes}\nRefund: ${refundData.reason}`
        : `Refund: ${refundData.reason}`;
      payment.updatedAt = new Date();

      const updatedPayment = await payment.save();
      return this.mapToEntity(updatedPayment);
    } catch (error) {
      throw error;
    }
  }

  async getPaymentCountByInvoice(invoiceId) {
    try {
      return await Payment.countDocuments({ invoice: invoiceId });
    } catch (error) {
      throw error;
    }
  }

  // Tranzila Payment methods
  async createTranzilaPayment(paymentData) {
    try {
      const payment = new TranzilaPayment(paymentData);
      const savedPayment = await payment.save();
      return this.mapToTranzilaEntity(savedPayment);
    } catch (error) {
      throw error;
    }
  }

  async getTranzilaPaymentById(id) {
    try {
      const payment = await TranzilaPayment.findById(id)
        .populate("invoice", "invoiceNumber balanceDue")
        .populate("customer", "name email phone")
        .populate("createdBy", "name")
        .populate("updatedBy", "name");

      return payment ? this.mapToTranzilaEntity(payment) : null;
    } catch (error) {
      throw error;
    }
  }

  async updateTranzilaPayment(id, updateData) {
    try {
      const payment = await TranzilaPayment.findByIdAndUpdate(
        id,
        { ...updateData, updatedAt: new Date() },
        { new: true }
      )
        .populate("invoice", "invoiceNumber balanceDue")
        .populate("customer", "name email phone")
        .populate("createdBy", "name")
        .populate("updatedBy", "name");

      return payment ? this.mapToTranzilaEntity(payment) : null;
    } catch (error) {
      throw error;
    }
  }

  async getTranzilaPaymentByTransactionId(transactionId) {
    try {
      const payment = await TranzilaPayment.findOne({
        tranzilaTransactionId: transactionId,
      })
        .populate("invoice", "invoiceNumber balanceDue")
        .populate("customer", "name email phone")
        .populate("createdBy", "name")
        .populate("updatedBy", "name");

      return payment ? this.mapToTranzilaEntity(payment) : null;
    } catch (error) {
      throw error;
    }
  }

  async getAllTranzilaPayments(filters = {}) {
    try {
      const {
        page = 1,
        limit = 10,
        status,
        customerId,
        invoiceId,
        startDate,
        endDate,
      } = filters;

      const query = {};

      if (status) query.status = status;
      if (customerId) query.customer = customerId;
      if (invoiceId) query.invoice = invoiceId;

      if (startDate || endDate) {
        query.createdAt = {};
        if (startDate) query.createdAt.$gte = new Date(startDate);
        if (endDate) query.createdAt.$lte = new Date(endDate);
      }

      const skip = (page - 1) * limit;

      const [payments, total] = await Promise.all([
        TranzilaPayment.find(query)
          .populate("invoice", "invoiceNumber balanceDue")
          .populate("customer", "name email phone")
          .populate("createdBy", "name")
          .populate("updatedBy", "name")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit),
        TranzilaPayment.countDocuments(query),
      ]);

      return {
        payments: payments.map((payment) => this.mapToTranzilaEntity(payment)),
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw error;
    }
  }

  // Mapping methods
  mapToEntity(paymentDoc) {
    if (!paymentDoc) return null;

    return new PaymentEntity({
      id: paymentDoc._id.toString(),
      paymentNumber: paymentDoc.paymentNumber,
      invoiceId:
        paymentDoc.invoice?._id?.toString() || paymentDoc.invoice?.toString(),
      customerId:
        paymentDoc.customer?._id?.toString() || paymentDoc.customer?.toString(),
      paymentMethod: paymentDoc.paymentMethod,
      paymentAmount: paymentDoc.paymentAmount,
      paymentDate: paymentDoc.paymentDate,
      notes: paymentDoc.notes,
      referenceNumber: paymentDoc.referenceNumber,
      status: paymentDoc.status,
      createdBy:
        paymentDoc.createdBy?._id?.toString() ||
        paymentDoc.createdBy?.toString(),
      updatedBy:
        paymentDoc.updatedBy?._id?.toString() ||
        paymentDoc.updatedBy?.toString(),
      createdAt: paymentDoc.createdAt,
      updatedAt: paymentDoc.updatedAt,
    });
  }

  mapToTranzilaEntity(paymentDoc) {
    if (!paymentDoc) return null;

    return new TranzilaPaymentEntity({
      id: paymentDoc._id.toString(),
      paymentId: paymentDoc.paymentId,
      invoiceId:
        paymentDoc.invoice?._id?.toString() || paymentDoc.invoice?.toString(),
      customerId:
        paymentDoc.customer?._id?.toString() || paymentDoc.customer?.toString(),
      amount: paymentDoc.amount,
      currency: paymentDoc.currency,
      description: paymentDoc.description,
      status: paymentDoc.status,
      tranzilaTransactionId: paymentDoc.tranzilaTransactionId,
      tranzilaResponse: paymentDoc.tranzilaResponse,
      customerEmail: paymentDoc.customerEmail,
      customerPhone: paymentDoc.customerPhone,
      returnUrl: paymentDoc.returnUrl,
      cancelUrl: paymentDoc.cancelUrl,
      paymentUrl: paymentDoc.paymentUrl,
      refundAmount: paymentDoc.refundAmount,
      refundReason: paymentDoc.refundReason,
      refundedAt: paymentDoc.refundedAt,
      createdBy:
        paymentDoc.createdBy?._id?.toString() ||
        paymentDoc.createdBy?.toString(),
      updatedBy:
        paymentDoc.updatedBy?._id?.toString() ||
        paymentDoc.updatedBy?.toString(),
      completedAt: paymentDoc.completedAt,
      failedAt: paymentDoc.failedAt,
      errorMessage: paymentDoc.errorMessage,
      createdAt: paymentDoc.createdAt,
      updatedAt: paymentDoc.updatedAt,
    });
  }
}
