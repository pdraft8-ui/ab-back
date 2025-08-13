export class IUserService {
  async createUser(userData) {
    throw new Error("Method 'createUser' must be implemented");
  }

  async getUserById(id) {
    throw new Error("Method 'getUserById' must be implemented");
  }

  async getUserByEmail(email) {
    throw new Error("Method 'getUserByEmail' must be implemented");
  }

  async getAllUsers(filters = {}) {
    throw new Error("Method 'getAllUsers' must be implemented");
  }

  async updateUser(id, updateData) {
    throw new Error("Method 'updateUser' must be implemented");
  }

  async deleteUser(id) {
    throw new Error("Method 'deleteUser' must be implemented");
  }

  async authenticateUser(email, password) {
    throw new Error("Method 'authenticateUser' must be implemented");
  }

  async changePassword(userId, oldPassword, newPassword) {
    throw new Error("Method 'changePassword' must be implemented");
  }

  async resetPassword(email) {
    throw new Error("Method 'resetPassword' must be implemented");
  }

  async sendVerificationCode(email) {
    throw new Error("Method 'sendVerificationCode' must be implemented");
  }

  async verifyCode(email, code) {
    throw new Error("Method 'verifyCode' must be implemented");
  }

  async addEmployeeToDepartment(employeeData, departmentId) {
    throw new Error("Method 'addEmployeeToDepartment' must be implemented");
  }

  async removeEmployeeFromDepartment(employeeId, departmentId) {
    throw new Error(
      "Method 'removeEmployeeFromDepartment' must be implemented"
    );
  }

  async getEmployeesByDepartment(departmentId) {
    throw new Error("Method 'getEmployeesByDepartment' must be implemented");
  }

  async addHeadOfDepartmentToDepartment(userId, departmentId) {
    throw new Error(
      "Method 'addHeadOfDepartmentToDepartment' must be implemented"
    );
  }

  async removeHeadOfDepartmentFromDepartment(userId, departmentId) {
    throw new Error(
      "Method 'removeHeadOfDepartmentFromDepartment' must be implemented"
    );
  }

  async getHeadOfDepartment(departmentId) {
    throw new Error("Method 'getHeadOfDepartment' must be implemented");
  }

  async toggleUserStatus(userId) {
    throw new Error("Method 'toggleUserStatus' must be implemented");
  }

  async getUserStats() {
    throw new Error("Method 'getUserStats' must be implemented");
  }

  async sendEmail(to, subject, content) {
    throw new Error("Method 'sendEmail' must be implemented");
  }

  async sendBulkEmails(recipients, subject, content) {
    throw new Error("Method 'sendBulkEmails' must be implemented");
  }

  async getInboxEmails(userId, filters = {}) {
    throw new Error("Method 'getInboxEmails' must be implemented");
  }

  async getEmailById(userId, emailId) {
    throw new Error("Method 'getEmailById' must be implemented");
  }

  async markEmailAsRead(userId, emailId, isRead) {
    throw new Error("Method 'markEmailAsRead' must be implemented");
  }

  async deleteEmail(userId, emailId) {
    throw new Error("Method 'deleteEmail' must be implemented");
  }

  async getInboxStats(userId) {
    throw new Error("Method 'getInboxStats' must be implemented");
  }
}
