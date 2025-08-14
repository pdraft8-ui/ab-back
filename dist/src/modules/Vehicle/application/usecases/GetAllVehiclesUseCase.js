export class GetAllVehiclesUseCase {
    constructor(vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }
    async execute() {
        try {
            const vehicles = await this.vehicleRepository.findAll();
            return vehicles;
        }
        catch (error) {
            console.error("GetAllVehiclesUseCase error:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=GetAllVehiclesUseCase.js.map