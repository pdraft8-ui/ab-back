export class TakafulAccidentReportController {
    constructor(createTakafulAccidentReportUseCase: any, getAllTakafulAccidentReportsUseCase: any, getTakafulAccidentReportByIdUseCase: any, deleteTakafulAccidentReportUseCase: any, getTakafulAccidentReportStatsUseCase: any);
    createTakafulAccidentReportUseCase: any;
    getAllTakafulAccidentReportsUseCase: any;
    getTakafulAccidentReportByIdUseCase: any;
    deleteTakafulAccidentReportUseCase: any;
    getTakafulAccidentReportStatsUseCase: any;
    addAccidentReport(req: any, res: any): Promise<void>;
    getAllAccidentReports(req: any, res: any): Promise<void>;
    findById(req: any, res: any): Promise<void>;
    deleteAccidentReport(req: any, res: any): Promise<void>;
    getAccidentReportStats(req: any, res: any): Promise<void>;
}
//# sourceMappingURL=TakafulAccidentReportController.d.ts.map