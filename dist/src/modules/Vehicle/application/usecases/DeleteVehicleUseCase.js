export class DeleteVehicleUseCase {
    constructor(vehicleRepository, auditService) {
        this.vehicleRepository = vehicleRepository;
        this.auditService = auditService;
    }
    async execute(id, userId, userName) {
        try {
            if (!id) {
                throw new Error("Vehicle ID is required.");
            }
            // Check if vehicle exists
            const existingVehicle = await this.vehicleRepository.findById(id);
            if (!existingVehicle) {
                throw new Error("Vehicle not found.");
            }
            // Check if vehicle has active insurance
            if (existingVehicle.hasInsurance()) {
                const activeInsurance = existingVehicle.getActiveInsurance();
                if (activeInsurance) {
                    throw new Error("Cannot delete vehicle with active insurance.");
                }
            }
            // Delete the vehicle
            const deletedVehicle = await this.vehicleRepository.delete(id);
            // Log audit
            if (this.auditService) {
                await this.auditService.logAction({
                    userId,
                    userName,
                    action: "DELETE_VEHICLE",
                    entity: "Vehicle",
                    entityId: id,
                    oldValue: existingVehicle.toJSON(),
                });
            }
            return deletedVehicle;
        }
        catch (error) {
            console.error("DeleteVehicleUseCase error:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=DeleteVehicleUseCase.js.map