export class GetAllUsersUseCase {
  constructor(userService) {
    this.userService = userService;
  }

  async execute(filters = {}) {
    try {
      // Validate filters
      const validFilters = {};

      if (
        filters.role &&
        ![
          "admin",
          "employee",
          "customer",
          "headOfDepartment",
          "agents",
        ].includes(filters.role)
      ) {
        throw new Error("Invalid role filter");
      }

      if (filters.status && !["active", "inactive"].includes(filters.status)) {
        throw new Error("Invalid status filter");
      }

      if (filters.departmentId) {
        validFilters.departmentId = filters.departmentId;
      }

      if (filters.role) {
        validFilters.role = filters.role;
      }

      if (filters.status) {
        validFilters.status = filters.status;
      }

      if (filters.search) {
        validFilters.search = filters.search;
      }

      if (filters.page) {
        validFilters.page = parseInt(filters.page) || 1;
      }

      if (filters.limit) {
        validFilters.limit = parseInt(filters.limit) || 10;
      }

      // Get users
      const users = await this.userService.getAllUsers(validFilters);
      return users;
    } catch (error) {
      throw error;
    }
  }
}
