export class TakafulAccidentReportController {
  constructor(
    createTakafulAccidentReportUseCase,
    getAllTakafulAccidentReportsUseCase,
    getTakafulAccidentReportByIdUseCase,
    deleteTakafulAccidentReportUseCase,
    getTakafulAccidentReportStatsUseCase
  ) {
    this.createTakafulAccidentReportUseCase =
      createTakafulAccidentReportUseCase;
    this.getAllTakafulAccidentReportsUseCase =
      getAllTakafulAccidentReportsUseCase;
    this.getTakafulAccidentReportByIdUseCase =
      getTakafulAccidentReportByIdUseCase;
    this.deleteTakafulAccidentReportUseCase =
      deleteTakafulAccidentReportUseCase;
    this.getTakafulAccidentReportStatsUseCase =
      getTakafulAccidentReportStatsUseCase;
  }

  async addAccidentReport(req, res) {
    try {
      const { plateNumber } = req.params;
      const accidentReportData = req.body;
      const userId = req.user._id;
      const userName = req.user.name || req.user.email;

      const createdAccidentReport =
        await this.createTakafulAccidentReportUseCase.execute(
          accidentReportData,
          plateNumber,
          userId,
          userName
        );

      res.status(201).json({
        success: true,
        message: "Accident report added successfully",
        data: createdAccidentReport,
      });
    } catch (error) {
      console.error(
        "TakafulAccidentReportController addAccidentReport error:",
        error
      );
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAllAccidentReports(req, res) {
    try {
      const accidentReports =
        await this.getAllTakafulAccidentReportsUseCase.execute();

      res.status(200).json({
        success: true,
        message: "Success",
        data: accidentReports || [],
      });
    } catch (error) {
      console.error(
        "TakafulAccidentReportController getAllAccidentReports error:",
        error
      );
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching accident reports",
        errors: [error.message],
      });
    }
  }

  async findById(req, res) {
    try {
      const { id } = req.params;

      const accidentReport =
        await this.getTakafulAccidentReportByIdUseCase.execute(id);

      res.status(200).json({
        success: true,
        message: "Success",
        data: accidentReport,
      });
    } catch (error) {
      console.error("TakafulAccidentReportController findById error:", error);
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteAccidentReport(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user._id;
      const userName = req.user.name || req.user.email;

      const deletedAccidentReport =
        await this.deleteTakafulAccidentReportUseCase.execute(
          id,
          userId,
          userName
        );

      res.status(200).json({
        success: true,
        message: "Accident report deleted successfully",
        data: deletedAccidentReport,
      });
    } catch (error) {
      console.error(
        "TakafulAccidentReportController deleteAccidentReport error:",
        error
      );
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAccidentReportStats(req, res) {
    try {
      const stats = await this.getTakafulAccidentReportStatsUseCase.execute();

      res.status(200).json({
        success: true,
        message: "Accident report statistics retrieved successfully",
        data: stats,
      });
    } catch (error) {
      console.error(
        "TakafulAccidentReportController getAccidentReportStats error:",
        error
      );
      res.status(500).json({
        success: false,
        message: "Failed to retrieve accident report statistics",
      });
    }
  }
}
