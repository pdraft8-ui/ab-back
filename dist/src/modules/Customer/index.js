// Domain Layer
export { Customer } from "./domain/entities/Customer.entity.js";
export { ICustomerRepository } from "./domain/interfaces/ICustomerRepository.js";
// Application Layer
export { CreateCustomerUseCase } from "./application/usecases/CreateCustomerUseCase.js";
export { GetAllCustomersUseCase } from "./application/usecases/GetAllCustomersUseCase.js";
export { UpdateCustomerUseCase } from "./application/usecases/UpdateCustomerUseCase.js";
export { DeleteCustomerUseCase } from "./application/usecases/DeleteCustomerUseCase.js";
export { AddVehicleToCustomerUseCase } from "./application/usecases/AddVehicleToCustomerUseCase.js";
export { GetCustomerStatsUseCase } from "./application/usecases/GetCustomerStatsUseCase.js";
// Infrastructure Layer
export { MongoCustomerRepository } from "./infrastructure/repositories/MongoCustomerRepository.js";
// Presentation Layer
export { CustomerController } from "./presentation/controllers/CustomerController.js";
export { CustomerRoutes } from "./presentation/routes/CustomerRoutes.js";
// Container
export { default as CustomerContainer } from "./infrastructure/container/CustomerContainer.js";
// Module Container Instance
import customerContainer from "./infrastructure/container/CustomerContainer.js";
export { customerContainer };
// Convenience exports
export const getCustomerRoutes = () => customerContainer.getCustomerRoutes();
export const getCustomerController = () => customerContainer.getCustomerController();
export const getCustomerRepository = () => customerContainer.getCustomerRepository();
//# sourceMappingURL=index.js.map