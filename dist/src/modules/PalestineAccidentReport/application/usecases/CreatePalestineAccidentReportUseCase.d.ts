export class CreatePalestineAccidentReportUseCase {
    constructor({ palestineAccidentReportRepository, customerRepository, auditService, notificationService, }: {
        palestineAccidentReportRepository: any;
        customerRepository: any;
        auditService: any;
        notificationService: any;
    });
    palestineAccidentReportRepository: any;
    customerRepository: any;
    auditService: any;
    notificationService: any;
    execute(accidentData: any, plateNumber: any, userId: any, userName: any): Promise<any>;
}
//# sourceMappingURL=CreatePalestineAccidentReportUseCase.d.ts.map