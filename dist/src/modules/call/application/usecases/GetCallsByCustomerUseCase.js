export class GetCallsByCustomerUseCase {
    constructor(callRepository) {
        this.callRepository = callRepository;
    }
    async execute(customerId) {
        try {
            if (!customerId) {
                throw new Error("Customer ID is required");
            }
            const calls = await this.callRepository.findByCustomerId(customerId);
            return calls;
        }
        catch (error) {
            console.error("GetCallsByCustomerUseCase error:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=GetCallsByCustomerUseCase.js.map