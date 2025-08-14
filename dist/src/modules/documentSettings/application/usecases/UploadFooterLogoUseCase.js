export class UploadFooterLogoUseCase {
    constructor(documentSettingsRepository, auditService) {
        this.documentSettingsRepository = documentSettingsRepository;
        this.auditService = auditService;
    }
    async execute(documentType, logoData, userId, userName) {
        try {
            if (!documentType) {
                throw new Error("Document type is required");
            }
            if (!logoData || !logoData.url) {
                throw new Error("Logo data with URL is required");
            }
            // Get existing settings
            const existingSettings = await this.documentSettingsRepository.findByDocumentType(documentType);
            if (!existingSettings) {
                throw new Error(`Document settings for ${documentType} not found`);
            }
            // Store old value for audit
            const oldValue = existingSettings.toJSON();
            // Update the footer logo
            const updatedSettings = await this.documentSettingsRepository.updateFooterLogo(existingSettings.id, logoData);
            // Log audit action
            await this.auditService.logAction({
                userId,
                userName,
                action: "UPLOAD_FOOTER_LOGO",
                entity: "DocumentSettings",
                entityId: existingSettings.id,
                oldValue,
                newValue: updatedSettings.toJSON(),
            });
            return updatedSettings;
        }
        catch (error) {
            console.error("UploadFooterLogoUseCase error:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=UploadFooterLogoUseCase.js.map