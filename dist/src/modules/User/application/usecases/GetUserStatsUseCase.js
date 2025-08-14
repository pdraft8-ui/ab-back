export class GetUserStatsUseCase {
    constructor(userService) {
        this.userService = userService;
    }
    async execute() {
        try {
            // Get user statistics
            const stats = await this.userService.getUserStats();
            return stats;
        }
        catch (error) {
            throw error;
        }
    }
}
//# sourceMappingURL=GetUserStatsUseCase.js.map