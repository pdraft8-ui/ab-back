export class CustomerContainer {
    services: Map<any, any>;
    initializeServices(): void;
    get(serviceName: any): any;
    getCustomerRepository(): any;
    getCreateCustomerUseCase(): any;
    getGetAllCustomersUseCase(): any;
    getUpdateCustomerUseCase(): any;
    getDeleteCustomerUseCase(): any;
    getAddVehicleToCustomerUseCase(): any;
    getGetCustomerStatsUseCase(): any;
    getCustomerController(): any;
    getCustomerRoutes(): any;
}
export default customerContainer;
declare const customerContainer: CustomerContainer;
//# sourceMappingURL=CustomerContainer.d.ts.map