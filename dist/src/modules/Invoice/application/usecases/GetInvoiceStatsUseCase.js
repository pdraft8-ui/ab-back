export class GetInvoiceStatsUseCase {
    constructor(invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }
    async execute(filters = {}) {
        try {
            // Validate filters
            this.validateFilters(filters);
            // Get invoice statistics
            const stats = await this.invoiceRepository.getInvoiceStats(filters);
            return stats;
        }
        catch (error) {
            throw error;
        }
    }
    validateFilters(filters) {
        if (filters.startDate && filters.endDate) {
            const startDate = new Date(filters.startDate);
            const endDate = new Date(filters.endDate);
            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                throw new Error("Invalid date format");
            }
            if (startDate > endDate) {
                throw new Error("Start date cannot be after end date");
            }
        }
    }
}
//# sourceMappingURL=GetInvoiceStatsUseCase.js.map