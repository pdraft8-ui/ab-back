export class IDocumentSettingsRepository {
    create(settingsData: any): Promise<void>;
    findById(id: any): Promise<void>;
    findByDocumentType(documentType: any): Promise<void>;
    findAll(): Promise<void>;
    findActive(): Promise<void>;
    update(id: any, settingsData: any): Promise<void>;
    delete(id: any): Promise<void>;
    toggleStatus(id: any): Promise<void>;
    updateHeaderLogo(id: any, logoData: any): Promise<void>;
    updateFooterLogo(id: any, logoData: any): Promise<void>;
    updateSignature(id: any, signatureData: any): Promise<void>;
    getStats(): Promise<void>;
    countSettings(): Promise<void>;
    findSettingsByCreator(createdBy: any): Promise<void>;
}
//# sourceMappingURL=IDocumentSettingsRepository.d.ts.map