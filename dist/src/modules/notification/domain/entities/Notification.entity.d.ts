export class Notification {
    static fromJSON(json: any): Notification;
    constructor(notificationData: any);
    id: any;
    recipient: any;
    sender: any;
    message: any;
    isRead: any;
    readAt: any;
    createdAt: any;
    updatedAt: any;
    isValid(): boolean;
    markAsRead(): void;
    isUnread(): boolean;
    getTimeSinceCreated(): string;
    toJSON(): {
        id: any;
        recipient: any;
        sender: any;
        message: any;
        isRead: any;
        readAt: any;
        createdAt: any;
        updatedAt: any;
    };
}
//# sourceMappingURL=Notification.entity.d.ts.map