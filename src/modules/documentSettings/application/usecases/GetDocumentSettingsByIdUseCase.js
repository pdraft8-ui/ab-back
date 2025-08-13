export class GetDocumentSettingsByIdUseCase {
  constructor(documentSettingsRepository) {
    this.documentSettingsRepository = documentSettingsRepository;
  }

  async execute(id) {
    try {
      if (!id) {
        throw new Error("Document settings ID is required");
      }

      const settings = await this.documentSettingsRepository.findById(id);
      if (!settings) {
        throw new Error("Document settings not found");
      }

      return settings;
    } catch (error) {
      console.error("GetDocumentSettingsByIdUseCase error:", error);
      throw error;
    }
  }
}
