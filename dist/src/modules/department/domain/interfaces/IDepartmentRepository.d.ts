export class IDepartmentRepository {
    create(departmentData: any): Promise<void>;
    findById(id: any): Promise<void>;
    findByName(name: any): Promise<void>;
    findAll(): Promise<void>;
    update(id: any, updateData: any): Promise<void>;
    delete(id: any): Promise<void>;
    findByHeadOfDepartment(headOfDepartmentId: any): Promise<void>;
    findDepartmentsWithEmployees(): Promise<void>;
    addEmployeeToDepartment(departmentId: any, employee: any): Promise<void>;
    removeEmployeeFromDepartment(departmentId: any, employeeId: any): Promise<void>;
    setHeadOfDepartment(departmentId: any, userId: any): Promise<void>;
    removeHeadOfDepartment(departmentId: any): Promise<void>;
    getStats(): Promise<void>;
    countDepartments(): Promise<void>;
    findDepartmentsByPermission(permission: any): Promise<void>;
}
//# sourceMappingURL=IDepartmentRepository.d.ts.map