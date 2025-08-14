// Domain Layer
export { Agent } from "./domain/entities/Agent.entity.js";
export { IAgentRepository } from "./domain/interfaces/IAgentRepository.js";
// Application Layer
export { CreateAgentUseCase } from "./application/usecases/CreateAgentUseCase.js";
export { GetAllAgentsUseCase } from "./application/usecases/GetAllAgentsUseCase.js";
export { GetAgentByIdUseCase } from "./application/usecases/GetAgentByIdUseCase.js";
export { UpdateAgentUseCase } from "./application/usecases/UpdateAgentUseCase.js";
export { DeleteAgentUseCase } from "./application/usecases/DeleteAgentUseCase.js";
export { GetAgentStatsUseCase } from "./application/usecases/GetAgentStatsUseCase.js";
// Infrastructure Layer
export { MongoAgentRepository } from "./infrastructure/repositories/MongoAgentRepository.js";
export { AgentContainer } from "./infrastructure/container/AgentContainer.js";
// Presentation Layer
export { AgentController } from "./presentation/controllers/AgentController.js";
export { AgentRoutes } from "./presentation/routes/AgentRoutes.js";
// Factory function to get routes
export async function getAgentRoutes() {
    const { AgentContainer } = await import("./infrastructure/container/AgentContainer.js");
    const container = new AgentContainer();
    return container.getRoutes();
}
// Factory function to get router for Express app
export async function getAgentRouter() {
    const { AgentContainer } = await import("./infrastructure/container/AgentContainer.js");
    const container = new AgentContainer();
    return container.getRouter();
}
// Factory function to get container for testing
export async function getAgentContainer() {
    const { AgentContainer } = await import("./infrastructure/container/AgentContainer.js");
    return new AgentContainer();
}
// Note: AgentModule export removed to avoid circular dependency issues
// Individual exports are available above for direct access
//# sourceMappingURL=index.js.map