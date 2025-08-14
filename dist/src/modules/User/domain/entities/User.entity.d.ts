export class User {
    static fromJSON(json: any): User;
    static create(userData: any): User;
    constructor(userData: any);
    id: any;
    name: any;
    email: any;
    phone: any;
    password: any;
    departmentId: any;
    role: any;
    sendCode: any;
    status: any;
    createdAt: any;
    updatedAt: any;
    isValid(): boolean;
    isActive(): boolean;
    isAdmin(): boolean;
    isHeadOfDepartment(): boolean;
    isEmployee(): boolean;
    isCustomer(): boolean;
    isAgent(): boolean;
    canManageEmployees(): boolean;
    canManageDepartments(): boolean;
    hasValidEmail(): boolean;
    hasValidPhone(): boolean;
    getRolePermissions(): any;
    toJSON(): {
        id: any;
        name: any;
        email: any;
        phone: any;
        departmentId: any;
        role: any;
        status: any;
        createdAt: any;
        updatedAt: any;
    };
}
//# sourceMappingURL=User.entity.d.ts.map