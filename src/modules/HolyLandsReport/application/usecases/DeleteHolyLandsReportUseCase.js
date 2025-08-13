export class DeleteHolyLandsReportUseCase {
  constructor({
    holyLandsReportRepository,
    auditService,
    notificationService,
  }) {
    this.holyLandsReportRepository = holyLandsReportRepository;
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
        await this.holyLandsReportRepository.findById(id);
      if (!existingAccidentReport) {
        throw new Error("Accident report not found");
      }

      // Delete the accident report
      await this.holyLandsReportRepository.delete(id);

      // Send notification
      await this.notificationService.sendNotification({
        type: "HOLY_LANDS_REPORT_DELETED",
        recipientId: existingAccidentReport.getCustomerId(),
        title: "Holy Lands Accident Report Deleted",
        message: `Holy Lands accident report for vehicle ${
          existingAccidentReport.getVehicleDetails().plateNumber
        } has been deleted`,
        data: {
          accidentReportId: existingAccidentReport.getId(),
          plateNumber: existingAccidentReport.getVehicleDetails().plateNumber,
        },
      });

      // Log audit action
      await this.auditService.logAction({
        userId,
        userName,
        action: "DELETE_HOLY_LANDS_REPORT",
        entity: "HolyLandsReport",
        entityId: existingAccidentReport.getId(),
        oldValue: existingAccidentReport.toJSON(),
        newValue: null,
      });

      return { message: "Accident report deleted successfully" };
    } catch (error) {
      throw new Error(`DeleteHolyLandsReportUseCase error: ${error.message}`);
    }
  }
}
