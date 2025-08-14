import { IUserRepository } from "../../domain/interfaces/IUserRepository.js";
import { User } from "../../domain/entities/User.entity.js";
import UserModel from "../../../../../DB/models/user.model.js";
export class MongoUserRepository extends IUserRepository {
    mapToUserEntity(userDoc) {
        if (!userDoc)
            return null;
        return new User({
            id: userDoc._id.toString(),
            name: userDoc.name,
            email: userDoc.email,
            phone: userDoc.phone,
            password: userDoc.password,
            departmentId: userDoc.departmentId,
            role: userDoc.role,
            sendCode: userDoc.sendCode,
            status: userDoc.status,
            createdAt: userDoc.createdAt,
            updatedAt: userDoc.updatedAt,
        });
    }
    async create(userData) {
        try {
            const user = await UserModel.create(userData);
            return this.mapToUserEntity(user);
        }
        catch (error) {
            console.error("Failed to create user:", error);
            throw error;
        }
    }
    async findById(id) {
        try {
            const user = await UserModel.findById(id);
            return this.mapToUserEntity(user);
        }
        catch (error) {
            console.error("Failed to find user by ID:", error);
            throw error;
        }
    }
    async findByEmail(email) {
        try {
            const user = await UserModel.findOne({ email });
            return this.mapToUserEntity(user);
        }
        catch (error) {
            console.error("Failed to find user by email:", error);
            throw error;
        }
    }
    async findByPhone(phone) {
        try {
            const user = await UserModel.findOne({ phone });
            return this.mapToUserEntity(user);
        }
        catch (error) {
            console.error("Failed to find user by phone:", error);
            throw error;
        }
    }
    async findAll(filters = {}) {
        try {
            const query = {};
            if (filters.role) {
                query.role = filters.role;
            }
            if (filters.status) {
                query.status = filters.status;
            }
            if (filters.departmentId) {
                query.departmentId = filters.departmentId;
            }
            if (filters.search) {
                query.$or = [
                    { name: { $regex: filters.search, $options: "i" } },
                    { email: { $regex: filters.search, $options: "i" } },
                ];
            }
            const page = filters.page || 1;
            const limit = filters.limit || 10;
            const skip = (page - 1) * limit;
            const users = await UserModel.find(query)
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });
            const total = await UserModel.countDocuments(query);
            return {
                users: users.map((user) => this.mapToUserEntity(user)),
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit),
                },
            };
        }
        catch (error) {
            console.error("Failed to find users:", error);
            throw error;
        }
    }
    async update(id, updateData) {
        try {
            const user = await UserModel.findByIdAndUpdate(id, { ...updateData, updatedAt: new Date() }, { new: true });
            return this.mapToUserEntity(user);
        }
        catch (error) {
            console.error("Failed to update user:", error);
            throw error;
        }
    }
    async delete(id) {
        try {
            const user = await UserModel.findByIdAndDelete(id);
            return this.mapToUserEntity(user);
        }
        catch (error) {
            console.error("Failed to delete user:", error);
            throw error;
        }
    }
    async findByDepartment(departmentId) {
        try {
            const users = await UserModel.find({ departmentId });
            return users.map((user) => this.mapToUserEntity(user));
        }
        catch (error) {
            console.error("Failed to find users by department:", error);
            throw error;
        }
    }
    async findByRole(role) {
        try {
            const users = await UserModel.find({ role });
            return users.map((user) => this.mapToUserEntity(user));
        }
        catch (error) {
            console.error("Failed to find users by role:", error);
            throw error;
        }
    }
    async findByStatus(status) {
        try {
            const users = await UserModel.find({ status });
            return users.map((user) => this.mapToUserEntity(user));
        }
        catch (error) {
            console.error("Failed to find users by status:", error);
            throw error;
        }
    }
    async findHeadOfDepartment(departmentId) {
        try {
            const user = await UserModel.findOne({
                departmentId,
                role: "headOfDepartment",
            });
            return this.mapToUserEntity(user);
        }
        catch (error) {
            console.error("Failed to find head of department:", error);
            throw error;
        }
    }
    async findEmployeesByDepartment(departmentId) {
        try {
            const users = await UserModel.find({
                departmentId,
                role: "employee",
            });
            return users.map((user) => this.mapToUserEntity(user));
        }
        catch (error) {
            console.error("Failed to find employees by department:", error);
            throw error;
        }
    }
    async updatePassword(id, newPassword) {
        try {
            const user = await UserModel.findByIdAndUpdate(id, { password: newPassword, updatedAt: new Date() }, { new: true });
            return this.mapToUserEntity(user);
        }
        catch (error) {
            console.error("Failed to update password:", error);
            throw error;
        }
    }
    async updateSendCode(id, sendCode) {
        try {
            const user = await UserModel.findByIdAndUpdate(id, { sendCode, updatedAt: new Date() }, { new: true });
            return this.mapToUserEntity(user);
        }
        catch (error) {
            console.error("Failed to update send code:", error);
            throw error;
        }
    }
    async toggleStatus(id) {
        try {
            const user = await UserModel.findById(id);
            if (!user) {
                throw new Error("User not found");
            }
            const newStatus = user.status === "active" ? "inactive" : "active";
            const updatedUser = await UserModel.findByIdAndUpdate(id, { status: newStatus, updatedAt: new Date() }, { new: true });
            return this.mapToUserEntity(updatedUser);
        }
        catch (error) {
            console.error("Failed to toggle user status:", error);
            throw error;
        }
    }
    async getStats() {
        try {
            const stats = await UserModel.aggregate([
                {
                    $group: {
                        _id: null,
                        total: { $sum: 1 },
                        active: {
                            $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] },
                        },
                        inactive: {
                            $sum: { $cond: [{ $eq: ["$status", "inactive"] }, 1, 0] },
                        },
                    },
                },
            ]);
            const roleStats = await UserModel.aggregate([
                {
                    $group: {
                        _id: "$role",
                        count: { $sum: 1 },
                    },
                },
            ]);
            return {
                total: stats[0]?.total || 0,
                active: stats[0]?.active || 0,
                inactive: stats[0]?.inactive || 0,
                byRole: roleStats.reduce((acc, stat) => {
                    acc[stat._id] = stat.count;
                    return acc;
                }, {}),
            };
        }
        catch (error) {
            console.error("Failed to get user stats:", error);
            throw error;
        }
    }
    async countByRole(role) {
        try {
            return await UserModel.countDocuments({ role });
        }
        catch (error) {
            console.error("Failed to count users by role:", error);
            throw error;
        }
    }
    async countByDepartment(departmentId) {
        try {
            return await UserModel.countDocuments({ departmentId });
        }
        catch (error) {
            console.error("Failed to count users by department:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=MongoUserRepository.js.map