export class DeleteHolyLandsReportUseCase {
    constructor({ holyLandsReportRepository, auditService, notificationService, }: {
        holyLandsReportRepository: any;
        auditService: any;
        notificationService: any;
    });
    holyLandsReportRepository: any;
    auditService: any;
    notificationService: any;
    execute(id: any, userId: any, userName: any): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=DeleteHolyLandsReportUseCase.d.ts.map