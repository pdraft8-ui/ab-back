export class TrustAccidentReportController {
  constructor(
    createTrustAccidentReportUseCase,
    getAllTrustAccidentReportsUseCase,
    getTrustAccidentReportByIdUseCase,
    deleteTrustAccidentReportUseCase,
    getTrustAccidentReportStatsUseCase
  ) {
    this.createTrustAccidentReportUseCase = createTrustAccidentReportUseCase;
    this.getAllTrustAccidentReportsUseCase = getAllTrustAccidentReportsUseCase;
    this.getTrustAccidentReportByIdUseCase = getTrustAccidentReportByIdUseCase;
    this.deleteTrustAccidentReportUseCase = deleteTrustAccidentReportUseCase;
    this.getTrustAccidentReportStatsUseCase =
      getTrustAccidentReportStatsUseCase;
  }

  async addAccidentReport(req, res) {
    try {
      const { plateNumber } = req.params;
      const accidentReportData = req.body;
      const user = req.user;

      const result = await this.createTrustAccidentReportUseCase.execute(
        accidentReportData,
        plateNumber,
        user
      );

      return res.status(201).json({
        message: "Accident report added successfully",
        data: result.toJSON(),
      });
    } catch (error) {
      console.error("Add accident report error:", error);
      return res.status(500).json({
        message:
          error.message || "An error occurred while adding the accident report",
      });
    }
  }

  async getAllAccidentReports(req, res) {
    try {
      const accidentReports =
        await this.getAllTrustAccidentReportsUseCase.execute();

      return res.status(200).json({
        success: true,
        message: "Success",
        data: accidentReports.map((report) => report.toJSON()),
      });
    } catch (error) {
      console.error("Get all accident reports error:", error);
      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "An error occurred while retrieving accident reports",
        errors: [error.message],
      });
    }
  }

  async findById(req, res) {
    try {
      const { id } = req.params;
      const accidentReport =
        await this.getTrustAccidentReportByIdUseCase.execute(id);

      return res.status(200).json({
        message: "Success",
        data: accidentReport.toJSON(),
      });
    } catch (error) {
      console.error("Find accident report by ID error:", error);

      if (error.message.includes("not found")) {
        return res.status(404).json({
          message: error.message,
        });
      }

      return res.status(500).json({
        message:
          error.message ||
          "An error occurred while retrieving the accident report",
      });
    }
  }

  async deleteAccidentReport(req, res) {
    try {
      const { id } = req.params;
      const user = req.user;

      const result = await this.deleteTrustAccidentReportUseCase.execute(
        id,
        user
      );

      return res.status(200).json({
        message: result.message,
      });
    } catch (error) {
      console.error("Delete accident report error:", error);

      if (error.message.includes("not found")) {
        return res.status(404).json({
          message: error.message,
        });
      }

      return res.status(500).json({
        message:
          error.message ||
          "An error occurred while deleting the accident report",
      });
    }
  }

  async getAccidentReportStats(req, res) {
    try {
      const stats = await this.getTrustAccidentReportStatsUseCase.execute();

      return res.status(200).json({
        success: true,
        message: "Statistics retrieved successfully",
        data: stats,
      });
    } catch (error) {
      console.error("Get accident report stats error:", error);
      return res.status(500).json({
        success: false,
        message:
          error.message || "An error occurred while retrieving statistics",
        errors: [error.message],
      });
    }
  }
}
