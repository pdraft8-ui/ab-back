export class GetAllRoadServicesUseCase {
    constructor(roadServiceRepository) {
        this.roadServiceRepository = roadServiceRepository;
    }
    async execute() {
        try {
            const roadServices = await this.roadServiceRepository.findAll();
            return roadServices;
        }
        catch (error) {
            console.error("GetAllRoadServicesUseCase error:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=GetAllRoadServicesUseCase.js.map