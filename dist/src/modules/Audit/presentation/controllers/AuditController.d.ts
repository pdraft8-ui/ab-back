export class AuditController {
    constructor(logActionUseCase: any, getAuditLogsUseCase: any, getAuditLogByIdUseCase: any, getAuditStatsUseCase: any);
    logActionUseCase: any;
    getAuditLogsUseCase: any;
    getAuditLogByIdUseCase: any;
    getAuditStatsUseCase: any;
    logAction(req: any, res: any): Promise<void>;
    getAuditLogs(req: any, res: any): Promise<void>;
    getAuditLogById(req: any, res: any): Promise<any>;
    getAuditLogsByUser(req: any, res: any): Promise<void>;
    getAuditLogsByEntity(req: any, res: any): Promise<void>;
    getAuditStats(req: any, res: any): Promise<void>;
}
//# sourceMappingURL=AuditController.d.ts.map