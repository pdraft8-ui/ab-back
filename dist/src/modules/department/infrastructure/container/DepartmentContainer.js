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
export class DepartmentContainer {
    constructor() {
        this.departmentRepository = new MongoDepartmentRepository();
        this.createDepartmentUseCase = new CreateDepartmentUseCase(this.departmentRepository);
        this.getAllDepartmentsUseCase = new GetAllDepartmentsUseCase(this.departmentRepository);
        this.getDepartmentByIdUseCase = new GetDepartmentByIdUseCase(this.departmentRepository);
        this.updateDepartmentUseCase = new UpdateDepartmentUseCase(this.departmentRepository);
        this.deleteDepartmentUseCase = new DeleteDepartmentUseCase(this.departmentRepository);
        this.getDepartmentStatsUseCase = new GetDepartmentStatsUseCase(this.departmentRepository);
        this.departmentController = new DepartmentController(this.createDepartmentUseCase, this.getAllDepartmentsUseCase, this.getDepartmentByIdUseCase, this.updateDepartmentUseCase, this.deleteDepartmentUseCase, this.getDepartmentStatsUseCase);
        this.departmentRoutes = new DepartmentRoutes(this.departmentController);
    }
    getDepartmentRepository() {
        return this.departmentRepository;
    }
    getCreateDepartmentUseCase() {
        return this.createDepartmentUseCase;
    }
    getGetAllDepartmentsUseCase() {
        return this.getAllDepartmentsUseCase;
    }
    getGetDepartmentByIdUseCase() {
        return this.getDepartmentByIdUseCase;
    }
    getUpdateDepartmentUseCase() {
        return this.updateDepartmentUseCase;
    }
    getDeleteDepartmentUseCase() {
        return this.deleteDepartmentUseCase;
    }
    getGetDepartmentStatsUseCase() {
        return this.getDepartmentStatsUseCase;
    }
    getDepartmentController() {
        return this.departmentController;
    }
    getDepartmentRoutes() {
        return this.departmentRoutes;
    }
}
// Minimal container for testing with mock dependencies
export class DepartmentContainerMinimal {
    constructor() {
        // Mock repository
        this.mockDepartmentRepository = {
            create: async (data) => new Department({ id: "mock-id", ...data }),
            findById: async (id) => new Department({
                id,
                name: "Mock Department",
                description: "Mock Description",
            }),
            findByName: async (name) => null, // No existing department
            findAll: async () => [
                new Department({
                    id: "1",
                    name: "IT Department",
                    description: "Information Technology",
                }),
                new Department({
                    id: "2",
                    name: "HR Department",
                    description: "Human Resources",
                }),
            ],
            update: async (id, data) => new Department({ id, ...data }),
            delete: async (id) => true,
            getStats: async () => ({
                totalDepartments: 2,
                departmentsWithEmployees: 1,
                departmentsWithHead: 1,
                emptyDepartments: 1,
            }),
        };
        this.createDepartmentUseCase = new CreateDepartmentUseCase(this.mockDepartmentRepository);
        this.getAllDepartmentsUseCase = new GetAllDepartmentsUseCase(this.mockDepartmentRepository);
        this.getDepartmentByIdUseCase = new GetDepartmentByIdUseCase(this.mockDepartmentRepository);
        this.updateDepartmentUseCase = new UpdateDepartmentUseCase(this.mockDepartmentRepository);
        this.deleteDepartmentUseCase = new DeleteDepartmentUseCase(this.mockDepartmentRepository);
        this.getDepartmentStatsUseCase = new GetDepartmentStatsUseCase(this.mockDepartmentRepository);
        this.departmentController = new DepartmentController(this.createDepartmentUseCase, this.getAllDepartmentsUseCase, this.getDepartmentByIdUseCase, this.updateDepartmentUseCase, this.deleteDepartmentUseCase, this.getDepartmentStatsUseCase);
        this.departmentRoutes = new DepartmentRoutes(this.departmentController);
    }
    getDepartmentRepository() {
        return this.mockDepartmentRepository;
    }
    getCreateDepartmentUseCase() {
        return this.createDepartmentUseCase;
    }
    getGetAllDepartmentsUseCase() {
        return this.getAllDepartmentsUseCase;
    }
    getGetDepartmentByIdUseCase() {
        return this.getDepartmentByIdUseCase;
    }
    getUpdateDepartmentUseCase() {
        return this.updateDepartmentUseCase;
    }
    getDeleteDepartmentUseCase() {
        return this.deleteDepartmentUseCase;
    }
    getGetDepartmentStatsUseCase() {
        return this.getDepartmentStatsUseCase;
    }
    getDepartmentController() {
        return this.departmentController;
    }
    getDepartmentRoutes() {
        return this.departmentRoutes;
    }
}
//# sourceMappingURL=DepartmentContainer.js.map