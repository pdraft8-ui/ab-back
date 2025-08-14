export function getNotificationRoutes(): any;
export function getNotificationContainer(): NotificationContainer;
export function getNotificationContainerMinimal(): NotificationContainerMinimal;
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
import { NotificationContainer } from "./infrastructure/container/NotificationContainer.js";
import { NotificationContainerMinimal } from "./infrastructure/container/NotificationContainer.js";
//# sourceMappingURL=index.d.ts.map