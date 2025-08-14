export class IAlAhliaAccidentRepository {
    create(alAhliaAccident: any): Promise<void>;
    findById(id: any): Promise<void>;
    findByCustomerId(customerId: any): Promise<void>;
    findByPlateNumber(plateNumber: any): Promise<void>;
    findAll(): Promise<void>;
    update(id: any, alAhliaAccident: any): Promise<void>;
    delete(id: any): Promise<void>;
    getStats(): Promise<void>;
    countAccidentReports(): Promise<void>;
    findByDateRange(startDate: any, endDate: any): Promise<void>;
    findByAccidentType(accidentType: any): Promise<void>;
}
//# sourceMappingURL=IAlAhliaAccidentRepository.d.ts.map