export class GetAllTakafulAccidentReportsUseCase {
  constructor(takafulAccidentReportRepository) {
    this.takafulAccidentReportRepository = takafulAccidentReportRepository;
  }

  async execute() {
    try {
      const accidentReports =
        await this.takafulAccidentReportRepository.findAll();
      return accidentReports;
    } catch (error) {
      console.error("GetAllTakafulAccidentReportsUseCase error:", error);
      throw error;
    }
  }
}
