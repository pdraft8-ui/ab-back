export class GetAllPaymentsUseCase {
    constructor(paymentRepository) {
        this.paymentRepository = paymentRepository;
    }
    async execute(filters = {}) {
        try {
            // Validate filters
            this.validateFilters(filters);
            // Get payments from repository
            const payments = await this.paymentRepository.getAllPayments(filters);
            return payments;
        }
        catch (error) {
            throw error;
        }
    }
    validateFilters(filters) {
        // Validate pagination
        if (filters.page && (filters.page < 1 || !Number.isInteger(filters.page))) {
            throw new Error("Page must be a positive integer");
        }
        if (filters.limit &&
            (filters.limit < 1 ||
                filters.limit > 100 ||
                !Number.isInteger(filters.limit))) {
            throw new Error("Limit must be between 1 and 100");
        }
        // Validate status filter
        if (filters.status) {
            const validStatuses = ["Pending", "Completed", "Failed", "Refunded"];
            if (!validStatuses.includes(filters.status)) {
                throw new Error("Invalid status filter");
            }
        }
        // Validate payment method filter
        if (filters.paymentMethod) {
            const validMethods = [
                "Cash",
                "Credit Card",
                "Bank Transfer",
                "Check",
                "Online Payment",
            ];
            if (!validMethods.includes(filters.paymentMethod)) {
                throw new Error("Invalid payment method filter");
            }
        }
        // Validate date filters
        if (filters.startDate && filters.endDate) {
            if (new Date(filters.startDate) > new Date(filters.endDate)) {
                throw new Error("Start date cannot be after end date");
            }
        }
    }
}
//# sourceMappingURL=GetAllPaymentsUseCase.js.map