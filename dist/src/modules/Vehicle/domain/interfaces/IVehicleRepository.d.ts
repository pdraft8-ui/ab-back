export class IVehicleRepository {
    create(vehicleData: any): Promise<void>;
    findById(id: any): Promise<void>;
    findByPlateNumber(plateNumber: any): Promise<void>;
    findAll(): Promise<void>;
    findByCustomerId(customerId: any): Promise<void>;
    update(id: any, vehicleData: any): Promise<void>;
    delete(id: any): Promise<void>;
    addInsuranceToVehicle(vehicleId: any, insuranceData: any): Promise<void>;
    removeInsuranceFromVehicle(vehicleId: any, insuranceId: any): Promise<void>;
    updateInsurance(vehicleId: any, insuranceId: any, insuranceData: any): Promise<void>;
    getInsurancesForVehicle(vehicleId: any): Promise<void>;
    addCheckToInsurance(vehicleId: any, insuranceId: any, checkData: any): Promise<void>;
    removeCheckFromInsurance(vehicleId: any, insuranceId: any, checkId: any): Promise<void>;
    getChecksForInsurance(vehicleId: any, insuranceId: any): Promise<void>;
    getAllChecksForVehicle(vehicleId: any): Promise<void>;
    getStats(): Promise<void>;
    countVehicles(): Promise<void>;
    findVehiclesWithExpiredInsurance(): Promise<void>;
    findVehiclesWithExpiredLicense(): Promise<void>;
    findVehiclesWithExpiredTest(): Promise<void>;
}
//# sourceMappingURL=IVehicleRepository.d.ts.map