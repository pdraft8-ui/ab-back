export class GetDocumentSettingsByTypeUseCase {
    constructor(documentSettingsRepository) {
        this.documentSettingsRepository = documentSettingsRepository;
    }
    async execute(documentType) {
        try {
            if (!documentType) {
                throw new Error("Document type is required");
            }
            const settings = await this.documentSettingsRepository.findByDocumentType(documentType);
            if (!settings) {
                throw new Error(`Document settings for ${documentType} not found`);
            }
            return settings;
        }
        catch (error) {
            console.error("GetDocumentSettingsByTypeUseCase error:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=GetDocumentSettingsByTypeUseCase.js.map