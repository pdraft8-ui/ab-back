import { DocumentSettings } from "../../domain/entities/DocumentSettings.entity.js";
export class CreateDocumentSettingsUseCase {
    constructor(documentSettingsRepository, auditService) {
        this.documentSettingsRepository = documentSettingsRepository;
        this.auditService = auditService;
    }
    async execute(settingsData, userId, userName) {
        try {
            const settings = new DocumentSettings(settingsData);
            if (!settings.isValid()) {
                throw new Error("Invalid document settings data. Document type and creator are required.");
            }
            // Check if settings already exist for this document type
            const existingSettings = await this.documentSettingsRepository.findByDocumentType(settings.documentType);
            if (existingSettings) {
                throw new Error(`Document settings for ${settings.documentType} already exist`);
            }
            // Create the settings
            const createdSettings = await this.documentSettingsRepository.create({
                ...settingsData,
                createdBy: userId,
            });
            // Log audit action
            await this.auditService.logAction({
                userId,
                userName,
                action: "CREATE",
                entity: "DocumentSettings",
                entityId: createdSettings.id,
                newValue: createdSettings.toJSON(),
            });
            return createdSettings;
        }
        catch (error) {
            console.error("CreateDocumentSettingsUseCase error:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=CreateDocumentSettingsUseCase.js.map