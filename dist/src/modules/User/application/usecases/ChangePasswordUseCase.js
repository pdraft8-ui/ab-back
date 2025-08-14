export class ChangePasswordUseCase {
    constructor(userService) {
        this.userService = userService;
    }
    async execute(userId, oldPassword, newPassword) {
        try {
            if (!oldPassword || !newPassword) {
                throw new Error("Old password and new password are required");
            }
            if (oldPassword === newPassword) {
                throw new Error("New password must be different from old password");
            }
            if (newPassword.length < 6) {
                throw new Error("New password must be at least 6 characters long");
            }
            // Change password
            const result = await this.userService.changePassword(userId, oldPassword, newPassword);
            if (!result.success) {
                throw new Error(result.message || "Failed to change password");
            }
            return result;
        }
        catch (error) {
            throw error;
        }
    }
}
//# sourceMappingURL=ChangePasswordUseCase.js.map