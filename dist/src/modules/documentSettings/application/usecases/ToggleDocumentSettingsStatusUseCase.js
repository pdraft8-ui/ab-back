export class ToggleDocumentSettingsStatusUseCase {
    constructor(documentSettingsRepository, auditService) {
        this.documentSettingsRepository = documentSettingsRepository;
        this.auditService = auditService;
    }
    async execute(id, userId, userName) {
        try {
            if (!id) {
                throw new Error("Document settings ID is required");
            }
            // Get existing settings
            const existingSettings = await this.documentSettingsRepository.findById(id);
            if (!existingSettings) {
                throw new Error("Document settings not found");
            }
            // Store old value for audit
            const oldValue = existingSettings.toJSON();
            // Toggle the status
            const updatedSettings = await this.documentSettingsRepository.toggleStatus(id);
            // Log audit action
            await this.auditService.logAction({
                userId,
                userName,
                action: "TOGGLE_STATUS",
                entity: "DocumentSettings",
                entityId: id,
                oldValue,
                newValue: updatedSettings.toJSON(),
            });
            return updatedSettings;
        }
        catch (error) {
            console.error("ToggleDocumentSettingsStatusUseCase error:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=ToggleDocumentSettingsStatusUseCase.js.map