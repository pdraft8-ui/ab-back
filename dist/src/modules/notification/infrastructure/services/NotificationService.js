import { INotificationService } from "../../domain/interfaces/INotificationService.js";
import { Notification } from "../../domain/entities/Notification.entity.js";
import notificationModel from "../../../../../DB/models/notification.model.js";
import User from "../../../../../DB/models/user.model.js";
export class NotificationService extends INotificationService {
    async sendNotification(notificationData) {
        try {
            const { senderId, message, recipients = [] } = notificationData;
            // Get sender information
            const sender = await User.findById(senderId).lean();
            if (!sender) {
                throw new Error("Sender not found");
            }
            // Determine recipients based on sender role
            let finalRecipients = [...recipients];
            if (sender.role === "employee") {
                const departmentHead = await User.findOne({
                    departmentId: sender.departmentId,
                    role: "headOfDepartment",
                }).lean();
                if (departmentHead) {
                    finalRecipients.push(departmentHead._id.toString());
                }
            }
            // Add admins to recipients
            const admins = await User.find({ role: "admin" }).lean();
            finalRecipients.push(...admins.map((admin) => admin._id.toString()));
            // Remove duplicates
            finalRecipients = [...new Set(finalRecipients)];
            // Create notifications for all recipients
            const notifications = await Promise.all(finalRecipients.map(async (recipientId) => {
                const notification = new notificationModel({
                    recipient: recipientId,
                    sender: senderId,
                    message,
                });
                const savedNotification = await notification.save();
                // Send real-time notification via Socket.IO
                const recipientSocket = onlineUsers.get(recipientId);
                if (recipientSocket) {
                    io.to(recipientSocket).emit("newNotification", savedNotification);
                }
                return this.mapToNotificationEntity(savedNotification);
            }));
            return notifications;
        }
        catch (error) {
            console.error("Failed to send notification:", error);
            throw error;
        }
    }
    async getNotifications(userId, filters = {}) {
        try {
            const { page = 1, limit = 10, isRead, sortBy = "createdAt", sortOrder = "desc", } = filters;
            const query = { recipient: userId };
            if (isRead !== undefined) {
                query.isRead = isRead;
            }
            const skip = (page - 1) * limit;
            const sort = { [sortBy]: sortOrder === "desc" ? -1 : 1 };
            const notifications = await notificationModel
                .find(query)
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .populate("sender", "name email")
                .populate("recipient", "name email");
            const total = await notificationModel.countDocuments(query);
            return {
                notifications: notifications.map((notification) => this.mapToNotificationEntity(notification)),
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit),
                },
            };
        }
        catch (error) {
            console.error("Failed to get notifications:", error);
            throw error;
        }
    }
    async getNotificationById(id) {
        try {
            const notification = await notificationModel
                .findById(id)
                .populate("sender", "name email")
                .populate("recipient", "name email");
            return notification ? this.mapToNotificationEntity(notification) : null;
        }
        catch (error) {
            console.error("Failed to get notification by ID:", error);
            throw error;
        }
    }
    async markAsRead(notificationId, userId) {
        try {
            const notification = await notificationModel
                .findOneAndUpdate({ _id: notificationId, recipient: userId }, { isRead: true, readAt: new Date() }, { new: true })
                .populate("sender", "name email");
            return notification ? this.mapToNotificationEntity(notification) : null;
        }
        catch (error) {
            console.error("Failed to mark notification as read:", error);
            throw error;
        }
    }
    async markAllAsRead(userId) {
        try {
            const result = await notificationModel.updateMany({ recipient: userId, isRead: false }, { isRead: true, readAt: new Date() });
            return {
                modifiedCount: result.modifiedCount,
                message: `Marked ${result.modifiedCount} notifications as read`,
            };
        }
        catch (error) {
            console.error("Failed to mark all notifications as read:", error);
            throw error;
        }
    }
    async deleteNotification(notificationId, userId) {
        try {
            const notification = await notificationModel.findOneAndDelete({
                _id: notificationId,
                recipient: userId,
            });
            return notification ? this.mapToNotificationEntity(notification) : null;
        }
        catch (error) {
            console.error("Failed to delete notification:", error);
            throw error;
        }
    }
    async getNotificationStats(userId) {
        try {
            const totalNotifications = await notificationModel.countDocuments({
                recipient: userId,
            });
            const unreadNotifications = await notificationModel.countDocuments({
                recipient: userId,
                isRead: false,
            });
            const readNotifications = await notificationModel.countDocuments({
                recipient: userId,
                isRead: true,
            });
            const todayNotifications = await notificationModel.countDocuments({
                recipient: userId,
                createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
            });
            const weeklyNotifications = await notificationModel.countDocuments({
                recipient: userId,
                createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
            });
            return {
                totalNotifications,
                unreadNotifications,
                readNotifications,
                todayNotifications,
                weeklyNotifications,
                readPercentage: totalNotifications > 0
                    ? Math.round((readNotifications / totalNotifications) * 100)
                    : 0,
            };
        }
        catch (error) {
            console.error("Failed to get notification stats:", error);
            throw error;
        }
    }
    mapToNotificationEntity(notificationDoc) {
        return new Notification({
            id: notificationDoc._id,
            recipient: notificationDoc.recipient,
            sender: notificationDoc.sender,
            message: notificationDoc.message,
            isRead: notificationDoc.isRead,
            readAt: notificationDoc.readAt,
            createdAt: notificationDoc.createdAt,
            updatedAt: notificationDoc.updatedAt,
        });
    }
}
//# sourceMappingURL=NotificationService.js.map