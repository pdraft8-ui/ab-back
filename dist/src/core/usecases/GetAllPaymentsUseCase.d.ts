export class GetAllPaymentsUseCase {
    constructor(paymentRepository: any);
    paymentRepository: any;
    execute(filters?: {}): Promise<any>;
    validateFilters(filters: any): void;
}
//# sourceMappingURL=GetAllPaymentsUseCase.d.ts.map