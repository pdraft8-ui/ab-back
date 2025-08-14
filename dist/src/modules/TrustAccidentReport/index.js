// Export individual components for direct import in tests
export { TrustAccidentReport } from "./domain/entities/TrustAccidentReport.entity.js";
export { ITrustAccidentReportRepository } from "./domain/interfaces/ITrustAccidentReportRepository.js";
export { CreateTrustAccidentReportUseCase } from "./application/usecases/CreateTrustAccidentReportUseCase.js";
export { GetAllTrustAccidentReportsUseCase } from "./application/usecases/GetAllTrustAccidentReportsUseCase.js";
export { GetTrustAccidentReportByIdUseCase } from "./application/usecases/GetTrustAccidentReportByIdUseCase.js";
export { DeleteTrustAccidentReportUseCase } from "./application/usecases/DeleteTrustAccidentReportUseCase.js";
export { GetTrustAccidentReportStatsUseCase } from "./application/usecases/GetTrustAccidentReportStatsUseCase.js";
export { MongoTrustAccidentReportRepository } from "./infrastructure/repositories/MongoTrustAccidentReportRepository.js";
export { TrustAccidentReportController } from "./presentation/controllers/TrustAccidentReportController.js";
export { TrustAccidentReportRoutes } from "./presentation/routes/TrustAccidentReportRoutes.js";
export { TrustAccidentReportContainer, TrustAccidentReportContainerMinimal, } from "./infrastructure/container/TrustAccidentReportContainer.js";
// Export container instances
export const getTrustAccidentReportContainer = async () => {
    const { TrustAccidentReportContainer } = await import("./infrastructure/container/TrustAccidentReportContainer.js");
    return new TrustAccidentReportContainer();
};
export const getTrustAccidentReportContainerMinimal = async () => {
    const { TrustAccidentReportContainerMinimal } = await import("./infrastructure/container/TrustAccidentReportContainer.js");
    return new TrustAccidentReportContainerMinimal();
};
// Export route factory
export const getTrustAccidentReportRoutes = async () => {
    const container = await getTrustAccidentReportContainer();
    return container.get("trustAccidentReportRoutes");
};
//# sourceMappingURL=index.js.map