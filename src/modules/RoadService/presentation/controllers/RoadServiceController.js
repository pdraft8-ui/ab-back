export class RoadServiceController {
  constructor(
    createRoadServiceUseCase,
    getAllRoadServicesUseCase,
    getRoadServiceByIdUseCase,
    updateRoadServiceUseCase,
    deleteRoadServiceUseCase,
    getRoadServiceStatsUseCase
  ) {
    this.createRoadServiceUseCase = createRoadServiceUseCase;
    this.getAllRoadServicesUseCase = getAllRoadServicesUseCase;
    this.getRoadServiceByIdUseCase = getRoadServiceByIdUseCase;
    this.updateRoadServiceUseCase = updateRoadServiceUseCase;
    this.deleteRoadServiceUseCase = deleteRoadServiceUseCase;
    this.getRoadServiceStatsUseCase = getRoadServiceStatsUseCase;
  }

  async addRoadService(req, res) {
    try {
      const roadServiceData = req.body;
      const userId = req.user._id;
      const userName = req.user.name || req.user.email;

      const createdService = await this.createRoadServiceUseCase.execute(
        roadServiceData,
        userId,
        userName
      );

      res.status(201).json({
        success: true,
        message: "Road service added successfully!",
        data: createdService,
      });
    } catch (error) {
      console.error("RoadServiceController addRoadService error:", error);
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAllRoadServices(req, res) {
    try {
      const roadServices = await this.getAllRoadServicesUseCase.execute();

      res.status(200).json({
        success: true,
        message: "Road services retrieved successfully",
        data: roadServices,
      });
    } catch (error) {
      console.error("RoadServiceController getAllRoadServices error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve road services",
      });
    }
  }

  async getRoadServiceById(req, res) {
    try {
      const { id } = req.params;

      const roadService = await this.getRoadServiceByIdUseCase.execute(id);

      res.status(200).json({
        success: true,
        message: "Road service retrieved successfully",
        data: roadService,
      });
    } catch (error) {
      console.error("RoadServiceController getRoadServiceById error:", error);
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateRoadService(req, res) {
    try {
      const { id } = req.params;
      const roadServiceData = req.body;
      const userId = req.user._id;
      const userName = req.user.name || req.user.email;

      const updatedService = await this.updateRoadServiceUseCase.execute(
        id,
        roadServiceData,
        userId,
        userName
      );

      res.status(200).json({
        success: true,
        message: "Road service updated successfully!",
        data: updatedService,
      });
    } catch (error) {
      console.error("RoadServiceController updateRoadService error:", error);
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteRoadService(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user._id;
      const userName = req.user.name || req.user.email;

      const deletedService = await this.deleteRoadServiceUseCase.execute(
        id,
        userId,
        userName
      );

      res.status(200).json({
        success: true,
        message: "Road service deleted successfully",
        data: deletedService,
      });
    } catch (error) {
      console.error("RoadServiceController deleteRoadService error:", error);
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getRoadServiceStats(req, res) {
    try {
      const stats = await this.getRoadServiceStatsUseCase.execute();

      res.status(200).json({
        success: true,
        message: "Road service statistics retrieved successfully",
        data: stats,
      });
    } catch (error) {
      console.error("RoadServiceController getRoadServiceStats error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve road service statistics",
      });
    }
  }
}
