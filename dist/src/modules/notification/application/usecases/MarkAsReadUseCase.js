export class MarkAsReadUseCase {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async execute(notificationId, userId) {
        try {
            if (!notificationId) {
                throw new Error("Notification ID is required");
            }
            if (!userId) {
                throw new Error("User ID is required");
            }
            const result = await this.notificationService.markAsRead(notificationId, userId);
            if (!result) {
                throw new Error("Notification not found or access denied");
            }
            return result;
        }
        catch (error) {
            console.error("Failed to mark notification as read:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=MarkAsReadUseCase.js.map