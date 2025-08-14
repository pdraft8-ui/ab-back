export class MongoHolyLandsReportRepository extends IHolyLandsReportRepository {
    mapToHolyLandsReportEntity(mongooseDoc: any): HolyLandsReport;
    create(holyLandsReport: any): Promise<HolyLandsReport>;
    findById(id: any): Promise<HolyLandsReport>;
    findByCustomerId(customerId: any): Promise<HolyLandsReport[]>;
    findByPlateNumber(plateNumber: any): Promise<HolyLandsReport[]>;
    findAll(): Promise<HolyLandsReport[]>;
    update(id: any, holyLandsReport: any): Promise<HolyLandsReport>;
    delete(id: any): Promise<HolyLandsReport>;
    getStats(): Promise<{
        totalReports: number;
        reportsThisMonth: number;
        reportsThisYear: number;
        accidentTypeDistribution: any[];
        averageOtherVehicles: any;
        averageInjuries: any;
    }>;
    countAccidentReports(): Promise<number>;
    findByDateRange(startDate: any, endDate: any): Promise<HolyLandsReport[]>;
    findByAccidentType(accidentType: any): Promise<HolyLandsReport[]>;
}
import { IHolyLandsReportRepository } from "../../domain/interfaces/IHolyLandsReportRepository.js";
import { HolyLandsReport } from "../../domain/entities/HolyLandsReport.entity.js";
//# sourceMappingURL=MongoHolyLandsReportRepository.d.ts.map