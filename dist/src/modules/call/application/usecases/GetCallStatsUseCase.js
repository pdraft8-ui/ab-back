export class GetCallStatsUseCase {
    constructor(callRepository) {
        this.callRepository = callRepository;
    }
    async execute() {
        try {
            const stats = await this.callRepository.getStats();
            return stats;
        }
        catch (error) {
            console.error("GetCallStatsUseCase error:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=GetCallStatsUseCase.js.map