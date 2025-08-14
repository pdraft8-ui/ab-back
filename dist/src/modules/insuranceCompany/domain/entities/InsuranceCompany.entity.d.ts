export class InsuranceCompany {
    static fromJSON(json: any): InsuranceCompany;
    static create(companyData: any): InsuranceCompany;
    constructor(companyData: any);
    id: any;
    name: any;
    contact: any;
    address: any;
    insuranceType: any;
    rates: any;
    createdAt: any;
    updatedAt: any;
    isValid(): boolean;
    isValidInsuranceType(): boolean;
    isMandatoryInsurance(): boolean;
    isThirdPartyComprehensive(): boolean;
    hasRates(): boolean;
    getRateForAge(age: any, rateType: any): any;
    getMinimumAmount(): any;
    getOfferAmount(): any;
    addRate(rateType: any, rateData: any): void;
    removeRate(rateType: any): void;
    updateRate(rateType: any, rateData: any): void;
    isValidRateData(rateData: any): boolean;
    updateCompanyInfo(companyInfo: any): void;
    toJSON(): {
        id: any;
        name: any;
        contact: any;
        address: any;
        insuranceType: any;
        rates: any;
        createdAt: any;
        updatedAt: any;
    };
}
//# sourceMappingURL=InsuranceCompany.entity.d.ts.map