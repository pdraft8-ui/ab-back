export class IUserService {
    createUser(userData: any): Promise<void>;
    getUserById(id: any): Promise<void>;
    getUserByEmail(email: any): Promise<void>;
    getAllUsers(filters?: {}): Promise<void>;
    updateUser(id: any, updateData: any): Promise<void>;
    deleteUser(id: any): Promise<void>;
    authenticateUser(email: any, password: any): Promise<void>;
    changePassword(userId: any, oldPassword: any, newPassword: any): Promise<void>;
    resetPassword(email: any): Promise<void>;
    sendVerificationCode(email: any): Promise<void>;
    verifyCode(email: any, code: any): Promise<void>;
    addEmployeeToDepartment(employeeData: any, departmentId: any): Promise<void>;
    removeEmployeeFromDepartment(employeeId: any, departmentId: any): Promise<void>;
    getEmployeesByDepartment(departmentId: any): Promise<void>;
    addHeadOfDepartmentToDepartment(userId: any, departmentId: any): Promise<void>;
    removeHeadOfDepartmentFromDepartment(userId: any, departmentId: any): Promise<void>;
    getHeadOfDepartment(departmentId: any): Promise<void>;
    toggleUserStatus(userId: any): Promise<void>;
    getUserStats(): Promise<void>;
    sendEmail(to: any, subject: any, content: any): Promise<void>;
    sendBulkEmails(recipients: any, subject: any, content: any): Promise<void>;
    getInboxEmails(userId: any, filters?: {}): Promise<void>;
    getEmailById(userId: any, emailId: any): Promise<void>;
    markEmailAsRead(userId: any, emailId: any, isRead: any): Promise<void>;
    deleteEmail(userId: any, emailId: any): Promise<void>;
    getInboxStats(userId: any): Promise<void>;
}
//# sourceMappingURL=IUserService.d.ts.map