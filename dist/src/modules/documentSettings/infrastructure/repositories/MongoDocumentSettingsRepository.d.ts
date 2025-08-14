export class MongoDocumentSettingsRepository extends IDocumentSettingsRepository {
    mapToDocumentSettingsEntity(settingsDoc: any): DocumentSettings;
    create(settingsData: any): Promise<DocumentSettings>;
    findById(id: any): Promise<DocumentSettings>;
    findByDocumentType(documentType: any): Promise<DocumentSettings>;
    findAll(): Promise<DocumentSettings[]>;
    findActive(): Promise<DocumentSettings[]>;
    update(id: any, settingsData: any): Promise<DocumentSettings>;
    delete(id: any): Promise<boolean>;
    toggleStatus(id: any): Promise<DocumentSettings>;
    updateHeaderLogo(id: any, logoData: any): Promise<DocumentSettings>;
    updateFooterLogo(id: any, logoData: any): Promise<DocumentSettings>;
    updateSignature(id: any, signatureData: any): Promise<DocumentSettings>;
    getStats(): Promise<{
        total: number;
        active: number;
        inactive: number;
        byType: any[];
    }>;
    countSettings(): Promise<number>;
    findSettingsByCreator(createdBy: any): Promise<DocumentSettings[]>;
}
import { IDocumentSettingsRepository } from "../../domain/interfaces/IDocumentSettingsRepository.js";
import { DocumentSettings } from "../../domain/entities/DocumentSettings.entity.js";
//# sourceMappingURL=MongoDocumentSettingsRepository.d.ts.map