export class GetAllPalestineAccidentReportsUseCase {
  constructor({ palestineAccidentReportRepository }) {
    this.palestineAccidentReportRepository = palestineAccidentReportRepository;
  }

  async execute() {
    try {
      const accidentReports =
        await this.palestineAccidentReportRepository.findAll();
      return accidentReports;
    } catch (error) {
      throw new Error(
        `GetAllPalestineAccidentReportsUseCase error: ${error.message}`
      );
    }
  }
}
