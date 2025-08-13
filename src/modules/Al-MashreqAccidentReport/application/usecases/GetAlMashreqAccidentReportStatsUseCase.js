export class GetAlMashreqAccidentReportStatsUseCase {
  constructor({ alMashreqAccidentReportRepository }) {
    this.alMashreqAccidentReportRepository = alMashreqAccidentReportRepository;
  }

  async execute() {
    try {
      const stats = await this.alMashreqAccidentReportRepository.getStats();
      return stats;
    } catch (error) {
      throw new Error(
        `GetAlMashreqAccidentReportStatsUseCase error: ${error.message}`
      );
    }
  }
}
