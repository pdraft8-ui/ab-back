export class UserController {
    constructor(createUserUseCase, authenticateUserUseCase, getAllUsersUseCase, updateUserUseCase, changePasswordUseCase, addEmployeeToDepartmentUseCase, getEmployeesByDepartmentUseCase, toggleUserStatusUseCase, getUserStatsUseCase) {
        this.createUserUseCase = createUserUseCase;
        this.authenticateUserUseCase = authenticateUserUseCase;
        this.getAllUsersUseCase = getAllUsersUseCase;
        this.updateUserUseCase = updateUserUseCase;
        this.changePasswordUseCase = changePasswordUseCase;
        this.addEmployeeToDepartmentUseCase = addEmployeeToDepartmentUseCase;
        this.getEmployeesByDepartmentUseCase = getEmployeesByDepartmentUseCase;
        this.toggleUserStatusUseCase = toggleUserStatusUseCase;
        this.getUserStatsUseCase = getUserStatsUseCase;
    }
    // Get user profile
    async getProfile(req, res) {
        try {
            const userId = req.user.id;
            const user = await this.updateUserUseCase.userService.getUserById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json({ message: "success", user: user.toJSON() });
        }
        catch (error) {
            console.error("Error getting profile:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    // Update user information
    async updateUserInfo(req, res) {
        try {
            const userId = req.user.id;
            const { name, email } = req.body;
            const updateData = {};
            if (name)
                updateData.name = name;
            if (email)
                updateData.email = email;
            const updatedUser = await this.updateUserUseCase.execute(userId, updateData);
            res.json({
                message: "update success",
                user: updatedUser.toJSON(),
            });
        }
        catch (error) {
            console.error("Error updating user info:", error);
            res.status(400).json({ message: error.message });
        }
    }
    // Change password
    async changePassword(req, res) {
        try {
            const userId = req.user.id;
            const { currentPassword, newPassword } = req.body;
            const result = await this.changePasswordUseCase.execute(userId, currentPassword, newPassword);
            res.json({ message: result.message });
        }
        catch (error) {
            console.error("Error changing password:", error);
            res.status(400).json({ message: error.message });
        }
    }
    // Create admin user
    async createAdmin(req, res) {
        try {
            const userData = req.body;
            userData.role = "admin";
            const user = await this.createUserUseCase.execute(userData);
            res.status(201).json({
                message: "Admin created successfully",
                user: user.toJSON(),
            });
        }
        catch (error) {
            console.error("Error creating admin:", error);
            res.status(400).json({ message: error.message });
        }
    }
    // User signin
    async signin(req, res) {
        try {
            const { email, password } = req.body;
            const result = await this.authenticateUserUseCase.execute(email, password);
            res.json({
                message: result.message,
                user: result.user,
                token: result.token,
            });
        }
        catch (error) {
            console.error("Error signing in:", error);
            res.status(400).json({ message: error.message });
        }
    }
    // Send verification code
    async sendCode(req, res) {
        try {
            const { email } = req.body;
            const result = await this.updateUserUseCase.userService.sendVerificationCode(email);
            res.json({ message: result.message });
        }
        catch (error) {
            console.error("Error sending code:", error);
            res.status(400).json({ message: error.message });
        }
    }
    // Forget password
    async forgetPassword(req, res) {
        try {
            const { email } = req.body;
            const result = await this.updateUserUseCase.userService.resetPassword(email);
            res.json({ message: result.message });
        }
        catch (error) {
            console.error("Error resetting password:", error);
            res.status(400).json({ message: error.message });
        }
    }
    // Add head of department to department
    async addHeadOfDepartmentToDepartment(req, res) {
        try {
            const { id: departmentId } = req.params;
            const { userId } = req.body;
            const result = await this.updateUserUseCase.userService.addHeadOfDepartmentToDepartment(userId, departmentId);
            res.json({
                message: "Head of department added successfully",
                user: result.toJSON(),
            });
        }
        catch (error) {
            console.error("Error adding head of department:", error);
            res.status(400).json({ message: error.message });
        }
    }
    // Remove head of department from department
    async removeHeadOfDepartmentFromDepartment(req, res) {
        try {
            const { depId, userId } = req.params;
            const result = await this.updateUserUseCase.userService.removeHeadOfDepartmentFromDepartment(userId, depId);
            res.json({
                message: "Head of department removed successfully",
                user: result.toJSON(),
            });
        }
        catch (error) {
            console.error("Error removing head of department:", error);
            res.status(400).json({ message: error.message });
        }
    }
    // Get head of department
    async getHeadOfDepartment(req, res) {
        try {
            const { id: departmentId } = req.params;
            const headOfDepartment = await this.updateUserUseCase.userService.getHeadOfDepartment(departmentId);
            if (!headOfDepartment) {
                return res
                    .status(404)
                    .json({ message: "Head of department not found" });
            }
            res.json({
                message: "success",
                headOfDepartment: headOfDepartment.toJSON(),
            });
        }
        catch (error) {
            console.error("Error getting head of department:", error);
            res.status(400).json({ message: error.message });
        }
    }
    // Add employee to department
    async addEmployee(req, res) {
        try {
            const { id: departmentId } = req.params;
            const employeeData = req.body;
            const employee = await this.addEmployeeToDepartmentUseCase.execute(employeeData, departmentId);
            res.status(201).json({
                message: "Employee added successfully",
                employee: employee.toJSON(),
            });
        }
        catch (error) {
            console.error("Error adding employee:", error);
            res.status(400).json({ message: error.message });
        }
    }
    // Remove employee from department
    async removeEmployee(req, res) {
        try {
            const { depId, employeeId } = req.params;
            const result = await this.updateUserUseCase.userService.removeEmployeeFromDepartment(employeeId, depId);
            res.json({
                message: "Employee removed successfully",
                employee: result.toJSON(),
            });
        }
        catch (error) {
            console.error("Error removing employee:", error);
            res.status(400).json({ message: error.message });
        }
    }
    // Get all employees by department
    async getAllEmployees(req, res) {
        try {
            const { depId: departmentId } = req.params;
            const employees = await this.getEmployeesByDepartmentUseCase.execute(departmentId);
            res.json({
                message: "success",
                employees: employees.map((emp) => emp.toJSON()),
            });
        }
        catch (error) {
            console.error("Error getting employees:", error);
            res.status(400).json({ message: error.message });
        }
    }
    // Update employee
    async updateEmployee(req, res) {
        try {
            const { employeeId } = req.params;
            const updateData = req.body;
            const updatedEmployee = await this.updateUserUseCase.execute(employeeId, updateData);
            res.json({
                message: "Employee updated successfully",
                employee: updatedEmployee.toJSON(),
            });
        }
        catch (error) {
            console.error("Error updating employee:", error);
            res.status(400).json({ message: error.message });
        }
    }
    // Reset employee password
    async resetEmployeePassword(req, res) {
        try {
            const { employeeId } = req.params;
            const { newPassword } = req.body;
            const result = await this.updateUserUseCase.userService.resetPassword(employeeId, newPassword);
            res.json({ message: result.message });
        }
        catch (error) {
            console.error("Error resetting employee password:", error);
            res.status(400).json({ message: error.message });
        }
    }
    // Toggle employee status
    async toggleEmployeeStatus(req, res) {
        try {
            const { employeeId } = req.params;
            const result = await this.toggleUserStatusUseCase.execute(employeeId);
            res.json({
                message: "Employee status updated successfully",
                employee: result.toJSON(),
            });
        }
        catch (error) {
            console.error("Error toggling employee status:", error);
            res.status(400).json({ message: error.message });
        }
    }
    // Get user statistics
    async getUserStats(req, res) {
        try {
            const stats = await this.getUserStatsUseCase.execute();
            res.json({
                message: "success",
                stats,
            });
        }
        catch (error) {
            console.error("Error getting user stats:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    // Test email configuration
    async testEmailConfiguration(req, res) {
        try {
            // Implementation would depend on your email service
            res.json({ message: "Email configuration test completed" });
        }
        catch (error) {
            console.error("Error testing email configuration:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    // Send custom email
    async sendCustomEmail(req, res) {
        try {
            const { to, subject, content } = req.body;
            const result = await this.updateUserUseCase.userService.sendEmail(to, subject, content);
            res.json({ message: result.message });
        }
        catch (error) {
            console.error("Error sending custom email:", error);
            res.status(400).json({ message: error.message });
        }
    }
    // Send bulk emails
    async sendBulkEmails(req, res) {
        try {
            const { recipients, subject, content } = req.body;
            const result = await this.updateUserUseCase.userService.sendBulkEmails(recipients, subject, content);
            res.json({ message: result.message });
        }
        catch (error) {
            console.error("Error sending bulk emails:", error);
            res.status(400).json({ message: error.message });
        }
    }
    // Test IMAP configuration
    async testImapConfiguration(req, res) {
        try {
            // Implementation would depend on your IMAP service
            res.json({ message: "IMAP configuration test completed" });
        }
        catch (error) {
            console.error("Error testing IMAP configuration:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    // Get inbox emails
    async getInboxEmails(req, res) {
        try {
            const userId = req.user.id;
            const filters = req.query;
            const result = await this.updateUserUseCase.userService.getInboxEmails(userId, filters);
            res.json({
                message: "success",
                emails: result.emails,
                total: result.total,
            });
        }
        catch (error) {
            console.error("Error getting inbox emails:", error);
            res.status(400).json({ message: error.message });
        }
    }
    // Get email by ID
    async getEmailById(req, res) {
        try {
            const userId = req.user.id;
            const { uid } = req.params;
            const result = await this.updateUserUseCase.userService.getEmailById(userId, uid);
            res.json({
                message: "success",
                email: result.email,
            });
        }
        catch (error) {
            console.error("Error getting email by ID:", error);
            res.status(400).json({ message: error.message });
        }
    }
    // Mark email as read/unread
    async markEmailReadStatus(req, res) {
        try {
            const userId = req.user.id;
            const { uid } = req.params;
            const { isRead } = req.body;
            const result = await this.updateUserUseCase.userService.markEmailAsRead(userId, uid, isRead);
            res.json({ message: "Email status updated successfully" });
        }
        catch (error) {
            console.error("Error marking email read status:", error);
            res.status(400).json({ message: error.message });
        }
    }
    // Delete email
    async deleteEmail(req, res) {
        try {
            const userId = req.user.id;
            const { uid } = req.params;
            const result = await this.updateUserUseCase.userService.deleteEmail(userId, uid);
            res.json({ message: "Email deleted successfully" });
        }
        catch (error) {
            console.error("Error deleting email:", error);
            res.status(400).json({ message: error.message });
        }
    }
    // Get inbox statistics
    async getInboxStats(req, res) {
        try {
            const userId = req.user.id;
            const stats = await this.updateUserUseCase.userService.getInboxStats(userId);
            res.json({
                message: "success",
                stats,
            });
        }
        catch (error) {
            console.error("Error getting inbox stats:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
//# sourceMappingURL=UserController.js.map