export class AgentContainer {
    agentRepository: MongoAgentRepository;
    auditService: {
        log: (auditData: any) => Promise<boolean>;
    };
    notificationService: {
        send: (notificationData: any) => Promise<boolean>;
    };
    createAgentUseCase: CreateAgentUseCase;
    getAllAgentsUseCase: GetAllAgentsUseCase;
    getAgentByIdUseCase: GetAgentByIdUseCase;
    updateAgentUseCase: UpdateAgentUseCase;
    deleteAgentUseCase: DeleteAgentUseCase;
    getAgentStatsUseCase: GetAgentStatsUseCase;
    agentController: AgentController;
    agentRoutes: AgentRoutes;
    getRoutes(): AgentRoutes;
    getRouter(): import("express-serve-static-core").Router;
    getAllComponents(): {
        agentRepository: MongoAgentRepository;
        createAgentUseCase: CreateAgentUseCase;
        getAllAgentsUseCase: GetAllAgentsUseCase;
        getAgentByIdUseCase: GetAgentByIdUseCase;
        updateAgentUseCase: UpdateAgentUseCase;
        deleteAgentUseCase: DeleteAgentUseCase;
        getAgentStatsUseCase: GetAgentStatsUseCase;
        agentController: AgentController;
        agentRoutes: AgentRoutes;
    };
    setMockRepository(mockRepository: any): void;
}
import { MongoAgentRepository } from "../repositories/MongoAgentRepository.js";
import { CreateAgentUseCase } from "../../application/usecases/CreateAgentUseCase.js";
import { GetAllAgentsUseCase } from "../../application/usecases/GetAllAgentsUseCase.js";
import { GetAgentByIdUseCase } from "../../application/usecases/GetAgentByIdUseCase.js";
import { UpdateAgentUseCase } from "../../application/usecases/UpdateAgentUseCase.js";
import { DeleteAgentUseCase } from "../../application/usecases/DeleteAgentUseCase.js";
import { GetAgentStatsUseCase } from "../../application/usecases/GetAgentStatsUseCase.js";
import { AgentController } from "../../presentation/controllers/AgentController.js";
import { AgentRoutes } from "../../presentation/routes/AgentRoutes.js";
//# sourceMappingURL=AgentContainer.d.ts.map