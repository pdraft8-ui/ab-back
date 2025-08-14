export class Notification {
    constructor(notificationData) {
        this.id = notificationData.id || null;
        this.recipient = notificationData.recipient || null;
        this.sender = notificationData.sender || null;
        this.message = notificationData.message || "";
        this.isRead = notificationData.isRead || false;
        this.readAt = notificationData.readAt || null;
        this.createdAt = notificationData.createdAt || new Date();
        this.updatedAt = notificationData.updatedAt || new Date();
    }
    // Business logic methods
    isValid() {
        return !!(this.recipient && this.sender && this.message);
    }
    markAsRead() {
        this.isRead = true;
        this.readAt = new Date();
        this.updatedAt = new Date();
    }
    isUnread() {
        return !this.isRead;
    }
    getTimeSinceCreated() {
        const now = new Date();
        const diffInMs = now - this.createdAt;
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        if (diffInMinutes < 1) {
            return "Just now";
        }
        else if (diffInMinutes < 60) {
            return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
        }
        else if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
        }
        else {
            return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
        }
    }
    toJSON() {
        return {
            id: this.id,
            recipient: this.recipient,
            sender: this.sender,
            message: this.message,
            isRead: this.isRead,
            readAt: this.readAt,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
    static fromJSON(json) {
        return new Notification(json);
    }
}
//# sourceMappingURL=Notification.entity.js.map