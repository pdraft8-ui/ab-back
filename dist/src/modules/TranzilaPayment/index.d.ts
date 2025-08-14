export function getTranzilaPaymentRoutes(): any;
export function getTranzilaPaymentContainer(): TranzilaPaymentContainer;
export function getTranzilaPaymentContainerMinimal(): TranzilaPaymentContainerMinimal;
export { TranzilaPayment } from "./domain/entities/TranzilaPayment.entity.js";
export { ITranzilaPaymentRepository } from "./domain/interfaces/ITranzilaPaymentRepository.js";
export { CreateTranzilaPaymentUseCase } from "./application/usecases/CreateTranzilaPaymentUseCase.js";
export { MongoTranzilaPaymentRepository } from "./infrastructure/repositories/MongoTranzilaPaymentRepository.js";
export { TranzilaPaymentController } from "./presentation/controllers/TranzilaPaymentController.js";
export { TranzilaPaymentRoutes } from "./presentation/routes/TranzilaPaymentRoutes.js";
import { TranzilaPaymentContainer } from "./infrastructure/container/TranzilaPaymentContainer.js";
import { TranzilaPaymentContainerMinimal } from "./infrastructure/container/TranzilaPaymentContainer.js";
//# sourceMappingURL=index.d.ts.map