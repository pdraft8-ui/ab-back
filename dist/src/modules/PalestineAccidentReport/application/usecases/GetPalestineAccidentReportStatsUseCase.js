export class GetPalestineAccidentReportStatsUseCase {
    constructor({ palestineAccidentReportRepository }) {
        this.palestineAccidentReportRepository = palestineAccidentReportRepository;
    }
    async execute() {
        try {
            const stats = await this.palestineAccidentReportRepository.getStats();
            return stats;
        }
        catch (error) {
            throw new Error(`GetPalestineAccidentReportStatsUseCase error: ${error.message}`);
        }
    }
}
//# sourceMappingURL=GetPalestineAccidentReportStatsUseCase.js.map