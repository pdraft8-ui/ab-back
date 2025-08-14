export class DeleteTrustAccidentReportUseCase {
    constructor(trustAccidentReportRepository, auditService, notificationService) {
        this.trustAccidentReportRepository = trustAccidentReportRepository;
        this.auditService = auditService;
        this.notificationService = notificationService;
    }
    async execute(id, user) {
        try {
            if (!id) {
                throw new Error("Accident report ID is required");
            }
            // Check if accident report exists
            const existingReport = await this.trustAccidentReportRepository.findById(id);
            if (!existingReport) {
                throw new Error("Accident report not found");
            }
            // Delete the accident report
            const deleted = await this.trustAccidentReportRepository.delete(id);
            if (!deleted) {
                throw new Error("Failed to delete accident report");
            }
            // Send notification
            const message = `${user.name} deleted trust accident report`;
            await this.notificationService.sendNotification({
                senderId: user._id,
                message,
            });
            // Log audit action
            await this.auditService.logAction({
                userId: user._id,
                userName: user.name,
                action: `User ${user.name} (ID: ${user._id}) deleted a Trust accident report`,
                entity: "TrustAccidentReport",
                entityId: id,
                oldValue: existingReport.toJSON(),
                newValue: null,
            });
            return { success: true, message: "Accident report deleted successfully" };
        }
        catch (error) {
            throw new Error(`DeleteTrustAccidentReportUseCase error: ${error.message}`);
        }
    }
}
//# sourceMappingURL=DeleteTrustAccidentReportUseCase.js.map