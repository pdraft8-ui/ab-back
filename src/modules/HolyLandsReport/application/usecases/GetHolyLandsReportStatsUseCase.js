export class GetHolyLandsReportStatsUseCase {
  constructor({ holyLandsReportRepository }) {
    this.holyLandsReportRepository = holyLandsReportRepository;
  }

  async execute() {
    try {
      const stats = await this.holyLandsReportRepository.getStats();
      return stats;
    } catch (error) {
      throw new Error(`GetHolyLandsReportStatsUseCase error: ${error.message}`);
    }
  }
}
