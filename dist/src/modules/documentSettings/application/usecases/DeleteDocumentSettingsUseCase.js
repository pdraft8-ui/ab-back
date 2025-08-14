export class DeleteDocumentSettingsUseCase {
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
            // Delete the settings
            await this.documentSettingsRepository.delete(id);
            // Log audit action
            await this.auditService.logAction({
                userId,
                userName,
                action: "DELETE",
                entity: "DocumentSettings",
                entityId: id,
                oldValue,
            });
            return {
                success: true,
                message: "Document settings deleted successfully",
            };
        }
        catch (error) {
            console.error("DeleteDocumentSettingsUseCase error:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=DeleteDocumentSettingsUseCase.js.map