export class MongoAlAhliaAccidentRepository extends IAlAhliaAccidentRepository {
    mapToAlAhliaAccidentEntity(mongooseDoc: any): AlAhliaAccident;
    create(alAhliaAccident: any): Promise<AlAhliaAccident>;
    findById(id: any): Promise<AlAhliaAccident>;
    findByCustomerId(customerId: any): Promise<AlAhliaAccident[]>;
    findByPlateNumber(plateNumber: any): Promise<AlAhliaAccident[]>;
    findAll(): Promise<AlAhliaAccident[]>;
    update(id: any, alAhliaAccident: any): Promise<AlAhliaAccident>;
    delete(id: any): Promise<AlAhliaAccident>;
    getStats(): Promise<{
        totalReports: number;
        reportsThisMonth: number;
        reportsThisYear: number;
        accidentTypeDistribution: any[];
        averageThirdPartyVehicles: any;
        averageThirdPartyInjuries: any;
    }>;
    countAccidentReports(): Promise<number>;
    findByDateRange(startDate: any, endDate: any): Promise<AlAhliaAccident[]>;
    findByAccidentType(accidentType: any): Promise<AlAhliaAccident[]>;
}
import { IAlAhliaAccidentRepository } from "../../domain/interfaces/IAlAhliaAccidentRepository.js";
import { AlAhliaAccident } from "../../domain/entities/AlAhliaAccident.entity.js";
//# sourceMappingURL=MongoAlAhliaAccidentRepository.d.ts.map