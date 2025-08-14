export class GetAllCustomersUseCase {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async execute(filters = {}) {
        try {
            const customers = await this.customerRepository.getAllCustomers(filters);
            return customers;
        }
        catch (error) {
            throw error;
        }
    }
}
//# sourceMappingURL=GetAllCustomersUseCase.js.map