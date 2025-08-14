export class DeleteDepartmentUseCase {
    constructor(departmentRepository: any);
    departmentRepository: any;
    execute(id: any): Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
    }>;
}
//# sourceMappingURL=DeleteDepartmentUseCase.d.ts.map