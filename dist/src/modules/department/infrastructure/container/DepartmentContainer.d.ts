export class DepartmentContainer {
    departmentRepository: MongoDepartmentRepository;
    createDepartmentUseCase: CreateDepartmentUseCase;
    getAllDepartmentsUseCase: GetAllDepartmentsUseCase;
    getDepartmentByIdUseCase: GetDepartmentByIdUseCase;
    updateDepartmentUseCase: UpdateDepartmentUseCase;
    deleteDepartmentUseCase: DeleteDepartmentUseCase;
    getDepartmentStatsUseCase: GetDepartmentStatsUseCase;
    departmentController: DepartmentController;
    departmentRoutes: DepartmentRoutes;
    getDepartmentRepository(): MongoDepartmentRepository;
    getCreateDepartmentUseCase(): CreateDepartmentUseCase;
    getGetAllDepartmentsUseCase(): GetAllDepartmentsUseCase;
    getGetDepartmentByIdUseCase(): GetDepartmentByIdUseCase;
    getUpdateDepartmentUseCase(): UpdateDepartmentUseCase;
    getDeleteDepartmentUseCase(): DeleteDepartmentUseCase;
    getGetDepartmentStatsUseCase(): GetDepartmentStatsUseCase;
    getDepartmentController(): DepartmentController;
    getDepartmentRoutes(): DepartmentRoutes;
}
export class DepartmentContainerMinimal {
    mockDepartmentRepository: {
        create: (data: any) => Promise<Department>;
        findById: (id: any) => Promise<Department>;
        findByName: (name: any) => Promise<any>;
        findAll: () => Promise<Department[]>;
        update: (id: any, data: any) => Promise<Department>;
        delete: (id: any) => Promise<boolean>;
        getStats: () => Promise<{
            totalDepartments: number;
            departmentsWithEmployees: number;
            departmentsWithHead: number;
            emptyDepartments: number;
        }>;
    };
    createDepartmentUseCase: CreateDepartmentUseCase;
    getAllDepartmentsUseCase: GetAllDepartmentsUseCase;
    getDepartmentByIdUseCase: GetDepartmentByIdUseCase;
    updateDepartmentUseCase: UpdateDepartmentUseCase;
    deleteDepartmentUseCase: DeleteDepartmentUseCase;
    getDepartmentStatsUseCase: GetDepartmentStatsUseCase;
    departmentController: DepartmentController;
    departmentRoutes: DepartmentRoutes;
    getDepartmentRepository(): {
        create: (data: any) => Promise<Department>;
        findById: (id: any) => Promise<Department>;
        findByName: (name: any) => Promise<any>;
        findAll: () => Promise<Department[]>;
        update: (id: any, data: any) => Promise<Department>;
        delete: (id: any) => Promise<boolean>;
        getStats: () => Promise<{
            totalDepartments: number;
            departmentsWithEmployees: number;
            departmentsWithHead: number;
            emptyDepartments: number;
        }>;
    };
    getCreateDepartmentUseCase(): CreateDepartmentUseCase;
    getGetAllDepartmentsUseCase(): GetAllDepartmentsUseCase;
    getGetDepartmentByIdUseCase(): GetDepartmentByIdUseCase;
    getUpdateDepartmentUseCase(): UpdateDepartmentUseCase;
    getDeleteDepartmentUseCase(): DeleteDepartmentUseCase;
    getGetDepartmentStatsUseCase(): GetDepartmentStatsUseCase;
    getDepartmentController(): DepartmentController;
    getDepartmentRoutes(): DepartmentRoutes;
}
import { MongoDepartmentRepository } from "../repositories/MongoDepartmentRepository.js";
import { CreateDepartmentUseCase } from "../../application/usecases/CreateDepartmentUseCase.js";
import { GetAllDepartmentsUseCase } from "../../application/usecases/GetAllDepartmentsUseCase.js";
import { GetDepartmentByIdUseCase } from "../../application/usecases/GetDepartmentByIdUseCase.js";
import { UpdateDepartmentUseCase } from "../../application/usecases/UpdateDepartmentUseCase.js";
import { DeleteDepartmentUseCase } from "../../application/usecases/DeleteDepartmentUseCase.js";
import { GetDepartmentStatsUseCase } from "../../application/usecases/GetDepartmentStatsUseCase.js";
import { DepartmentController } from "../../presentation/controllers/DepartmentController.js";
import { DepartmentRoutes } from "../../presentation/routes/DepartmentRoutes.js";
import { Department } from "../../domain/entities/Department.entity.js";
//# sourceMappingURL=DepartmentContainer.d.ts.map