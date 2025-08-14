export class VehicleController {
    constructor(createVehicleUseCase: any, getAllVehiclesUseCase: any, getVehicleByIdUseCase: any, updateVehicleUseCase: any, deleteVehicleUseCase: any, getVehiclesByCustomerUseCase: any, addInsuranceToVehicleUseCase: any, getVehicleStatsUseCase: any);
    createVehicleUseCase: any;
    getAllVehiclesUseCase: any;
    getVehicleByIdUseCase: any;
    updateVehicleUseCase: any;
    deleteVehicleUseCase: any;
    getVehiclesByCustomerUseCase: any;
    addInsuranceToVehicleUseCase: any;
    getVehicleStatsUseCase: any;
    convertVehicleToFullUrls(vehicle: any): any;
    addVehicle(req: any, res: any, next: any): Promise<void>;
    getAllVehicles(req: any, res: any, next: any): Promise<void>;
    getVehicleById(req: any, res: any, next: any): Promise<void>;
    updateVehicle(req: any, res: any, next: any): Promise<void>;
    deleteVehicle(req: any, res: any, next: any): Promise<void>;
    getVehiclesByCustomer(req: any, res: any, next: any): Promise<void>;
    addInsuranceToVehicle(req: any, res: any, next: any): Promise<void>;
    getVehicleStats(req: any, res: any, next: any): Promise<void>;
}
//# sourceMappingURL=VehicleController.d.ts.map