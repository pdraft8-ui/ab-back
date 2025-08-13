export class GetTakafulAccidentReportStatsUseCase {
  constructor(takafulAccidentReportRepository) {
    this.takafulAccidentReportRepository = takafulAccidentReportRepository;
  }

  async execute() {
    try {
      const stats = await this.takafulAccidentReportRepository.getStats();
      return stats;
    } catch (error) {
      console.error("GetTakafulAccidentReportStatsUseCase error:", error);
      throw error;
    }
  }
}
