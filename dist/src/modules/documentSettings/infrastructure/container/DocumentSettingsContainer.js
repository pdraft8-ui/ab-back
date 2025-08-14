import { MongoDocumentSettingsRepository } from "../repositories/MongoDocumentSettingsRepository.js";
import { AuditService } from "../../../Audit/infrastructure/services/AuditService.js";
import { DocumentSettings } from "../../domain/entities/DocumentSettings.entity.js";
// Use cases
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
// Controllers
import { DocumentSettingsController } from "../../presentation/controllers/DocumentSettingsController.js";
// Routes
import { DocumentSettingsRoutes } from "../../presentation/routes/DocumentSettingsRoutes.js";
export class DocumentSettingsContainer {
    constructor() {
        this.documentSettingsRepository = new MongoDocumentSettingsRepository();
        this.auditService = new AuditService();
        // Initialize use cases
        this.createDocumentSettingsUseCase = new CreateDocumentSettingsUseCase(this.documentSettingsRepository, this.auditService);
        this.getAllDocumentSettingsUseCase = new GetAllDocumentSettingsUseCase(this.documentSettingsRepository);
        this.getDocumentSettingsByIdUseCase = new GetDocumentSettingsByIdUseCase(this.documentSettingsRepository);
        this.getDocumentSettingsByTypeUseCase =
            new GetDocumentSettingsByTypeUseCase(this.documentSettingsRepository);
        this.updateDocumentSettingsUseCase = new UpdateDocumentSettingsUseCase(this.documentSettingsRepository, this.auditService);
        this.deleteDocumentSettingsUseCase = new DeleteDocumentSettingsUseCase(this.documentSettingsRepository, this.auditService);
        this.toggleDocumentSettingsStatusUseCase =
            new ToggleDocumentSettingsStatusUseCase(this.documentSettingsRepository, this.auditService);
        this.uploadHeaderLogoUseCase = new UploadHeaderLogoUseCase(this.documentSettingsRepository, this.auditService);
        this.uploadFooterLogoUseCase = new UploadFooterLogoUseCase(this.documentSettingsRepository, this.auditService);
        this.uploadSignatureUseCase = new UploadSignatureUseCase(this.documentSettingsRepository, this.auditService);
        this.getDocumentSettingsStatsUseCase = new GetDocumentSettingsStatsUseCase(this.documentSettingsRepository);
        // Initialize controller
        this.documentSettingsController = new DocumentSettingsController(this.createDocumentSettingsUseCase, this.getAllDocumentSettingsUseCase, this.getDocumentSettingsByIdUseCase, this.getDocumentSettingsByTypeUseCase, this.updateDocumentSettingsUseCase, this.deleteDocumentSettingsUseCase, this.toggleDocumentSettingsStatusUseCase, this.uploadHeaderLogoUseCase, this.uploadFooterLogoUseCase, this.uploadSignatureUseCase, this.getDocumentSettingsStatsUseCase);
        // Initialize routes
        this.documentSettingsRoutes = new DocumentSettingsRoutes(this.documentSettingsController);
    }
    getDocumentSettingsRepository() {
        return this.documentSettingsRepository;
    }
    getAuditService() {
        return this.auditService;
    }
    getCreateDocumentSettingsUseCase() {
        return this.createDocumentSettingsUseCase;
    }
    getGetAllDocumentSettingsUseCase() {
        return this.getAllDocumentSettingsUseCase;
    }
    getGetDocumentSettingsByIdUseCase() {
        return this.getDocumentSettingsByIdUseCase;
    }
    getGetDocumentSettingsByTypeUseCase() {
        return this.getDocumentSettingsByTypeUseCase;
    }
    getUpdateDocumentSettingsUseCase() {
        return this.updateDocumentSettingsUseCase;
    }
    getDeleteDocumentSettingsUseCase() {
        return this.deleteDocumentSettingsUseCase;
    }
    getToggleDocumentSettingsStatusUseCase() {
        return this.toggleDocumentSettingsStatusUseCase;
    }
    getUploadHeaderLogoUseCase() {
        return this.uploadHeaderLogoUseCase;
    }
    getUploadFooterLogoUseCase() {
        return this.uploadFooterLogoUseCase;
    }
    getUploadSignatureUseCase() {
        return this.uploadSignatureUseCase;
    }
    getGetDocumentSettingsStatsUseCase() {
        return this.getDocumentSettingsStatsUseCase;
    }
    getDocumentSettingsController() {
        return this.documentSettingsController;
    }
    getDocumentSettingsRoutes() {
        return this.documentSettingsRoutes;
    }
}
export class DocumentSettingsContainerMinimal {
    constructor() {
        this.mockDocumentSettingsRepository = {
            create: async (data) => new DocumentSettings({ id: "mock-id", ...data }),
            findById: async (id) => new DocumentSettings({
                id,
                documentType: "invoice",
                createdBy: "mock-user",
            }),
            findByDocumentType: async (type) => new DocumentSettings({
                id: "mock-id",
                documentType: type,
                createdBy: "mock-user",
            }),
            findAll: async () => [
                new DocumentSettings({
                    id: "1",
                    documentType: "invoice",
                    createdBy: "mock-user",
                }),
                new DocumentSettings({
                    id: "2",
                    documentType: "receipt",
                    createdBy: "mock-user",
                }),
            ],
            findActive: async () => [
                new DocumentSettings({
                    id: "1",
                    documentType: "invoice",
                    isActive: true,
                    createdBy: "mock-user",
                }),
            ],
            update: async (id, data) => new DocumentSettings({ id, ...data }),
            delete: async (id) => true,
            toggleStatus: async (id) => new DocumentSettings({ id, isActive: false, createdBy: "mock-user" }),
            updateHeaderLogo: async (id, logoData) => new DocumentSettings({
                id,
                header: { logo: logoData },
                createdBy: "mock-user",
            }),
            updateFooterLogo: async (id, logoData) => new DocumentSettings({
                id,
                footer: { logo: logoData },
                createdBy: "mock-user",
            }),
            updateSignature: async (id, signatureData) => new DocumentSettings({
                id,
                footer: { signature: signatureData },
                createdBy: "mock-user",
            }),
            getStats: async () => ({ total: 2, active: 1, inactive: 1, byType: [] }),
            countSettings: async () => 2,
            findSettingsByCreator: async (creator) => [
                new DocumentSettings({
                    id: "1",
                    documentType: "invoice",
                    createdBy: creator,
                }),
            ],
        };
        this.mockAuditService = {
            logAction: async (data) => ({ success: true, message: "Audit logged" }),
        };
        // Initialize use cases with mock dependencies
        this.createDocumentSettingsUseCase = new CreateDocumentSettingsUseCase(this.mockDocumentSettingsRepository, this.mockAuditService);
        this.getAllDocumentSettingsUseCase = new GetAllDocumentSettingsUseCase(this.mockDocumentSettingsRepository);
        this.getDocumentSettingsByIdUseCase = new GetDocumentSettingsByIdUseCase(this.mockDocumentSettingsRepository);
        this.getDocumentSettingsByTypeUseCase =
            new GetDocumentSettingsByTypeUseCase(this.mockDocumentSettingsRepository);
        this.updateDocumentSettingsUseCase = new UpdateDocumentSettingsUseCase(this.mockDocumentSettingsRepository, this.mockAuditService);
        this.deleteDocumentSettingsUseCase = new DeleteDocumentSettingsUseCase(this.mockDocumentSettingsRepository, this.mockAuditService);
        this.toggleDocumentSettingsStatusUseCase =
            new ToggleDocumentSettingsStatusUseCase(this.mockDocumentSettingsRepository, this.mockAuditService);
        this.uploadHeaderLogoUseCase = new UploadHeaderLogoUseCase(this.mockDocumentSettingsRepository, this.mockAuditService);
        this.uploadFooterLogoUseCase = new UploadFooterLogoUseCase(this.mockDocumentSettingsRepository, this.mockAuditService);
        this.uploadSignatureUseCase = new UploadSignatureUseCase(this.mockDocumentSettingsRepository, this.mockAuditService);
        this.getDocumentSettingsStatsUseCase = new GetDocumentSettingsStatsUseCase(this.mockDocumentSettingsRepository);
        // Initialize controller
        this.documentSettingsController = new DocumentSettingsController(this.createDocumentSettingsUseCase, this.getAllDocumentSettingsUseCase, this.getDocumentSettingsByIdUseCase, this.getDocumentSettingsByTypeUseCase, this.updateDocumentSettingsUseCase, this.deleteDocumentSettingsUseCase, this.toggleDocumentSettingsStatusUseCase, this.uploadHeaderLogoUseCase, this.uploadFooterLogoUseCase, this.uploadSignatureUseCase, this.getDocumentSettingsStatsUseCase);
        // Initialize routes
        this.documentSettingsRoutes = new DocumentSettingsRoutes(this.documentSettingsController);
    }
    getMockDocumentSettingsRepository() {
        return this.mockDocumentSettingsRepository;
    }
    getMockAuditService() {
        return this.mockAuditService;
    }
    getCreateDocumentSettingsUseCase() {
        return this.createDocumentSettingsUseCase;
    }
    getGetAllDocumentSettingsUseCase() {
        return this.getAllDocumentSettingsUseCase;
    }
    getGetDocumentSettingsByIdUseCase() {
        return this.getDocumentSettingsByIdUseCase;
    }
    getGetDocumentSettingsByTypeUseCase() {
        return this.getDocumentSettingsByTypeUseCase;
    }
    getUpdateDocumentSettingsUseCase() {
        return this.updateDocumentSettingsUseCase;
    }
    getDeleteDocumentSettingsUseCase() {
        return this.deleteDocumentSettingsUseCase;
    }
    getToggleDocumentSettingsStatusUseCase() {
        return this.toggleDocumentSettingsStatusUseCase;
    }
    getUploadHeaderLogoUseCase() {
        return this.uploadHeaderLogoUseCase;
    }
    getUploadFooterLogoUseCase() {
        return this.uploadFooterLogoUseCase;
    }
    getUploadSignatureUseCase() {
        return this.uploadSignatureUseCase;
    }
    getGetDocumentSettingsStatsUseCase() {
        return this.getDocumentSettingsStatsUseCase;
    }
    getDocumentSettingsController() {
        return this.documentSettingsController;
    }
    getDocumentSettingsRoutes() {
        return this.documentSettingsRoutes;
    }
}
//# sourceMappingURL=DocumentSettingsContainer.js.map