export function getInsuranceCompanyRoutes(): Promise<import("./index.js").InsuranceCompanyRoutes>;
export { InsuranceCompany } from "./domain/entities/InsuranceCompany.entity.js";
export { IInsuranceCompanyRepository } from "./domain/interfaces/IInsuranceCompanyRepository.js";
export { CreateInsuranceCompanyUseCase } from "./application/usecases/CreateInsuranceCompanyUseCase.js";
export { GetAllInsuranceCompaniesUseCase } from "./application/usecases/GetAllInsuranceCompaniesUseCase.js";
export { GetInsuranceCompanyByIdUseCase } from "./application/usecases/GetInsuranceCompanyByIdUseCase.js";
export { UpdateInsuranceCompanyUseCase } from "./application/usecases/UpdateInsuranceCompanyUseCase.js";
export { DeleteInsuranceCompanyUseCase } from "./application/usecases/DeleteInsuranceCompanyUseCase.js";
export { GetInsuranceCompanyStatsUseCase } from "./application/usecases/GetInsuranceCompanyStatsUseCase.js";
export { MongoInsuranceCompanyRepository } from "./infrastructure/repositories/MongoInsuranceCompanyRepository.js";
export { InsuranceCompanyController } from "./presentation/controllers/InsuranceCompanyController.js";
export { InsuranceCompanyRoutes } from "./presentation/routes/InsuranceCompanyRoutes.js";
export { InsuranceCompanyContainer, InsuranceCompanyContainerMinimal } from "./infrastructure/container/InsuranceCompanyContainer.js";
//# sourceMappingURL=index.d.ts.map