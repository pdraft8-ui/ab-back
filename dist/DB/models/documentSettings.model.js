import mongoose from "mongoose";
const documentSettingsSchema = new mongoose.Schema({
    documentType: {
        type: String,
        required: true,
        enum: ["invoice", "receipt", "contract", "policy", "report"],
        unique: true,
    },
    header: {
        logo: {
            url: String,
            publicId: String,
        },
        companyName: {
            type: String,
            default: "Insurance Management System",
        },
        companyAddress: String,
        companyPhone: String,
        companyEmail: String,
        companyWebsite: String,
    },
    footer: {
        logo: {
            url: String,
            publicId: String,
        },
        footerText: String,
        termsAndConditions: String,
        signature: {
            url: String,
            publicId: String,
        },
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
}, {
    timestamps: true,
});
// Index for efficient queries
documentSettingsSchema.index({ isActive: 1 });
const DocumentSettings = mongoose.model("DocumentSettings", documentSettingsSchema);
export default DocumentSettings;
//# sourceMappingURL=documentSettings.model.js.map