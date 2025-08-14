export class CreateDepartmentUseCase {
    constructor(departmentRepository: any);
    departmentRepository: any;
    execute(departmentData: any): Promise<{
        success: boolean;
        message: string;
        department?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        department: any;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        department?: undefined;
    }>;
}
//# sourceMappingURL=CreateDepartmentUseCase.d.ts.map