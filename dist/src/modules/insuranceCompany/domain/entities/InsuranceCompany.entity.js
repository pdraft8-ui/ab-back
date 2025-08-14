export class InsuranceCompany {
    constructor(companyData) {
        this.id = companyData.id || null;
        this.name = companyData.name || "";
        this.contact = companyData.contact || "";
        this.address = companyData.address || "";
        this.insuranceType = companyData.insuranceType || "";
        this.rates = companyData.rates || {};
        this.createdAt = companyData.createdAt || new Date();
        this.updatedAt = companyData.updatedAt || new Date();
    }
    isValid() {
        return !!(this.name && this.insuranceType && this.isValidInsuranceType());
    }
    isValidInsuranceType() {
        const validTypes = ["mandatory", "thirdPartyComprehensive"];
        return validTypes.includes(this.insuranceType);
    }
    isMandatoryInsurance() {
        return this.insuranceType === "mandatory";
    }
    isThirdPartyComprehensive() {
        return this.insuranceType === "thirdPartyComprehensive";
    }
    hasRates() {
        return Object.keys(this.rates).length > 0;
    }
    getRateForAge(age, rateType) {
        if (!this.hasRates())
            return null;
        const rate = this.rates.get(rateType);
        if (!rate)
            return null;
        return age < 24 ? rate.تحت_24 : rate.فوق_24;
    }
    getMinimumAmount() {
        if (!this.hasRates())
            return null;
        // Get the first rate entry for minimum amount
        const firstRate = Object.values(this.rates)[0];
        return firstRate?.الحد_الأدنى_لـ_60_ألف || null;
    }
    getOfferAmount() {
        if (!this.hasRates())
            return null;
        // Get the first rate entry for offer amount
        const firstRate = Object.values(this.rates)[0];
        return firstRate?.مبلغ_العرض || null;
    }
    addRate(rateType, rateData) {
        if (!this.isValidRateData(rateData)) {
            throw new Error("Invalid rate data. All required fields must be provided.");
        }
        this.rates.set(rateType, rateData);
        this.updatedAt = new Date();
    }
    removeRate(rateType) {
        this.rates.delete(rateType);
        this.updatedAt = new Date();
    }
    updateRate(rateType, rateData) {
        if (!this.isValidRateData(rateData)) {
            throw new Error("Invalid rate data. All required fields must be provided.");
        }
        this.rates.set(rateType, rateData);
        this.updatedAt = new Date();
    }
    isValidRateData(rateData) {
        return !!(rateData &&
            typeof rateData.تحت_24 === "number" &&
            typeof rateData.فوق_24 === "number" &&
            typeof rateData.مبلغ_العرض === "number" &&
            typeof rateData.الحد_الأدنى_لـ_60_ألف === "number");
    }
    updateCompanyInfo(companyInfo) {
        if (companyInfo.name)
            this.name = companyInfo.name;
        if (companyInfo.contact !== undefined)
            this.contact = companyInfo.contact;
        if (companyInfo.address !== undefined)
            this.address = companyInfo.address;
        if (companyInfo.insuranceType) {
            if (!this.isValidInsuranceType(companyInfo.insuranceType)) {
                throw new Error("Invalid insurance type");
            }
            this.insuranceType = companyInfo.insuranceType;
        }
        this.updatedAt = new Date();
    }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            contact: this.contact,
            address: this.address,
            insuranceType: this.insuranceType,
            rates: this.rates,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
    static fromJSON(json) {
        return new InsuranceCompany(json);
    }
    static create(companyData) {
        return new InsuranceCompany(companyData);
    }
}
//# sourceMappingURL=InsuranceCompany.entity.js.map