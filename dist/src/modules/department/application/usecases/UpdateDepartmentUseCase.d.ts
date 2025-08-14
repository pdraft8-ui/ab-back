export class UpdateDepartmentUseCase {
    constructor(departmentRepository: any);
    departmentRepository: any;
    execute(id: any, updateData: any): Promise<{
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
//# sourceMappingURL=UpdateDepartmentUseCase.d.ts.map