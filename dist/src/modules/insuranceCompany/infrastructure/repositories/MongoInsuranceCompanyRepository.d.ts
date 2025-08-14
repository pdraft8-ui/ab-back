export class MongoInsuranceCompanyRepository extends IInsuranceCompanyRepository {
    mapToInsuranceCompanyEntity(companyDoc: any): InsuranceCompany;
    create(companyData: any): Promise<InsuranceCompany>;
    findById(id: any): Promise<InsuranceCompany>;
    findByName(name: any): Promise<InsuranceCompany>;
    findAll(): Promise<InsuranceCompany[]>;
    findByInsuranceType(insuranceType: any): Promise<InsuranceCompany[]>;
    update(id: any, companyData: any): Promise<InsuranceCompany>;
    delete(id: any): Promise<boolean>;
    addRate(id: any, rateType: any, rateData: any): Promise<InsuranceCompany>;
    updateRate(id: any, rateType: any, rateData: any): Promise<InsuranceCompany>;
    removeRate(id: any, rateType: any): Promise<InsuranceCompany>;
    getStats(): Promise<{
        totalCompanies: number;
        mandatoryCompanies: number;
        comprehensiveCompanies: number;
        companiesWithRates: number;
        companiesWithoutRates: number;
    }>;
    countCompanies(): Promise<number>;
    findCompaniesWithRates(): Promise<InsuranceCompany[]>;
}
import { IInsuranceCompanyRepository } from "../../domain/interfaces/IInsuranceCompanyRepository.js";
import { InsuranceCompany } from "../../domain/entities/InsuranceCompany.entity.js";
//# sourceMappingURL=MongoInsuranceCompanyRepository.d.ts.map