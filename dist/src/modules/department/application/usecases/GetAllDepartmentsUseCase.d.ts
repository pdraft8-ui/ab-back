export class GetAllDepartmentsUseCase {
    constructor(departmentRepository: any);
    departmentRepository: any;
    execute(): Promise<{
        success: boolean;
        message: string;
        data: any;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
}
//# sourceMappingURL=GetAllDepartmentsUseCase.d.ts.map