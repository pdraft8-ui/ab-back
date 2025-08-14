export class DeleteInsuranceCompanyUseCase {
    constructor(insuranceCompanyRepository: any, auditService: any);
    insuranceCompanyRepository: any;
    auditService: any;
    execute(id: any, userId: any, userName: any): Promise<{
        success: boolean;
        message: string;
    }>;
}
//# sourceMappingURL=DeleteInsuranceCompanyUseCase.d.ts.map