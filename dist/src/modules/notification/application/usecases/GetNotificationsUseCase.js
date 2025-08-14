export class GetNotificationsUseCase {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async execute(userId, filters = {}) {
        try {
            if (!userId) {
                throw new Error("User ID is required");
            }
            const notifications = await this.notificationService.getNotifications(userId, filters);
            return notifications;
        }
        catch (error) {
            console.error("Failed to get notifications:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=GetNotificationsUseCase.js.map