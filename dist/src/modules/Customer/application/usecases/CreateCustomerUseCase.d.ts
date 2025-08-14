export class CreateCustomerUseCase {
    constructor(customerRepository: any, notificationService: any, auditService: any);
    customerRepository: any;
    notificationService: any;
    auditService: any;
    execute(customerData: any, userId: any, userName: any): Promise<any>;
}
//# sourceMappingURL=CreateCustomerUseCase.d.ts.map