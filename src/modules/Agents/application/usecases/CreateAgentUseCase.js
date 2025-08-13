import { Agent } from "../../domain/entities/Agent.entity.js";

export class CreateAgentUseCase {
  constructor(agentRepository, auditService, notificationService) {
    this.agentRepository = agentRepository;
    this.auditService = auditService;
    this.notificationService = notificationService;
  }

  async execute(agentData, userId) {
    try {
      // Create agent entity
      const agent = Agent.create(agentData);

      // Validate agent data
      const validation = agent.isValid();
      if (!validation.isValid) {
        return {
          success: false,
          message: "Validation failed",
          errors: validation.errors,
        };
      }

      // Check if agent with same email already exists
      const existingAgentByEmail = await this.agentRepository.findByEmail(
        agent.getEmail()
      );
      if (existingAgentByEmail) {
        return {
          success: false,
          message: "Agent with this email already exists",
        };
      }

      // Check if agent with same phone already exists
      const existingAgentByPhone = await this.agentRepository.findByPhone(
        agent.getPhone()
      );
      if (existingAgentByPhone) {
        return {
          success: false,
          message: "Agent with this phone number already exists",
        };
      }

      // Save agent to repository
      const savedAgent = await this.agentRepository.create(agent);

      // Log audit
      if (this.auditService) {
        await this.auditService.log({
          action: "CREATE_AGENT",
          userId: userId,
          details: {
            agentId: savedAgent.getId(),
            agentName: savedAgent.getName(),
            agentEmail: savedAgent.getEmail(),
          },
          timestamp: new Date(),
        });
      }

      // Send notification
      if (this.notificationService) {
        await this.notificationService.send({
          type: "AGENT_CREATED",
          recipient: savedAgent.getEmail(),
          data: {
            agentName: savedAgent.getName(),
            agentId: savedAgent.getId(),
          },
        });
      }

      return {
        success: true,
        message: "Agent created successfully",
        data: {
          agent: savedAgent.toJSON(),
        },
      };
    } catch (error) {
      console.error("Error in CreateAgentUseCase:", error);
      return {
        success: false,
        message: "Failed to create agent",
        error: error.message,
      };
    }
  }
}
