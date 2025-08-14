export function getDepartmentRoutes(): Promise<import("./index.js").DepartmentRoutes>;
export function getDepartmentContainer(): Promise<import("./index.js").DepartmentContainer>;
export function getDepartmentContainerMinimal(): Promise<import("./index.js").DepartmentContainerMinimal>;
export { Department } from "./domain/entities/Department.entity.js";
export { IDepartmentRepository } from "./domain/interfaces/IDepartmentRepository.js";
export { CreateDepartmentUseCase } from "./application/usecases/CreateDepartmentUseCase.js";
export { GetAllDepartmentsUseCase } from "./application/usecases/GetAllDepartmentsUseCase.js";
export { GetDepartmentByIdUseCase } from "./application/usecases/GetDepartmentByIdUseCase.js";
export { UpdateDepartmentUseCase } from "./application/usecases/UpdateDepartmentUseCase.js";
export { DeleteDepartmentUseCase } from "./application/usecases/DeleteDepartmentUseCase.js";
export { GetDepartmentStatsUseCase } from "./application/usecases/GetDepartmentStatsUseCase.js";
export { MongoDepartmentRepository } from "./infrastructure/repositories/MongoDepartmentRepository.js";
export { DepartmentController } from "./presentation/controllers/DepartmentController.js";
export { DepartmentRoutes } from "./presentation/routes/DepartmentRoutes.js";
export { DepartmentContainer, DepartmentContainerMinimal } from "./infrastructure/container/DepartmentContainer.js";
//# sourceMappingURL=index.d.ts.map