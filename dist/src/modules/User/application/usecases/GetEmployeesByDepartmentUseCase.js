export class GetEmployeesByDepartmentUseCase {
    constructor(userService) {
        this.userService = userService;
    }
    async execute(departmentId) {
        try {
            if (!departmentId) {
                throw new Error("Department ID is required");
            }
            // Get employees by department
            const employees = await this.userService.getEmployeesByDepartment(departmentId);
            return employees;
        }
        catch (error) {
            throw error;
        }
    }
}
//# sourceMappingURL=GetEmployeesByDepartmentUseCase.js.map