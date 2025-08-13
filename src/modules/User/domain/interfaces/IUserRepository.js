export class IUserRepository {
  async create(userData) {
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

  async findAll(filters = {}) {
    throw new Error("Method 'findAll' must be implemented");
  }

  async update(id, updateData) {
    throw new Error("Method 'update' must be implemented");
  }

  async delete(id) {
    throw new Error("Method 'delete' must be implemented");
  }

  async findByDepartment(departmentId) {
    throw new Error("Method 'findByDepartment' must be implemented");
  }

  async findByRole(role) {
    throw new Error("Method 'findByRole' must be implemented");
  }

  async findByStatus(status) {
    throw new Error("Method 'findByStatus' must be implemented");
  }

  async findHeadOfDepartment(departmentId) {
    throw new Error("Method 'findHeadOfDepartment' must be implemented");
  }

  async findEmployeesByDepartment(departmentId) {
    throw new Error("Method 'findEmployeesByDepartment' must be implemented");
  }

  async updatePassword(id, newPassword) {
    throw new Error("Method 'updatePassword' must be implemented");
  }

  async updateSendCode(id, sendCode) {
    throw new Error("Method 'updateSendCode' must be implemented");
  }

  async toggleStatus(id) {
    throw new Error("Method 'toggleStatus' must be implemented");
  }

  async getStats() {
    throw new Error("Method 'getStats' must be implemented");
  }

  async countByRole(role) {
    throw new Error("Method 'countByRole' must be implemented");
  }

  async countByDepartment(departmentId) {
    throw new Error("Method 'countByDepartment' must be implemented");
  }
}
