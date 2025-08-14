import { Department } from "../../domain/entities/Department.entity.js";
export class UpdateDepartmentUseCase {
    constructor(departmentRepository) {
        this.departmentRepository = departmentRepository;
    }
    async execute(id, updateData) {
        try {
            if (!id) {
                return {
                    success: false,
                    message: "Department ID is required",
                };
            }
            // Check if department exists
            const existingDepartment = await this.departmentRepository.findById(id);
            if (!existingDepartment) {
                return {
                    success: false,
                    message: "Department not found",
                };
            }
            // Create department entity for validation
            const department = Department.create({
                ...existingDepartment,
                ...updateData,
            });
            // Validate updated data
            if (updateData.name && !department.hasValidName()) {
                return {
                    success: false,
                    message: "Department name is required",
                };
            }
            if (updateData.description && !department.hasValidDescription()) {
                return {
                    success: false,
                    message: "Department description is required",
                };
            }
            // Check if name is being changed and if it conflicts with existing department
            if (updateData.name && updateData.name !== existingDepartment.name) {
                const departmentWithSameName = await this.departmentRepository.findByName(updateData.name);
                if (departmentWithSameName && departmentWithSameName.id !== id) {
                    return {
                        success: false,
                        message: "Department with this name already exists",
                    };
                }
            }
            // Update department
            const updatedDepartment = await this.departmentRepository.update(id, updateData);
            return {
                success: true,
                message: "Department updated successfully",
                department: updatedDepartment,
            };
        }
        catch (error) {
            console.error("Failed to update department:", error);
            return {
                success: false,
                message: "Failed to update department",
                error: error.message,
            };
        }
    }
}
//# sourceMappingURL=UpdateDepartmentUseCase.js.map