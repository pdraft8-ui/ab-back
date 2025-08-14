export class MongoTrustAccidentReportRepository {
    mapToTrustAccidentReportEntity(mongooseDoc: any): TrustAccidentReport;
    create(trustAccidentReport: any): Promise<TrustAccidentReport>;
    findById(id: any): Promise<TrustAccidentReport>;
    findByCustomerId(customerId: any): Promise<TrustAccidentReport[]>;
    findByPlateNumber(plateNumber: any): Promise<TrustAccidentReport[]>;
    findAll(): Promise<TrustAccidentReport[]>;
    update(id: any, trustAccidentReport: any): Promise<TrustAccidentReport>;
    delete(id: any): Promise<TrustAccidentReport>;
    getStats(): Promise<{
        totalReports: number;
        reportsThisMonth: number;
        accidentTypes: any[];
        monthlyStats: any[];
        averageReportsPerMonth: string | number;
    }>;
    countAccidentReports(): Promise<number>;
    findByDateRange(startDate: any, endDate: any): Promise<TrustAccidentReport[]>;
    findByAccidentType(accidentType: any): Promise<TrustAccidentReport[]>;
}
import { TrustAccidentReport } from "../../domain/entities/TrustAccidentReport.entity.js";
//# sourceMappingURL=MongoTrustAccidentReportRepository.d.ts.map