export class InvoiceController {
    constructor(createInvoiceUseCase: any, getAllInvoicesUseCase: any, updateInvoiceUseCase: any, getInvoiceStatsUseCase: any, markOverdueInvoicesUseCase: any, invoiceRepository: any);
    createInvoiceUseCase: any;
    getAllInvoicesUseCase: any;
    updateInvoiceUseCase: any;
    getInvoiceStatsUseCase: any;
    markOverdueInvoicesUseCase: any;
    invoiceRepository: any;
    createInvoice(req: any, res: any, next: any): Promise<any>;
    getAllInvoices(req: any, res: any, next: any): Promise<any>;
    getInvoiceById(req: any, res: any, next: any): Promise<any>;
    updateInvoice(req: any, res: any, next: any): Promise<any>;
    deleteInvoice(req: any, res: any, next: any): Promise<any>;
    getInvoicesByCustomer(req: any, res: any, next: any): Promise<any>;
    getInvoiceStats(req: any, res: any, next: any): Promise<any>;
    markOverdueInvoices(req: any, res: any, next: any): Promise<any>;
}
//# sourceMappingURL=InvoiceController.d.ts.map