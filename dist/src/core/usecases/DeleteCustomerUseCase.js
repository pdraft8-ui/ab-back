export class DeleteCustomerUseCase {
    constructor(customerRepository, auditService) {
        this.customerRepository = customerRepository;
        this.auditService = auditService;
    }
    async execute(customerId, userId, userName) {
        try {
            // Get existing customer
            const existingCustomer = await this.customerRepository.getCustomerById(customerId);
            if (!existingCustomer) {
                throw new Error("Customer not found");
            }
            // Check if customer has active insurances or vehicles
            if (existingCustomer.vehicles && existingCustomer.vehicles.length > 0) {
                throw new Error("Cannot delete customer with vehicles. Please remove vehicles first.");
            }
            if (existingCustomer.insurances &&
                existingCustomer.insurances.length > 0) {
                throw new Error("Cannot delete customer with insurances. Please remove insurances first.");
            }
            // Delete customer
            await this.customerRepository.deleteCustomer(customerId);
            // Log audit
            await this.auditService.logAction({
                userId,
                userName,
                action: "DELETE_CUSTOMER",
                entity: "Customer",
                entityId: customerId,
                oldValue: existingCustomer,
            });
            return { message: "Customer deleted successfully" };
        }
        catch (error) {
            throw error;
        }
    }
}
//# sourceMappingURL=DeleteCustomerUseCase.js.map