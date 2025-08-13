import { RoadService } from "../../domain/entities/RoadService.entity.js";

export class CreateRoadServiceUseCase {
  constructor(roadServiceRepository, auditService) {
    this.roadServiceRepository = roadServiceRepository;
    this.auditService = auditService;
  }

  async execute(roadServiceData, userId, userName) {
    try {
      // Validate input data
      if (
        !roadServiceData.companyName ||
        !roadServiceData.amount ||
        !roadServiceData.amountUnder2007
      ) {
        throw new Error(
          "Company name, amount, and amount under 2007 are required"
        );
      }

      // Check if service with same company name already exists
      const existingService = await this.roadServiceRepository.findByName(
        roadServiceData.companyName
      );
      if (existingService) {
        throw new Error(
          `Road service with company name '${roadServiceData.companyName}' already exists`
        );
      }

      // Create road service entity
      const roadService = new RoadService(roadServiceData);

      if (!roadService.isValid()) {
        throw new Error("Invalid road service data");
      }

      // Save to repository
      const createdService = await this.roadServiceRepository.create(
        roadServiceData
      );

      // Log audit action
      await this.auditService.logAction(
        "CREATE_ROAD_SERVICE",
        `Created road service for company: ${roadServiceData.companyName}`,
        userId,
        userName
      );

      return createdService;
    } catch (error) {
      console.error("CreateRoadServiceUseCase error:", error);
      throw error;
    }
  }
}
