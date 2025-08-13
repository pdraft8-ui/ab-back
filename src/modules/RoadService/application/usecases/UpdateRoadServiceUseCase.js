import { RoadService } from "../../domain/entities/RoadService.entity.js";

export class UpdateRoadServiceUseCase {
  constructor(roadServiceRepository, auditService) {
    this.roadServiceRepository = roadServiceRepository;
    this.auditService = auditService;
  }

  async execute(id, roadServiceData, userId, userName) {
    try {
      if (!id) {
        throw new Error("Road service ID is required");
      }

      // Check if road service exists
      const existingService = await this.roadServiceRepository.findById(id);
      if (!existingService) {
        throw new Error("Road service not found");
      }

      // Validate update data
      if (
        roadServiceData.amount !== undefined &&
        typeof roadServiceData.amount !== "number"
      ) {
        throw new Error("Amount must be a number");
      }

      if (
        roadServiceData.amountUnder2007 !== undefined &&
        typeof roadServiceData.amountUnder2007 !== "number"
      ) {
        throw new Error("Amount under 2007 must be a number");
      }

      // Update the service
      const updatedService = await this.roadServiceRepository.update(
        id,
        roadServiceData
      );

      // Log audit action
      await this.auditService.logAction(
        "UPDATE_ROAD_SERVICE",
        `Updated road service: ${existingService.companyName}`,
        userId,
        userName
      );

      return updatedService;
    } catch (error) {
      console.error("UpdateRoadServiceUseCase error:", error);
      throw error;
    }
  }
}
