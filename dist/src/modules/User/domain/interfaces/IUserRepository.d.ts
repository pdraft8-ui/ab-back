export class IUserRepository {
    create(userData: any): Promise<void>;
    findById(id: any): Promise<void>;
    findByEmail(email: any): Promise<void>;
    findByPhone(phone: any): Promise<void>;
    findAll(filters?: {}): Promise<void>;
    update(id: any, updateData: any): Promise<void>;
    delete(id: any): Promise<void>;
    findByDepartment(departmentId: any): Promise<void>;
    findByRole(role: any): Promise<void>;
    findByStatus(status: any): Promise<void>;
    findHeadOfDepartment(departmentId: any): Promise<void>;
    findEmployeesByDepartment(departmentId: any): Promise<void>;
    updatePassword(id: any, newPassword: any): Promise<void>;
    updateSendCode(id: any, sendCode: any): Promise<void>;
    toggleStatus(id: any): Promise<void>;
    getStats(): Promise<void>;
    countByRole(role: any): Promise<void>;
    countByDepartment(departmentId: any): Promise<void>;
}
//# sourceMappingURL=IUserRepository.d.ts.map