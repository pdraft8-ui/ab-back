import { Agent } from "../../domain/entities/Agent.entity.js";

export class UpdateAgentUseCase {
  constructor(agentRepository, auditService, notificationService) {
    this.agentRepository = agentRepository;
    this.auditService = auditService;
    this.notificationService = notificationService;
  }

  async execute(agentId, updateData, userId) {
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

      // Create updated agent entity
      const updatedAgent = Agent.create({
        ...existingAgent.toJSON(),
        ...updateData,
        id: agentId, // Preserve the original ID
      });

      // Validate updated agent data
      const validation = updatedAgent.isValid();
      if (!validation.isValid) {
        return {
          success: false,
          message: "Validation failed",
          errors: validation.errors,
        };
      }

      // Check if email is being changed and if it already exists
      if (updateData.email && updateData.email !== existingAgent.getEmail()) {
        const existingAgentByEmail = await this.agentRepository.findByEmail(
          updateData.email
        );
        if (existingAgentByEmail && existingAgentByEmail.getId() !== agentId) {
          return {
            success: false,
            message: "Agent with this email already exists",
          };
        }
      }

      // Check if phone is being changed and if it already exists
      if (updateData.phone && updateData.phone !== existingAgent.getPhone()) {
        const existingAgentByPhone = await this.agentRepository.findByPhone(
          updateData.phone
        );
        if (existingAgentByPhone && existingAgentByPhone.getId() !== agentId) {
          return {
            success: false,
            message: "Agent with this phone number already exists",
          };
        }
      }

      // Update agent info
      updatedAgent.updateInfo(updateData);

      // Save updated agent to repository
      const savedAgent = await this.agentRepository.update(
        agentId,
        updatedAgent
      );

      // Log audit
      if (this.auditService) {
        await this.auditService.log({
          action: "UPDATE_AGENT",
          userId: userId,
          details: {
            agentId: savedAgent.getId(),
            agentName: savedAgent.getName(),
            agentEmail: savedAgent.getEmail(),
            changes: updateData,
          },
          timestamp: new Date(),
        });
      }

      // Send notification
      if (this.notificationService) {
        await this.notificationService.send({
          type: "AGENT_UPDATED",
          recipient: savedAgent.getEmail(),
          data: {
            agentName: savedAgent.getName(),
            agentId: savedAgent.getId(),
            changes: updateData,
          },
        });
      }

      return {
        success: true,
        message: "Agent updated successfully",
        data: {
          agent: savedAgent.toJSON(),
        },
      };
    } catch (error) {
      console.error("Error in UpdateAgentUseCase:", error);
      return {
        success: false,
        message: "Failed to update agent",
        error: error.message,
      };
    }
  }
}
