import { Customer } from "../entities/Customer.entity.js";

export class CreateCustomerUseCase {
  constructor(customerRepository, notificationService, auditService) {
    this.customerRepository = customerRepository;
    this.notificationService = notificationService;
    this.auditService = auditService;
  }

  async execute(customerData, userId, userName) {
    try {
      // Validate customer data
      const customer = new Customer(customerData);
      const validationErrors = customer.validateCustomerData();

      if (validationErrors.length > 0) {
        throw new Error(`Validation failed: ${validationErrors.join(", ")}`);
      }

      // Check if customer already exists
      const existingCustomer =
        await this.customerRepository.getCustomerByIdNumber(
          customerData.id_Number
        );
      if (existingCustomer) {
        throw new Error("Customer with this ID number already exists");
      }

      // Create customer
      const createdCustomer = await this.customerRepository.createCustomer(
        customerData
      );

      // Log audit
      await this.auditService.logAction({
        userId,
        userName,
        action: "CREATE_CUSTOMER",
        entity: "Customer",
        entityId: createdCustomer.id,
        newValue: createdCustomer,
      });

      // Send notification
      await this.notificationService.sendNotification({
        type: "CUSTOMER_CREATED",
        title: "New Customer Added",
        message: `Customer ${customer.getFullName()} has been successfully added`,
        recipientId: userId,
        data: {
          customerId: createdCustomer.id,
          customerName: customer.getFullName(),
        },
      });

      return createdCustomer;
    } catch (error) {
      throw error;
    }
  }
}
