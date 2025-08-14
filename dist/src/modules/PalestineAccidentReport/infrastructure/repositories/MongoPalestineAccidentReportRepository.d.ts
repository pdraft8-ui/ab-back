export class MongoPalestineAccidentReportRepository extends IPalestineAccidentReportRepository {
    mapToPalestineAccidentReportEntity(mongooseDoc: any): PalestineAccidentReport;
    create(palestineAccidentReport: any): Promise<PalestineAccidentReport>;
    findById(id: any): Promise<PalestineAccidentReport>;
    findByCustomerId(customerId: any): Promise<any>;
    findByPlateNumber(plateNumber: any): Promise<any>;
    findAll(): Promise<any>;
    update(id: any, palestineAccidentReport: any): Promise<PalestineAccidentReport>;
    delete(id: any): Promise<PalestineAccidentReport>;
    getStats(): Promise<{
        totalReports: number;
        reportsThisMonth: number;
        reportsThisYear: number;
        accidentTypeDistribution: any[];
        averageInjuries: any;
        averageWitnesses: any;
        averagePassengers: any;
    }>;
    countAccidentReports(): Promise<number>;
    findByDateRange(startDate: any, endDate: any): Promise<any>;
    findByAccidentType(accidentType: any): Promise<any>;
}
import { IPalestineAccidentReportRepository } from "../../domain/interfaces/IPalestineAccidentReportRepository.js";
import { PalestineAccidentReport } from "../../domain/entities/PalestineAccidentReport.entity.js";
//# sourceMappingURL=MongoPalestineAccidentReportRepository.d.ts.map