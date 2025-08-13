export class IDocumentSettingsRepository {
  async create(settingsData) {
    throw new Error("Method 'create' must be implemented");
  }

  async findById(id) {
    throw new Error("Method 'findById' must be implemented");
  }

  async findByDocumentType(documentType) {
    throw new Error("Method 'findByDocumentType' must be implemented");
  }

  async findAll() {
    throw new Error("Method 'findAll' must be implemented");
  }

  async findActive() {
    throw new Error("Method 'findActive' must be implemented");
  }

  async update(id, settingsData) {
    throw new Error("Method 'update' must be implemented");
  }

  async delete(id) {
    throw new Error("Method 'delete' must be implemented");
  }

  async toggleStatus(id) {
    throw new Error("Method 'toggleStatus' must be implemented");
  }

  async updateHeaderLogo(id, logoData) {
    throw new Error("Method 'updateHeaderLogo' must be implemented");
  }

  async updateFooterLogo(id, logoData) {
    throw new Error("Method 'updateFooterLogo' must be implemented");
  }

  async updateSignature(id, signatureData) {
    throw new Error("Method 'updateSignature' must be implemented");
  }

  async getStats() {
    throw new Error("Method 'getStats' must be implemented");
  }

  async countSettings() {
    throw new Error("Method 'countSettings' must be implemented");
  }

  async findSettingsByCreator(createdBy) {
    throw new Error("Method 'findSettingsByCreator' must be implemented");
  }
}
