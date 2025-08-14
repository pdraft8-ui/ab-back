export class CreatePaymentUseCase {
    constructor(paymentRepository: any, invoiceRepository: any, customerRepository: any, notificationService: any, auditService: any);
    paymentRepository: any;
    invoiceRepository: any;
    customerRepository: any;
    notificationService: any;
    auditService: any;
    execute(paymentData: any, userId: any, userName: any): Promise<any>;
    generatePaymentNumber(): string;
}
//# sourceMappingURL=CreatePaymentUseCase.d.ts.map