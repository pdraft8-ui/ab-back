import { User } from "../../domain/entities/User.entity.js";

export class CreateUserUseCase {
  constructor(userService) {
    this.userService = userService;
  }

  async execute(userData) {
    try {
      // Create user entity and validate
      const user = new User(userData);

      if (!user.isValid()) {
        throw new Error(
          "Invalid user data: name, email, and role are required"
        );
      }

      if (!user.hasValidEmail()) {
        throw new Error("Invalid email format");
      }

      if (!user.hasValidPhone()) {
        throw new Error("Invalid phone number format");
      }

      // Check if user with email already exists
      const existingUser = await this.userService.getUserByEmail(user.email);
      if (existingUser) {
        throw new Error("User with this email already exists");
      }

      // Create user
      const createdUser = await this.userService.createUser(userData);
      return createdUser;
    } catch (error) {
      throw error;
    }
  }
}
