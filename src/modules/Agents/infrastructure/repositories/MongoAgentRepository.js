import { Agent } from "../../domain/entities/Agent.entity.js";
import agentModel from "../../../../../DB/models/agent.model.js";

export class MongoAgentRepository {
  async create(agent) {
    try {
      const agentData = {
        name: agent.getName(),
        email: agent.getEmail(),
        phone: agent.getPhone(),
      };

      const mongooseDoc = await agentModel.create(agentData);
      return Agent.fromMongoDoc(mongooseDoc);
    } catch (error) {
      console.error("Error creating agent:", error);
      throw error;
    }
  }

  async findById(id) {
    try {
      const mongooseDoc = await agentModel.findById(id);
      if (!mongooseDoc) {
        return null;
      }
      return Agent.fromMongoDoc(mongooseDoc);
    } catch (error) {
      console.error("Error finding agent by ID:", error);
      throw error;
    }
  }

  async findByEmail(email) {
    try {
      const mongooseDoc = await agentModel.findOne({
        email: email.toLowerCase(),
      });
      if (!mongooseDoc) {
        return null;
      }
      return Agent.fromMongoDoc(mongooseDoc);
    } catch (error) {
      console.error("Error finding agent by email:", error);
      throw error;
    }
  }

  async findByPhone(phone) {
    try {
      const mongooseDoc = await agentModel.findOne({ phone });
      if (!mongooseDoc) {
        return null;
      }
      return Agent.fromMongoDoc(mongooseDoc);
    } catch (error) {
      console.error("Error finding agent by phone:", error);
      throw error;
    }
  }

  async findAll() {
    try {
      const mongooseDocs = await agentModel.find().sort({ createdAt: -1 });
      return mongooseDocs.map((doc) => Agent.fromMongoDoc(doc));
    } catch (error) {
      console.error("Error finding all agents:", error);
      throw error;
    }
  }

  async update(id, agent) {
    try {
      const updateData = {
        name: agent.getName(),
        email: agent.getEmail(),
        phone: agent.getPhone(),
        updatedAt: new Date(),
      };

      const mongooseDoc = await agentModel.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!mongooseDoc) {
        throw new Error("Agent not found");
      }

      return Agent.fromMongoDoc(mongooseDoc);
    } catch (error) {
      console.error("Error updating agent:", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const mongooseDoc = await agentModel.findByIdAndDelete(id);
      if (!mongooseDoc) {
        throw new Error("Agent not found");
      }
      return true;
    } catch (error) {
      console.error("Error deleting agent:", error);
      throw error;
    }
  }

  async getStats() {
    try {
      const stats = await agentModel.aggregate([
        {
          $group: {
            _id: null,
            totalAgents: { $sum: 1 },
            avgNameLength: { $avg: { $strLenCP: "$name" } },
          },
        },
      ]);

      const emailDomains = await agentModel.aggregate([
        {
          $group: {
            _id: {
              $substr: ["$email", { $indexOfBytes: ["$email", "@"] }, -1],
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]);

      return {
        totalAgents: stats[0]?.totalAgents || 0,
        avgNameLength: Math.round(stats[0]?.avgNameLength || 0),
        topEmailDomains: emailDomains,
      };
    } catch (error) {
      console.error("Error getting agent stats:", error);
      throw error;
    }
  }

  async countAgents() {
    try {
      return await agentModel.countDocuments();
    } catch (error) {
      console.error("Error counting agents:", error);
      throw error;
    }
  }

  async findByDateRange(startDate, endDate) {
    try {
      const mongooseDocs = await agentModel
        .find({
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        })
        .sort({ createdAt: -1 });

      return mongooseDocs.map((doc) => Agent.fromMongoDoc(doc));
    } catch (error) {
      console.error("Error finding agents by date range:", error);
      throw error;
    }
  }

  async searchByName(name) {
    try {
      const mongooseDocs = await agentModel
        .find({
          name: { $regex: name, $options: "i" },
        })
        .sort({ createdAt: -1 });

      return mongooseDocs.map((doc) => Agent.fromMongoDoc(doc));
    } catch (error) {
      console.error("Error searching agents by name:", error);
      throw error;
    }
  }
}
