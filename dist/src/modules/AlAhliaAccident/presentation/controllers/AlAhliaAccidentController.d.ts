export class AlAhliaAccidentController {
    constructor({ createAlAhliaAccidentUseCase, getAllAlAhliaAccidentsUseCase, getAlAhliaAccidentByIdUseCase, deleteAlAhliaAccidentUseCase, getAlAhliaAccidentStatsUseCase, }: {
        createAlAhliaAccidentUseCase: any;
        getAllAlAhliaAccidentsUseCase: any;
        getAlAhliaAccidentByIdUseCase: any;
        deleteAlAhliaAccidentUseCase: any;
        getAlAhliaAccidentStatsUseCase: any;
    });
    createAlAhliaAccidentUseCase: any;
    getAllAlAhliaAccidentsUseCase: any;
    getAlAhliaAccidentByIdUseCase: any;
    deleteAlAhliaAccidentUseCase: any;
    getAlAhliaAccidentStatsUseCase: any;
    addAccidentReport(req: any, res: any): Promise<void>;
    getAllAccidentReports(req: any, res: any): Promise<void>;
    findById(req: any, res: any): Promise<void>;
    deleteAccidentReport(req: any, res: any): Promise<void>;
    getAccidentReportStats(req: any, res: any): Promise<void>;
}
//# sourceMappingURL=AlAhliaAccidentController.d.ts.map