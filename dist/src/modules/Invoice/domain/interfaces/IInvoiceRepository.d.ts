export class IInvoiceRepository {
    createInvoice(invoiceData: any): Promise<void>;
    getInvoiceById(id: any): Promise<void>;
    getAllInvoices(filters?: {}): Promise<void>;
    updateInvoice(id: any, updateData: any): Promise<void>;
    deleteInvoice(id: any): Promise<void>;
    getInvoicesByCustomer(customerId: any, filters?: {}): Promise<void>;
    getInvoiceStats(filters?: {}): Promise<void>;
    markOverdueInvoices(): Promise<void>;
    getInvoiceByInsurancePolicy(insurancePolicyId: any): Promise<void>;
    updateInvoiceBalance(id: any, newBalance: any): Promise<void>;
    getInvoiceCount(): Promise<void>;
    getInvoicesByStatus(status: any, filters?: {}): Promise<void>;
    getOverdueInvoices(): Promise<void>;
    getInvoicesByDateRange(startDate: any, endDate: any, filters?: {}): Promise<void>;
}
//# sourceMappingURL=IInvoiceRepository.d.ts.map