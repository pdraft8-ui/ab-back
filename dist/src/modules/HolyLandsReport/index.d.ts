export function getHolyLandsReportRoutes(): Promise<any>;
export function getHolyLandsReportContainer(): Promise<import("./index.js").HolyLandsReportContainer>;
export function getHolyLandsReportContainerMinimal(): Promise<import("./index.js").HolyLandsReportContainerMinimal>;
export { HolyLandsReport } from "./domain/entities/HolyLandsReport.entity.js";
export { IHolyLandsReportRepository } from "./domain/interfaces/IHolyLandsReportRepository.js";
export { CreateHolyLandsReportUseCase } from "./application/usecases/CreateHolyLandsReportUseCase.js";
export { GetAllHolyLandsReportsUseCase } from "./application/usecases/GetAllHolyLandsReportsUseCase.js";
export { GetHolyLandsReportByIdUseCase } from "./application/usecases/GetHolyLandsReportByIdUseCase.js";
export { DeleteHolyLandsReportUseCase } from "./application/usecases/DeleteHolyLandsReportUseCase.js";
export { GetHolyLandsReportStatsUseCase } from "./application/usecases/GetHolyLandsReportStatsUseCase.js";
export { MongoHolyLandsReportRepository } from "./infrastructure/repositories/MongoHolyLandsReportRepository.js";
export { HolyLandsReportController } from "./presentation/controllers/HolyLandsReportController.js";
export { HolyLandsReportRoutes } from "./presentation/routes/HolyLandsReportRoutes.js";
export { HolyLandsReportContainer, HolyLandsReportContainerMinimal } from "./infrastructure/container/HolyLandsReportContainer.js";
//# sourceMappingURL=index.d.ts.map