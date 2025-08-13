import {
  TranzilaPaymentContainer,
  TranzilaPaymentContainerMinimal,
} from "./infrastructure/container/TranzilaPaymentContainer.js";

export function getTranzilaPaymentRoutes() {
  const container = new TranzilaPaymentContainer();
  return container.getTranzilaPaymentRoutes();
}

export function getTranzilaPaymentContainer() {
  return new TranzilaPaymentContainer();
}

export function getTranzilaPaymentContainerMinimal() {
  return new TranzilaPaymentContainerMinimal();
}

// Export individual components for testing
export { TranzilaPayment } from "./domain/entities/TranzilaPayment.entity.js";
export { ITranzilaPaymentRepository } from "./domain/interfaces/ITranzilaPaymentRepository.js";
export { CreateTranzilaPaymentUseCase } from "./application/usecases/CreateTranzilaPaymentUseCase.js";
export { MongoTranzilaPaymentRepository } from "./infrastructure/repositories/MongoTranzilaPaymentRepository.js";
export { TranzilaPaymentController } from "./presentation/controllers/TranzilaPaymentController.js";
export { TranzilaPaymentRoutes } from "./presentation/routes/TranzilaPaymentRoutes.js";
