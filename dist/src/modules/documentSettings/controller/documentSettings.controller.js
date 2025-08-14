import DocumentSettings from "../../../../DB/models/documentSettings.model.js";
import AuditLogModel from "../../../../DB/models/AuditLog.model.js";
import localStorageService from "../../../Servicess/localStorage.js";
import { createNotification, sendNotificationLogic, } from "../../notification/controller/notification.controller.js";
// Helper function to convert document settings to include full URLs
const convertDocumentSettingsToFullUrls = (settings) => {
    const settingsObj = settings.toObject ? settings.toObject() : settings;
    // Convert header logo to full URL
    if (settingsObj.header &&
        settingsObj.header.logo &&
        settingsObj.header.logo.url) {
        settingsObj.header.logo.url = localStorageService.getFullUrl(settingsObj.header.logo.url);
    }
    // Convert footer logo to full URL
    if (settingsObj.footer &&
        settingsObj.footer.logo &&
        settingsObj.footer.logo.url) {
        settingsObj.footer.logo.url = localStorageService.getFullUrl(settingsObj.footer.logo.url);
    }
    // Convert footer signature to full URL
    if (settingsObj.footer &&
        settingsObj.footer.signature &&
        settingsObj.footer.signature.url) {
        settingsObj.footer.signature.url = localStorageService.getFullUrl(settingsObj.footer.signature.url);
    }
    return settingsObj;
};
const logAudit = async ({ userId, action, entity, entityId, userName, oldValue = null, newValue = null, }) => {
    try {
        await AuditLogModel.create({
            user: userId,
            action,
            entity,
            entityId,
            oldValue,
            newValue,
            userName,
        });
    }
    catch (error) {
        console.error("Failed to create audit log:", error);
    }
};
// Create document settings
export const createDocumentSettings = async (req, res, next) => {
    try {
        const { documentType, companyName, companyAddress, companyPhone, companyEmail, companyWebsite, footerText, termsAndConditions, } = req.body;
        // Check if settings already exist for this document type
        const existingSettings = await DocumentSettings.findOne({
            documentType,
        });
        if (existingSettings) {
            return res.status(409).json({
                message: `Document settings for ${documentType} already exist`,
            });
        }
        const newSettings = new DocumentSettings({
            documentType,
            header: {
                companyName,
                companyAddress,
                companyPhone,
                companyEmail,
                companyWebsite,
            },
            footer: {
                footerText,
                termsAndConditions,
            },
            createdBy: req.user._id,
        });
        const savedSettings = await newSettings.save();
        // Send notification
        const message = `Document settings created for ${documentType}`;
        await sendNotificationLogic({
            senderId: req.user._id,
            message,
        });
        // Log audit
        await logAudit({
            userId: req.user._id,
            action: `Create Document Settings`,
            userName: req.user.name || "Unknown User",
            entity: "DocumentSettings",
            entityId: savedSettings._id,
            oldValue: null,
            newValue: savedSettings.toObject(),
        });
        return res.status(201).json({
            message: "Document settings created successfully",
            settings: savedSettings,
        });
    }
    catch (error) {
        console.error("Error creating document settings:", error);
        next(error);
    }
};
// Upload header logo
export const uploadHeaderLogo = async (req, res, next) => {
    try {
        const { documentType } = req.params;
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const settings = await DocumentSettings.findOne({ documentType });
        if (!settings) {
            return res.status(404).json({
                message: `Document settings for ${documentType} not found`,
            });
        }
        // Delete old logo if exists
        if (settings.header.logo.publicId) {
            try {
                await localStorageService.destroy(settings.header.logo.publicId);
            }
            catch (error) {
                console.error("Error deleting old logo:", error);
            }
        }
        // Upload new logo to local storage
        const result = await localStorageService.upload(req.file, "document-settings/headers");
        // Update settings
        settings.header.logo = {
            url: result.secure_url,
            publicId: result.public_id,
        };
        settings.updatedBy = req.user._id;
        const updatedSettings = await settings.save();
        // Send notification
        const message = `Header logo updated for ${documentType}`;
        await sendNotificationLogic({
            senderId: req.user._id,
            message,
        });
        // Log audit
        await logAudit({
            userId: req.user._id,
            action: `Update Header Logo`,
            userName: req.user.name || "Unknown User",
            entity: "DocumentSettings",
            entityId: updatedSettings._id,
            oldValue: { logo: settings.header.logo },
            newValue: { logo: updatedSettings.header.logo },
        });
        return res.status(200).json({
            message: "Header logo uploaded successfully",
            logo: updatedSettings.header.logo,
        });
    }
    catch (error) {
        console.error("Error uploading header logo:", error);
        next(error);
    }
};
// Upload footer logo
export const uploadFooterLogo = async (req, res, next) => {
    try {
        const { documentType } = req.params;
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const settings = await DocumentSettings.findOne({ documentType });
        if (!settings) {
            return res.status(404).json({
                message: `Document settings for ${documentType} not found`,
            });
        }
        // Delete old logo if exists
        if (settings.footer.logo.publicId) {
            try {
                await localStorageService.destroy(settings.footer.logo.publicId);
            }
            catch (error) {
                console.error("Error deleting old logo:", error);
            }
        }
        // Upload new logo to local storage
        const result = await localStorageService.upload(req.file, "document-settings/footers");
        // Update settings
        settings.footer.logo = {
            url: result.secure_url,
            publicId: result.public_id,
        };
        settings.updatedBy = req.user._id;
        const updatedSettings = await settings.save();
        // Send notification
        const findUser = await UserModel.findById(req.user._id);
        const message = `${findUser.name} updated footer logo for ${documentType}`;
        await sendNotificationLogic({
            senderId: req.user._id,
            message,
        });
        // Log audit
        await logAudit({
            userId: req.user._id,
            action: `Update Footer Logo by ${findUser.name}`,
            userName: findUser.name,
            entity: "DocumentSettings",
            entityId: updatedSettings._id,
            oldValue: { logo: settings.footer.logo },
            newValue: { logo: updatedSettings.footer.logo },
        });
        return res.status(200).json({
            message: "Footer logo uploaded successfully",
            logo: updatedSettings.footer.logo,
        });
    }
    catch (error) {
        console.error("Error uploading footer logo:", error);
        next(error);
    }
};
// Upload signature
export const uploadSignature = async (req, res, next) => {
    try {
        const { documentType } = req.params;
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const settings = await DocumentSettings.findOne({ documentType });
        if (!settings) {
            return res.status(404).json({
                message: `Document settings for ${documentType} not found`,
            });
        }
        // Delete old signature if exists
        if (settings.footer.signature.publicId) {
            try {
                await localStorageService.destroy(settings.footer.signature.publicId);
            }
            catch (error) {
                console.error("Error deleting old signature:", error);
            }
        }
        // Upload new signature to local storage
        const result = await localStorageService.upload(req.file, "document-settings/signatures");
        // Update settings
        settings.footer.signature = {
            url: result.secure_url,
            publicId: result.public_id,
        };
        settings.updatedBy = req.user._id;
        const updatedSettings = await settings.save();
        // Send notification
        const findUser = await UserModel.findById(req.user._id);
        const message = `${findUser.name} updated signature for ${documentType}`;
        await sendNotificationLogic({
            senderId: req.user._id,
            message,
        });
        // Log audit
        await logAudit({
            userId: req.user._id,
            action: `Update Signature by ${findUser.name}`,
            userName: findUser.name,
            entity: "DocumentSettings",
            entityId: updatedSettings._id,
            oldValue: { signature: settings.footer.signature },
            newValue: { signature: updatedSettings.footer.signature },
        });
        return res.status(200).json({
            message: "Signature uploaded successfully",
            signature: updatedSettings.footer.signature,
        });
    }
    catch (error) {
        console.error("Error uploading signature:", error);
        next(error);
    }
};
// Get all document settings
export const getAllDocumentSettings = async (req, res, next) => {
    try {
        const { isActive } = req.query;
        const filter = {};
        if (isActive !== undefined) {
            filter.isActive = isActive === "true";
        }
        const settings = await DocumentSettings.find(filter).sort({
            createdAt: -1,
        });
        return res.status(200).json({
            message: "Document settings retrieved successfully",
            settings,
        });
    }
    catch (error) {
        console.error("Error getting document settings:", error);
        next(error);
    }
};
// Get document settings by type
export const getDocumentSettingsByType = async (req, res, next) => {
    try {
        const { documentType } = req.params;
        const settings = await DocumentSettings.findOne({
            documentType,
            isActive: true,
        });
        if (!settings) {
            return res.status(404).json({
                message: `Document settings for ${documentType} not found`,
            });
        }
        return res.status(200).json({
            message: "Document settings retrieved successfully",
            settings,
        });
    }
    catch (error) {
        console.error("Error getting document settings:", error);
        next(error);
    }
};
// Get document settings by ID
export const getDocumentSettingsById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const settings = await DocumentSettings.findById(id);
        if (!settings) {
            return res.status(404).json({
                message: "Document settings not found",
            });
        }
        return res.status(200).json({
            message: "Document settings retrieved successfully",
            settings,
        });
    }
    catch (error) {
        console.error("Error getting document settings:", error);
        next(error);
    }
};
// Update document settings
export const updateDocumentSettings = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { companyName, companyAddress, companyPhone, companyEmail, companyWebsite, footerText, termsAndConditions, isActive, } = req.body;
        const settings = await DocumentSettings.findById(id);
        if (!settings) {
            return res.status(404).json({ message: "Document settings not found" });
        }
        const oldValue = settings.toObject();
        // Update fields
        if (companyName !== undefined)
            settings.header.companyName = companyName;
        if (companyAddress !== undefined)
            settings.header.companyAddress = companyAddress;
        if (companyPhone !== undefined)
            settings.header.companyPhone = companyPhone;
        if (companyEmail !== undefined)
            settings.header.companyEmail = companyEmail;
        if (companyWebsite !== undefined)
            settings.header.companyWebsite = companyWebsite;
        if (footerText !== undefined)
            settings.footer.footerText = footerText;
        if (termsAndConditions !== undefined)
            settings.footer.termsAndConditions = termsAndConditions;
        if (isActive !== undefined)
            settings.isActive = isActive;
        settings.updatedBy = req.user._id;
        const updatedSettings = await settings.save();
        // Send notification
        const findUser = await UserModel.findById(req.user._id);
        const message = `${findUser.name} updated document settings for ${settings.documentType}`;
        await sendNotificationLogic({
            senderId: req.user._id,
            message,
        });
        // Log audit
        await logAudit({
            userId: req.user._id,
            action: `Update Document Settings by ${findUser.name}`,
            userName: findUser.name,
            entity: "DocumentSettings",
            entityId: updatedSettings._id,
            oldValue,
            newValue: updatedSettings.toObject(),
        });
        return res.status(200).json({
            message: "Document settings updated successfully",
            settings: updatedSettings,
        });
    }
    catch (error) {
        console.error("Error updating document settings:", error);
        next(error);
    }
};
// Delete document settings
export const deleteDocumentSettings = async (req, res, next) => {
    try {
        const { id } = req.params;
        const settings = await DocumentSettings.findById(id);
        if (!settings) {
            return res.status(404).json({ message: "Document settings not found" });
        }
        // Delete uploaded files from local storage
        if (settings.header.logo.publicId) {
            try {
                await localStorageService.destroy(settings.header.logo.publicId);
            }
            catch (error) {
                console.error("Error deleting header logo:", error);
            }
        }
        if (settings.footer.logo.publicId) {
            try {
                await localStorageService.destroy(settings.footer.logo.publicId);
            }
            catch (error) {
                console.error("Error deleting footer logo:", error);
            }
        }
        if (settings.footer.signature.publicId) {
            try {
                await localStorageService.destroy(settings.footer.signature.publicId);
            }
            catch (error) {
                console.error("Error deleting signature:", error);
            }
        }
        await DocumentSettings.findByIdAndDelete(id);
        // Send notification
        const findUser = await UserModel.findById(req.user._id);
        const message = `${findUser.name} deleted document settings for ${settings.documentType}`;
        await sendNotificationLogic({
            senderId: req.user._id,
            message,
        });
        // Log audit
        await logAudit({
            userId: req.user._id,
            action: `Delete Document Settings by ${findUser.name}`,
            userName: findUser.name,
            entity: "DocumentSettings",
            entityId: settings._id,
            oldValue: settings.toObject(),
            newValue: null,
        });
        return res.status(200).json({
            message: "Document settings deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting document settings:", error);
        next(error);
    }
};
// Toggle document settings active status
export const toggleDocumentSettingsStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const settings = await DocumentSettings.findById(id);
        if (!settings) {
            return res.status(404).json({ message: "Document settings not found" });
        }
        settings.isActive = !settings.isActive;
        settings.updatedBy = req.user._id;
        const updatedSettings = await settings.save();
        // Send notification
        const findUser = await UserModel.findById(req.user._id);
        const status = updatedSettings.isActive ? "activated" : "deactivated";
        const message = `${findUser.name} ${status} document settings for ${settings.documentType}`;
        await sendNotificationLogic({
            senderId: req.user._id,
            message,
        });
        // Log audit
        await logAudit({
            userId: req.user._id,
            action: `Toggle Document Settings Status by ${findUser.name}`,
            userName: findUser.name,
            entity: "DocumentSettings",
            entityId: updatedSettings._id,
            oldValue: { isActive: !settings.isActive },
            newValue: { isActive: settings.isActive },
        });
        return res.status(200).json({
            message: `Document settings ${status} successfully`,
            settings: updatedSettings,
        });
    }
    catch (error) {
        console.error("Error toggling document settings status:", error);
        next(error);
    }
};
//# sourceMappingURL=documentSettings.controller.js.map