export class GetVehicleStatsUseCase {
    constructor(vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }
    async execute() {
        try {
            const stats = await this.vehicleRepository.getStats();
            return stats;
        }
        catch (error) {
            console.error("GetVehicleStatsUseCase error:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=GetVehicleStatsUseCase.js.map