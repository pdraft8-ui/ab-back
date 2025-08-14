export class NotificationController {
    constructor(sendNotificationUseCase: any, getNotificationsUseCase: any, markAsReadUseCase: any, markAllAsReadUseCase: any, getNotificationStatsUseCase: any);
    sendNotificationUseCase: any;
    getNotificationsUseCase: any;
    markAsReadUseCase: any;
    markAllAsReadUseCase: any;
    getNotificationStatsUseCase: any;
    sendNotification(req: any, res: any): Promise<void>;
    getNotifications(req: any, res: any): Promise<void>;
    getNotificationById(req: any, res: any): Promise<any>;
    markAsRead(req: any, res: any): Promise<any>;
    markAllAsRead(req: any, res: any): Promise<void>;
    deleteNotification(req: any, res: any): Promise<any>;
    getNotificationStats(req: any, res: any): Promise<void>;
}
//# sourceMappingURL=NotificationController.d.ts.map