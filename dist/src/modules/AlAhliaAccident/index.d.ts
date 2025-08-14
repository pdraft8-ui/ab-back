export function getAlAhliaAccidentRoutes(): Promise<any>;
export function getAlAhliaAccidentContainer(): Promise<import("./index.js").AlAhliaAccidentContainer>;
export function getAlAhliaAccidentContainerMinimal(): Promise<import("./index.js").AlAhliaAccidentContainerMinimal>;
export { AlAhliaAccident } from "./domain/entities/AlAhliaAccident.entity.js";
export { IAlAhliaAccidentRepository } from "./domain/interfaces/IAlAhliaAccidentRepository.js";
export { CreateAlAhliaAccidentUseCase } from "./application/usecases/CreateAlAhliaAccidentUseCase.js";
export { GetAllAlAhliaAccidentsUseCase } from "./application/usecases/GetAllAlAhliaAccidentsUseCase.js";
export { GetAlAhliaAccidentByIdUseCase } from "./application/usecases/GetAlAhliaAccidentByIdUseCase.js";
export { DeleteAlAhliaAccidentUseCase } from "./application/usecases/DeleteAlAhliaAccidentUseCase.js";
export { GetAlAhliaAccidentStatsUseCase } from "./application/usecases/GetAlAhliaAccidentStatsUseCase.js";
export { MongoAlAhliaAccidentRepository } from "./infrastructure/repositories/MongoAlAhliaAccidentRepository.js";
export { AlAhliaAccidentController } from "./presentation/controllers/AlAhliaAccidentController.js";
export { AlAhliaAccidentRoutes } from "./presentation/routes/AlAhliaAccidentRoutes.js";
export { AlAhliaAccidentContainer, AlAhliaAccidentContainerMinimal } from "./infrastructure/container/AlAhliaAccidentContainer.js";
//# sourceMappingURL=index.d.ts.map