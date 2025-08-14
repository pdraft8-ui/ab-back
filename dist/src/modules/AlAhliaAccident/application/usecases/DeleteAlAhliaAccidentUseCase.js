export class DeleteAlAhliaAccidentUseCase {
    constructor({ alAhliaAccidentRepository, auditService, notificationService, }) {
        this.alAhliaAccidentRepository = alAhliaAccidentRepository;
        this.auditService = auditService;
        this.notificationService = notificationService;
    }
    async execute(id, userId, userName) {
        try {
            if (!id) {
                throw new Error("Accident report ID is required");
            }
            // Check if accident report exists
            const existingAccidentReport = await this.alAhliaAccidentRepository.findById(id);
            if (!existingAccidentReport) {
                throw new Error("Accident report not found");
            }
            // Delete the accident report
            await this.alAhliaAccidentRepository.delete(id);
            // Send notification
            await this.notificationService.sendNotification({
                type: "ACCIDENT_REPORT_DELETED",
                recipientId: existingAccidentReport.getCustomerId(),
                title: "Accident Report Deleted",
                message: `Accident report ${existingAccidentReport.getReportNumber()} has been deleted`,
                data: {
                    accidentReportId: existingAccidentReport.getId(),
                    reportNumber: existingAccidentReport.getReportNumber(),
                },
            });
            // Log audit action
            await this.auditService.logAction({
                userId,
                userName,
                action: "DELETE_AL_AHLIA_ACCIDENT_REPORT",
                entity: "AlAhliaAccident",
                entityId: existingAccidentReport.getId(),
                oldValue: existingAccidentReport.toJSON(),
                newValue: null,
            });
            return { message: "Accident report deleted successfully" };
        }
        catch (error) {
            throw new Error(`DeleteAlAhliaAccidentUseCase error: ${error.message}`);
        }
    }
}
//# sourceMappingURL=DeleteAlAhliaAccidentUseCase.js.map