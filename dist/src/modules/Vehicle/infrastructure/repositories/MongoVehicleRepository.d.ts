export class MongoVehicleRepository extends IVehicleRepository {
    mapToVehicleEntity(vehicleDoc: any): Vehicle;
    create(vehicleData: any): Promise<Vehicle>;
    findById(id: any): Promise<Vehicle>;
    findByPlateNumber(plateNumber: any): Promise<Vehicle>;
    findAll(): Promise<Vehicle[]>;
    findByCustomerId(customerId: any): Promise<Vehicle[]>;
    update(id: any, vehicleData: any): Promise<Vehicle>;
    delete(id: any): Promise<Vehicle>;
    addInsuranceToVehicle(vehicleId: any, insuranceData: any): Promise<Vehicle>;
    removeInsuranceFromVehicle(vehicleId: any, insuranceId: any): Promise<Vehicle>;
    updateInsurance(vehicleId: any, insuranceId: any, insuranceData: any): Promise<Vehicle>;
    getInsurancesForVehicle(vehicleId: any): Promise<Vehicle>;
    addCheckToInsurance(vehicleId: any, insuranceId: any, checkData: any): Promise<Vehicle>;
    removeCheckFromInsurance(vehicleId: any, insuranceId: any, checkId: any): Promise<Vehicle>;
    getChecksForInsurance(vehicleId: any, insuranceId: any): Promise<any>;
    getAllChecksForVehicle(vehicleId: any): Promise<any[]>;
    getStats(): Promise<{
        totalVehicles: number;
        vehiclesWithInsurance: number;
        vehiclesWithExpiredLicense: number;
        vehiclesWithExpiredTest: number;
        vehiclesWithoutInsurance: number;
    }>;
    countVehicles(): Promise<number>;
    findVehiclesWithExpiredInsurance(): Promise<Vehicle[]>;
    findVehiclesWithExpiredLicense(): Promise<Vehicle[]>;
    findVehiclesWithExpiredTest(): Promise<Vehicle[]>;
}
import { IVehicleRepository } from "../../domain/interfaces/IVehicleRepository.js";
import { Vehicle } from "../../domain/entities/Vehicle.entity.js";
//# sourceMappingURL=MongoVehicleRepository.d.ts.map