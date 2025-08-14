export class GetHolyLandsReportByIdUseCase {
    constructor({ holyLandsReportRepository }) {
        this.holyLandsReportRepository = holyLandsReportRepository;
    }
    async execute(id) {
        try {
            if (!id) {
                throw new Error("Accident report ID is required");
            }
            const accidentReport = await this.holyLandsReportRepository.findById(id);
            if (!accidentReport) {
                throw new Error("Accident report not found");
            }
            return accidentReport;
        }
        catch (error) {
            throw new Error(`GetHolyLandsReportByIdUseCase error: ${error.message}`);
        }
    }
}
//# sourceMappingURL=GetHolyLandsReportByIdUseCase.js.map