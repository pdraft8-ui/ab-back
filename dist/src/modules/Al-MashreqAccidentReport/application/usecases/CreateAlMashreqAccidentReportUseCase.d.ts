export class CreateAlMashreqAccidentReportUseCase {
    constructor({ alMashreqAccidentReportRepository, customerRepository, auditService, notificationService, }: {
        alMashreqAccidentReportRepository: any;
        customerRepository: any;
        auditService: any;
        notificationService: any;
    });
    alMashreqAccidentReportRepository: any;
    customerRepository: any;
    auditService: any;
    notificationService: any;
    execute(accidentData: any, plateNumber: any, userId: any, userName: any): Promise<any>;
}
//# sourceMappingURL=CreateAlMashreqAccidentReportUseCase.d.ts.map