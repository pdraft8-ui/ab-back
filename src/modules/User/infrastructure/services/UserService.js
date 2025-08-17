import { IUserService } from "../../domain/interfaces/IUserService.js";
import { User } from "../../domain/entities/User.entity.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import {
  sendPasswordResetEmail,
  verifyImapConnection,
  fetchInboxEmails,
  getEmailByUid,
  markEmailAsRead,
  deleteEmail,
} from "../../../../../src/Servicess/email.js";
import DepartmentModel from "../../../../../DB/models/Department.model.js";
import AuditLogModel from "../../../../../DB/models/AuditLog.model.js";

export class UserService extends IUserService {
  constructor(userRepository) {
    super();
    this.userRepository = userRepository;
  }

  async createUser(userData) {
    try {
      // Hash password if provided
      if (userData.password) {
        userData.password = bcrypt.hashSync(
          userData.password,
          parseInt(process.env.saltRound)
        );
      }

      const user = await this.userRepository.create(userData);
      return user;
    } catch (error) {
      console.error("Failed to create user:", error);
      throw error;
    }
  }

  async getUserById(id) {
    try {
      return await this.userRepository.findById(id);
    } catch (error) {
      console.error("Failed to get user by ID:", error);
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      return await this.userRepository.findByEmail(email);
    } catch (error) {
      console.error("Failed to get user by email:", error);
      throw error;
    }
  }

  async getAllUsers(filters = {}) {
    try {
      return await this.userRepository.findAll(filters);
    } catch (error) {
      console.error("Failed to get all users:", error);
      throw error;
    }
  }

  async updateUser(id, updateData) {
    try {
      return await this.userRepository.update(id, updateData);
    } catch (error) {
      console.error("Failed to update user:", error);
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      return await this.userRepository.delete(id);
    } catch (error) {
      console.error("Failed to delete user:", error);
      throw error;
    }
  }

  async authenticateUser(email, password) {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return { success: false, message: "User not found" };
      }

      if (!user.isActive()) {
        return { success: false, message: "User account is inactive" };
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return { success: false, message: "Invalid password" };
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.TokenSignIn,
        { expiresIn: "24h" }
      );

      return {
        success: true,
        message: "Authentication successful",
        user: user.toJSON(),
        token,
      };
    } catch (error) {
      console.error("Failed to authenticate user:", error);
      throw error;
    }
  }

  async changePassword(userId, oldPassword, newPassword) {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        return { success: false, message: "User not found" };
      }

      const match = await bcrypt.compare(oldPassword, user.password);
      if (!match) {
        return { success: false, message: "Current password is incorrect" };
      }

      const hashedPassword = bcrypt.hashSync(
        newPassword,
        parseInt(process.env.saltRound)
      );
      await this.userRepository.updatePassword(userId, hashedPassword);

      return { success: true, message: "Password changed successfully" };
    } catch (error) {
      console.error("Failed to change password:", error);
      throw error;
    }
  }

  async resetPassword(email) {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return { success: false, message: "User not found" };
      }

      const newPassword = nanoid(8);
      const hashedPassword = bcrypt.hashSync(
        newPassword,
        parseInt(process.env.saltRound)
      );

      await this.userRepository.updatePassword(user.id, hashedPassword);
      await sendPasswordResetEmail(email, newPassword);

      return { success: true, message: "Password reset email sent" };
    } catch (error) {
      console.error("Failed to reset password:", error);
      throw error;
    }
  }

  async sendVerificationCode(email) {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return { success: false, message: "User not found" };
      }

      const code = nanoid(6);
      await this.userRepository.updateSendCode(user.id, code);
      await sendPasswordResetEmail(email, code);

      return { success: true, message: "Verification code sent" };
    } catch (error) {
      console.error("Failed to send verification code:", error);
      throw error;
    }
  }

  async verifyCode(email, code) {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return { success: false, message: "User not found" };
      }

      if (user.sendCode !== code) {
        return { success: false, message: "Invalid verification code" };
      }

      // Clear the code after successful verification
      await this.userRepository.updateSendCode(user.id, null);

      return { success: true, message: "Code verified successfully" };
    } catch (error) {
      console.error("Failed to verify code:", error);
      throw error;
    }
  }

  async addEmployeeToDepartment(employeeData, departmentId) {
    try {
      // Check if department exists
      const department = await DepartmentModel.findById(departmentId);
      if (!department) {
        throw new Error("Department not found");
      }

      // Create employee with department
      const employee = await this.createUser({
        ...employeeData,
        role: "employee",
        departmentId,
      });

      // Log audit
      await this.logAudit({
        userId: employeeData.createdBy || "system",
        action: "CREATE",
        entity: "Employee",
        entityId: employee.id,
        userName: employeeData.createdBy || "system",
        newValue: employee.toJSON(),
      });

      return employee;
    } catch (error) {
      console.error("Failed to add employee to department:", error);
      throw error;
    }
  }

  async removeEmployeeFromDepartment(employeeId, departmentId) {
    try {
      const employee = await this.userRepository.findById(employeeId);
      if (!employee) {
        throw new Error("Employee not found");
      }

      if (employee.departmentId?.toString() !== departmentId) {
        throw new Error("Employee is not in this department");
      }

      // Remove from department
      const updatedEmployee = await this.userRepository.update(employeeId, {
        departmentId: null,
      });

      // Log audit
      await this.logAudit({
        userId: "system",
        action: "REMOVE_FROM_DEPARTMENT",
        entity: "Employee",
        entityId: employeeId,
        userName: "system",
        oldValue: employee.toJSON(),
        newValue: updatedEmployee.toJSON(),
      });

      return updatedEmployee;
    } catch (error) {
      console.error("Failed to remove employee from department:", error);
      throw error;
    }
  }

  async getEmployeesByDepartment(departmentId) {
    try {
      return await this.userRepository.findEmployeesByDepartment(departmentId);
    } catch (error) {
      console.error("Failed to get employees by department:", error);
      throw error;
    }
  }

  async addHeadOfDepartmentToDepartment(userId, departmentId) {
    try {
      // Check if department exists
      const department = await DepartmentModel.findById(departmentId);
      if (!department) {
        throw new Error("Department not found");
      }

      // Check if user exists
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      // Update user to be head of department
      const updatedUser = await this.userRepository.update(userId, {
        role: "headOfDepartment",
        departmentId,
      });

      // Log audit
      await this.logAudit({
        userId: "system",
        action: "ASSIGN_HEAD_OF_DEPARTMENT",
        entity: "User",
        entityId: userId,
        userName: "system",
        oldValue: user.toJSON(),
        newValue: updatedUser.toJSON(),
      });

      return updatedUser;
    } catch (error) {
      console.error("Failed to add head of department:", error);
      throw error;
    }
  }

  async removeHeadOfDepartmentFromDepartment(userId, departmentId) {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      if (user.departmentId?.toString() !== departmentId) {
        throw new Error("User is not head of this department");
      }

      // Remove head of department role
      const updatedUser = await this.userRepository.update(userId, {
        role: "employee",
        departmentId: null,
      });

      // Log audit
      await this.logAudit({
        userId: "system",
        action: "REMOVE_HEAD_OF_DEPARTMENT",
        entity: "User",
        entityId: userId,
        userName: "system",
        oldValue: user.toJSON(),
        newValue: updatedUser.toJSON(),
      });

      return updatedUser;
    } catch (error) {
      console.error("Failed to remove head of department:", error);
      throw error;
    }
  }

  async getHeadOfDepartment(departmentId) {
    try {
      return await this.userRepository.findHeadOfDepartment(departmentId);
    } catch (error) {
      console.error("Failed to get head of department:", error);
      throw error;
    }
  }

  async toggleUserStatus(userId) {
    try {
      return await this.userRepository.toggleStatus(userId);
    } catch (error) {
      console.error("Failed to toggle user status:", error);
      throw error;
    }
  }

  async getUserStats() {
    try {
      return await this.userRepository.getStats();
    } catch (error) {
      console.error("Failed to get user stats:", error);
      throw error;
    }
  }

  async sendEmail(to, subject, content) {
    try {
      // Implementation would depend on your email service
      // For now, we'll return a mock response
      return { success: true, message: "Email sent successfully" };
    } catch (error) {
      console.error("Failed to send email:", error);
      throw error;
    }
  }

  async sendBulkEmails(recipients, subject, content) {
    try {
      // Implementation would depend on your email service
      // For now, we'll return a mock response
      return { success: true, message: "Bulk emails sent successfully" };
    } catch (error) {
      console.error("Failed to send bulk emails:", error);
      throw error;
    }
  }

  async getInboxEmails(userId, filters = {}) {
    try {
      // Implementation would depend on your IMAP service
      // For now, we'll return a mock response
      return { emails: [], total: 0 };
    } catch (error) {
      console.error("Failed to get inbox emails:", error);
      throw error;
    }
  }

  async getEmailById(userId, emailId) {
    try {
      // Implementation would depend on your IMAP service
      // For now, we'll return a mock response
      return { email: null };
    } catch (error) {
      console.error("Failed to get email by ID:", error);
      throw error;
    }
  }

  async markEmailAsRead(userId, emailId, isRead) {
    try {
      // Implementation would depend on your IMAP service
      // For now, we'll return a mock response
      return { success: true };
    } catch (error) {
      console.error("Failed to mark email as read:", error);
      throw error;
    }
  }

  async deleteEmail(userId, emailId) {
    try {
      // Implementation would depend on your IMAP service
      // For now, we'll return a mock response
      return { success: true };
    } catch (error) {
      console.error("Failed to delete email:", error);
      throw error;
    }
  }

  async getInboxStats(userId) {
    try {
      // Implementation would depend on your IMAP service
      // For now, we'll return a mock response
      return { total: 0, unread: 0, read: 0 };
    } catch (error) {
      console.error("Failed to get inbox stats:", error);
      throw error;
    }
  }

  async logAudit(auditData) {
    try {
      await AuditLogModel.create(auditData);
    } catch (error) {
      console.error("Failed to create audit log:", error);
    }
  }
}
