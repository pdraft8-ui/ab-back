export class DeleteDepartmentUseCase {
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
            // Check if department exists
            const department = await this.departmentRepository.findById(id);
            if (!department) {
                return {
                    success: false,
                    message: "Department not found",
                };
            }
            // Check if department has employees
            if (department.hasEmployees()) {
                return {
                    success: false,
                    message: "Cannot delete department with employees. Please remove all employees first.",
                };
            }
            // Delete department
            await this.departmentRepository.delete(id);
            return {
                success: true,
                message: "Department deleted successfully",
            };
        }
        catch (error) {
            console.error("Failed to delete department:", error);
            return {
                success: false,
                message: "Failed to delete department",
                error: error.message,
            };
        }
    }
}
//# sourceMappingURL=DeleteDepartmentUseCase.js.map