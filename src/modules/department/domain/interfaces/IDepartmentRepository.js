export class IDepartmentRepository {
  async create(departmentData) {
    throw new Error("Method 'create' must be implemented");
  }

  async findById(id) {
    throw new Error("Method 'findById' must be implemented");
  }

  async findByName(name) {
    throw new Error("Method 'findByName' must be implemented");
  }

  async findAll() {
    throw new Error("Method 'findAll' must be implemented");
  }

  async update(id, updateData) {
    throw new Error("Method 'update' must be implemented");
  }

  async delete(id) {
    throw new Error("Method 'delete' must be implemented");
  }

  async findByHeadOfDepartment(headOfDepartmentId) {
    throw new Error("Method 'findByHeadOfDepartment' must be implemented");
  }

  async findDepartmentsWithEmployees() {
    throw new Error(
      "Method 'findDepartmentsWithEmployees' must be implemented"
    );
  }

  async addEmployeeToDepartment(departmentId, employee) {
    throw new Error("Method 'addEmployeeToDepartment' must be implemented");
  }

  async removeEmployeeFromDepartment(departmentId, employeeId) {
    throw new Error(
      "Method 'removeEmployeeFromDepartment' must be implemented"
    );
  }

  async setHeadOfDepartment(departmentId, userId) {
    throw new Error("Method 'setHeadOfDepartment' must be implemented");
  }

  async removeHeadOfDepartment(departmentId) {
    throw new Error("Method 'removeHeadOfDepartment' must be implemented");
  }

  async getStats() {
    throw new Error("Method 'getStats' must be implemented");
  }

  async countDepartments() {
    throw new Error("Method 'countDepartments' must be implemented");
  }

  async findDepartmentsByPermission(permission) {
    throw new Error("Method 'findDepartmentsByPermission' must be implemented");
  }
}
