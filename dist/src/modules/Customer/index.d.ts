export { Customer } from "./domain/entities/Customer.entity.js";
export { ICustomerRepository } from "./domain/interfaces/ICustomerRepository.js";
export { CreateCustomerUseCase } from "./application/usecases/CreateCustomerUseCase.js";
export { GetAllCustomersUseCase } from "./application/usecases/GetAllCustomersUseCase.js";
export { UpdateCustomerUseCase } from "./application/usecases/UpdateCustomerUseCase.js";
export { DeleteCustomerUseCase } from "./application/usecases/DeleteCustomerUseCase.js";
export { AddVehicleToCustomerUseCase } from "./application/usecases/AddVehicleToCustomerUseCase.js";
export { GetCustomerStatsUseCase } from "./application/usecases/GetCustomerStatsUseCase.js";
export { MongoCustomerRepository } from "./infrastructure/repositories/MongoCustomerRepository.js";
export { CustomerController } from "./presentation/controllers/CustomerController.js";
export { CustomerRoutes } from "./presentation/routes/CustomerRoutes.js";
export { default as CustomerContainer } from "./infrastructure/container/CustomerContainer.js";
export { customerContainer };
export function getCustomerRoutes(): any;
export function getCustomerController(): any;
export function getCustomerRepository(): any;
import customerContainer from "./infrastructure/container/CustomerContainer.js";
//# sourceMappingURL=index.d.ts.map