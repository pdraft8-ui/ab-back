export class NotificationService extends INotificationService {
    sendNotification(notificationData: any): Promise<Notification[]>;
    getNotifications(userId: any, filters?: {}): Promise<{
        notifications: Notification[];
        pagination: {
            page: any;
            limit: any;
            total: number;
            pages: number;
        };
    }>;
    getNotificationById(id: any): Promise<Notification>;
    markAsRead(notificationId: any, userId: any): Promise<Notification>;
    markAllAsRead(userId: any): Promise<{
        modifiedCount: number;
        message: string;
    }>;
    deleteNotification(notificationId: any, userId: any): Promise<Notification>;
    getNotificationStats(userId: any): Promise<{
        totalNotifications: number;
        unreadNotifications: number;
        readNotifications: number;
        todayNotifications: number;
        weeklyNotifications: number;
        readPercentage: number;
    }>;
    mapToNotificationEntity(notificationDoc: any): Notification;
}
import { INotificationService } from "../../domain/interfaces/INotificationService.js";
import { Notification } from "../../domain/entities/Notification.entity.js";
//# sourceMappingURL=NotificationService.d.ts.map