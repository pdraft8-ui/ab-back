import { Payment } from "../entities/Payment.entity.js";
import { TranzilaPayment } from "../entities/TranzilaPayment.entity.js";
export class IPaymentRepository {
    // Generic Payment methods
    async createPayment(paymentData) {
        throw new Error("Method not implemented");
    }
    async getPaymentById(id) {
        throw new Error("Method not implemented");
    }
    async getAllPayments(filters = {}) {
        throw new Error("Method not implemented");
    }
    async updatePayment(id, updateData) {
        throw new Error("Method not implemented");
    }
    async deletePayment(id) {
        throw new Error("Method not implemented");
    }
    async getPaymentsByCustomer(customerId) {
        throw new Error("Method not implemented");
    }
    async getPaymentsByInvoice(invoiceId) {
        throw new Error("Method not implemented");
    }
    async getPaymentStats(filters = {}) {
        throw new Error("Method not implemented");
    }
    async refundPayment(paymentId, refundData) {
        throw new Error("Method not implemented");
    }
    async getPaymentCountByInvoice(invoiceId) {
        throw new Error("Method not implemented");
    }
    // Tranzila Payment methods
    async createTranzilaPayment(paymentData) {
        throw new Error("Method not implemented");
    }
    async getTranzilaPaymentById(id) {
        throw new Error("Method not implemented");
    }
    async getTranzilaPaymentByTransactionId(transactionId) {
        throw new Error("Method not implemented");
    }
    async updateTranzilaPayment(id, updateData) {
        throw new Error("Method not implemented");
    }
    async getAllTranzilaPayments(filters = {}) {
        throw new Error("Method not implemented");
    }
}
//# sourceMappingURL=IPaymentRepository.js.map