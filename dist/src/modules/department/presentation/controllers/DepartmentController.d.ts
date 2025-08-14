export class DepartmentController {
    constructor(createDepartmentUseCase: any, getAllDepartmentsUseCase: any, getDepartmentByIdUseCase: any, updateDepartmentUseCase: any, deleteDepartmentUseCase: any, getDepartmentStatsUseCase: any);
    createDepartmentUseCase: any;
    getAllDepartmentsUseCase: any;
    getDepartmentByIdUseCase: any;
    updateDepartmentUseCase: any;
    deleteDepartmentUseCase: any;
    getDepartmentStatsUseCase: any;
    addDepartment(req: any, res: any, next: any): Promise<any>;
    getAllDepartments(req: any, res: any, next: any): Promise<any>;
    getDepartmentById(req: any, res: any, next: any): Promise<any>;
    updateDepartment(req: any, res: any, next: any): Promise<any>;
    deleteDepartment(req: any, res: any, next: any): Promise<any>;
    getDepartmentStats(req: any, res: any, next: any): Promise<any>;
}
//# sourceMappingURL=DepartmentController.d.ts.map