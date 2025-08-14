export class MongoUserRepository extends IUserRepository {
    mapToUserEntity(userDoc: any): User;
    create(userData: any): Promise<User>;
    findById(id: any): Promise<User>;
    findByEmail(email: any): Promise<User>;
    findByPhone(phone: any): Promise<User>;
    findAll(filters?: {}): Promise<{
        users: User[];
        pagination: {
            page: any;
            limit: any;
            total: number;
            pages: number;
        };
    }>;
    update(id: any, updateData: any): Promise<User>;
    delete(id: any): Promise<User>;
    findByDepartment(departmentId: any): Promise<User[]>;
    findByRole(role: any): Promise<User[]>;
    findByStatus(status: any): Promise<User[]>;
    findHeadOfDepartment(departmentId: any): Promise<User>;
    findEmployeesByDepartment(departmentId: any): Promise<User[]>;
    updatePassword(id: any, newPassword: any): Promise<User>;
    updateSendCode(id: any, sendCode: any): Promise<User>;
    toggleStatus(id: any): Promise<User>;
    getStats(): Promise<{
        total: any;
        active: any;
        inactive: any;
        byRole: any;
    }>;
    countByRole(role: any): Promise<number>;
    countByDepartment(departmentId: any): Promise<number>;
}
import { IUserRepository } from "../../domain/interfaces/IUserRepository.js";
import { User } from "../../domain/entities/User.entity.js";
//# sourceMappingURL=MongoUserRepository.d.ts.map