export function getTakafulAccidentReportContainer(): TakafulAccidentReportContainer;
export function getTakafulAccidentReportContainerMinimal(): TakafulAccidentReportContainerMinimal;
export function getTakafulAccidentReportRoutes(): Promise<import("./index.js").TakafulAccidentReportRoutes>;
export { TakafulAccidentReport } from "./domain/entities/TakafulAccidentReport.entity.js";
export { CreateTakafulAccidentReportUseCase } from "./application/usecases/CreateTakafulAccidentReportUseCase.js";
export { GetAllTakafulAccidentReportsUseCase } from "./application/usecases/GetAllTakafulAccidentReportsUseCase.js";
export { GetTakafulAccidentReportByIdUseCase } from "./application/usecases/GetTakafulAccidentReportByIdUseCase.js";
export { DeleteTakafulAccidentReportUseCase } from "./application/usecases/DeleteTakafulAccidentReportUseCase.js";
export { GetTakafulAccidentReportStatsUseCase } from "./application/usecases/GetTakafulAccidentReportStatsUseCase.js";
export { TakafulAccidentReportController } from "./presentation/controllers/TakafulAccidentReportController.js";
export { TakafulAccidentReportRoutes } from "./presentation/routes/TakafulAccidentReportRoutes.js";
export { MongoTakafulAccidentReportRepository } from "./infrastructure/repositories/MongoTakafulAccidentReportRepository.js";
import { TakafulAccidentReportContainer } from "./infrastructure/container/TakafulAccidentReportContainer.js";
import { TakafulAccidentReportContainerMinimal } from "./infrastructure/container/TakafulAccidentReportContainer.js";
//# sourceMappingURL=index.d.ts.map