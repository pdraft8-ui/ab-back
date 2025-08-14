export class DocumentSettingsContainer {
    documentSettingsRepository: MongoDocumentSettingsRepository;
    auditService: AuditService;
    createDocumentSettingsUseCase: CreateDocumentSettingsUseCase;
    getAllDocumentSettingsUseCase: GetAllDocumentSettingsUseCase;
    getDocumentSettingsByIdUseCase: GetDocumentSettingsByIdUseCase;
    getDocumentSettingsByTypeUseCase: GetDocumentSettingsByTypeUseCase;
    updateDocumentSettingsUseCase: UpdateDocumentSettingsUseCase;
    deleteDocumentSettingsUseCase: DeleteDocumentSettingsUseCase;
    toggleDocumentSettingsStatusUseCase: ToggleDocumentSettingsStatusUseCase;
    uploadHeaderLogoUseCase: UploadHeaderLogoUseCase;
    uploadFooterLogoUseCase: UploadFooterLogoUseCase;
    uploadSignatureUseCase: UploadSignatureUseCase;
    getDocumentSettingsStatsUseCase: GetDocumentSettingsStatsUseCase;
    documentSettingsController: DocumentSettingsController;
    documentSettingsRoutes: DocumentSettingsRoutes;
    getDocumentSettingsRepository(): MongoDocumentSettingsRepository;
    getAuditService(): AuditService;
    getCreateDocumentSettingsUseCase(): CreateDocumentSettingsUseCase;
    getGetAllDocumentSettingsUseCase(): GetAllDocumentSettingsUseCase;
    getGetDocumentSettingsByIdUseCase(): GetDocumentSettingsByIdUseCase;
    getGetDocumentSettingsByTypeUseCase(): GetDocumentSettingsByTypeUseCase;
    getUpdateDocumentSettingsUseCase(): UpdateDocumentSettingsUseCase;
    getDeleteDocumentSettingsUseCase(): DeleteDocumentSettingsUseCase;
    getToggleDocumentSettingsStatusUseCase(): ToggleDocumentSettingsStatusUseCase;
    getUploadHeaderLogoUseCase(): UploadHeaderLogoUseCase;
    getUploadFooterLogoUseCase(): UploadFooterLogoUseCase;
    getUploadSignatureUseCase(): UploadSignatureUseCase;
    getGetDocumentSettingsStatsUseCase(): GetDocumentSettingsStatsUseCase;
    getDocumentSettingsController(): DocumentSettingsController;
    getDocumentSettingsRoutes(): DocumentSettingsRoutes;
}
export class DocumentSettingsContainerMinimal {
    mockDocumentSettingsRepository: {
        create: (data: any) => Promise<DocumentSettings>;
        findById: (id: any) => Promise<DocumentSettings>;
        findByDocumentType: (type: any) => Promise<DocumentSettings>;
        findAll: () => Promise<DocumentSettings[]>;
        findActive: () => Promise<DocumentSettings[]>;
        update: (id: any, data: any) => Promise<DocumentSettings>;
        delete: (id: any) => Promise<boolean>;
        toggleStatus: (id: any) => Promise<DocumentSettings>;
        updateHeaderLogo: (id: any, logoData: any) => Promise<DocumentSettings>;
        updateFooterLogo: (id: any, logoData: any) => Promise<DocumentSettings>;
        updateSignature: (id: any, signatureData: any) => Promise<DocumentSettings>;
        getStats: () => Promise<{
            total: number;
            active: number;
            inactive: number;
            byType: any[];
        }>;
        countSettings: () => Promise<number>;
        findSettingsByCreator: (creator: any) => Promise<DocumentSettings[]>;
    };
    mockAuditService: {
        logAction: (data: any) => Promise<{
            success: boolean;
            message: string;
        }>;
    };
    createDocumentSettingsUseCase: CreateDocumentSettingsUseCase;
    getAllDocumentSettingsUseCase: GetAllDocumentSettingsUseCase;
    getDocumentSettingsByIdUseCase: GetDocumentSettingsByIdUseCase;
    getDocumentSettingsByTypeUseCase: GetDocumentSettingsByTypeUseCase;
    updateDocumentSettingsUseCase: UpdateDocumentSettingsUseCase;
    deleteDocumentSettingsUseCase: DeleteDocumentSettingsUseCase;
    toggleDocumentSettingsStatusUseCase: ToggleDocumentSettingsStatusUseCase;
    uploadHeaderLogoUseCase: UploadHeaderLogoUseCase;
    uploadFooterLogoUseCase: UploadFooterLogoUseCase;
    uploadSignatureUseCase: UploadSignatureUseCase;
    getDocumentSettingsStatsUseCase: GetDocumentSettingsStatsUseCase;
    documentSettingsController: DocumentSettingsController;
    documentSettingsRoutes: DocumentSettingsRoutes;
    getMockDocumentSettingsRepository(): {
        create: (data: any) => Promise<DocumentSettings>;
        findById: (id: any) => Promise<DocumentSettings>;
        findByDocumentType: (type: any) => Promise<DocumentSettings>;
        findAll: () => Promise<DocumentSettings[]>;
        findActive: () => Promise<DocumentSettings[]>;
        update: (id: any, data: any) => Promise<DocumentSettings>;
        delete: (id: any) => Promise<boolean>;
        toggleStatus: (id: any) => Promise<DocumentSettings>;
        updateHeaderLogo: (id: any, logoData: any) => Promise<DocumentSettings>;
        updateFooterLogo: (id: any, logoData: any) => Promise<DocumentSettings>;
        updateSignature: (id: any, signatureData: any) => Promise<DocumentSettings>;
        getStats: () => Promise<{
            total: number;
            active: number;
            inactive: number;
            byType: any[];
        }>;
        countSettings: () => Promise<number>;
        findSettingsByCreator: (creator: any) => Promise<DocumentSettings[]>;
    };
    getMockAuditService(): {
        logAction: (data: any) => Promise<{
            success: boolean;
            message: string;
        }>;
    };
    getCreateDocumentSettingsUseCase(): CreateDocumentSettingsUseCase;
    getGetAllDocumentSettingsUseCase(): GetAllDocumentSettingsUseCase;
    getGetDocumentSettingsByIdUseCase(): GetDocumentSettingsByIdUseCase;
    getGetDocumentSettingsByTypeUseCase(): GetDocumentSettingsByTypeUseCase;
    getUpdateDocumentSettingsUseCase(): UpdateDocumentSettingsUseCase;
    getDeleteDocumentSettingsUseCase(): DeleteDocumentSettingsUseCase;
    getToggleDocumentSettingsStatusUseCase(): ToggleDocumentSettingsStatusUseCase;
    getUploadHeaderLogoUseCase(): UploadHeaderLogoUseCase;
    getUploadFooterLogoUseCase(): UploadFooterLogoUseCase;
    getUploadSignatureUseCase(): UploadSignatureUseCase;
    getGetDocumentSettingsStatsUseCase(): GetDocumentSettingsStatsUseCase;
    getDocumentSettingsController(): DocumentSettingsController;
    getDocumentSettingsRoutes(): DocumentSettingsRoutes;
}
import { MongoDocumentSettingsRepository } from "../repositories/MongoDocumentSettingsRepository.js";
import { AuditService } from "../../../Audit/infrastructure/services/AuditService.js";
import { CreateDocumentSettingsUseCase } from "../../application/usecases/CreateDocumentSettingsUseCase.js";
import { GetAllDocumentSettingsUseCase } from "../../application/usecases/GetAllDocumentSettingsUseCase.js";
import { GetDocumentSettingsByIdUseCase } from "../../application/usecases/GetDocumentSettingsByIdUseCase.js";
import { GetDocumentSettingsByTypeUseCase } from "../../application/usecases/GetDocumentSettingsByTypeUseCase.js";
import { UpdateDocumentSettingsUseCase } from "../../application/usecases/UpdateDocumentSettingsUseCase.js";
import { DeleteDocumentSettingsUseCase } from "../../application/usecases/DeleteDocumentSettingsUseCase.js";
import { ToggleDocumentSettingsStatusUseCase } from "../../application/usecases/ToggleDocumentSettingsStatusUseCase.js";
import { UploadHeaderLogoUseCase } from "../../application/usecases/UploadHeaderLogoUseCase.js";
import { UploadFooterLogoUseCase } from "../../application/usecases/UploadFooterLogoUseCase.js";
import { UploadSignatureUseCase } from "../../application/usecases/UploadSignatureUseCase.js";
import { GetDocumentSettingsStatsUseCase } from "../../application/usecases/GetDocumentSettingsStatsUseCase.js";
import { DocumentSettingsController } from "../../presentation/controllers/DocumentSettingsController.js";
import { DocumentSettingsRoutes } from "../../presentation/routes/DocumentSettingsRoutes.js";
import { DocumentSettings } from "../../domain/entities/DocumentSettings.entity.js";
//# sourceMappingURL=DocumentSettingsContainer.d.ts.map