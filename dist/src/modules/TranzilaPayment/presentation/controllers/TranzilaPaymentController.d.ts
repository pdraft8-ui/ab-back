export class TranzilaPaymentController {
    constructor(createTranzilaPaymentUseCase: any, paymentRepository: any, tranzilaService: any, notificationService: any);
    createTranzilaPaymentUseCase: any;
    paymentRepository: any;
    tranzilaService: any;
    notificationService: any;
    createDirectPayment(req: any, res: any, next: any): Promise<any>;
    getPaymentStatus(req: any, res: any, next: any): Promise<any>;
    refundPayment(req: any, res: any, next: any): Promise<any>;
    getPaymentHistory(req: any, res: any, next: any): Promise<any>;
}
//# sourceMappingURL=TranzilaPaymentController.d.ts.map