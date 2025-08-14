import localStorageService from "../../../../Servicess/localStorage.js";
export class DocumentSettingsController {
    constructor(createDocumentSettingsUseCase, getAllDocumentSettingsUseCase, getDocumentSettingsByIdUseCase, getDocumentSettingsByTypeUseCase, updateDocumentSettingsUseCase, deleteDocumentSettingsUseCase, toggleDocumentSettingsStatusUseCase, uploadHeaderLogoUseCase, uploadFooterLogoUseCase, uploadSignatureUseCase, getDocumentSettingsStatsUseCase) {
        this.createDocumentSettingsUseCase = createDocumentSettingsUseCase;
        this.getAllDocumentSettingsUseCase = getAllDocumentSettingsUseCase;
        this.getDocumentSettingsByIdUseCase = getDocumentSettingsByIdUseCase;
        this.getDocumentSettingsByTypeUseCase = getDocumentSettingsByTypeUseCase;
        this.updateDocumentSettingsUseCase = updateDocumentSettingsUseCase;
        this.deleteDocumentSettingsUseCase = deleteDocumentSettingsUseCase;
        this.toggleDocumentSettingsStatusUseCase =
            toggleDocumentSettingsStatusUseCase;
        this.uploadHeaderLogoUseCase = uploadHeaderLogoUseCase;
        this.uploadFooterLogoUseCase = uploadFooterLogoUseCase;
        this.uploadSignatureUseCase = uploadSignatureUseCase;
        this.getDocumentSettingsStatsUseCase = getDocumentSettingsStatsUseCase;
    }
    convertDocumentSettingsToFullUrls(settings) {
        const settingsObj = settings.toObject ? settings.toObject() : settings;
        // Convert header logo to full URL
        if (settingsObj.header?.logo?.url) {
            settingsObj.header.logo.url = localStorageService.getFullUrl(settingsObj.header.logo.url);
        }
        // Convert footer logo to full URL
        if (settingsObj.footer?.logo?.url) {
            settingsObj.footer.logo.url = localStorageService.getFullUrl(settingsObj.footer.logo.url);
        }
        // Convert footer signature to full URL
        if (settingsObj.footer?.signature?.url) {
            settingsObj.footer.signature.url = localStorageService.getFullUrl(settingsObj.footer.signature.url);
        }
        return settingsObj;
    }
    async createDocumentSettings(req, res, next) {
        try {
            const settingsData = req.body;
            const userId = req.user?.id;
            const userName = req.user?.name || "Unknown User";
            const settings = await this.createDocumentSettingsUseCase.execute(settingsData, userId, userName);
            const settingsWithUrls = this.convertDocumentSettingsToFullUrls(settings);
            res.status(201).json({
                success: true,
                message: "Document settings created successfully",
                data: settingsWithUrls,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getAllDocumentSettings(req, res, next) {
        try {
            const settings = await this.getAllDocumentSettingsUseCase.execute();
            const settingsWithUrls = settings.map((setting) => this.convertDocumentSettingsToFullUrls(setting));
            res.status(200).json({
                success: true,
                message: "Document settings retrieved successfully",
                data: settingsWithUrls,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getDocumentSettingsById(req, res, next) {
        try {
            const { id } = req.params;
            const settings = await this.getDocumentSettingsByIdUseCase.execute(id);
            const settingsWithUrls = this.convertDocumentSettingsToFullUrls(settings);
            res.status(200).json({
                success: true,
                message: "Document settings retrieved successfully",
                data: settingsWithUrls,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getDocumentSettingsByType(req, res, next) {
        try {
            const { documentType } = req.params;
            const settings = await this.getDocumentSettingsByTypeUseCase.execute(documentType);
            const settingsWithUrls = this.convertDocumentSettingsToFullUrls(settings);
            res.status(200).json({
                success: true,
                message: "Document settings retrieved successfully",
                data: settingsWithUrls,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async updateDocumentSettings(req, res, next) {
        try {
            const { id } = req.params;
            const settingsData = req.body;
            const userId = req.user?.id;
            const userName = req.user?.name || "Unknown User";
            const settings = await this.updateDocumentSettingsUseCase.execute(id, settingsData, userId, userName);
            const settingsWithUrls = this.convertDocumentSettingsToFullUrls(settings);
            res.status(200).json({
                success: true,
                message: "Document settings updated successfully",
                data: settingsWithUrls,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteDocumentSettings(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.user?.id;
            const userName = req.user?.name || "Unknown User";
            const result = await this.deleteDocumentSettingsUseCase.execute(id, userId, userName);
            res.status(200).json({
                success: true,
                message: result.message,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async toggleDocumentSettingsStatus(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.user?.id;
            const userName = req.user?.name || "Unknown User";
            const settings = await this.toggleDocumentSettingsStatusUseCase.execute(id, userId, userName);
            const settingsWithUrls = this.convertDocumentSettingsToFullUrls(settings);
            res.status(200).json({
                success: true,
                message: "Document settings status toggled successfully",
                data: settingsWithUrls,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async uploadHeaderLogo(req, res, next) {
        try {
            const { documentType } = req.params;
            const userId = req.user?.id;
            const userName = req.user?.name || "Unknown User";
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "No file uploaded",
                });
            }
            const logoData = {
                url: req.file.path,
                publicId: req.file.filename,
            };
            const settings = await this.uploadHeaderLogoUseCase.execute(documentType, logoData, userId, userName);
            const settingsWithUrls = this.convertDocumentSettingsToFullUrls(settings);
            res.status(200).json({
                success: true,
                message: "Header logo uploaded successfully",
                data: settingsWithUrls,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async uploadFooterLogo(req, res, next) {
        try {
            const { documentType } = req.params;
            const userId = req.user?.id;
            const userName = req.user?.name || "Unknown User";
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "No file uploaded",
                });
            }
            const logoData = {
                url: req.file.path,
                publicId: req.file.filename,
            };
            const settings = await this.uploadFooterLogoUseCase.execute(documentType, logoData, userId, userName);
            const settingsWithUrls = this.convertDocumentSettingsToFullUrls(settings);
            res.status(200).json({
                success: true,
                message: "Footer logo uploaded successfully",
                data: settingsWithUrls,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async uploadSignature(req, res, next) {
        try {
            const { documentType } = req.params;
            const userId = req.user?.id;
            const userName = req.user?.name || "Unknown User";
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "No file uploaded",
                });
            }
            const signatureData = {
                url: req.file.path,
                publicId: req.file.filename,
            };
            const settings = await this.uploadSignatureUseCase.execute(documentType, signatureData, userId, userName);
            const settingsWithUrls = this.convertDocumentSettingsToFullUrls(settings);
            res.status(200).json({
                success: true,
                message: "Signature uploaded successfully",
                data: settingsWithUrls,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getDocumentSettingsStats(req, res, next) {
        try {
            const stats = await this.getDocumentSettingsStatsUseCase.execute();
            res.status(200).json({
                success: true,
                message: "Document settings statistics retrieved successfully",
                data: stats,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
//# sourceMappingURL=DocumentSettingsController.js.map