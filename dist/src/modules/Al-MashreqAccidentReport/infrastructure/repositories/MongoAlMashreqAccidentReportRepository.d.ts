export class MongoAlMashreqAccidentReportRepository extends IAlMashreqAccidentReportRepository {
    mapToAlMashreqAccidentReportEntity(mongooseDoc: any): AlMashreqAccidentReport;
    create(alMashreqAccidentReport: any): Promise<AlMashreqAccidentReport>;
    findById(id: any): Promise<AlMashreqAccidentReport>;
    findByCustomerId(customerId: any): Promise<AlMashreqAccidentReport[]>;
    findByPlateNumber(plateNumber: any): Promise<AlMashreqAccidentReport[]>;
    findAll(): Promise<AlMashreqAccidentReport[]>;
    update(id: any, alMashreqAccidentReport: any): Promise<AlMashreqAccidentReport>;
    delete(id: any): Promise<AlMashreqAccidentReport>;
    getStats(): Promise<{
        totalReports: number;
        reportsThisMonth: number;
        reportsThisYear: number;
        accidentTypeDistribution: any[];
        averageOtherVehicles: any;
        averagePersonalInjuries: any;
        averageExternalWitnesses: any;
    }>;
    countAccidentReports(): Promise<number>;
    findByDateRange(startDate: any, endDate: any): Promise<AlMashreqAccidentReport[]>;
    findByAccidentType(accidentType: any): Promise<AlMashreqAccidentReport[]>;
}
import { IAlMashreqAccidentReportRepository } from "../../domain/interfaces/IAlMashreqAccidentReportRepository.js";
import { AlMashreqAccidentReport } from "../../domain/entities/AlMashreqAccidentReport.entity.js";
//# sourceMappingURL=MongoAlMashreqAccidentReportRepository.d.ts.map