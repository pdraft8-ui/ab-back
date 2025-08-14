export class GetTrustAccidentReportByIdUseCase {
    constructor(trustAccidentReportRepository) {
        this.trustAccidentReportRepository = trustAccidentReportRepository;
    }
    async execute(id) {
        try {
            if (!id) {
                throw new Error("Accident report ID is required");
            }
            const accidentReport = await this.trustAccidentReportRepository.findById(id);
            if (!accidentReport) {
                throw new Error("Accident report not found");
            }
            return accidentReport;
        }
        catch (error) {
            throw new Error(`GetTrustAccidentReportByIdUseCase error: ${error.message}`);
        }
    }
}
//# sourceMappingURL=GetTrustAccidentReportByIdUseCase.js.map