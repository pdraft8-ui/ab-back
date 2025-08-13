import { IDocumentSettingsRepository } from "../../domain/interfaces/IDocumentSettingsRepository.js";
import { DocumentSettings } from "../../domain/entities/DocumentSettings.entity.js";
import DocumentSettingsModel from "../../../../../DB/models/documentSettings.model.js";

export class MongoDocumentSettingsRepository extends IDocumentSettingsRepository {
  mapToDocumentSettingsEntity(settingsDoc) {
    if (!settingsDoc) return null;
    return new DocumentSettings({
      id: settingsDoc._id.toString(),
      documentType: settingsDoc.documentType,
      header: settingsDoc.header,
      footer: settingsDoc.footer,
      isActive: settingsDoc.isActive,
      createdBy: settingsDoc.createdBy?.toString(),
      updatedBy: settingsDoc.updatedBy?.toString(),
      createdAt: settingsDoc.createdAt,
      updatedAt: settingsDoc.updatedAt,
    });
  }

  async create(settingsData) {
    try {
      const settings = await DocumentSettingsModel.create(settingsData);
      return this.mapToDocumentSettingsEntity(settings);
    } catch (error) {
      console.error("Failed to create document settings:", error);
      throw error;
    }
  }

  async findById(id) {
    try {
      const settings = await DocumentSettingsModel.findById(id);
      return this.mapToDocumentSettingsEntity(settings);
    } catch (error) {
      console.error("Failed to find document settings by ID:", error);
      throw error;
    }
  }

  async findByDocumentType(documentType) {
    try {
      const settings = await DocumentSettingsModel.findOne({ documentType });
      return this.mapToDocumentSettingsEntity(settings);
    } catch (error) {
      console.error("Failed to find document settings by type:", error);
      throw error;
    }
  }

  async findAll() {
    try {
      const settings = await DocumentSettingsModel.find().sort({
        createdAt: -1,
      });
      return settings.map((doc) => this.mapToDocumentSettingsEntity(doc));
    } catch (error) {
      console.error("Failed to find all document settings:", error);
      throw error;
    }
  }

  async findActive() {
    try {
      const settings = await DocumentSettingsModel.find({
        isActive: true,
      }).sort({ createdAt: -1 });
      return settings.map((doc) => this.mapToDocumentSettingsEntity(doc));
    } catch (error) {
      console.error("Failed to find active document settings:", error);
      throw error;
    }
  }

  async update(id, settingsData) {
    try {
      const settings = await DocumentSettingsModel.findByIdAndUpdate(
        id,
        { ...settingsData, updatedAt: new Date() },
        { new: true }
      );
      return this.mapToDocumentSettingsEntity(settings);
    } catch (error) {
      console.error("Failed to update document settings:", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      await DocumentSettingsModel.findByIdAndDelete(id);
      return true;
    } catch (error) {
      console.error("Failed to delete document settings:", error);
      throw error;
    }
  }

  async toggleStatus(id) {
    try {
      const settings = await DocumentSettingsModel.findById(id);
      if (!settings) {
        throw new Error("Document settings not found");
      }

      settings.isActive = !settings.isActive;
      settings.updatedAt = new Date();
      await settings.save();

      return this.mapToDocumentSettingsEntity(settings);
    } catch (error) {
      console.error("Failed to toggle document settings status:", error);
      throw error;
    }
  }

  async updateHeaderLogo(id, logoData) {
    try {
      const settings = await DocumentSettingsModel.findByIdAndUpdate(
        id,
        {
          "header.logo": logoData,
          updatedAt: new Date(),
        },
        { new: true }
      );
      return this.mapToDocumentSettingsEntity(settings);
    } catch (error) {
      console.error("Failed to update header logo:", error);
      throw error;
    }
  }

  async updateFooterLogo(id, logoData) {
    try {
      const settings = await DocumentSettingsModel.findByIdAndUpdate(
        id,
        {
          "footer.logo": logoData,
          updatedAt: new Date(),
        },
        { new: true }
      );
      return this.mapToDocumentSettingsEntity(settings);
    } catch (error) {
      console.error("Failed to update footer logo:", error);
      throw error;
    }
  }

  async updateSignature(id, signatureData) {
    try {
      const settings = await DocumentSettingsModel.findByIdAndUpdate(
        id,
        {
          "footer.signature": signatureData,
          updatedAt: new Date(),
        },
        { new: true }
      );
      return this.mapToDocumentSettingsEntity(settings);
    } catch (error) {
      console.error("Failed to update signature:", error);
      throw error;
    }
  }

  async getStats() {
    try {
      const totalSettings = await DocumentSettingsModel.countDocuments();
      const activeSettings = await DocumentSettingsModel.countDocuments({
        isActive: true,
      });
      const inactiveSettings = totalSettings - activeSettings;

      const settingsByType = await DocumentSettingsModel.aggregate([
        {
          $group: {
            _id: "$documentType",
            count: { $sum: 1 },
            active: {
              $sum: { $cond: ["$isActive", 1, 0] },
            },
          },
        },
      ]);

      return {
        total: totalSettings,
        active: activeSettings,
        inactive: inactiveSettings,
        byType: settingsByType,
      };
    } catch (error) {
      console.error("Failed to get document settings stats:", error);
      throw error;
    }
  }

  async countSettings() {
    try {
      return await DocumentSettingsModel.countDocuments();
    } catch (error) {
      console.error("Failed to count document settings:", error);
      throw error;
    }
  }

  async findSettingsByCreator(createdBy) {
    try {
      const settings = await DocumentSettingsModel.find({ createdBy }).sort({
        createdAt: -1,
      });
      return settings.map((doc) => this.mapToDocumentSettingsEntity(doc));
    } catch (error) {
      console.error("Failed to find document settings by creator:", error);
      throw error;
    }
  }
}
