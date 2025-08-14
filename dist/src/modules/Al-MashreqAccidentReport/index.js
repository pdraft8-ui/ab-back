// Export individual components for direct import
export { AlMashreqAccidentReport } from "./domain/entities/AlMashreqAccidentReport.entity.js";
export { IAlMashreqAccidentReportRepository } from "./domain/interfaces/IAlMashreqAccidentReportRepository.js";
export { CreateAlMashreqAccidentReportUseCase } from "./application/usecases/CreateAlMashreqAccidentReportUseCase.js";
export { GetAllAlMashreqAccidentReportsUseCase } from "./application/usecases/GetAllAlMashreqAccidentReportsUseCase.js";
export { GetAlMashreqAccidentReportByIdUseCase } from "./application/usecases/GetAlMashreqAccidentReportByIdUseCase.js";
export { DeleteAlMashreqAccidentReportUseCase } from "./application/usecases/DeleteAlMashreqAccidentReportUseCase.js";
export { GetAlMashreqAccidentReportStatsUseCase } from "./application/usecases/GetAlMashreqAccidentReportStatsUseCase.js";
export { MongoAlMashreqAccidentReportRepository } from "./infrastructure/repositories/MongoAlMashreqAccidentReportRepository.js";
export { AlMashreqAccidentReportController } from "./presentation/controllers/AlMashreqAccidentReportController.js";
export { AlMashreqAccidentReportRoutes } from "./presentation/routes/AlMashreqAccidentReportRoutes.js";
export { AlMashreqAccidentReportContainer, AlMashreqAccidentReportContainerMinimal, } from "./infrastructure/container/AlMashreqAccidentReportContainer.js";
// Route factory function
export async function getAlMashreqAccidentReportRoutes() {
    const { AlMashreqAccidentReportContainer } = await import("./infrastructure/container/AlMashreqAccidentReportContainer.js");
    const container = new AlMashreqAccidentReportContainer();
    return container.get("alMashreqAccidentReportRoutes");
}
// Container factory functions
export async function getAlMashreqAccidentReportContainer() {
    const { AlMashreqAccidentReportContainer } = await import("./infrastructure/container/AlMashreqAccidentReportContainer.js");
    return new AlMashreqAccidentReportContainer();
}
export async function getAlMashreqAccidentReportContainerMinimal() {
    const { AlMashreqAccidentReportContainerMinimal } = await import("./infrastructure/container/AlMashreqAccidentReportContainer.js");
    return new AlMashreqAccidentReportContainerMinimal();
}
//# sourceMappingURL=index.js.map