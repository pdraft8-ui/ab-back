export class GetAlMashreqAccidentReportByIdUseCase {
  constructor({ alMashreqAccidentReportRepository }) {
    this.alMashreqAccidentReportRepository = alMashreqAccidentReportRepository;
  }

  async execute(id) {
    try {
      if (!id) {
        throw new Error("Accident report ID is required");
      }

      const accidentReport =
        await this.alMashreqAccidentReportRepository.findById(id);

      if (!accidentReport) {
        throw new Error("Accident report not found");
      }

      return accidentReport;
    } catch (error) {
      throw new Error(
        `GetAlMashreqAccidentReportByIdUseCase error: ${error.message}`
      );
    }
  }
}
