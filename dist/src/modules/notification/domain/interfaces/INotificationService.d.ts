export class INotificationService {
    sendNotification(notificationData: any): Promise<void>;
    getNotifications(userId: any, filters?: {}): Promise<void>;
    getNotificationById(id: any): Promise<void>;
    markAsRead(notificationId: any, userId: any): Promise<void>;
    markAllAsRead(userId: any): Promise<void>;
    deleteNotification(notificationId: any, userId: any): Promise<void>;
    getNotificationStats(userId: any): Promise<void>;
}
//# sourceMappingURL=INotificationService.d.ts.map