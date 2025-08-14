export class GetAllPaymentsUseCase {
    constructor(paymentRepository) {
        this.paymentRepository = paymentRepository;
    }
    async execute(filters = {}) {
        try {
            const payments = await this.paymentRepository.getAllPayments(filters);
            return payments;
        }
        catch (error) {
            throw new Error(`Failed to get payments: ${error.message}`);
        }
    }
}
//# sourceMappingURL=GetAllPaymentsUseCase.js.map