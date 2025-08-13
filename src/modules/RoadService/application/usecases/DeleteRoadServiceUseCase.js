export class DeleteRoadServiceUseCase {
  constructor(roadServiceRepository, auditService) {
    this.roadServiceRepository = roadServiceRepository;
    this.auditService = auditService;
  }

  async execute(id, userId, userName) {
    try {
      if (!id) {
        throw new Error("Road service ID is required");
      }

      // Check if road service exists
      const existingService = await this.roadServiceRepository.findById(id);
      if (!existingService) {
        throw new Error("Road service not found");
      }

      // Delete the service
      const deletedService = await this.roadServiceRepository.delete(id);

      // Log audit action
      await this.auditService.logAction(
        "DELETE_ROAD_SERVICE",
        `Deleted road service: ${existingService.companyName}`,
        userId,
        userName
      );

      return deletedService;
    } catch (error) {
      console.error("DeleteRoadServiceUseCase error:", error);
      throw error;
    }
  }
}
