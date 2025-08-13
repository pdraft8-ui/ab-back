export class DeleteAgentUseCase {
  constructor(agentRepository, auditService, notificationService) {
    this.agentRepository = agentRepository;
    this.auditService = auditService;
    this.notificationService = notificationService;
  }

  async execute(agentId, userId) {
    try {
      if (!agentId) {
        return {
          success: false,
          message: "Agent ID is required",
        };
      }

      // Find existing agent
      const existingAgent = await this.agentRepository.findById(agentId);
      if (!existingAgent) {
        return {
          success: false,
          message: "Agent not found",
        };
      }

      // Delete agent from repository
      await this.agentRepository.delete(agentId);

      // Log audit
      if (this.auditService) {
        await this.auditService.log({
          action: "DELETE_AGENT",
          userId: userId,
          details: {
            agentId: existingAgent.getId(),
            agentName: existingAgent.getName(),
            agentEmail: existingAgent.getEmail(),
          },
          timestamp: new Date(),
        });
      }

      // Send notification
      if (this.notificationService) {
        await this.notificationService.send({
          type: "AGENT_DELETED",
          recipient: existingAgent.getEmail(),
          data: {
            agentName: existingAgent.getName(),
            agentId: existingAgent.getId(),
          },
        });
      }

      return {
        success: true,
        message: "Agent deleted successfully",
        data: {
          agentId: existingAgent.getId(),
          agentName: existingAgent.getName(),
          agentEmail: existingAgent.getEmail(),
        },
      };
    } catch (error) {
      console.error("Error in DeleteAgentUseCase:", error);
      return {
        success: false,
        message: "Failed to delete agent",
        error: error.message,
      };
    }
  }
}
