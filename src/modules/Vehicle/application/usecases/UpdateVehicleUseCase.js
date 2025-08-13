import { Vehicle } from "../../domain/entities/Vehicle.entity.js";

export class UpdateVehicleUseCase {
  constructor(vehicleRepository, auditService) {
    this.vehicleRepository = vehicleRepository;
    this.auditService = auditService;
  }

  async execute(id, vehicleData, userId, userName) {
    try {
      if (!id) {
        throw new Error("Vehicle ID is required.");
      }

      // Check if vehicle exists
      const existingVehicle = await this.vehicleRepository.findById(id);
      if (!existingVehicle) {
        throw new Error("Vehicle not found.");
      }

      // Validate updated vehicle data
      const updatedVehicleData = {
        ...existingVehicle.toJSON(),
        ...vehicleData,
      };
      const vehicle = new Vehicle(updatedVehicleData);

      if (!vehicle.isValid()) {
        throw new Error(
          "Invalid vehicle data. All required fields must be provided."
        );
      }

      if (!vehicle.hasValidPlateNumber()) {
        throw new Error(
          "Invalid plate number. Plate number must be a positive number."
        );
      }

      // Check if plate number already exists (excluding current vehicle)
      if (
        vehicleData.plateNumber &&
        vehicleData.plateNumber !== existingVehicle.plateNumber
      ) {
        const vehicleWithSamePlate =
          await this.vehicleRepository.findByPlateNumber(
            vehicleData.plateNumber
          );
        if (vehicleWithSamePlate && vehicleWithSamePlate.id !== id) {
          throw new Error("Vehicle with this plate number already exists.");
        }
      }

      // Update the vehicle
      const updatedVehicle = await this.vehicleRepository.update(
        id,
        vehicleData
      );

      // Log audit
      if (this.auditService) {
        await this.auditService.logAction({
          userId,
          userName,
          action: "UPDATE_VEHICLE",
          entity: "Vehicle",
          entityId: id,
          oldValue: existingVehicle.toJSON(),
          newValue: updatedVehicle.toJSON(),
        });
      }

      return updatedVehicle;
    } catch (error) {
      console.error("UpdateVehicleUseCase error:", error);
      throw error;
    }
  }
}
