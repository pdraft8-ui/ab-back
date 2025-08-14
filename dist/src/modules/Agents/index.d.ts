export function getAgentRoutes(): Promise<import("./index.js").AgentRoutes>;
export function getAgentRouter(): Promise<import("express-serve-static-core").Router>;
export function getAgentContainer(): Promise<import("./index.js").AgentContainer>;
export { Agent } from "./domain/entities/Agent.entity.js";
export { IAgentRepository } from "./domain/interfaces/IAgentRepository.js";
export { CreateAgentUseCase } from "./application/usecases/CreateAgentUseCase.js";
export { GetAllAgentsUseCase } from "./application/usecases/GetAllAgentsUseCase.js";
export { GetAgentByIdUseCase } from "./application/usecases/GetAgentByIdUseCase.js";
export { UpdateAgentUseCase } from "./application/usecases/UpdateAgentUseCase.js";
export { DeleteAgentUseCase } from "./application/usecases/DeleteAgentUseCase.js";
export { GetAgentStatsUseCase } from "./application/usecases/GetAgentStatsUseCase.js";
export { MongoAgentRepository } from "./infrastructure/repositories/MongoAgentRepository.js";
export { AgentContainer } from "./infrastructure/container/AgentContainer.js";
export { AgentController } from "./presentation/controllers/AgentController.js";
export { AgentRoutes } from "./presentation/routes/AgentRoutes.js";
//# sourceMappingURL=index.d.ts.map