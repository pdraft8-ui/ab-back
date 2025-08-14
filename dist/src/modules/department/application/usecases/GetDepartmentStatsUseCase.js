export class GetDepartmentStatsUseCase {
    constructor(departmentRepository) {
        this.departmentRepository = departmentRepository;
    }
    async execute() {
        try {
            const stats = await this.departmentRepository.getStats();
            return {
                success: true,
                message: "Department statistics retrieved successfully",
                stats,
            };
        }
        catch (error) {
            console.error("Failed to retrieve department statistics:", error);
            return {
                success: false,
                message: "Failed to retrieve department statistics",
                error: error.message,
            };
        }
    }
}
//# sourceMappingURL=GetDepartmentStatsUseCase.js.map