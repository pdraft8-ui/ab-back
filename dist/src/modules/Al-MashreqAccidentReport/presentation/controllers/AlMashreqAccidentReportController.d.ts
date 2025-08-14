export class AlMashreqAccidentReportController {
    constructor({ createAlMashreqAccidentReportUseCase, getAllAlMashreqAccidentReportsUseCase, getAlMashreqAccidentReportByIdUseCase, deleteAlMashreqAccidentReportUseCase, getAlMashreqAccidentReportStatsUseCase, }: {
        createAlMashreqAccidentReportUseCase: any;
        getAllAlMashreqAccidentReportsUseCase: any;
        getAlMashreqAccidentReportByIdUseCase: any;
        deleteAlMashreqAccidentReportUseCase: any;
        getAlMashreqAccidentReportStatsUseCase: any;
    });
    createAlMashreqAccidentReportUseCase: any;
    getAllAlMashreqAccidentReportsUseCase: any;
    getAlMashreqAccidentReportByIdUseCase: any;
    deleteAlMashreqAccidentReportUseCase: any;
    getAlMashreqAccidentReportStatsUseCase: any;
    addAccidentReport(req: any, res: any): Promise<void>;
    getAllAccidentReports(req: any, res: any): Promise<void>;
    findById(req: any, res: any): Promise<void>;
    deleteAccidentReport(req: any, res: any): Promise<void>;
    getAccidentReportStats(req: any, res: any): Promise<void>;
}
//# sourceMappingURL=AlMashreqAccidentReportController.d.ts.map