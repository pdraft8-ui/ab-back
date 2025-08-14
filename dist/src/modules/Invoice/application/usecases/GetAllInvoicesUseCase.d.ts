export class GetAllInvoicesUseCase {
    constructor(invoiceRepository: any);
    invoiceRepository: any;
    execute(filters?: {}): Promise<any>;
    validateFilters(filters: any): void;
}
//# sourceMappingURL=GetAllInvoicesUseCase.d.ts.map