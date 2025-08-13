export class AlMashreqAccidentReportController {
  constructor({
    createAlMashreqAccidentReportUseCase,
    getAllAlMashreqAccidentReportsUseCase,
    getAlMashreqAccidentReportByIdUseCase,
    deleteAlMashreqAccidentReportUseCase,
    getAlMashreqAccidentReportStatsUseCase,
  }) {
    this.createAlMashreqAccidentReportUseCase =
      createAlMashreqAccidentReportUseCase;
    this.getAllAlMashreqAccidentReportsUseCase =
      getAllAlMashreqAccidentReportsUseCase;
    this.getAlMashreqAccidentReportByIdUseCase =
      getAlMashreqAccidentReportByIdUseCase;
    this.deleteAlMashreqAccidentReportUseCase =
      deleteAlMashreqAccidentReportUseCase;
    this.getAlMashreqAccidentReportStatsUseCase =
      getAlMashreqAccidentReportStatsUseCase;
  }

  async addAccidentReport(req, res) {
    try {
      const { plateNumber } = req.params;
      const accidentData = req.body;
      const userId = req.user?.id;
      const userName = req.user?.fullName || "Unknown User";

      const accidentReport =
        await this.createAlMashreqAccidentReportUseCase.execute(
          accidentData,
          plateNumber,
          userId,
          userName
        );

      res.status(201).json({
        success: true,
        message: "Accident report created successfully",
        data: accidentReport.toJSON(),
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAllAccidentReports(req, res) {
    try {
      const accidentReports =
        await this.getAllAlMashreqAccidentReportsUseCase.execute();

      res.status(200).json({
        success: true,
        message: "Accident reports retrieved successfully",
        data: accidentReports.map((report) => report.toJSON()),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async findById(req, res) {
    try {
      const { id } = req.params;

      const accidentReport =
        await this.getAlMashreqAccidentReportByIdUseCase.execute(id);

      res.status(200).json({
        success: true,
        message: "Accident report retrieved successfully",
        data: accidentReport.toJSON(),
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteAccidentReport(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;
      const userName = req.user?.fullName || "Unknown User";

      const result = await this.deleteAlMashreqAccidentReportUseCase.execute(
        id,
        userId,
        userName
      );

      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAccidentReportStats(req, res) {
    try {
      const stats = await this.getAlMashreqAccidentReportStatsUseCase.execute();

      res.status(200).json({
        success: true,
        message: "Accident report statistics retrieved successfully",
        data: stats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
