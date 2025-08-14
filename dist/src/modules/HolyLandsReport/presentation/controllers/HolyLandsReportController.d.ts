export class HolyLandsReportController {
    constructor({ createHolyLandsReportUseCase, getAllHolyLandsReportsUseCase, getHolyLandsReportByIdUseCase, deleteHolyLandsReportUseCase, getHolyLandsReportStatsUseCase, }: {
        createHolyLandsReportUseCase: any;
        getAllHolyLandsReportsUseCase: any;
        getHolyLandsReportByIdUseCase: any;
        deleteHolyLandsReportUseCase: any;
        getHolyLandsReportStatsUseCase: any;
    });
    createHolyLandsReportUseCase: any;
    getAllHolyLandsReportsUseCase: any;
    getHolyLandsReportByIdUseCase: any;
    deleteHolyLandsReportUseCase: any;
    getHolyLandsReportStatsUseCase: any;
    addAccidentReport(req: any, res: any): Promise<void>;
    getAllAccidentReports(req: any, res: any): Promise<void>;
    findById(req: any, res: any): Promise<void>;
    deleteAccidentReport(req: any, res: any): Promise<void>;
    getAccidentReportStats(req: any, res: any): Promise<void>;
}
//# sourceMappingURL=HolyLandsReportController.d.ts.map