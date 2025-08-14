export class CreateHolyLandsReportUseCase {
    constructor({ holyLandsReportRepository, customerRepository, auditService, notificationService, }: {
        holyLandsReportRepository: any;
        customerRepository: any;
        auditService: any;
        notificationService: any;
    });
    holyLandsReportRepository: any;
    customerRepository: any;
    auditService: any;
    notificationService: any;
    execute(accidentData: any, plateNumber: any, userId: any, userName: any): Promise<any>;
}
//# sourceMappingURL=CreateHolyLandsReportUseCase.d.ts.map