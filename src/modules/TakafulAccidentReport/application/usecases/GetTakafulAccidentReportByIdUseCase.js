export class GetTakafulAccidentReportByIdUseCase {
  constructor(takafulAccidentReportRepository) {
    this.takafulAccidentReportRepository = takafulAccidentReportRepository;
  }

  async execute(id) {
    try {
      if (!id) {
        throw new Error("Accident report ID is required");
      }

      const accidentReport =
        await this.takafulAccidentReportRepository.findById(id);

      if (!accidentReport) {
        throw new Error("Accident report not found");
      }

      return accidentReport;
    } catch (error) {
      console.error("GetTakafulAccidentReportByIdUseCase error:", error);
      throw error;
    }
  }
}
