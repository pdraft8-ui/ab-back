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
export function getTrustAccidentReportContainer(): Promise<import("./index.js").TrustAccidentReportContainer>;
export function getTrustAccidentReportContainerMinimal(): Promise<import("./index.js").TrustAccidentReportContainerMinimal>;
export function getTrustAccidentReportRoutes(): Promise<any>;
export { TrustAccidentReportContainer, TrustAccidentReportContainerMinimal } from "./infrastructure/container/TrustAccidentReportContainer.js";
//# sourceMappingURL=index.d.ts.map