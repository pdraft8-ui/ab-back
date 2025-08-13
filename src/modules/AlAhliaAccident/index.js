// Export domain entities
export { AlAhliaAccident } from "./domain/entities/AlAhliaAccident.entity.js";

// Export domain interfaces
export { IAlAhliaAccidentRepository } from "./domain/interfaces/IAlAhliaAccidentRepository.js";

// Export application use cases
export { CreateAlAhliaAccidentUseCase } from "./application/usecases/CreateAlAhliaAccidentUseCase.js";
export { GetAllAlAhliaAccidentsUseCase } from "./application/usecases/GetAllAlAhliaAccidentsUseCase.js";
export { GetAlAhliaAccidentByIdUseCase } from "./application/usecases/GetAlAhliaAccidentByIdUseCase.js";
export { DeleteAlAhliaAccidentUseCase } from "./application/usecases/DeleteAlAhliaAccidentUseCase.js";
export { GetAlAhliaAccidentStatsUseCase } from "./application/usecases/GetAlAhliaAccidentStatsUseCase.js";

// Export infrastructure repositories
export { MongoAlAhliaAccidentRepository } from "./infrastructure/repositories/MongoAlAhliaAccidentRepository.js";

// Export presentation controllers and routes
export { AlAhliaAccidentController } from "./presentation/controllers/AlAhliaAccidentController.js";
export { AlAhliaAccidentRoutes } from "./presentation/routes/AlAhliaAccidentRoutes.js";

// Export containers
export {
  AlAhliaAccidentContainer,
  AlAhliaAccidentContainerMinimal,
} from "./infrastructure/container/AlAhliaAccidentContainer.js";

// Route factory function
export async function getAlAhliaAccidentRoutes() {
  const { AlAhliaAccidentContainer } = await import(
    "./infrastructure/container/AlAhliaAccidentContainer.js"
  );
  const container = new AlAhliaAccidentContainer();
  return container.get("alAhliaAccidentRoutes");
}

// Container factory functions
export async function getAlAhliaAccidentContainer() {
  const { AlAhliaAccidentContainer } = await import(
    "./infrastructure/container/AlAhliaAccidentContainer.js"
  );
  return new AlAhliaAccidentContainer();
}

export async function getAlAhliaAccidentContainerMinimal() {
  const { AlAhliaAccidentContainerMinimal } = await import(
    "./infrastructure/container/AlAhliaAccidentContainer.js"
  );
  return new AlAhliaAccidentContainerMinimal();
}
