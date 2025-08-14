import { MongoAgentRepository } from "../repositories/MongoAgentRepository.js";
import { CreateAgentUseCase } from "../../application/usecases/CreateAgentUseCase.js";
import { GetAllAgentsUseCase } from "../../application/usecases/GetAllAgentsUseCase.js";
import { GetAgentByIdUseCase } from "../../application/usecases/GetAgentByIdUseCase.js";
import { UpdateAgentUseCase } from "../../application/usecases/UpdateAgentUseCase.js";
import { DeleteAgentUseCase } from "../../application/usecases/DeleteAgentUseCase.js";
import { GetAgentStatsUseCase } from "../../application/usecases/GetAgentStatsUseCase.js";
import { AgentController } from "../../presentation/controllers/AgentController.js";
import { AgentRoutes } from "../../presentation/routes/AgentRoutes.js";
export class AgentContainer {
    constructor() {
        this.agentRepository = new MongoAgentRepository();
        // Mock services for testing
        this.auditService = {
            log: async (auditData) => {
                console.log("Audit log:", auditData);
                return true;
            },
        };
        this.notificationService = {
            send: async (notificationData) => {
                console.log("Notification sent:", notificationData);
                return true;
            },
        };
        // Initialize use cases
        this.createAgentUseCase = new CreateAgentUseCase(this.agentRepository, this.auditService, this.notificationService);
        this.getAllAgentsUseCase = new GetAllAgentsUseCase(this.agentRepository);
        this.getAgentByIdUseCase = new GetAgentByIdUseCase(this.agentRepository);
        this.updateAgentUseCase = new UpdateAgentUseCase(this.agentRepository, this.auditService, this.notificationService);
        this.deleteAgentUseCase = new DeleteAgentUseCase(this.agentRepository, this.auditService, this.notificationService);
        this.getAgentStatsUseCase = new GetAgentStatsUseCase(this.agentRepository);
        // Initialize controller
        this.agentController = new AgentController(this.createAgentUseCase, this.getAllAgentsUseCase, this.getAgentByIdUseCase, this.updateAgentUseCase, this.deleteAgentUseCase, this.getAgentStatsUseCase);
        // Initialize routes
        this.agentRoutes = new AgentRoutes(this.agentController);
    }
    // Method to get routes for integration
    getRoutes() {
        return this.agentRoutes;
    }
    // Method to get router for Express app
    getRouter() {
        return this.agentRoutes.getRouter();
    }
    // Method to get all components for testing
    getAllComponents() {
        return {
            agentRepository: this.agentRepository,
            createAgentUseCase: this.createAgentUseCase,
            getAllAgentsUseCase: this.getAllAgentsUseCase,
            getAgentByIdUseCase: this.getAgentByIdUseCase,
            updateAgentUseCase: this.updateAgentUseCase,
            deleteAgentUseCase: this.deleteAgentUseCase,
            getAgentStatsUseCase: this.getAgentStatsUseCase,
            agentController: this.agentController,
            agentRoutes: this.agentRoutes,
        };
    }
    // Method to set mock repository for testing
    setMockRepository(mockRepository) {
        this.agentRepository = mockRepository;
        // Reinitialize use cases with mock repository
        this.createAgentUseCase = new CreateAgentUseCase(this.agentRepository, this.auditService, this.notificationService);
        this.getAllAgentsUseCase = new GetAllAgentsUseCase(this.agentRepository);
        this.getAgentByIdUseCase = new GetAgentByIdUseCase(this.agentRepository);
        this.updateAgentUseCase = new UpdateAgentUseCase(this.agentRepository, this.auditService, this.notificationService);
        this.deleteAgentUseCase = new DeleteAgentUseCase(this.agentRepository, this.auditService, this.notificationService);
        this.getAgentStatsUseCase = new GetAgentStatsUseCase(this.agentRepository);
        // Reinitialize controller
        this.agentController = new AgentController(this.createAgentUseCase, this.getAllAgentsUseCase, this.getAgentByIdUseCase, this.updateAgentUseCase, this.deleteAgentUseCase, this.getAgentStatsUseCase);
        // Reinitialize routes
        this.agentRoutes = new AgentRoutes(this.agentController);
    }
}
//# sourceMappingURL=AgentContainer.js.map