export class Department {
    static fromJSON(json: any): Department;
    static create(departmentData: any): Department;
    constructor(departmentData: any);
    id: any;
    name: any;
    description: any;
    headOfDepartment: any;
    role: any;
    employees: any;
    permissions: any;
    createdAt: any;
    updatedAt: any;
    isValid(): boolean;
    hasValidName(): boolean;
    hasValidDescription(): boolean;
    getEmployeeCount(): any;
    hasHeadOfDepartment(): boolean;
    hasEmployees(): boolean;
    hasPermission(permission: any): any;
    addPermission(permission: any): void;
    removePermission(permission: any): void;
    addEmployee(employee: any): void;
    removeEmployee(employeeId: any): void;
    setHeadOfDepartment(user: any): void;
    removeHeadOfDepartment(): void;
    toJSON(): {
        id: any;
        name: any;
        description: any;
        headOfDepartment: any;
        role: any;
        employees: any;
        permissions: any;
        employeeCount: any;
        createdAt: any;
        updatedAt: any;
    };
}
//# sourceMappingURL=Department.entity.d.ts.map