export class CreateInvoiceUseCase {
    constructor(invoiceRepository: any, customerRepository: any, notificationService: any, auditService: any);
    invoiceRepository: any;
    customerRepository: any;
    notificationService: any;
    auditService: any;
    execute(invoiceData: any, userId: any, userName: any): Promise<any>;
    validateInput(invoiceData: any): void;
    calculateDefaultDueDate(): Date;
}
//# sourceMappingURL=CreateInvoiceUseCase.d.ts.map