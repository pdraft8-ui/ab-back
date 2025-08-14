export class AgentController {
    constructor(createAgentUseCase: any, getAllAgentsUseCase: any, getAgentByIdUseCase: any, updateAgentUseCase: any, deleteAgentUseCase: any, getAgentStatsUseCase: any);
    createAgentUseCase: any;
    getAllAgentsUseCase: any;
    getAgentByIdUseCase: any;
    updateAgentUseCase: any;
    deleteAgentUseCase: any;
    getAgentStatsUseCase: any;
    createAgent(req: any, res: any): Promise<any>;
    getAllAgents(req: any, res: any): Promise<any>;
    getAgentById(req: any, res: any): Promise<any>;
    updateAgent(req: any, res: any): Promise<any>;
    deleteAgent(req: any, res: any): Promise<any>;
    getAgentStats(req: any, res: any): Promise<any>;
}
//# sourceMappingURL=AgentController.d.ts.map