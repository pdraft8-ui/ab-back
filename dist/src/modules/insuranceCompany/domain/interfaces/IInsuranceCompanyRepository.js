export class IInsuranceCompanyRepository {
    async create(companyData) {
        throw new Error("Method 'create' must be implemented");
    }
    async findById(id) {
        throw new Error("Method 'findById' must be implemented");
    }
    async findByName(name) {
        throw new Error("Method 'findByName' must be implemented");
    }
    async findAll() {
        throw new Error("Method 'findAll' must be implemented");
    }
    async findByInsuranceType(insuranceType) {
        throw new Error("Method 'findByInsuranceType' must be implemented");
    }
    async update(id, companyData) {
        throw new Error("Method 'update' must be implemented");
    }
    async delete(id) {
        throw new Error("Method 'delete' must be implemented");
    }
    async addRate(id, rateType, rateData) {
        throw new Error("Method 'addRate' must be implemented");
    }
    async updateRate(id, rateType, rateData) {
        throw new Error("Method 'updateRate' must be implemented");
    }
    async removeRate(id, rateType) {
        throw new Error("Method 'removeRate' must be implemented");
    }
    async getStats() {
        throw new Error("Method 'getStats' must be implemented");
    }
    async countCompanies() {
        throw new Error("Method 'countCompanies' must be implemented");
    }
    async findCompaniesWithRates() {
        throw new Error("Method 'findCompaniesWithRates' must be implemented");
    }
}
//# sourceMappingURL=IInsuranceCompanyRepository.js.map