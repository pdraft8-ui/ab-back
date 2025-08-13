export class GetDepartmentByIdUseCase {
  constructor(departmentRepository) {
    this.departmentRepository = departmentRepository;
  }

  async execute(id) {
    try {
      if (!id) {
        return {
          success: false,
          message: "Department ID is required",
        };
      }

      const department = await this.departmentRepository.findById(id);

      if (!department) {
        return {
          success: false,
          message: "Department not found",
        };
      }

      return {
        success: true,
        message: "Department retrieved successfully",
        department,
      };
    } catch (error) {
      console.error("Failed to retrieve department:", error);
      return {
        success: false,
        message: "Failed to retrieve department",
        error: error.message,
      };
    }
  }
}
