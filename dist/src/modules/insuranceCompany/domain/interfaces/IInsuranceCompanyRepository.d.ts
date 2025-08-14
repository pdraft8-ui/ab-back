export class IInsuranceCompanyRepository {
    create(companyData: any): Promise<void>;
    findById(id: any): Promise<void>;
    findByName(name: any): Promise<void>;
    findAll(): Promise<void>;
    findByInsuranceType(insuranceType: any): Promise<void>;
    update(id: any, companyData: any): Promise<void>;
    delete(id: any): Promise<void>;
    addRate(id: any, rateType: any, rateData: any): Promise<void>;
    updateRate(id: any, rateType: any, rateData: any): Promise<void>;
    removeRate(id: any, rateType: any): Promise<void>;
    getStats(): Promise<void>;
    countCompanies(): Promise<void>;
    findCompaniesWithRates(): Promise<void>;
}
//# sourceMappingURL=IInsuranceCompanyRepository.d.ts.map