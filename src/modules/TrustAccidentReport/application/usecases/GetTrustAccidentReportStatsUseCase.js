export class GetTrustAccidentReportStatsUseCase {
  constructor(trustAccidentReportRepository) {
    this.trustAccidentReportRepository = trustAccidentReportRepository;
  }

  async execute() {
    try {
      const stats = await this.trustAccidentReportRepository.getStats();
      return stats;
    } catch (error) {
      throw new Error(
        `GetTrustAccidentReportStatsUseCase error: ${error.message}`
      );
    }
  }
}
