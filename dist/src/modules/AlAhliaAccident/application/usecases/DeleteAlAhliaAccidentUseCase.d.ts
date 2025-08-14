export class DeleteAlAhliaAccidentUseCase {
    constructor({ alAhliaAccidentRepository, auditService, notificationService, }: {
        alAhliaAccidentRepository: any;
        auditService: any;
        notificationService: any;
    });
    alAhliaAccidentRepository: any;
    auditService: any;
    notificationService: any;
    execute(id: any, userId: any, userName: any): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=DeleteAlAhliaAccidentUseCase.d.ts.map