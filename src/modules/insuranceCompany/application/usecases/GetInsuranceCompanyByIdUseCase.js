export class GetInsuranceCompanyByIdUseCase {
  constructor(insuranceCompanyRepository) {
    this.insuranceCompanyRepository = insuranceCompanyRepository;
  }

  async execute(id) {
    try {
      if (!id) {
        throw new Error("Insurance company ID is required.");
      }

      const company = await this.insuranceCompanyRepository.findById(id);
      if (!company) {
        throw new Error("Insurance company not found.");
      }

      return company;
    } catch (error) {
      console.error("GetInsuranceCompanyByIdUseCase error:", error);
      throw error;
    }
  }
}
