// Domain Layer
export { Payment } from "./domain/entities/Payment.entity.js";
export { TranzilaPayment } from "./domain/entities/TranzilaPayment.entity.js";
export { IPaymentRepository } from "./domain/interfaces/IPaymentRepository.js";

// Application Layer
export { CreatePaymentUseCase } from "./application/usecases/CreatePaymentUseCase.js";
export { GetAllPaymentsUseCase } from "./application/usecases/GetAllPaymentsUseCase.js";
export { RefundPaymentUseCase } from "./application/usecases/RefundPaymentUseCase.js";
export { CreateTranzilaPaymentUseCase } from "./application/usecases/CreateTranzilaPaymentUseCase.js";

// Infrastructure Layer
export { MongoPaymentRepository } from "./infrastructure/repositories/MongoPaymentRepository.js";

// Presentation Layer
export { PaymentController } from "./presentation/controllers/PaymentController.js";
export { PaymentRoutes } from "./presentation/routes/PaymentRoutes.js";

// Container
export { default as PaymentContainer } from "./infrastructure/container/PaymentContainer.js";
export { default as PaymentContainerMinimal } from "./infrastructure/container/PaymentContainerMinimal.js";

// Module Container Instance
import paymentContainer from "./infrastructure/container/PaymentContainer.js";
import paymentContainerMinimal from "./infrastructure/container/PaymentContainerMinimal.js";
export { paymentContainer, paymentContainerMinimal };

// Convenience exports
export const getPaymentRoutes = () => paymentContainer.getPaymentRoutes();
export const getPaymentController = () =>
  paymentContainer.getPaymentController();
export const getPaymentRepository = () =>
  paymentContainer.getPaymentRepository();
