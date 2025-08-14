export class DeletePalestineAccidentReportUseCase {
    constructor({ palestineAccidentReportRepository, auditService, notificationService, }: {
        palestineAccidentReportRepository: any;
        auditService: any;
        notificationService: any;
    });
    palestineAccidentReportRepository: any;
    auditService: any;
    notificationService: any;
    execute(id: any, userId: any, userName: any): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=DeletePalestineAccidentReportUseCase.d.ts.map