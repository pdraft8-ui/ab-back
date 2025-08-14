import { NotificationService } from "../services/NotificationService.js";
import { SendNotificationUseCase } from "../../application/usecases/SendNotificationUseCase.js";
import { GetNotificationsUseCase } from "../../application/usecases/GetNotificationsUseCase.js";
import { MarkAsReadUseCase } from "../../application/usecases/MarkAsReadUseCase.js";
import { MarkAllAsReadUseCase } from "../../application/usecases/MarkAllAsReadUseCase.js";
import { GetNotificationStatsUseCase } from "../../application/usecases/GetNotificationStatsUseCase.js";
import { NotificationController } from "../../presentation/controllers/NotificationController.js";
import { NotificationRoutes } from "../../presentation/routes/NotificationRoutes.js";
export class NotificationContainer {
    constructor() {
        this.services = new Map();
        this.initializeServices();
    }
    initializeServices() {
        // Infrastructure services
        this.services.set("notificationService", new NotificationService());
        // Application use cases
        this.services.set("sendNotificationUseCase", new SendNotificationUseCase(this.services.get("notificationService")));
        this.services.set("getNotificationsUseCase", new GetNotificationsUseCase(this.services.get("notificationService")));
        this.services.set("markAsReadUseCase", new MarkAsReadUseCase(this.services.get("notificationService")));
        this.services.set("markAllAsReadUseCase", new MarkAllAsReadUseCase(this.services.get("notificationService")));
        this.services.set("getNotificationStatsUseCase", new GetNotificationStatsUseCase(this.services.get("notificationService")));
        // Presentation controllers
        this.services.set("notificationController", new NotificationController(this.services.get("sendNotificationUseCase"), this.services.get("getNotificationsUseCase"), this.services.get("markAsReadUseCase"), this.services.get("markAllAsReadUseCase"), this.services.get("getNotificationStatsUseCase")));
        // Presentation routes
        this.services.set("notificationRoutes", new NotificationRoutes(this.services.get("notificationController")));
    }
    getNotificationService() {
        return this.services.get("notificationService");
    }
    getSendNotificationUseCase() {
        return this.services.get("sendNotificationUseCase");
    }
    getGetNotificationsUseCase() {
        return this.services.get("getNotificationsUseCase");
    }
    getMarkAsReadUseCase() {
        return this.services.get("markAsReadUseCase");
    }
    getMarkAllAsReadUseCase() {
        return this.services.get("markAllAsReadUseCase");
    }
    getGetNotificationStatsUseCase() {
        return this.services.get("getNotificationStatsUseCase");
    }
    getNotificationController() {
        return this.services.get("notificationController");
    }
    getNotificationRoutes() {
        return this.services.get("notificationRoutes");
    }
}
// Minimal container for testing with mock services
export class NotificationContainerMinimal {
    constructor() {
        this.services = new Map();
        this.initializeServices();
    }
    initializeServices() {
        // Mock notification service for testing
        const mockNotificationService = {
            async sendNotification(notificationData) {
                return [
                    {
                        id: "mock-notification-1",
                        recipient: notificationData.recipients[0] || "user1",
                        sender: notificationData.senderId,
                        message: notificationData.message,
                        isRead: false,
                        readAt: null,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                ];
            },
            async getNotifications(userId, filters = {}) {
                return {
                    notifications: [
                        {
                            id: "mock-notification-1",
                            recipient: userId,
                            sender: "sender1",
                            message: "Test notification",
                            isRead: false,
                            readAt: null,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        },
                    ],
                    pagination: {
                        page: 1,
                        limit: 10,
                        total: 1,
                        pages: 1,
                    },
                };
            },
            async getNotificationById(id) {
                return {
                    id: id,
                    recipient: "user1",
                    sender: "sender1",
                    message: "Test notification",
                    isRead: false,
                    readAt: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
            },
            async markAsRead(notificationId, userId) {
                return {
                    id: notificationId,
                    recipient: userId,
                    sender: "sender1",
                    message: "Test notification",
                    isRead: true,
                    readAt: new Date(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
            },
            async markAllAsRead(userId) {
                return {
                    modifiedCount: 5,
                    message: "Marked 5 notifications as read",
                };
            },
            async deleteNotification(notificationId, userId) {
                return {
                    id: notificationId,
                    recipient: userId,
                    sender: "sender1",
                    message: "Test notification",
                    isRead: false,
                    readAt: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
            },
            async getNotificationStats(userId) {
                return {
                    totalNotifications: 10,
                    unreadNotifications: 3,
                    readNotifications: 7,
                    todayNotifications: 2,
                    weeklyNotifications: 5,
                    readPercentage: 70,
                };
            },
        };
        this.services.set("notificationService", mockNotificationService);
        // Application use cases
        this.services.set("sendNotificationUseCase", new SendNotificationUseCase(this.services.get("notificationService")));
        this.services.set("getNotificationsUseCase", new GetNotificationsUseCase(this.services.get("notificationService")));
        this.services.set("markAsReadUseCase", new MarkAsReadUseCase(this.services.get("notificationService")));
        this.services.set("markAllAsReadUseCase", new MarkAllAsReadUseCase(this.services.get("notificationService")));
        this.services.set("getNotificationStatsUseCase", new GetNotificationStatsUseCase(this.services.get("notificationService")));
        // Presentation controllers
        this.services.set("notificationController", new NotificationController(this.services.get("sendNotificationUseCase"), this.services.get("getNotificationsUseCase"), this.services.get("markAsReadUseCase"), this.services.get("markAllAsReadUseCase"), this.services.get("getNotificationStatsUseCase")));
        // Presentation routes
        this.services.set("notificationRoutes", new NotificationRoutes(this.services.get("notificationController")));
    }
    getNotificationService() {
        return this.services.get("notificationService");
    }
    getSendNotificationUseCase() {
        return this.services.get("sendNotificationUseCase");
    }
    getGetNotificationsUseCase() {
        return this.services.get("getNotificationsUseCase");
    }
    getMarkAsReadUseCase() {
        return this.services.get("markAsReadUseCase");
    }
    getMarkAllAsReadUseCase() {
        return this.services.get("markAllAsReadUseCase");
    }
    getGetNotificationStatsUseCase() {
        return this.services.get("getNotificationStatsUseCase");
    }
    getNotificationController() {
        return this.services.get("notificationController");
    }
    getNotificationRoutes() {
        return this.services.get("notificationRoutes");
    }
}
//# sourceMappingURL=NotificationContainer.js.map