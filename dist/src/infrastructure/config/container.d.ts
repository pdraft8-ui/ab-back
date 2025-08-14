export default container;
declare const container: Container;
declare class Container {
    services: Map<any, any>;
    initializeServices(): void;
    get(serviceName: any): any;
    getTranzilaPaymentController(): any;
    getCreateTranzilaPaymentUseCase(): any;
    getTranzilaService(): any;
    getPaymentController(): any;
    getCreatePaymentUseCase(): any;
    getGetAllPaymentsUseCase(): any;
    getRefundPaymentUseCase(): any;
    getPaymentRepository(): any;
    getInvoiceRepository(): any;
    getCustomerRepository(): any;
    getNotificationService(): any;
    getAuditService(): any;
    getInvoiceController(): any;
    getCreateInvoiceUseCase(): any;
    getGetAllInvoicesUseCase(): any;
    getUpdateInvoiceUseCase(): any;
    getGetInvoiceStatsUseCase(): any;
    getMarkOverdueInvoicesUseCase(): any;
    getCustomerController(): any;
    getCreateCustomerUseCase(): any;
    getGetAllCustomersUseCase(): any;
    getUpdateCustomerUseCase(): any;
    getDeleteCustomerUseCase(): any;
    getAddVehicleToCustomerUseCase(): any;
    getGetCustomerStatsUseCase(): any;
}
//# sourceMappingURL=container.d.ts.map