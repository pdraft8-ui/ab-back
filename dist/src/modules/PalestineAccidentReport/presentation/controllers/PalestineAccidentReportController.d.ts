export class PalestineAccidentReportController {
    constructor({ createPalestineAccidentReportUseCase, getAllPalestineAccidentReportsUseCase, getPalestineAccidentReportByIdUseCase, deletePalestineAccidentReportUseCase, getPalestineAccidentReportStatsUseCase, }: {
        createPalestineAccidentReportUseCase: any;
        getAllPalestineAccidentReportsUseCase: any;
        getPalestineAccidentReportByIdUseCase: any;
        deletePalestineAccidentReportUseCase: any;
        getPalestineAccidentReportStatsUseCase: any;
    });
    createPalestineAccidentReportUseCase: any;
    getAllPalestineAccidentReportsUseCase: any;
    getPalestineAccidentReportByIdUseCase: any;
    deletePalestineAccidentReportUseCase: any;
    getPalestineAccidentReportStatsUseCase: any;
    addAccidentReport(req: any, res: any): Promise<void>;
    getAllAccidentReports(req: any, res: any): Promise<void>;
    findById(req: any, res: any): Promise<void>;
    deleteAccidentReport(req: any, res: any): Promise<void>;
    getAccidentReportStats(req: any, res: any): Promise<void>;
}
//# sourceMappingURL=PalestineAccidentReportController.d.ts.map