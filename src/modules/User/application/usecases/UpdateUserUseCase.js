import { User } from "../../domain/entities/User.entity.js";

export class UpdateUserUseCase {
  constructor(userService) {
    this.userService = userService;
  }

  async execute(userId, updateData) {
    try {
      // Get existing user
      const existingUser = await this.userService.getUserById(userId);
      if (!existingUser) {
        throw new Error("User not found");
      }

      // Create user entity with updated data for validation
      const updatedUser = new User({ ...existingUser, ...updateData });

      // Validate email if provided
      if (updateData.email && !updatedUser.hasValidEmail()) {
        throw new Error("Invalid email format");
      }

      // Validate phone if provided
      if (updateData.phone && !updatedUser.hasValidPhone()) {
        throw new Error("Invalid phone number format");
      }

      // Check if email is being changed and if it already exists
      if (updateData.email && updateData.email !== existingUser.email) {
        const userWithEmail = await this.userService.getUserByEmail(
          updateData.email
        );
        if (userWithEmail && userWithEmail.id !== userId) {
          throw new Error("Email already exists");
        }
      }

      // Update user
      const result = await this.userService.updateUser(userId, updateData);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
