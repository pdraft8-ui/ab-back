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
    removeVehicleFromCustomer(req: any, res: any, next: any): Promise<void>;
    updateVehicle(req: any, res: any, next: any): Promise<void>;
    getCustomerVehicles(req: any, res: any, next: any): Promise<void>;
    addInsuranceToVehicle(req: any, res: any, next: any): Promise<void>;
    removeInsuranceFromVehicle(req: any, res: any, next: any): Promise<void>;
    getVehicleInsurances(req: any, res: any, next: any): Promise<void>;
    getAllVehicleInsurances(req: any, res: any, next: any): Promise<void>;
    getAllInsurancesData(req: any, res: any, next: any): Promise<void>;
    addCustomerInsurance(req: any, res: any, next: any): Promise<void>;
    getCustomerInsurances(req: any, res: any, next: any): Promise<void>;
    getAllCustomerInsurances(req: any, res: any, next: any): Promise<void>;
    getInsuranceById(req: any, res: any, next: any): Promise<any>;
    updateInsuranceById(req: any, res: any, next: any): Promise<void>;
    deleteInsuranceById(req: any, res: any, next: any): Promise<void>;
    addCheckToInsurance(req: any, res: any, next: any): Promise<void>;
    removeCheckFromInsurance(req: any, res: any, next: any): Promise<void>;
    getInsuranceChecks(req: any, res: any, next: any): Promise<void>;
    getAllChecksForVehicle(req: any, res: any, next: any): Promise<void>;
    getCustomerCount(req: any, res: any, next: any): Promise<void>;
    getCustomerByMonth(req: any, res: any, next: any): Promise<void>;
    getCustomerStats(req: any, res: any, next: any): Promise<void>;
}
//# sourceMappingURL=CustomerController.d.ts.map