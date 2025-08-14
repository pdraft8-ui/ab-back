export class GetAllHolyLandsReportsUseCase {
    constructor({ holyLandsReportRepository }) {
        this.holyLandsReportRepository = holyLandsReportRepository;
    }
    async execute() {
        try {
            const accidentReports = await this.holyLandsReportRepository.findAll();
            return accidentReports;
        }
        catch (error) {
            throw new Error(`GetAllHolyLandsReportsUseCase error: ${error.message}`);
        }
    }
}
//# sourceMappingURL=GetAllHolyLandsReportsUseCase.js.map