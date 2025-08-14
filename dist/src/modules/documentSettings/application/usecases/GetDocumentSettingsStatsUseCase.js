export class GetDocumentSettingsStatsUseCase {
    constructor(documentSettingsRepository) {
        this.documentSettingsRepository = documentSettingsRepository;
    }
    async execute() {
        try {
            const stats = await this.documentSettingsRepository.getStats();
            return stats;
        }
        catch (error) {
            console.error("GetDocumentSettingsStatsUseCase error:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=GetDocumentSettingsStatsUseCase.js.map