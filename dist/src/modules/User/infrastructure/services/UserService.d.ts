export class UserService extends IUserService {
    constructor(userRepository: any);
    userRepository: any;
    createUser(userData: any): Promise<any>;
    getUserById(id: any): Promise<any>;
    getUserByEmail(email: any): Promise<any>;
    getAllUsers(filters?: {}): Promise<any>;
    updateUser(id: any, updateData: any): Promise<any>;
    deleteUser(id: any): Promise<any>;
    authenticateUser(email: any, password: any): Promise<{
        success: boolean;
        message: string;
        user?: undefined;
        token?: undefined;
    } | {
        success: boolean;
        message: string;
        user: any;
        token: string;
    }>;
    changePassword(userId: any, oldPassword: any, newPassword: any): Promise<{
        success: boolean;
        message: string;
    }>;
    resetPassword(email: any): Promise<{
        success: boolean;
        message: string;
    }>;
    sendVerificationCode(email: any): Promise<{
        success: boolean;
        message: string;
    }>;
    verifyCode(email: any, code: any): Promise<{
        success: boolean;
        message: string;
    }>;
    addEmployeeToDepartment(employeeData: any, departmentId: any): Promise<any>;
    removeEmployeeFromDepartment(employeeId: any, departmentId: any): Promise<any>;
    getEmployeesByDepartment(departmentId: any): Promise<any>;
    addHeadOfDepartmentToDepartment(userId: any, departmentId: any): Promise<any>;
    removeHeadOfDepartmentFromDepartment(userId: any, departmentId: any): Promise<any>;
    getHeadOfDepartment(departmentId: any): Promise<any>;
    toggleUserStatus(userId: any): Promise<any>;
    getUserStats(): Promise<any>;
    sendEmail(to: any, subject: any, content: any): Promise<{
        success: boolean;
        message: string;
    }>;
    sendBulkEmails(recipients: any, subject: any, content: any): Promise<{
        success: boolean;
        message: string;
    }>;
    getInboxEmails(userId: any, filters?: {}): Promise<{
        emails: any[];
        total: number;
    }>;
    getEmailById(userId: any, emailId: any): Promise<{
        email: any;
    }>;
    markEmailAsRead(userId: any, emailId: any, isRead: any): Promise<{
        success: boolean;
    }>;
    deleteEmail(userId: any, emailId: any): Promise<{
        success: boolean;
    }>;
    getInboxStats(userId: any): Promise<{
        total: number;
        unread: number;
        read: number;
    }>;
    logAudit(auditData: any): Promise<void>;
}
import { IUserService } from "../../domain/interfaces/IUserService.js";
//# sourceMappingURL=UserService.d.ts.map