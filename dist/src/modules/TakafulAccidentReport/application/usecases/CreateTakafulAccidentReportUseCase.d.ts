export class CreateTakafulAccidentReportUseCase {
    constructor(takafulAccidentReportRepository: any, customerRepository: any, auditService: any, notificationService: any);
    takafulAccidentReportRepository: any;
    customerRepository: any;
    auditService: any;
    notificationService: any;
    execute(accidentReportData: any, plateNumber: any, userId: any, userName: any): Promise<any>;
}
//# sourceMappingURL=CreateTakafulAccidentReportUseCase.d.ts.map