export class MongoTakafulAccidentReportRepository extends ITakafulAccidentReportRepository {
    create(accidentReportData: any): Promise<TakafulAccidentReport>;
    findById(id: any): Promise<TakafulAccidentReport>;
    findByCustomerId(customerId: any): Promise<TakafulAccidentReport[]>;
    findByPlateNumber(plateNumber: any): Promise<TakafulAccidentReport[]>;
    findAll(): Promise<TakafulAccidentReport[]>;
    update(id: any, accidentReportData: any): Promise<TakafulAccidentReport>;
    delete(id: any): Promise<TakafulAccidentReport>;
    getStats(): Promise<{
        totalReports: number;
        todayReports: number;
        weeklyReports: number;
        monthlyReports: number;
        reportsWithWitnesses: number;
        reportsWithPassengers: number;
        policeReported: number;
        averageReportsPerDay: number;
    }>;
    countAccidentReports(): Promise<number>;
    findByDateRange(startDate: any, endDate: any): Promise<TakafulAccidentReport[]>;
    findByAccidentType(accidentType: any): Promise<TakafulAccidentReport[]>;
    mapToTakafulAccidentReportEntity(accidentReportDoc: any): TakafulAccidentReport;
}
import { ITakafulAccidentReportRepository } from "../../domain/interfaces/ITakafulAccidentReportRepository.js";
import { TakafulAccidentReport } from "../../domain/entities/TakafulAccidentReport.entity.js";
//# sourceMappingURL=MongoTakafulAccidentReportRepository.d.ts.map