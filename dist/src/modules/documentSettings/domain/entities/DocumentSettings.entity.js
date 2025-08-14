export class DocumentSettings {
    constructor(settingsData) {
        this.id = settingsData.id || null;
        this.documentType = settingsData.documentType || "";
        this.header = settingsData.header || {
            logo: { url: "", publicId: "" },
            companyName: "Insurance Management System",
            companyAddress: "",
            companyPhone: "",
            companyEmail: "",
            companyWebsite: "",
        };
        this.footer = settingsData.footer || {
            logo: { url: "", publicId: "" },
            footerText: "",
            termsAndConditions: "",
            signature: { url: "", publicId: "" },
        };
        this.isActive =
            settingsData.isActive !== undefined ? settingsData.isActive : true;
        this.createdBy = settingsData.createdBy || null;
        this.updatedBy = settingsData.updatedBy || null;
        this.createdAt = settingsData.createdAt || new Date();
        this.updatedAt = settingsData.updatedAt || new Date();
    }
    isValid() {
        return !!(this.documentType && this.isValidDocumentType());
    }
    isValidDocumentType() {
        const validTypes = ["invoice", "receipt", "contract", "policy", "report"];
        return validTypes.includes(this.documentType);
    }
    hasHeaderLogo() {
        return !!this.header?.logo?.url;
    }
    hasFooterLogo() {
        return !!this.footer?.logo?.url;
    }
    hasSignature() {
        return !!this.footer?.signature?.url;
    }
    hasCompanyInfo() {
        return !!(this.header?.companyName ||
            this.header?.companyAddress ||
            this.header?.companyPhone ||
            this.header?.companyEmail ||
            this.header?.companyWebsite);
    }
    getHeaderLogoUrl() {
        return this.header?.logo?.url || "";
    }
    getFooterLogoUrl() {
        return this.footer?.logo?.url || "";
    }
    getSignatureUrl() {
        return this.footer?.signature?.url || "";
    }
    getCompanyName() {
        return this.header?.companyName || "Insurance Management System";
    }
    getCompanyAddress() {
        return this.header?.companyAddress || "";
    }
    getCompanyPhone() {
        return this.header?.companyPhone || "";
    }
    getCompanyEmail() {
        return this.header?.companyEmail || "";
    }
    getCompanyWebsite() {
        return this.header?.companyWebsite || "";
    }
    getFooterText() {
        return this.footer?.footerText || "";
    }
    getTermsAndConditions() {
        return this.footer?.termsAndConditions || "";
    }
    isActive() {
        return this.isActive;
    }
    activate() {
        this.isActive = true;
        this.updatedAt = new Date();
    }
    deactivate() {
        this.isActive = false;
        this.updatedAt = new Date();
    }
    toggleStatus() {
        this.isActive = !this.isActive;
        this.updatedAt = new Date();
    }
    updateHeaderLogo(url, publicId) {
        this.header.logo = { url, publicId };
        this.updatedAt = new Date();
    }
    updateFooterLogo(url, publicId) {
        this.footer.logo = { url, publicId };
        this.updatedAt = new Date();
    }
    updateSignature(url, publicId) {
        this.footer.signature = { url, publicId };
        this.updatedAt = new Date();
    }
    updateCompanyInfo(companyInfo) {
        if (companyInfo.companyName)
            this.header.companyName = companyInfo.companyName;
        if (companyInfo.companyAddress)
            this.header.companyAddress = companyInfo.companyAddress;
        if (companyInfo.companyPhone)
            this.header.companyPhone = companyInfo.companyPhone;
        if (companyInfo.companyEmail)
            this.header.companyEmail = companyInfo.companyEmail;
        if (companyInfo.companyWebsite)
            this.header.companyWebsite = companyInfo.companyWebsite;
        this.updatedAt = new Date();
    }
    updateFooterInfo(footerInfo) {
        if (footerInfo.footerText)
            this.footer.footerText = footerInfo.footerText;
        if (footerInfo.termsAndConditions)
            this.footer.termsAndConditions = footerInfo.termsAndConditions;
        this.updatedAt = new Date();
    }
    toJSON() {
        return {
            id: this.id,
            documentType: this.documentType,
            header: this.header,
            footer: this.footer,
            isActive: this.isActive,
            createdBy: this.createdBy,
            updatedBy: this.updatedBy,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
    static fromJSON(json) {
        return new DocumentSettings(json);
    }
    static create(settingsData) {
        return new DocumentSettings(settingsData);
    }
}
//# sourceMappingURL=DocumentSettings.entity.js.map