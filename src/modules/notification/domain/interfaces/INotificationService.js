import { Notification } from "../entities/Notification.entity.js";

export class INotificationService {
  async sendNotification(notificationData) {
    throw new Error("Method not implemented");
  }

  async getNotifications(userId, filters = {}) {
    throw new Error("Method not implemented");
  }

  async getNotificationById(id) {
    throw new Error("Method not implemented");
  }

  async markAsRead(notificationId, userId) {
    throw new Error("Method not implemented");
  }

  async markAllAsRead(userId) {
    throw new Error("Method not implemented");
  }

  async deleteNotification(notificationId, userId) {
    throw new Error("Method not implemented");
  }

  async getNotificationStats(userId) {
    throw new Error("Method not implemented");
  }
}
