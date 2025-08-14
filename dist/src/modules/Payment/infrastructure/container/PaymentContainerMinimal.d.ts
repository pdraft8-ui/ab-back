export class PaymentContainerMinimal {
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
export default paymentContainerMinimal;
declare const paymentContainerMinimal: PaymentContainerMinimal;
//# sourceMappingURL=PaymentContainerMinimal.d.ts.map