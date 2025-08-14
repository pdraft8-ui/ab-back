export class GetDepartmentStatsUseCase {
    constructor(departmentRepository: any);
    departmentRepository: any;
    execute(): Promise<{
        success: boolean;
        message: string;
        stats: any;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        stats?: undefined;
    }>;
}
//# sourceMappingURL=GetDepartmentStatsUseCase.d.ts.map