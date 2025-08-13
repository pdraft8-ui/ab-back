export class GetPalestineAccidentReportByIdUseCase {
  constructor({ palestineAccidentReportRepository }) {
    this.palestineAccidentReportRepository = palestineAccidentReportRepository;
  }

  async execute(id) {
    try {
      if (!id) {
        throw new Error("Accident report ID is required");
      }

      const accidentReport =
        await this.palestineAccidentReportRepository.findById(id);

      if (!accidentReport) {
        throw new Error("Accident report not found");
      }

      return accidentReport;
    } catch (error) {
      throw new Error(
        `GetPalestineAccidentReportByIdUseCase error: ${error.message}`
      );
    }
  }
}
