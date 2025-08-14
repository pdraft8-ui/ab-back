export class InvoiceContainer {
    services: Map<any, any>;
    initializeServices(): void;
    get(serviceName: any): any;
    getInvoiceRepository(): any;
    getCreateInvoiceUseCase(): any;
    getGetAllInvoicesUseCase(): any;
    getUpdateInvoiceUseCase(): any;
    getGetInvoiceStatsUseCase(): any;
    getMarkOverdueInvoicesUseCase(): any;
    getInvoiceController(): any;
    getInvoiceRoutes(): any;
}
export default invoiceContainer;
declare const invoiceContainer: InvoiceContainer;
//# sourceMappingURL=InvoiceContainer.d.ts.map