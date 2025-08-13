import { Customer } from "../../domain/entities/Customer.entity.js";

export class UpdateCustomerUseCase {
  constructor(customerRepository, auditService) {
    this.customerRepository = customerRepository;
    this.auditService = auditService;
  }

  async execute(customerId, updateData, userId, userName) {
    try {
      // Get existing customer
      const existingCustomer = await this.customerRepository.getCustomerById(
        customerId
      );
      if (!existingCustomer) {
        throw new Error("Customer not found");
      }

      // Validate update data
      const customer = new Customer({ ...existingCustomer, ...updateData });
      const validationErrors = customer.validateCustomerData();

      if (validationErrors.length > 0) {
        throw new Error(`Validation failed: ${validationErrors.join(", ")}`);
      }

      // Check if ID number is being changed and if it conflicts
      if (
        updateData.id_Number &&
        updateData.id_Number !== existingCustomer.id_Number
      ) {
        const existingCustomerWithId =
          await this.customerRepository.getCustomerByIdNumber(
            updateData.id_Number
          );
        if (
          existingCustomerWithId &&
          existingCustomerWithId.id !== customerId
        ) {
          throw new Error("Customer with this ID number already exists");
        }
      }

      // Update customer
      const updatedCustomer = await this.customerRepository.updateCustomer(
        customerId,
        updateData
      );

      // Log audit
      await this.auditService.logAction({
        userId,
        userName,
        action: "UPDATE_CUSTOMER",
        entity: "Customer",
        entityId: customerId,
        oldValue: existingCustomer,
        newValue: updatedCustomer,
      });

      return updatedCustomer;
    } catch (error) {
      throw error;
    }
  }
}
