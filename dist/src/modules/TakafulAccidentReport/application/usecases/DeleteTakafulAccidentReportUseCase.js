export class DeleteTakafulAccidentReportUseCase {
    constructor(takafulAccidentReportRepository, auditService, notificationService) {
        this.takafulAccidentReportRepository = takafulAccidentReportRepository;
        this.auditService = auditService;
        this.notificationService = notificationService;
    }
    async execute(id, userId, userName) {
        try {
            if (!id) {
                throw new Error("Accident report ID is required");
            }
            // Check if accident report exists
            const existingAccidentReport = await this.takafulAccidentReportRepository.findById(id);
            if (!existingAccidentReport) {
                throw new Error("Accident report not found");
            }
            // Delete the accident report
            const deletedAccidentReport = await this.takafulAccidentReportRepository.delete(id);
            if (!deletedAccidentReport) {
                throw new Error("Failed to delete accident report");
            }
            // Send notification
            await this.notificationService.sendNotification({
                senderId: userId,
                message: `${userName} deleted takaful accident report`,
                recipients: [existingAccidentReport.customerId],
            });
            // Log audit action
            await this.auditService.logAction("DELETE_TAKAFUL_ACCIDENT_REPORT", `Deleted takaful accident report: ${existingAccidentReport.accidentInfo?.accidentType || "Unknown"}`, userId, userName, existingAccidentReport, null);
            return deletedAccidentReport;
        }
        catch (error) {
            console.error("DeleteTakafulAccidentReportUseCase error:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=DeleteTakafulAccidentReportUseCase.js.map