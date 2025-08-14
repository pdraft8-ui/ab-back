export class MongoDepartmentRepository extends IDepartmentRepository {
    mapToDepartmentEntity(departmentDoc: any): Department;
    create(departmentData: any): Promise<Department>;
    findById(id: any): Promise<Department>;
    findByName(name: any): Promise<Department>;
    findAll(): Promise<Department[]>;
    update(id: any, updateData: any): Promise<Department>;
    delete(id: any): Promise<boolean>;
    findByHeadOfDepartment(headOfDepartmentId: any): Promise<Department>;
    findDepartmentsWithEmployees(): Promise<Department[]>;
    addEmployeeToDepartment(departmentId: any, employee: any): Promise<Department>;
    removeEmployeeFromDepartment(departmentId: any, employeeId: any): Promise<Department>;
    setHeadOfDepartment(departmentId: any, userId: any): Promise<Department>;
    removeHeadOfDepartment(departmentId: any): Promise<Department>;
    getStats(): Promise<{
        totalDepartments: number;
        departmentsWithEmployees: number;
        departmentsWithHead: number;
        emptyDepartments: number;
    }>;
    countDepartments(): Promise<number>;
    findDepartmentsByPermission(permission: any): Promise<Department[]>;
}
import { IDepartmentRepository } from "../../domain/interfaces/IDepartmentRepository.js";
import { Department } from "../../domain/entities/Department.entity.js";
//# sourceMappingURL=MongoDepartmentRepository.d.ts.map