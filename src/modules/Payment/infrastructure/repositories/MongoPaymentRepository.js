import { IPaymentRepository } from "../../domain/interfaces/IPaymentRepository.js";
import Payment from "../../../../../DB/models/Payment.model.js";
import TranzilaPayment from "../../../../../DB/models/TranzilaPayment.model.js";
import { Payment as PaymentEntity } from "../../domain/entities/Payment.entity.js";
import { TranzilaPayment as TranzilaPaymentEntity } from "../../domain/entities/TranzilaPayment.entity.js";

export class MongoPaymentRepository extends IPaymentRepository {
  // Generic Payment methods
  async createPayment(paymentData) {
    try {
      // Map the field names to match the model schema
      const paymentModelData = {
        ...paymentData,
        invoice: paymentData.invoiceId,
        customer: paymentData.customerId,
      };

      const payment = new Payment(paymentModelData);
      const savedPayment = await payment.save();
      return this.mapToPaymentEntity(savedPayment);
    } catch (error) {
      throw new Error(`Failed to create payment: ${error.message}`);
    }
  }

  async getPaymentById(id) {
    try {
      const payment = await Payment.findById(id).populate("invoice customer");
      return payment ? this.mapToPaymentEntity(payment) : null;
    } catch (error) {
      throw new Error(`Failed to get payment: ${error.message}`);
    }
  }

  async getAllPayments(filters = {}) {
    try {
      const query = {};

      if (filters.status) query.status = filters.status;
      if (filters.paymentMethod) query.paymentMethod = filters.paymentMethod;
      if (filters.customerId) query.customer = filters.customerId;
      if (filters.invoiceId) query.invoice = filters.invoiceId;

      if (filters.startDate && filters.endDate) {
        query.paymentDate = {
          $gte: new Date(filters.startDate),
          $lte: new Date(filters.endDate),
        };
      }

      const payments = await Payment.find(query)
        .populate("invoice customer")
        .sort({ createdAt: -1 })
        .skip(filters.skip || 0)
        .limit(filters.limit || 50);

      return payments.map((payment) => this.mapToPaymentEntity(payment));
    } catch (error) {
      throw new Error(`Failed to get payments: ${error.message}`);
    }
  }

  async updatePayment(id, updateData) {
    try {
      const payment = await Payment.findByIdAndUpdate(
        id,
        { ...updateData, updatedAt: new Date() },
        { new: true }
      ).populate("invoice customer");

      return payment ? this.mapToPaymentEntity(payment) : null;
    } catch (error) {
      throw new Error(`Failed to update payment: ${error.message}`);
    }
  }

  async deletePayment(id) {
    try {
      const payment = await Payment.findByIdAndDelete(id);
      return payment ? this.mapToPaymentEntity(payment) : null;
    } catch (error) {
      throw new Error(`Failed to delete payment: ${error.message}`);
    }
  }

  async getPaymentsByCustomer(customerId) {
    try {
      const payments = await Payment.find({ customer: customerId })
        .populate("invoice customer")
        .sort({ createdAt: -1 });

      return payments.map((payment) => this.mapToPaymentEntity(payment));
    } catch (error) {
      throw new Error(`Failed to get customer payments: ${error.message}`);
    }
  }

  async getPaymentsByInvoice(invoiceId) {
    try {
      const payments = await Payment.find({ invoice: invoiceId })
        .populate("invoice customer")
        .sort({ createdAt: -1 });

      return payments.map((payment) => this.mapToPaymentEntity(payment));
    } catch (error) {
      throw new Error(`Failed to get invoice payments: ${error.message}`);
    }
  }

  async getPaymentStats(filters = {}) {
    try {
      const query = {};

      if (filters.status) query.status = filters.status;
      if (filters.paymentMethod) query.paymentMethod = filters.paymentMethod;
      if (filters.customerId) query.customer = filters.customerId;
      if (filters.invoiceId) query.invoice = filters.invoiceId;

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
            pendingPayments: {
              $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] },
            },
            failedPayments: {
              $sum: { $cond: [{ $eq: ["$status", "Failed"] }, 1, 0] },
            },
          },
        },
      ]);

      return (
        stats[0] || {
          totalPayments: 0,
          totalAmount: 0,
          averageAmount: 0,
          completedPayments: 0,
          pendingPayments: 0,
          failedPayments: 0,
        }
      );
    } catch (error) {
      throw new Error(`Failed to get payment stats: ${error.message}`);
    }
  }

  async refundPayment(paymentId, refundData) {
    try {
      const payment = await Payment.findByIdAndUpdate(
        paymentId,
        {
          ...refundData,
          updatedAt: new Date(),
        },
        { new: true }
      ).populate("invoiceId customerId");

      return payment ? this.mapToPaymentEntity(payment) : null;
    } catch (error) {
      throw new Error(`Failed to refund payment: ${error.message}`);
    }
  }

  async getPaymentCountByInvoice(invoiceId) {
    try {
      const count = await Payment.countDocuments({ invoice: invoiceId });
      return count;
    } catch (error) {
      throw new Error(`Failed to get payment count: ${error.message}`);
    }
  }

  // Tranzila Payment methods
  async createTranzilaPayment(paymentData) {
    try {
      const payment = new TranzilaPayment(paymentData);
      const savedPayment = await payment.save();
      return this.mapToTranzilaPaymentEntity(savedPayment);
    } catch (error) {
      throw new Error(`Failed to create Tranzila payment: ${error.message}`);
    }
  }

  async getTranzilaPaymentById(id) {
    try {
      const payment = await TranzilaPayment.findById(id).populate(
        "invoiceId customerId"
      );
      return payment ? this.mapToTranzilaPaymentEntity(payment) : null;
    } catch (error) {
      throw new Error(`Failed to get Tranzila payment: ${error.message}`);
    }
  }

  async getTranzilaPaymentByTransactionId(transactionId) {
    try {
      const payment = await TranzilaPayment.findOne({
        tranzilaTransactionId: transactionId,
      }).populate("invoiceId customerId");
      return payment ? this.mapToTranzilaPaymentEntity(payment) : null;
    } catch (error) {
      throw new Error(
        `Failed to get Tranzila payment by transaction ID: ${error.message}`
      );
    }
  }

  async updateTranzilaPayment(id, updateData) {
    try {
      const payment = await TranzilaPayment.findByIdAndUpdate(
        id,
        { ...updateData, updatedAt: new Date() },
        { new: true }
      ).populate("invoiceId customerId");

      return payment ? this.mapToTranzilaPaymentEntity(payment) : null;
    } catch (error) {
      throw new Error(`Failed to update Tranzila payment: ${error.message}`);
    }
  }

  async getAllTranzilaPayments(filters = {}) {
    try {
      const query = {};

      if (filters.status) query.status = filters.status;
      if (filters.customerId) query.customerId = filters.customerId;
      if (filters.invoiceId) query.invoiceId = filters.invoiceId;

      if (filters.startDate && filters.endDate) {
        query.createdAt = {
          $gte: new Date(filters.startDate),
          $lte: new Date(filters.endDate),
        };
      }

      const payments = await TranzilaPayment.find(query)
        .populate("invoiceId customerId")
        .sort({ createdAt: -1 })
        .skip(filters.skip || 0)
        .limit(filters.limit || 50);

      return payments.map((payment) =>
        this.mapToTranzilaPaymentEntity(payment)
      );
    } catch (error) {
      throw new Error(`Failed to get Tranzila payments: ${error.message}`);
    }
  }

  // Helper methods for mapping
  mapToPaymentEntity(paymentDoc) {
    return new PaymentEntity({
      id: paymentDoc._id,
      paymentNumber: paymentDoc.paymentNumber,
      invoiceId: paymentDoc.invoice,
      customerId: paymentDoc.customer,
      paymentMethod: paymentDoc.paymentMethod,
      paymentAmount: paymentDoc.paymentAmount,
      paymentDate: paymentDoc.paymentDate,
      notes: paymentDoc.notes,
      referenceNumber: paymentDoc.referenceNumber,
      status: paymentDoc.status,
      createdBy: paymentDoc.createdBy,
      updatedBy: paymentDoc.updatedBy,
      createdAt: paymentDoc.createdAt,
      updatedAt: paymentDoc.updatedAt,
    });
  }

  mapToTranzilaPaymentEntity(paymentDoc) {
    return new TranzilaPaymentEntity({
      id: paymentDoc._id,
      paymentId: paymentDoc.paymentId,
      invoiceId: paymentDoc.invoiceId,
      customerId: paymentDoc.customerId,
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
      createdBy: paymentDoc.createdBy,
      updatedBy: paymentDoc.updatedBy,
      completedAt: paymentDoc.completedAt,
      failedAt: paymentDoc.failedAt,
      errorMessage: paymentDoc.errorMessage,
      createdAt: paymentDoc.createdAt,
      updatedAt: paymentDoc.updatedAt,
    });
  }
}
