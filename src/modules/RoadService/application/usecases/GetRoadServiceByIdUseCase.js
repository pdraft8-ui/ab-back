export class GetRoadServiceByIdUseCase {
  constructor(roadServiceRepository) {
    this.roadServiceRepository = roadServiceRepository;
  }

  async execute(id) {
    try {
      if (!id) {
        throw new Error("Road service ID is required");
      }

      const roadService = await this.roadServiceRepository.findById(id);

      if (!roadService) {
        throw new Error("Road service not found");
      }

      return roadService;
    } catch (error) {
      console.error("GetRoadServiceByIdUseCase error:", error);
      throw error;
    }
  }
}
