export class MarkOverdueInvoicesUseCase {
    constructor(invoiceRepository: any, notificationService: any, auditService: any);
    invoiceRepository: any;
    notificationService: any;
    auditService: any;
    execute(userId: any, userName: any): Promise<{
        message: string;
        overdueCount: any;
        invoices: any;
    }>;
}
//# sourceMappingURL=MarkOverdueInvoicesUseCase.d.ts.map