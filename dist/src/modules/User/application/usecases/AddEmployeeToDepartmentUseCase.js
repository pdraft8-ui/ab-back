import { User } from "../../domain/entities/User.entity.js";
export class AddEmployeeToDepartmentUseCase {
    constructor(userService) {
        this.userService = userService;
    }
    async execute(employeeData, departmentId) {
        try {
            if (!departmentId) {
                throw new Error("Department ID is required");
            }
            // Create user entity and validate
            const user = new User(employeeData);
            if (!user.isValid()) {
                throw new Error("Invalid employee data: name, email, and role are required");
            }
            if (!user.hasValidEmail()) {
                throw new Error("Invalid email format");
            }
            if (!user.hasValidPhone()) {
                throw new Error("Invalid phone number format");
            }
            // Check if user with email already exists
            const existingUser = await this.userService.getUserByEmail(user.email);
            if (existingUser) {
                throw new Error("Employee with this email already exists");
            }
            // Set employee role and department
            const employeeDataWithDepartment = {
                ...employeeData,
                role: "employee",
                departmentId: departmentId,
            };
            // Add employee to department
            const result = await this.userService.addEmployeeToDepartment(employeeDataWithDepartment, departmentId);
            return result;
        }
        catch (error) {
            throw error;
        }
    }
}
//# sourceMappingURL=AddEmployeeToDepartmentUseCase.js.map