export class GetVehicleByIdUseCase {
  constructor(vehicleRepository) {
    this.vehicleRepository = vehicleRepository;
  }

  async execute(id) {
    try {
      if (!id) {
        throw new Error("Vehicle ID is required.");
      }

      const vehicle = await this.vehicleRepository.findById(id);

      if (!vehicle) {
        throw new Error("Vehicle not found.");
      }

      return vehicle;
    } catch (error) {
      console.error("GetVehicleByIdUseCase error:", error);
      throw error;
    }
  }
}
