export class GetAllInsuranceCompaniesUseCase {
  constructor(insuranceCompanyRepository) {
    this.insuranceCompanyRepository = insuranceCompanyRepository;
  }

  async execute() {
    try {
      const companies = await this.insuranceCompanyRepository.findAll();
      return companies;
    } catch (error) {
      console.error("GetAllInsuranceCompaniesUseCase error:", error);
      throw error;
    }
  }
}
