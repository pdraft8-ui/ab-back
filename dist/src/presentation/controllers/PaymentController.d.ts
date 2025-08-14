export class PaymentController {
    constructor(createPaymentUseCase: any, getAllPaymentsUseCase: any, refundPaymentUseCase: any, paymentRepository: any);
    createPaymentUseCase: any;
    getAllPaymentsUseCase: any;
    refundPaymentUseCase: any;
    paymentRepository: any;
    createPayment(req: any, res: any, next: any): Promise<void>;
    getAllPayments(req: any, res: any, next: any): Promise<void>;
    getPaymentById(req: any, res: any, next: any): Promise<any>;
    updatePayment(req: any, res: any, next: any): Promise<any>;
    deletePayment(req: any, res: any, next: any): Promise<any>;
    getPaymentsByCustomer(req: any, res: any, next: any): Promise<void>;
    getPaymentsByInvoice(req: any, res: any, next: any): Promise<void>;
    getPaymentStats(req: any, res: any, next: any): Promise<void>;
    refundPayment(req: any, res: any, next: any): Promise<void>;
}
//# sourceMappingURL=PaymentController.d.ts.map