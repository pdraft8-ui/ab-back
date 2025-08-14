import { Vehicle } from "../../domain/entities/Vehicle.entity.js";
export class CreateVehicleUseCase {
    constructor(vehicleRepository, customerRepository, auditService) {
        this.vehicleRepository = vehicleRepository;
        this.customerRepository = customerRepository;
        this.auditService = auditService;
    }
    async execute(vehicleData, userId, userName) {
        try {
            // Validate vehicle data
            const vehicle = new Vehicle(vehicleData);
            if (!vehicle.isValid()) {
                throw new Error("Invalid vehicle data. All required fields must be provided.");
            }
            if (!vehicle.hasValidPlateNumber()) {
                throw new Error("Invalid plate number. Plate number must be a positive number.");
            }
            if (!vehicle.hasValidCustomer()) {
                throw new Error("Customer ID is required.");
            }
            // Check if customer exists
            const customer = await this.customerRepository.findById(vehicleData.customerId);
            if (!customer) {
                throw new Error("Customer not found.");
            }
            // Check if plate number already exists
            const existingVehicle = await this.vehicleRepository.findByPlateNumber(vehicleData.plateNumber);
            if (existingVehicle) {
                throw new Error("Vehicle with this plate number already exists.");
            }
            // Create the vehicle
            const createdVehicle = await this.vehicleRepository.create(vehicleData);
            // Log audit
            if (this.auditService) {
                await this.auditService.logAction({
                    userId,
                    userName,
                    action: "CREATE_VEHICLE",
                    entity: "Vehicle",
                    entityId: createdVehicle.id,
                    newValue: createdVehicle.toJSON(),
                });
            }
            return createdVehicle;
        }
        catch (error) {
            console.error("CreateVehicleUseCase error:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=CreateVehicleUseCase.js.map