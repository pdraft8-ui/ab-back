export class GetAllAlMashreqAccidentReportsUseCase {
  constructor({ alMashreqAccidentReportRepository }) {
    this.alMashreqAccidentReportRepository = alMashreqAccidentReportRepository;
  }

  async execute() {
    try {
      const accidentReports =
        await this.alMashreqAccidentReportRepository.findAll();
      return accidentReports;
    } catch (error) {
      throw new Error(
        `GetAllAlMashreqAccidentReportsUseCase error: ${error.message}`
      );
    }
  }
}
