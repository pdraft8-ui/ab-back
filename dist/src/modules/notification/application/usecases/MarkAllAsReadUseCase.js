export class MarkAllAsReadUseCase {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async execute(userId) {
        try {
            if (!userId) {
                throw new Error("User ID is required");
            }
            const result = await this.notificationService.markAllAsRead(userId);
            return result;
        }
        catch (error) {
            console.error("Failed to mark all notifications as read:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=MarkAllAsReadUseCase.js.map