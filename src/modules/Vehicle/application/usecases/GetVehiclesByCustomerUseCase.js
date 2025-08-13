export class GetVehiclesByCustomerUseCase {
  constructor(vehicleRepository, customerRepository) {
    this.vehicleRepository = vehicleRepository;
    this.customerRepository = customerRepository;
  }

  async execute(customerId) {
    try {
      if (!customerId) {
        throw new Error("Customer ID is required.");
      }

      // Check if customer exists
      const customer = await this.customerRepository.findById(customerId);
      if (!customer) {
        throw new Error("Customer not found.");
      }

      const vehicles = await this.vehicleRepository.findByCustomerId(
        customerId
      );
      return vehicles;
    } catch (error) {
      console.error("GetVehiclesByCustomerUseCase error:", error);
      throw error;
    }
  }
}
