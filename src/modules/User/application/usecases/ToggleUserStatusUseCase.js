export class ToggleUserStatusUseCase {
  constructor(userService) {
    this.userService = userService;
  }

  async execute(userId) {
    try {
      if (!userId) {
        throw new Error("User ID is required");
      }

      // Get user to check current status
      const user = await this.userService.getUserById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      // Toggle user status
      const result = await this.userService.toggleUserStatus(userId);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
