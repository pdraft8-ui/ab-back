export class IAgentRepository {
  async create(agent) {
    throw new Error("Method 'create' must be implemented");
  }

  async findById(id) {
    throw new Error("Method 'findById' must be implemented");
  }

  async findByEmail(email) {
    throw new Error("Method 'findByEmail' must be implemented");
  }

  async findByPhone(phone) {
    throw new Error("Method 'findByPhone' must be implemented");
  }

  async findAll() {
    throw new Error("Method 'findAll' must be implemented");
  }

  async update(id, agent) {
    throw new Error("Method 'update' must be implemented");
  }

  async delete(id) {
    throw new Error("Method 'delete' must be implemented");
  }

  async getStats() {
    throw new Error("Method 'getStats' must be implemented");
  }

  async countAgents() {
    throw new Error("Method 'countAgents' must be implemented");
  }

  async findByDateRange(startDate, endDate) {
    throw new Error("Method 'findByDateRange' must be implemented");
  }

  async searchByName(name) {
    throw new Error("Method 'searchByName' must be implemented");
  }
}
