export class UploadSignatureUseCase {
    constructor(documentSettingsRepository, auditService) {
        this.documentSettingsRepository = documentSettingsRepository;
        this.auditService = auditService;
    }
    async execute(documentType, signatureData, userId, userName) {
        try {
            if (!documentType) {
                throw new Error("Document type is required");
            }
            if (!signatureData || !signatureData.url) {
                throw new Error("Signature data with URL is required");
            }
            // Get existing settings
            const existingSettings = await this.documentSettingsRepository.findByDocumentType(documentType);
            if (!existingSettings) {
                throw new Error(`Document settings for ${documentType} not found`);
            }
            // Store old value for audit
            const oldValue = existingSettings.toJSON();
            // Update the signature
            const updatedSettings = await this.documentSettingsRepository.updateSignature(existingSettings.id, signatureData);
            // Log audit action
            await this.auditService.logAction({
                userId,
                userName,
                action: "UPLOAD_SIGNATURE",
                entity: "DocumentSettings",
                entityId: existingSettings.id,
                oldValue,
                newValue: updatedSettings.toJSON(),
            });
            return updatedSettings;
        }
        catch (error) {
            console.error("UploadSignatureUseCase error:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=UploadSignatureUseCase.js.map