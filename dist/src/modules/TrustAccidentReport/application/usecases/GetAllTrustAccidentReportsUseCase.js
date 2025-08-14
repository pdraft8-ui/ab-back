export class GetAllTrustAccidentReportsUseCase {
    constructor(trustAccidentReportRepository) {
        this.trustAccidentReportRepository = trustAccidentReportRepository;
    }
    async execute() {
        try {
            const accidentReports = await this.trustAccidentReportRepository.findAll();
            return accidentReports || [];
        }
        catch (error) {
            throw new Error(`GetAllTrustAccidentReportsUseCase error: ${error.message}`);
        }
    }
}
//# sourceMappingURL=GetAllTrustAccidentReportsUseCase.js.map