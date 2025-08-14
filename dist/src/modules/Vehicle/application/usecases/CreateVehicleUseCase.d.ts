export class CreateVehicleUseCase {
    constructor(vehicleRepository: any, customerRepository: any, auditService: any);
    vehicleRepository: any;
    customerRepository: any;
    auditService: any;
    execute(vehicleData: any, userId: any, userName: any): Promise<any>;
}
//# sourceMappingURL=CreateVehicleUseCase.d.ts.map