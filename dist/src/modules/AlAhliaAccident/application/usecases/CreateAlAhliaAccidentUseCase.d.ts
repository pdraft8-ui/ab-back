export class CreateAlAhliaAccidentUseCase {
    constructor({ alAhliaAccidentRepository, customerRepository, auditService, notificationService, }: {
        alAhliaAccidentRepository: any;
        customerRepository: any;
        auditService: any;
        notificationService: any;
    });
    alAhliaAccidentRepository: any;
    customerRepository: any;
    auditService: any;
    notificationService: any;
    execute(accidentData: any, plateNumber: any, userId: any, userName: any): Promise<any>;
}
//# sourceMappingURL=CreateAlAhliaAccidentUseCase.d.ts.map