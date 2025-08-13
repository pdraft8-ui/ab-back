import { Notification } from "../../domain/entities/Notification.entity.js";

export class SendNotificationUseCase {
  constructor(notificationService) {
    this.notificationService = notificationService;
  }

  async execute(notificationData) {
    try {
      // Validate notification data
      const notification = new Notification(notificationData);

      if (!notification.isValid()) {
        throw new Error(
          "Invalid notification data: recipient, sender, and message are required"
        );
      }

      // Send the notification using the notification service
      const result = await this.notificationService.sendNotification(
        notificationData
      );

      return result;
    } catch (error) {
      console.error("Failed to send notification:", error);
      throw error;
    }
  }
}
