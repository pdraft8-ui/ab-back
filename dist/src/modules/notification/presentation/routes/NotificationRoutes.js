import { Router } from "express";
import { auth } from "../../../../midlleWare/auth.js";
import { validation } from "../../../../midlleWare/validation.js";
import { NotificationController } from "../controllers/NotificationController.js";
export class NotificationRoutes {
    constructor(notificationController) {
        this.router = Router();
        this.notificationController = notificationController;
        this.setupRoutes();
    }
    setupRoutes() {
        // Send notification
        this.router.post("/send", auth(["admin", "manager", "employee"]), this.notificationController.sendNotification.bind(this.notificationController));
        // Get notifications for user
        this.router.get("/", auth(["admin", "manager", "employee"]), this.notificationController.getNotifications.bind(this.notificationController));
        // Get notification by ID
        this.router.get("/:id", auth(["admin", "manager", "employee"]), this.notificationController.getNotificationById.bind(this.notificationController));
        // Mark notification as read
        this.router.patch("/:notificationId/read", auth(["admin", "manager", "employee"]), this.notificationController.markAsRead.bind(this.notificationController));
        // Mark all notifications as read
        this.router.patch("/mark-all-read", auth(["admin", "manager", "employee"]), this.notificationController.markAllAsRead.bind(this.notificationController));
        // Delete notification
        this.router.delete("/:notificationId", auth(["admin", "manager", "employee"]), this.notificationController.deleteNotification.bind(this.notificationController));
        // Get notification statistics
        this.router.get("/stats/overview", auth(["admin", "manager", "employee"]), this.notificationController.getNotificationStats.bind(this.notificationController));
    }
    getRouter() {
        return this.router;
    }
}
//# sourceMappingURL=NotificationRoutes.js.map