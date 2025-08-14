export class GetCustomerStatsUseCase {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async execute(filters = {}) {
        try {
            const stats = await this.customerRepository.getCustomerStats(filters);
            return stats;
        }
        catch (error) {
            throw error;
        }
    }
}
//# sourceMappingURL=GetCustomerStatsUseCase.js.map