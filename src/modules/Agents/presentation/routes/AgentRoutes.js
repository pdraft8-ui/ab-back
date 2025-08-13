import express from "express";

export class AgentRoutes {
  constructor(agentController) {
    this.agentController = agentController;
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    // Create a new agent
    this.router.post("/", async (req, res) => {
      await this.agentController.createAgent(req, res);
    });

    // Get all agents with optional filtering and pagination
    this.router.get("/", async (req, res) => {
      await this.agentController.getAllAgents(req, res);
    });

    // Get agent statistics
    this.router.get("/stats", async (req, res) => {
      await this.agentController.getAgentStats(req, res);
    });

    // Get agent by ID
    this.router.get("/:id", async (req, res) => {
      await this.agentController.getAgentById(req, res);
    });

    // Update agent
    this.router.put("/:id", async (req, res) => {
      await this.agentController.updateAgent(req, res);
    });

    // Delete agent
    this.router.delete("/:id", async (req, res) => {
      await this.agentController.deleteAgent(req, res);
    });
  }

  getRouter() {
    return this.router;
  }
}
