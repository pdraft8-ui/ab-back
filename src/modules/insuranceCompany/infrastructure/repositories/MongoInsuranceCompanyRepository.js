import { IInsuranceCompanyRepository } from "../../domain/interfaces/IInsuranceCompanyRepository.js";
import { InsuranceCompany } from "../../domain/entities/InsuranceCompany.entity.js";
import InsuranceCompanyModel from "../../../../../DB/models/insuranceCompany.model.js";

export class MongoInsuranceCompanyRepository extends IInsuranceCompanyRepository {
  mapToInsuranceCompanyEntity(companyDoc) {
    if (!companyDoc) return null;

    return new InsuranceCompany({
      id: companyDoc._id.toString(),
      name: companyDoc.name,
      contact: companyDoc.contact,
      address: companyDoc.address,
      insuranceType: companyDoc.insuranceType,
      rates: companyDoc.rates,
      createdAt: companyDoc.createdAt,
      updatedAt: companyDoc.updatedAt,
    });
  }

  async create(companyData) {
    try {
      const company = await InsuranceCompanyModel.create(companyData);
      return this.mapToInsuranceCompanyEntity(company);
    } catch (error) {
      console.error("Failed to create insurance company:", error);
      throw error;
    }
  }

  async findById(id) {
    try {
      const company = await InsuranceCompanyModel.findById(id);
      return this.mapToInsuranceCompanyEntity(company);
    } catch (error) {
      console.error("Failed to find insurance company by ID:", error);
      throw error;
    }
  }

  async findByName(name) {
    try {
      const company = await InsuranceCompanyModel.findOne({ name });
      return this.mapToInsuranceCompanyEntity(company);
    } catch (error) {
      console.error("Failed to find insurance company by name:", error);
      throw error;
    }
  }

  async findAll() {
    try {
      const companies = await InsuranceCompanyModel.find().sort({
        createdAt: -1,
      });
      return companies.map((company) =>
        this.mapToInsuranceCompanyEntity(company)
      );
    } catch (error) {
      console.error("Failed to find all insurance companies:", error);
      throw error;
    }
  }

  async findByInsuranceType(insuranceType) {
    try {
      const companies = await InsuranceCompanyModel.find({
        insuranceType,
      }).sort({ createdAt: -1 });
      return companies.map((company) =>
        this.mapToInsuranceCompanyEntity(company)
      );
    } catch (error) {
      console.error("Failed to find insurance companies by type:", error);
      throw error;
    }
  }

  async update(id, companyData) {
    try {
      const company = await InsuranceCompanyModel.findByIdAndUpdate(
        id,
        { ...companyData, updatedAt: new Date() },
        { new: true }
      );
      return this.mapToInsuranceCompanyEntity(company);
    } catch (error) {
      console.error("Failed to update insurance company:", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      await InsuranceCompanyModel.findByIdAndDelete(id);
      return true;
    } catch (error) {
      console.error("Failed to delete insurance company:", error);
      throw error;
    }
  }

  async addRate(id, rateType, rateData) {
    try {
      const company = await InsuranceCompanyModel.findByIdAndUpdate(
        id,
        { [`rates.${rateType}`]: rateData, updatedAt: new Date() },
        { new: true }
      );
      return this.mapToInsuranceCompanyEntity(company);
    } catch (error) {
      console.error("Failed to add rate to insurance company:", error);
      throw error;
    }
  }

  async updateRate(id, rateType, rateData) {
    try {
      const company = await InsuranceCompanyModel.findByIdAndUpdate(
        id,
        { [`rates.${rateType}`]: rateData, updatedAt: new Date() },
        { new: true }
      );
      return this.mapToInsuranceCompanyEntity(company);
    } catch (error) {
      console.error("Failed to update rate for insurance company:", error);
      throw error;
    }
  }

  async removeRate(id, rateType) {
    try {
      const company = await InsuranceCompanyModel.findByIdAndUpdate(
        id,
        { $unset: { [`rates.${rateType}`]: 1 }, updatedAt: new Date() },
        { new: true }
      );
      return this.mapToInsuranceCompanyEntity(company);
    } catch (error) {
      console.error("Failed to remove rate from insurance company:", error);
      throw error;
    }
  }

  async getStats() {
    try {
      const totalCompanies = await InsuranceCompanyModel.countDocuments();
      const mandatoryCompanies = await InsuranceCompanyModel.countDocuments({
        insuranceType: "mandatory",
      });
      const comprehensiveCompanies = await InsuranceCompanyModel.countDocuments(
        { insuranceType: "thirdPartyComprehensive" }
      );
      const companiesWithRates = await InsuranceCompanyModel.countDocuments({
        "rates.0": { $exists: true },
      });

      return {
        totalCompanies,
        mandatoryCompanies,
        comprehensiveCompanies,
        companiesWithRates,
        companiesWithoutRates: totalCompanies - companiesWithRates,
      };
    } catch (error) {
      console.error("Failed to get insurance company stats:", error);
      throw error;
    }
  }

  async countCompanies() {
    try {
      return await InsuranceCompanyModel.countDocuments();
    } catch (error) {
      console.error("Failed to count insurance companies:", error);
      throw error;
    }
  }

  async findCompaniesWithRates() {
    try {
      const companies = await InsuranceCompanyModel.find({
        "rates.0": { $exists: true },
      }).sort({ createdAt: -1 });
      return companies.map((company) =>
        this.mapToInsuranceCompanyEntity(company)
      );
    } catch (error) {
      console.error("Failed to find insurance companies with rates:", error);
      throw error;
    }
  }
}
