export class GetAgentByIdUseCase {
    constructor(agentRepository) {
        this.agentRepository = agentRepository;
    }
    async execute(agentId) {
        try {
            if (!agentId) {
                return {
                    success: false,
                    message: "Agent ID is required",
                };
            }
            const agent = await this.agentRepository.findById(agentId);
            if (!agent) {
                return {
                    success: false,
                    message: "Agent not found",
                };
            }
            return {
                success: true,
                message: "Agent retrieved successfully",
                data: {
                    agent: agent.toJSON(),
                },
            };
        }
        catch (error) {
            console.error("Error in GetAgentByIdUseCase:", error);
            return {
                success: false,
                message: "Failed to retrieve agent",
                error: error.message,
            };
        }
    }
}
//# sourceMappingURL=GetAgentByIdUseCase.js.map