import { INotificationService } from "../../core/interfaces/INotificationService.js";
import {
  createNotification,
  sendNotificationLogic,
} from "../../modules/notification/controller/notification.controller.js";

export class NotificationService extends INotificationService {
  async sendNotification(notificationData) {
    try {
      const { senderId, message, recipients = [] } = notificationData;

      // Create notification
      const notification = await createNotification({
        sender: senderId,
        message,
        recipients,
      });

      // Send notification
      await sendNotificationLogic({
        senderId,
        message,
        recipients,
      });

      return notification;
    } catch (error) {
      console.error("Failed to send notification:", error);
      throw error;
    }
  }
}
