import { Department } from "../../domain/entities/Department.entity.js";

export class CreateDepartmentUseCase {
  constructor(departmentRepository) {
    this.departmentRepository = departmentRepository;
  }

  async execute(departmentData) {
    try {
      // Create department entity
      const department = Department.create(departmentData);

      // Validate department data
      if (!department.isValid()) {
        return {
          success: false,
          message: "Department name and description are required",
        };
      }

      if (!department.hasValidName()) {
        return {
          success: false,
          message: "Department name is required",
        };
      }

      if (!department.hasValidDescription()) {
        return {
          success: false,
          message: "Department description is required",
        };
      }

      // Check if department with same name already exists
      const existingDepartment = await this.departmentRepository.findByName(
        department.name
      );
      if (existingDepartment) {
        return {
          success: false,
          message: "Department with this name already exists",
        };
      }

      // Create department in repository
      const createdDepartment = await this.departmentRepository.create(
        departmentData
      );

      return {
        success: true,
        message: "Department created successfully",
        department: createdDepartment,
      };
    } catch (error) {
      console.error("Failed to create department:", error);
      return {
        success: false,
        message: "Failed to create department",
        error: error.message,
      };
    }
  }
}
