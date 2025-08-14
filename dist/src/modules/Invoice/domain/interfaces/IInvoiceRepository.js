import { Invoice } from "../entities/Invoice.entity.js";
export class IInvoiceRepository {
    async createInvoice(invoiceData) {
        throw new Error("Method not implemented");
    }
    async getInvoiceById(id) {
        throw new Error("Method not implemented");
    }
    async getAllInvoices(filters = {}) {
        throw new Error("Method not implemented");
    }
    async updateInvoice(id, updateData) {
        throw new Error("Method not implemented");
    }
    async deleteInvoice(id) {
        throw new Error("Method not implemented");
    }
    async getInvoicesByCustomer(customerId, filters = {}) {
        throw new Error("Method not implemented");
    }
    async getInvoiceStats(filters = {}) {
        throw new Error("Method not implemented");
    }
    async markOverdueInvoices() {
        throw new Error("Method not implemented");
    }
    async getInvoiceByInsurancePolicy(insurancePolicyId) {
        throw new Error("Method not implemented");
    }
    async updateInvoiceBalance(id, newBalance) {
        throw new Error("Method not implemented");
    }
    async getInvoiceCount() {
        throw new Error("Method not implemented");
    }
    async getInvoicesByStatus(status, filters = {}) {
        throw new Error("Method not implemented");
    }
    async getOverdueInvoices() {
        throw new Error("Method not implemented");
    }
    async getInvoicesByDateRange(startDate, endDate, filters = {}) {
        throw new Error("Method not implemented");
    }
}
//# sourceMappingURL=IInvoiceRepository.js.map