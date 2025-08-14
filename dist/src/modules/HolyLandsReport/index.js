// Export individual components for direct import
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
export { HolyLandsReportContainer, HolyLandsReportContainerMinimal, } from "./infrastructure/container/HolyLandsReportContainer.js";
// Route factory function
export async function getHolyLandsReportRoutes() {
    const { HolyLandsReportContainer } = await import("./infrastructure/container/HolyLandsReportContainer.js");
    const container = new HolyLandsReportContainer();
    return container.get("holyLandsReportRoutes");
}
// Container factory functions
export async function getHolyLandsReportContainer() {
    const { HolyLandsReportContainer } = await import("./infrastructure/container/HolyLandsReportContainer.js");
    return new HolyLandsReportContainer();
}
export async function getHolyLandsReportContainerMinimal() {
    const { HolyLandsReportContainerMinimal } = await import("./infrastructure/container/HolyLandsReportContainer.js");
    return new HolyLandsReportContainerMinimal();
}
//# sourceMappingURL=index.js.map