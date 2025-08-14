// Export domain entities
export { Department } from "./domain/entities/Department.entity.js";
// Export domain interfaces
export { IDepartmentRepository } from "./domain/interfaces/IDepartmentRepository.js";
// Export application use cases
export { CreateDepartmentUseCase } from "./application/usecases/CreateDepartmentUseCase.js";
export { GetAllDepartmentsUseCase } from "./application/usecases/GetAllDepartmentsUseCase.js";
export { GetDepartmentByIdUseCase } from "./application/usecases/GetDepartmentByIdUseCase.js";
export { UpdateDepartmentUseCase } from "./application/usecases/UpdateDepartmentUseCase.js";
export { DeleteDepartmentUseCase } from "./application/usecases/DeleteDepartmentUseCase.js";
export { GetDepartmentStatsUseCase } from "./application/usecases/GetDepartmentStatsUseCase.js";
// Export infrastructure repositories
export { MongoDepartmentRepository } from "./infrastructure/repositories/MongoDepartmentRepository.js";
// Export presentation controllers and routes
export { DepartmentController } from "./presentation/controllers/DepartmentController.js";
export { DepartmentRoutes } from "./presentation/routes/DepartmentRoutes.js";
// Export containers
export { DepartmentContainer, DepartmentContainerMinimal, } from "./infrastructure/container/DepartmentContainer.js";
// Route factory function
export async function getDepartmentRoutes() {
    const { DepartmentContainer } = await import("./infrastructure/container/DepartmentContainer.js");
    const container = new DepartmentContainer();
    return container.getDepartmentRoutes();
}
// Container factory functions
export async function getDepartmentContainer() {
    const { DepartmentContainer } = await import("./infrastructure/container/DepartmentContainer.js");
    return new DepartmentContainer();
}
export async function getDepartmentContainerMinimal() {
    const { DepartmentContainerMinimal } = await import("./infrastructure/container/DepartmentContainer.js");
    return new DepartmentContainerMinimal();
}
//# sourceMappingURL=index.js.map