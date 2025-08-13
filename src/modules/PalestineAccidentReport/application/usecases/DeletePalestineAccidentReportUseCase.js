export class DeletePalestineAccidentReportUseCase {
  constructor({
    palestineAccidentReportRepository,
    auditService,
    notificationService,
  }) {
    this.palestineAccidentReportRepository = palestineAccidentReportRepository;
    this.auditService = auditService;
    this.notificationService = notificationService;
  }

  async execute(id, userId, userName) {
    try {
      if (!id) {
        throw new Error("Accident report ID is required");
      }

      // Check if accident report exists
      const existingAccidentReport =
        await this.palestineAccidentReportRepository.findById(id);
      if (!existingAccidentReport) {
        throw new Error("Accident report not found");
      }

      // Delete the accident report
      await this.palestineAccidentReportRepository.delete(id);

      // Send notification
      await this.notificationService.sendNotification({
        type: "PALESTINE_ACCIDENT_REPORT_DELETED",
        recipientId: existingAccidentReport.getCustomerId(),
        title: "Palestine Accident Report Deleted",
        message: `Palestine accident report for vehicle ${
          existingAccidentReport.getVehicleInfo().vehicleNumber
        } has been deleted`,
        data: {
          accidentReportId: existingAccidentReport.getId(),
          plateNumber: existingAccidentReport.getVehicleInfo().vehicleNumber,
        },
      });

      // Log audit action
      await this.auditService.logAction({
        userId,
        userName,
        action: "DELETE_PALESTINE_ACCIDENT_REPORT",
        entity: "PalestineAccidentReport",
        entityId: existingAccidentReport.getId(),
        oldValue: existingAccidentReport.toJSON(),
        newValue: null,
      });

      return { message: "Accident report deleted successfully" };
    } catch (error) {
      throw new Error(
        `DeletePalestineAccidentReportUseCase error: ${error.message}`
      );
    }
  }
}
