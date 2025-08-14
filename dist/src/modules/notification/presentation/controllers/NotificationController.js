import { SendNotificationUseCase } from "../../application/usecases/SendNotificationUseCase.js";
import { GetNotificationsUseCase } from "../../application/usecases/GetNotificationsUseCase.js";
import { MarkAsReadUseCase } from "../../application/usecases/MarkAsReadUseCase.js";
import { MarkAllAsReadUseCase } from "../../application/usecases/MarkAllAsReadUseCase.js";
import { GetNotificationStatsUseCase } from "../../application/usecases/GetNotificationStatsUseCase.js";
export class NotificationController {
    constructor(sendNotificationUseCase, getNotificationsUseCase, markAsReadUseCase, markAllAsReadUseCase, getNotificationStatsUseCase) {
        this.sendNotificationUseCase = sendNotificationUseCase;
        this.getNotificationsUseCase = getNotificationsUseCase;
        this.markAsReadUseCase = markAsReadUseCase;
        this.markAllAsReadUseCase = markAllAsReadUseCase;
        this.getNotificationStatsUseCase = getNotificationStatsUseCase;
    }
    // Send notification
    async sendNotification(req, res) {
        try {
            const notificationData = {
                senderId: req.user.id,
                message: req.body.message,
                recipients: req.body.recipients || [],
            };
            const result = await this.sendNotificationUseCase.execute(notificationData);
            res.status(201).json({
                success: true,
                message: "Notification(s) sent successfully",
                data: result,
            });
        }
        catch (error) {
            console.error("Error sending notification:", error);
            res.status(500).json({
                success: false,
                message: "Failed to send notification",
                error: error.message,
            });
        }
    }
    // Get notifications for user
    async getNotifications(req, res) {
        try {
            const userId = req.user.id;
            const filters = {
                page: parseInt(req.query.page) || 1,
                limit: parseInt(req.query.limit) || 10,
                isRead: req.query.isRead !== undefined
                    ? req.query.isRead === "true"
                    : undefined,
                sortBy: req.query.sortBy || "createdAt",
                sortOrder: req.query.sortOrder || "desc",
            };
            const result = await this.getNotificationsUseCase.execute(userId, filters);
            res.status(200).json({
                success: true,
                message: "Notifications retrieved successfully",
                data: result,
            });
        }
        catch (error) {
            console.error("Error getting notifications:", error);
            res.status(500).json({
                success: false,
                message: "Failed to get notifications",
                error: error.message,
            });
        }
    }
    // Get notification by ID
    async getNotificationById(req, res) {
        try {
            const { id } = req.params;
            const notification = await this.notificationService.getNotificationById(id);
            if (!notification) {
                return res.status(404).json({
                    success: false,
                    message: "Notification not found",
                });
            }
            res.status(200).json({
                success: true,
                message: "Notification retrieved successfully",
                data: notification,
            });
        }
        catch (error) {
            console.error("Error getting notification by ID:", error);
            res.status(500).json({
                success: false,
                message: "Failed to get notification",
                error: error.message,
            });
        }
    }
    // Mark notification as read
    async markAsRead(req, res) {
        try {
            const { notificationId } = req.params;
            const userId = req.user.id;
            const result = await this.markAsReadUseCase.execute(notificationId, userId);
            res.status(200).json({
                success: true,
                message: "Notification marked as read successfully",
                data: result,
            });
        }
        catch (error) {
            console.error("Error marking notification as read:", error);
            if (error.message === "Notification not found or access denied") {
                return res.status(404).json({
                    success: false,
                    message: "Notification not found or access denied",
                });
            }
            res.status(500).json({
                success: false,
                message: "Failed to mark notification as read",
                error: error.message,
            });
        }
    }
    // Mark all notifications as read
    async markAllAsRead(req, res) {
        try {
            const userId = req.user.id;
            const result = await this.markAllAsReadUseCase.execute(userId);
            res.status(200).json({
                success: true,
                message: "All notifications marked as read successfully",
                data: result,
            });
        }
        catch (error) {
            console.error("Error marking all notifications as read:", error);
            res.status(500).json({
                success: false,
                message: "Failed to mark all notifications as read",
                error: error.message,
            });
        }
    }
    // Delete notification
    async deleteNotification(req, res) {
        try {
            const { notificationId } = req.params;
            const userId = req.user.id;
            const result = await this.notificationService.deleteNotification(notificationId, userId);
            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: "Notification not found or access denied",
                });
            }
            res.status(200).json({
                success: true,
                message: "Notification deleted successfully",
                data: result,
            });
        }
        catch (error) {
            console.error("Error deleting notification:", error);
            res.status(500).json({
                success: false,
                message: "Failed to delete notification",
                error: error.message,
            });
        }
    }
    // Get notification statistics
    async getNotificationStats(req, res) {
        try {
            const userId = req.user.id;
            const stats = await this.getNotificationStatsUseCase.execute(userId);
            res.status(200).json({
                success: true,
                message: "Notification statistics retrieved successfully",
                data: stats,
            });
        }
        catch (error) {
            console.error("Error getting notification stats:", error);
            res.status(500).json({
                success: false,
                message: "Failed to get notification statistics",
                error: error.message,
            });
        }
    }
}
//# sourceMappingURL=NotificationController.js.map