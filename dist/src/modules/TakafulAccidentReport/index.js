import { TakafulAccidentReportContainer, TakafulAccidentReportContainerMinimal, } from "./infrastructure/container/TakafulAccidentReportContainer.js";
// Export container getters
export const getTakafulAccidentReportContainer = () => new TakafulAccidentReportContainer();
export const getTakafulAccidentReportContainerMinimal = () => new TakafulAccidentReportContainerMinimal();
// Export route factory
export const getTakafulAccidentReportRoutes = async () => {
    const container = new TakafulAccidentReportContainer();
    return container.getTakafulAccidentReportRoutes();
};
// Export individual components for direct import in tests
export { TakafulAccidentReport } from "./domain/entities/TakafulAccidentReport.entity.js";
export { CreateTakafulAccidentReportUseCase } from "./application/usecases/CreateTakafulAccidentReportUseCase.js";
export { GetAllTakafulAccidentReportsUseCase } from "./application/usecases/GetAllTakafulAccidentReportsUseCase.js";
export { GetTakafulAccidentReportByIdUseCase } from "./application/usecases/GetTakafulAccidentReportByIdUseCase.js";
export { DeleteTakafulAccidentReportUseCase } from "./application/usecases/DeleteTakafulAccidentReportUseCase.js";
export { GetTakafulAccidentReportStatsUseCase } from "./application/usecases/GetTakafulAccidentReportStatsUseCase.js";
export { TakafulAccidentReportController } from "./presentation/controllers/TakafulAccidentReportController.js";
export { TakafulAccidentReportRoutes } from "./presentation/routes/TakafulAccidentReportRoutes.js";
export { MongoTakafulAccidentReportRepository } from "./infrastructure/repositories/MongoTakafulAccidentReportRepository.js";
//# sourceMappingURL=index.js.map