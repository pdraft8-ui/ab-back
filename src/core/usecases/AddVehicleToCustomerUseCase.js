export class AddVehicleToCustomerUseCase {
  constructor(customerRepository, auditService) {
    this.customerRepository = customerRepository;
    this.auditService = auditService;
  }

  async execute(customerId, vehicleData, userId, userName) {
    try {
      // Get existing customer
      const existingCustomer = await this.customerRepository.getCustomerById(
        customerId
      );
      if (!existingCustomer) {
        throw new Error("Customer not found");
      }

      // Check if vehicle with same plate number already exists
      const existingVehicle =
        await this.customerRepository.getVehicleByPlateNumber(
          vehicleData.plateNumber
        );
      if (existingVehicle) {
        throw new Error("Vehicle with this plate number already exists");
      }

      // Add vehicle to customer
      const updatedCustomer =
        await this.customerRepository.addVehicleToCustomer(
          customerId,
          vehicleData
        );

      // Log audit
      await this.auditService.logAction({
        userId,
        userName,
        action: "ADD_VEHICLE_TO_CUSTOMER",
        entity: "Customer",
        entityId: customerId,
        newValue: {
          vehicle: vehicleData,
          customerId,
        },
      });

      return updatedCustomer;
    } catch (error) {
      throw error;
    }
  }
}
