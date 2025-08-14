export class GetRoadServiceStatsUseCase {
    constructor(roadServiceRepository) {
        this.roadServiceRepository = roadServiceRepository;
    }
    async execute() {
        try {
            const stats = await this.roadServiceRepository.getStats();
            return stats;
        }
        catch (error) {
            console.error("GetRoadServiceStatsUseCase error:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=GetRoadServiceStatsUseCase.js.map