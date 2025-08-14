export class UserController {
    constructor(createUserUseCase: any, authenticateUserUseCase: any, getAllUsersUseCase: any, updateUserUseCase: any, changePasswordUseCase: any, addEmployeeToDepartmentUseCase: any, getEmployeesByDepartmentUseCase: any, toggleUserStatusUseCase: any, getUserStatsUseCase: any);
    createUserUseCase: any;
    authenticateUserUseCase: any;
    getAllUsersUseCase: any;
    updateUserUseCase: any;
    changePasswordUseCase: any;
    addEmployeeToDepartmentUseCase: any;
    getEmployeesByDepartmentUseCase: any;
    toggleUserStatusUseCase: any;
    getUserStatsUseCase: any;
    getProfile(req: any, res: any): Promise<any>;
    updateUserInfo(req: any, res: any): Promise<void>;
    changePassword(req: any, res: any): Promise<void>;
    createAdmin(req: any, res: any): Promise<void>;
    signin(req: any, res: any): Promise<void>;
    sendCode(req: any, res: any): Promise<void>;
    forgetPassword(req: any, res: any): Promise<void>;
    addHeadOfDepartmentToDepartment(req: any, res: any): Promise<void>;
    removeHeadOfDepartmentFromDepartment(req: any, res: any): Promise<void>;
    getHeadOfDepartment(req: any, res: any): Promise<any>;
    addEmployee(req: any, res: any): Promise<void>;
    removeEmployee(req: any, res: any): Promise<void>;
    getAllEmployees(req: any, res: any): Promise<void>;
    updateEmployee(req: any, res: any): Promise<void>;
    resetEmployeePassword(req: any, res: any): Promise<void>;
    toggleEmployeeStatus(req: any, res: any): Promise<void>;
    getUserStats(req: any, res: any): Promise<void>;
    testEmailConfiguration(req: any, res: any): Promise<void>;
    sendCustomEmail(req: any, res: any): Promise<void>;
    sendBulkEmails(req: any, res: any): Promise<void>;
    testImapConfiguration(req: any, res: any): Promise<void>;
    getInboxEmails(req: any, res: any): Promise<void>;
    getEmailById(req: any, res: any): Promise<void>;
    markEmailReadStatus(req: any, res: any): Promise<void>;
    deleteEmail(req: any, res: any): Promise<void>;
    getInboxStats(req: any, res: any): Promise<void>;
}
//# sourceMappingURL=UserController.d.ts.map