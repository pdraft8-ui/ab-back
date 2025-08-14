export class DeleteAlMashreqAccidentReportUseCase {
    constructor({ alMashreqAccidentReportRepository, auditService, notificationService, }: {
        alMashreqAccidentReportRepository: any;
        auditService: any;
        notificationService: any;
    });
    alMashreqAccidentReportRepository: any;
    auditService: any;
    notificationService: any;
    execute(id: any, userId: any, userName: any): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=DeleteAlMashreqAccidentReportUseCase.d.ts.map