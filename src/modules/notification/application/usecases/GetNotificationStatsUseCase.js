export class GetNotificationStatsUseCase {
  constructor(notificationService) {
    this.notificationService = notificationService;
  }

  async execute(userId) {
    try {
      if (!userId) {
        throw new Error("User ID is required");
      }

      const stats = await this.notificationService.getNotificationStats(userId);
      return stats;
    } catch (error) {
      console.error("Failed to get notification stats:", error);
      throw error;
    }
  }
}
