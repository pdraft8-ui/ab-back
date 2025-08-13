export class ICallRepository {
  async create(callData) {
    throw new Error("Method 'create' must be implemented");
  }

  async findByCallId(callid) {
    throw new Error("Method 'findByCallId' must be implemented");
  }

  async findByCustomerId(customerId) {
    throw new Error("Method 'findByCustomerId' must be implemented");
  }

  async findAll() {
    throw new Error("Method 'findAll' must be implemented");
  }

  async update(id, callData) {
    throw new Error("Method 'update' must be implemented");
  }

  async delete(id) {
    throw new Error("Method 'delete' must be implemented");
  }

  async getStats() {
    throw new Error("Method 'getStats' must be implemented");
  }

  async countCalls() {
    throw new Error("Method 'countCalls' must be implemented");
  }
}
