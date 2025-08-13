// Export containers
export { ChequeContainer } from "./infrastructure/container/ChequeContainer.js";

// Export route factory
export const getChequeRoutes = async () => {
  const { ChequeContainer } = await import(
    "./infrastructure/container/ChequeContainer.js"
  );
  const container = new ChequeContainer();
  return container.getChequeRoutes();
};

// Export domain entities
export { Cheque } from "./domain/entities/Cheque.entity.js";

// Export interfaces
export { IChequeRepository } from "./domain/interfaces/IChequeRepository.js";

// Export use cases
export { CreateChequeUseCase } from "./application/usecases/CreateChequeUseCase.js";
export { GetAllChequesUseCase } from "./application/usecases/GetAllChequesUseCase.js";

// Export infrastructure
export { MongoChequeRepository } from "./infrastructure/repositories/MongoChequeRepository.js";

// Export presentation
export { ChequeController } from "./presentation/controllers/ChequeController.js";
export { ChequeRoutes } from "./presentation/routes/ChequeRoutes.js";
