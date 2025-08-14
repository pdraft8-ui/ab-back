export class PaymentContainer {
    services: Map<any, any>;
    initializeServices(): void;
    get(serviceName: any): any;
    getPaymentRepository(): any;
    getCreatePaymentUseCase(): any;
    getGetAllPaymentsUseCase(): any;
    getRefundPaymentUseCase(): any;
    getCreateTranzilaPaymentUseCase(): any;
    getPaymentController(): any;
    getPaymentRoutes(): any;
}
export default paymentContainer;
declare const paymentContainer: PaymentContainer;
//# sourceMappingURL=PaymentContainer.d.ts.map