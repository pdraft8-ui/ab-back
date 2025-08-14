export class CustomerController {
    constructor(createCustomerUseCase: any, getAllCustomersUseCase: any, updateCustomerUseCase: any, deleteCustomerUseCase: any, addVehicleToCustomerUseCase: any, getCustomerStatsUseCase: any, customerRepository: any);
    createCustomerUseCase: any;
    getAllCustomersUseCase: any;
    updateCustomerUseCase: any;
    deleteCustomerUseCase: any;
    addVehicleToCustomerUseCase: any;
    getCustomerStatsUseCase: any;
    customerRepository: any;
    createCustomer(req: any, res: any, next: any): Promise<void>;
    getAllCustomers(req: any, res: any, next: any): Promise<void>;
    getCustomerById(req: any, res: any, next: any): Promise<any>;
    updateCustomer(req: any, res: any, next: any): Promise<void>;
    deleteCustomer(req: any, res: any, next: any): Promise<void>;
    addVehicleToCustomer(req: any, res: any, next: any): Promise<void>;
    getCustomerStats(req: any, res: any, next: any): Promise<void>;
}
//# sourceMappingURL=CustomerController.d.ts.map