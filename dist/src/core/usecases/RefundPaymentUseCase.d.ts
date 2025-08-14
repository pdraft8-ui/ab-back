export class RefundPaymentUseCase {
    constructor(paymentRepository: any, invoiceRepository: any, notificationService: any, auditService: any);
    paymentRepository: any;
    invoiceRepository: any;
    notificationService: any;
    auditService: any;
    execute(paymentId: any, refundData: any, userId: any, userName: any): Promise<any>;
    validateRefundInput(refundData: any): void;
}
//# sourceMappingURL=RefundPaymentUseCase.d.ts.map