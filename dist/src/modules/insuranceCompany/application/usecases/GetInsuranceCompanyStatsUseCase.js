export class GetInsuranceCompanyStatsUseCase {
    constructor(insuranceCompanyRepository) {
        this.insuranceCompanyRepository = insuranceCompanyRepository;
    }
    async execute() {
        try {
            const stats = await this.insuranceCompanyRepository.getStats();
            return stats;
        }
        catch (error) {
            console.error("GetInsuranceCompanyStatsUseCase error:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=GetInsuranceCompanyStatsUseCase.js.map