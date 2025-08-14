export class DeleteCustomerUseCase {
    constructor(customerRepository: any, auditService: any);
    customerRepository: any;
    auditService: any;
    execute(customerId: any, userId: any, userName: any): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=DeleteCustomerUseCase.d.ts.map