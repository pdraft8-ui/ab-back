import {
  NotificationContainer,
  NotificationContainerMinimal,
} from "./infrastructure/container/NotificationContainer.js";

export function getNotificationRoutes() {
  const container = new NotificationContainer();
  return container.getNotificationRoutes();
}

export function getNotificationContainer() {
  return new NotificationContainer();
}

export function getNotificationContainerMinimal() {
  return new NotificationContainerMinimal();
}

// Export individual components for testing
export { Notification } from "./domain/entities/Notification.entity.js";
export { INotificationService } from "./domain/interfaces/INotificationService.js";
export { SendNotificationUseCase } from "./application/usecases/SendNotificationUseCase.js";
export { GetNotificationsUseCase } from "./application/usecases/GetNotificationsUseCase.js";
export { MarkAsReadUseCase } from "./application/usecases/MarkAsReadUseCase.js";
export { MarkAllAsReadUseCase } from "./application/usecases/MarkAllAsReadUseCase.js";
export { GetNotificationStatsUseCase } from "./application/usecases/GetNotificationStatsUseCase.js";
export { NotificationService } from "./infrastructure/services/NotificationService.js";
export { NotificationController } from "./presentation/controllers/NotificationController.js";
export { NotificationRoutes } from "./presentation/routes/NotificationRoutes.js";
