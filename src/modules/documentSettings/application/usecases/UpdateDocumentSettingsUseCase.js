export class UpdateDocumentSettingsUseCase {
  constructor(documentSettingsRepository, auditService) {
    this.documentSettingsRepository = documentSettingsRepository;
    this.auditService = auditService;
  }

  async execute(id, settingsData, userId, userName) {
    try {
      if (!id) {
        throw new Error("Document settings ID is required");
      }

      // Get existing settings
      const existingSettings = await this.documentSettingsRepository.findById(
        id
      );
      if (!existingSettings) {
        throw new Error("Document settings not found");
      }

      // Store old value for audit
      const oldValue = existingSettings.toJSON();

      // Update the settings
      const updatedSettings = await this.documentSettingsRepository.update(id, {
        ...settingsData,
        updatedBy: userId,
      });

      // Log audit action
      await this.auditService.logAction({
        userId,
        userName,
        action: "UPDATE",
        entity: "DocumentSettings",
        entityId: id,
        oldValue,
        newValue: updatedSettings.toJSON(),
      });

      return updatedSettings;
    } catch (error) {
      console.error("UpdateDocumentSettingsUseCase error:", error);
      throw error;
    }
  }
}
