export class GetAuditStatsUseCase {
    constructor(auditService) {
        this.auditService = auditService;
    }
    async execute() {
        try {
            const stats = await this.auditService.getAuditStats();
            return stats;
        }
        catch (error) {
            console.error("Failed to get audit stats:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=GetAuditStatsUseCase.js.map