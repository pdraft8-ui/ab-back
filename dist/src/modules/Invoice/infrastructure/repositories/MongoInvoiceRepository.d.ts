export class MongoInvoiceRepository extends IInvoiceRepository {
    createInvoice(invoiceData: any): Promise<InvoiceEntity>;
    getInvoiceById(id: any): Promise<InvoiceEntity>;
    getAllInvoices(filters?: {}): Promise<{
        invoices: InvoiceEntity[];
        pagination: {
            page: any;
            limit: any;
            total: number;
            pages: number;
        };
    }>;
    updateInvoice(id: any, updateData: any): Promise<InvoiceEntity>;
    deleteInvoice(id: any): Promise<InvoiceEntity>;
    getInvoicesByCustomer(customerId: any, filters?: {}): Promise<InvoiceEntity[]>;
    getInvoiceStats(filters?: {}): Promise<any>;
    markOverdueInvoices(): Promise<InvoiceEntity[]>;
    getInvoiceByInsurancePolicy(insurancePolicyId: any): Promise<InvoiceEntity>;
    updateInvoiceBalance(id: any, newBalance: any): Promise<InvoiceEntity>;
    getInvoiceCount(): Promise<number>;
    getInvoicesByStatus(status: any, filters?: {}): Promise<InvoiceEntity[]>;
    getOverdueInvoices(): Promise<InvoiceEntity[]>;
    getInvoicesByDateRange(startDate: any, endDate: any, filters?: {}): Promise<InvoiceEntity[]>;
    mapToEntity(invoiceDoc: any): InvoiceEntity;
}
import { IInvoiceRepository } from "../../domain/interfaces/IInvoiceRepository.js";
import { Invoice as InvoiceEntity } from "../../domain/entities/Invoice.entity.js";
//# sourceMappingURL=MongoInvoiceRepository.d.ts.map