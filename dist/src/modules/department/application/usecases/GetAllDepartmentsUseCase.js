export class GetAllDepartmentsUseCase {
    constructor(departmentRepository) {
        this.departmentRepository = departmentRepository;
    }
    async execute() {
        try {
            const departments = await this.departmentRepository.findAll();
            return {
                success: true,
                message: "Departments retrieved successfully",
                data: departments || [],
            };
        }
        catch (error) {
            console.error("Failed to retrieve departments:", error);
            return {
                success: false,
                message: "Failed to retrieve departments",
                error: error.message,
            };
        }
    }
}
//# sourceMappingURL=GetAllDepartmentsUseCase.js.map