export class CreateTrustAccidentReportUseCase {
    constructor(trustAccidentReportRepository: any, customerRepository: any, auditService: any, notificationService: any);
    trustAccidentReportRepository: any;
    customerRepository: any;
    auditService: any;
    notificationService: any;
    execute(accidentReportData: any, plateNumber: any, user: any): Promise<any>;
}
//# sourceMappingURL=CreateTrustAccidentReportUseCase.d.ts.map