export class DeleteAlMashreqAccidentReportUseCase {
  constructor({
    alMashreqAccidentReportRepository,
    auditService,
    notificationService,
  }) {
    this.alMashreqAccidentReportRepository = alMashreqAccidentReportRepository;
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
        await this.alMashreqAccidentReportRepository.findById(id);
      if (!existingAccidentReport) {
        throw new Error("Accident report not found");
      }

      // Delete the accident report
      await this.alMashreqAccidentReportRepository.delete(id);

      // Send notification
      await this.notificationService.sendNotification({
        type: "AL_MASHREQ_ACCIDENT_REPORT_DELETED",
        recipientId: existingAccidentReport.getCustomerId(),
        title: "Al-Mashreq Accident Report Deleted",
        message: `Al-Mashreq accident report for vehicle ${
          existingAccidentReport.getVehicle().registrationNumber
        } has been deleted`,
        data: {
          accidentReportId: existingAccidentReport.getId(),
          plateNumber: existingAccidentReport.getVehicle().registrationNumber,
        },
      });

      // Log audit action
      await this.auditService.logAction({
        userId,
        userName,
        action: "DELETE_AL_MASHREQ_ACCIDENT_REPORT",
        entity: "AlMashreqAccidentReport",
        entityId: existingAccidentReport.getId(),
        oldValue: existingAccidentReport.toJSON(),
        newValue: null,
      });

      return { message: "Accident report deleted successfully" };
    } catch (error) {
      throw new Error(
        `DeleteAlMashreqAccidentReportUseCase error: ${error.message}`
      );
    }
  }
}
