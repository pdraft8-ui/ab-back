export {
  InsuranceCompanyContainer,
  InsuranceCompanyContainerMinimal,
} from "./infrastructure/container/InsuranceCompanyContainer.js";

export const getInsuranceCompanyRoutes = async () => {
  const { InsuranceCompanyContainer } = await import(
    "./infrastructure/container/InsuranceCompanyContainer.js"
  );
  const container = new InsuranceCompanyContainer();
  return container.getInsuranceCompanyRoutes();
};

export { InsuranceCompany } from "./domain/entities/InsuranceCompany.entity.js";
export { IInsuranceCompanyRepository } from "./domain/interfaces/IInsuranceCompanyRepository.js";

// Use Cases
export { CreateInsuranceCompanyUseCase } from "./application/usecases/CreateInsuranceCompanyUseCase.js";
export { GetAllInsuranceCompaniesUseCase } from "./application/usecases/GetAllInsuranceCompaniesUseCase.js";
export { GetInsuranceCompanyByIdUseCase } from "./application/usecases/GetInsuranceCompanyByIdUseCase.js";
export { UpdateInsuranceCompanyUseCase } from "./application/usecases/UpdateInsuranceCompanyUseCase.js";
export { DeleteInsuranceCompanyUseCase } from "./application/usecases/DeleteInsuranceCompanyUseCase.js";
export { GetInsuranceCompanyStatsUseCase } from "./application/usecases/GetInsuranceCompanyStatsUseCase.js";

// Infrastructure
export { MongoInsuranceCompanyRepository } from "./infrastructure/repositories/MongoInsuranceCompanyRepository.js";

// Presentation
export { InsuranceCompanyController } from "./presentation/controllers/InsuranceCompanyController.js";
export { InsuranceCompanyRoutes } from "./presentation/routes/InsuranceCompanyRoutes.js";
