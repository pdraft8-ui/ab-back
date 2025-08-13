export class IRoadServiceRepository {
  async create(roadServiceData) {
    throw new Error("Method 'create' must be implemented");
  }

  async findById(id) {
    throw new Error("Method 'findById' must be implemented");
  }

  async findByName(companyName) {
    throw new Error("Method 'findByName' must be implemented");
  }

  async findAll() {
    throw new Error("Method 'findAll' must be implemented");
  }

  async update(id, roadServiceData) {
    throw new Error("Method 'update' must be implemented");
  }

  async delete(id) {
    throw new Error("Method 'delete' must be implemented");
  }

  async getStats() {
    throw new Error("Method 'getStats' must be implemented");
  }

  async countServices() {
    throw new Error("Method 'countServices' must be implemented");
  }
}
