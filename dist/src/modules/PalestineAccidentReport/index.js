// Export individual components for direct import
export { PalestineAccidentReport } from "./domain/entities/PalestineAccidentReport.entity.js";
export { IPalestineAccidentReportRepository } from "./domain/interfaces/IPalestineAccidentReportRepository.js";
export { CreatePalestineAccidentReportUseCase } from "./application/usecases/CreatePalestineAccidentReportUseCase.js";
export { GetAllPalestineAccidentReportsUseCase } from "./application/usecases/GetAllPalestineAccidentReportsUseCase.js";
export { GetPalestineAccidentReportByIdUseCase } from "./application/usecases/GetPalestineAccidentReportByIdUseCase.js";
export { DeletePalestineAccidentReportUseCase } from "./application/usecases/DeletePalestineAccidentReportUseCase.js";
export { GetPalestineAccidentReportStatsUseCase } from "./application/usecases/GetPalestineAccidentReportStatsUseCase.js";
export { MongoPalestineAccidentReportRepository } from "./infrastructure/repositories/MongoPalestineAccidentReportRepository.js";
export { PalestineAccidentReportController } from "./presentation/controllers/PalestineAccidentReportController.js";
export { PalestineAccidentReportRoutes } from "./presentation/routes/PalestineAccidentReportRoutes.js";
export { PalestineAccidentReportContainer, PalestineAccidentReportContainerMinimal, } from "./infrastructure/container/PalestineAccidentReportContainer.js";
// Route factory function
export async function getPalestineAccidentReportRoutes() {
    const { PalestineAccidentReportContainer } = await import("./infrastructure/container/PalestineAccidentReportContainer.js");
    const container = new PalestineAccidentReportContainer();
    return container.get("palestineAccidentReportRoutes");
}
// Container factory functions
export async function getPalestineAccidentReportContainer() {
    const { PalestineAccidentReportContainer } = await import("./infrastructure/container/PalestineAccidentReportContainer.js");
    return new PalestineAccidentReportContainer();
}
export async function getPalestineAccidentReportContainerMinimal() {
    const { PalestineAccidentReportContainerMinimal } = await import("./infrastructure/container/PalestineAccidentReportContainer.js");
    return new PalestineAccidentReportContainerMinimal();
}
//# sourceMappingURL=index.js.map