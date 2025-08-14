export class DeleteTrustAccidentReportUseCase {
    constructor(trustAccidentReportRepository: any, auditService: any, notificationService: any);
    trustAccidentReportRepository: any;
    auditService: any;
    notificationService: any;
    execute(id: any, user: any): Promise<{
        success: boolean;
        message: string;
    }>;
}
//# sourceMappingURL=DeleteTrustAccidentReportUseCase.d.ts.map