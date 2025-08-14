export class RefundPaymentUseCase {
    constructor(paymentRepository: any, invoiceRepository: any, notificationService: any, auditService: any);
    paymentRepository: any;
    invoiceRepository: any;
    notificationService: any;
    auditService: any;
    execute(paymentId: any, refundData: any, userId: any, userName: any): Promise<any>;
}
//# sourceMappingURL=RefundPaymentUseCase.d.ts.map