import { Router } from "express";
import { auth } from "../../../../midlleWare/auth.js";
import { documentSettingsEndpoints } from "../../../documentSettings/documentSettings.endpoints.js";
import { myMulterImages, HME } from "../../../../Servicess/multer.js";
export class DocumentSettingsRoutes {
    constructor(documentSettingsController) {
        this.documentSettingsController = documentSettingsController;
        this.router = Router();
        this.setupRoutes();
    }
    setupRoutes() {
        // Create document settings
        this.router.post("/create", auth(documentSettingsEndpoints.createDocumentSettings.roles), this.documentSettingsController.createDocumentSettings.bind(this.documentSettingsController));
        // Get all document settings
        this.router.get("/", auth(documentSettingsEndpoints.getAllDocumentSettings.roles), this.documentSettingsController.getAllDocumentSettings.bind(this.documentSettingsController));
        // Get document settings by type
        this.router.get("/type/:documentType", auth(documentSettingsEndpoints.getDocumentSettingsByType.roles), this.documentSettingsController.getDocumentSettingsByType.bind(this.documentSettingsController));
        // Get document settings by ID
        this.router.get("/:id", auth(documentSettingsEndpoints.getDocumentSettingsById.roles), this.documentSettingsController.getDocumentSettingsById.bind(this.documentSettingsController));
        // Update document settings
        this.router.put("/:id", auth(documentSettingsEndpoints.updateDocumentSettings.roles), this.documentSettingsController.updateDocumentSettings.bind(this.documentSettingsController));
        // Delete document settings
        this.router.delete("/:id", auth(documentSettingsEndpoints.deleteDocumentSettings.roles), this.documentSettingsController.deleteDocumentSettings.bind(this.documentSettingsController));
        // Toggle document settings status
        this.router.patch("/:id/toggle", auth(documentSettingsEndpoints.toggleDocumentSettingsStatus.roles), this.documentSettingsController.toggleDocumentSettingsStatus.bind(this.documentSettingsController));
        // Upload header logo
        this.router.post("/:documentType/header-logo", auth(documentSettingsEndpoints.uploadHeaderLogo.roles), myMulterImages("uploads/document-settings/headers").single("logo"), HME, this.documentSettingsController.uploadHeaderLogo.bind(this.documentSettingsController));
        // Upload footer logo
        this.router.post("/:documentType/footer-logo", auth(documentSettingsEndpoints.uploadFooterLogo.roles), myMulterImages("uploads/document-settings/footers").single("logo"), HME, this.documentSettingsController.uploadFooterLogo.bind(this.documentSettingsController));
        // Upload signature
        this.router.post("/:documentType/signature", auth(documentSettingsEndpoints.uploadSignature.roles), myMulterImages("uploads/document-settings/signatures").single("signature"), HME, this.documentSettingsController.uploadSignature.bind(this.documentSettingsController));
        // Get document settings statistics
        this.router.get("/stats/overview", auth(["admin", "manager"]), this.documentSettingsController.getDocumentSettingsStats.bind(this.documentSettingsController));
    }
    getRouter() {
        return this.router;
    }
}
//# sourceMappingURL=DocumentSettingsRoutes.js.map