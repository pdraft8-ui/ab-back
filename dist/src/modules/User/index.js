// Export individual components for direct import
export { User } from "./domain/entities/User.entity.js";
export { IUserRepository } from "./domain/interfaces/IUserRepository.js";
export { IUserService } from "./domain/interfaces/IUserService.js";
export { CreateUserUseCase } from "./application/usecases/CreateUserUseCase.js";
export { AuthenticateUserUseCase } from "./application/usecases/AuthenticateUserUseCase.js";
export { GetAllUsersUseCase } from "./application/usecases/GetAllUsersUseCase.js";
export { UpdateUserUseCase } from "./application/usecases/UpdateUserUseCase.js";
export { ChangePasswordUseCase } from "./application/usecases/ChangePasswordUseCase.js";
export { AddEmployeeToDepartmentUseCase } from "./application/usecases/AddEmployeeToDepartmentUseCase.js";
export { GetEmployeesByDepartmentUseCase } from "./application/usecases/GetEmployeesByDepartmentUseCase.js";
export { ToggleUserStatusUseCase } from "./application/usecases/ToggleUserStatusUseCase.js";
export { GetUserStatsUseCase } from "./application/usecases/GetUserStatsUseCase.js";
export { MongoUserRepository } from "./infrastructure/repositories/MongoUserRepository.js";
export { UserService } from "./infrastructure/services/UserService.js";
export { UserContainer, UserContainerMinimal, } from "./infrastructure/container/UserContainer.js";
export { UserController } from "./presentation/controllers/UserController.js";
export { UserRoutes } from "./presentation/routes/UserRoutes.js";
// Route factory function
export async function getUserRoutes() {
    const { UserContainer } = await import("./infrastructure/container/UserContainer.js");
    const container = new UserContainer();
    return container.get("userRoutes");
}
// Container factory functions
export async function getUserContainer() {
    const { UserContainer } = await import("./infrastructure/container/UserContainer.js");
    return new UserContainer();
}
export async function getUserContainerMinimal() {
    const { UserContainerMinimal } = await import("./infrastructure/container/UserContainer.js");
    return new UserContainerMinimal();
}
//# sourceMappingURL=index.js.map