export class AuthenticateUserUseCase {
    constructor(userService) {
        this.userService = userService;
    }
    async execute(email, password) {
        try {
            if (!email || !password) {
                throw new Error("Email and password are required");
            }
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new Error("Invalid email format");
            }
            // Authenticate user
            const result = await this.userService.authenticateUser(email, password);
            if (!result.success) {
                throw new Error(result.message || "Authentication failed");
            }
            return result;
        }
        catch (error) {
            throw error;
        }
    }
}
//# sourceMappingURL=AuthenticateUserUseCase.js.map