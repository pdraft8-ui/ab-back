export class GetAllDocumentSettingsUseCase {
  constructor(documentSettingsRepository) {
    this.documentSettingsRepository = documentSettingsRepository;
  }

  async execute() {
    try {
      const settings = await this.documentSettingsRepository.findAll();
      return settings;
    } catch (error) {
      console.error("GetAllDocumentSettingsUseCase error:", error);
      throw error;
    }
  }
}
