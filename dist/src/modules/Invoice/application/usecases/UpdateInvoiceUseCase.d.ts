export class UpdateInvoiceUseCase {
    constructor(invoiceRepository: any, auditService: any);
    invoiceRepository: any;
    auditService: any;
    execute(invoiceId: any, updateData: any, userId: any, userName: any): Promise<any>;
    validateUpdateData(updateData: any): void;
}
//# sourceMappingURL=UpdateInvoiceUseCase.d.ts.map