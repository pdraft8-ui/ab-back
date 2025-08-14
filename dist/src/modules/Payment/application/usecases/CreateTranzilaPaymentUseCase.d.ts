export class CreateTranzilaPaymentUseCase {
    constructor(paymentRepository: any, tranzilaService: any, invoiceRepository: any, customerRepository: any, notificationService: any);
    paymentRepository: any;
    tranzilaService: any;
    invoiceRepository: any;
    customerRepository: any;
    notificationService: any;
    execute(paymentData: any, userId: any): Promise<any>;
    generatePaymentId(): string;
}
//# sourceMappingURL=CreateTranzilaPaymentUseCase.d.ts.map