export class AgentController {
  constructor(
    createAgentUseCase,
    getAllAgentsUseCase,
    getAgentByIdUseCase,
    updateAgentUseCase,
    deleteAgentUseCase,
    getAgentStatsUseCase
  ) {
    this.createAgentUseCase = createAgentUseCase;
    this.getAllAgentsUseCase = getAllAgentsUseCase;
    this.getAgentByIdUseCase = getAgentByIdUseCase;
    this.updateAgentUseCase = updateAgentUseCase;
    this.deleteAgentUseCase = deleteAgentUseCase;
    this.getAgentStatsUseCase = getAgentStatsUseCase;
  }

  async createAgent(req, res) {
    try {
      const agentData = req.body;
      const userId = req.user?.id || "system";

      const result = await this.createAgentUseCase.execute(agentData, userId);

      if (result.success) {
        return res.status(201).json({
          success: true,
          message: result.message,
          data: result.data,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: result.message,
          errors: result.errors,
        });
      }
    } catch (error) {
      console.error("Error in createAgent controller:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async getAllAgents(req, res) {
    try {
      const { page, limit, sortBy, sortOrder, search, startDate, endDate } =
        req.query;

      const filters = {};
      if (search) filters.search = search;
      if (startDate && endDate) {
        filters.dateRange = { startDate, endDate };
      }

      const pagination = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
        sortBy: sortBy || "createdAt",
        sortOrder: sortOrder || "desc",
      };

      const result = await this.getAllAgentsUseCase.execute(
        filters,
        pagination
      );

      if (result.success) {
        return res.status(200).json({
          success: true,
          message: result.message,
          data: result.data,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: result.message,
        });
      }
    } catch (error) {
      console.error("Error in getAllAgents controller:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async getAgentById(req, res) {
    try {
      const { id } = req.params;

      const result = await this.getAgentByIdUseCase.execute(id);

      if (result.success) {
        return res.status(200).json({
          success: true,
          message: result.message,
          data: result.data,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: result.message,
        });
      }
    } catch (error) {
      console.error("Error in getAgentById controller:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async updateAgent(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const userId = req.user?.id || "system";

      const result = await this.updateAgentUseCase.execute(
        id,
        updateData,
        userId
      );

      if (result.success) {
        return res.status(200).json({
          success: true,
          message: result.message,
          data: result.data,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: result.message,
          errors: result.errors,
        });
      }
    } catch (error) {
      console.error("Error in updateAgent controller:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async deleteAgent(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user?.id || "system";

      const result = await this.deleteAgentUseCase.execute(id, userId);

      if (result.success) {
        return res.status(200).json({
          success: true,
          message: result.message,
          data: result.data,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: result.message,
        });
      }
    } catch (error) {
      console.error("Error in deleteAgent controller:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async getAgentStats(req, res) {
    try {
      const result = await this.getAgentStatsUseCase.execute();

      if (result.success) {
        return res.status(200).json({
          success: true,
          message: result.message,
          data: result.data,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: result.message,
        });
      }
    } catch (error) {
      console.error("Error in getAgentStats controller:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }
}
