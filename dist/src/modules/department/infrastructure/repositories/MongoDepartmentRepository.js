import { IDepartmentRepository } from "../../domain/interfaces/IDepartmentRepository.js";
import { Department } from "../../domain/entities/Department.entity.js";
import DepartmentModel from "../../../../../DB/models/Department.model.js";
export class MongoDepartmentRepository extends IDepartmentRepository {
    mapToDepartmentEntity(departmentDoc) {
        if (!departmentDoc)
            return null;
        return new Department({
            id: departmentDoc._id.toString(),
            name: departmentDoc.name,
            description: departmentDoc.description,
            headOfDepartment: departmentDoc.headOfDepartment,
            role: departmentDoc.role,
            employees: departmentDoc.employees,
            permissions: departmentDoc.permissions,
            createdAt: departmentDoc.createdAt,
            updatedAt: departmentDoc.updatedAt,
        });
    }
    async create(departmentData) {
        try {
            const department = await DepartmentModel.create(departmentData);
            return this.mapToDepartmentEntity(department);
        }
        catch (error) {
            console.error("Failed to create department:", error);
            throw error;
        }
    }
    async findById(id) {
        try {
            const department = await DepartmentModel.findById(id);
            return this.mapToDepartmentEntity(department);
        }
        catch (error) {
            console.error("Failed to find department by ID:", error);
            throw error;
        }
    }
    async findByName(name) {
        try {
            const department = await DepartmentModel.findOne({ name });
            return this.mapToDepartmentEntity(department);
        }
        catch (error) {
            console.error("Failed to find department by name:", error);
            throw error;
        }
    }
    async findAll() {
        try {
            const departments = await DepartmentModel.find();
            return departments.map((department) => this.mapToDepartmentEntity(department));
        }
        catch (error) {
            console.error("Failed to find all departments:", error);
            throw error;
        }
    }
    async update(id, updateData) {
        try {
            const department = await DepartmentModel.findByIdAndUpdate(id, updateData, { new: true });
            return this.mapToDepartmentEntity(department);
        }
        catch (error) {
            console.error("Failed to update department:", error);
            throw error;
        }
    }
    async delete(id) {
        try {
            await DepartmentModel.findByIdAndDelete(id);
            return true;
        }
        catch (error) {
            console.error("Failed to delete department:", error);
            throw error;
        }
    }
    async findByHeadOfDepartment(headOfDepartmentId) {
        try {
            const department = await DepartmentModel.findOne({
                headOfDepartment: headOfDepartmentId,
            });
            return this.mapToDepartmentEntity(department);
        }
        catch (error) {
            console.error("Failed to find department by head of department:", error);
            throw error;
        }
    }
    async findDepartmentsWithEmployees() {
        try {
            const departments = await DepartmentModel.find({
                "employees.0": { $exists: true },
            });
            return departments.map((department) => this.mapToDepartmentEntity(department));
        }
        catch (error) {
            console.error("Failed to find departments with employees:", error);
            throw error;
        }
    }
    async addEmployeeToDepartment(departmentId, employee) {
        try {
            const department = await DepartmentModel.findByIdAndUpdate(departmentId, {
                $addToSet: {
                    employees: {
                        _id: employee._id,
                        name: employee.name,
                        email: employee.email,
                        phone: employee.phone,
                        role: employee.role || "employee",
                        status: employee.status || "active",
                    },
                },
            }, { new: true });
            return this.mapToDepartmentEntity(department);
        }
        catch (error) {
            console.error("Failed to add employee to department:", error);
            throw error;
        }
    }
    async removeEmployeeFromDepartment(departmentId, employeeId) {
        try {
            const department = await DepartmentModel.findByIdAndUpdate(departmentId, {
                $pull: { employees: { _id: employeeId } },
            }, { new: true });
            return this.mapToDepartmentEntity(department);
        }
        catch (error) {
            console.error("Failed to remove employee from department:", error);
            throw error;
        }
    }
    async setHeadOfDepartment(departmentId, userId) {
        try {
            const department = await DepartmentModel.findByIdAndUpdate(departmentId, { headOfDepartment: userId }, { new: true });
            return this.mapToDepartmentEntity(department);
        }
        catch (error) {
            console.error("Failed to set head of department:", error);
            throw error;
        }
    }
    async removeHeadOfDepartment(departmentId) {
        try {
            const department = await DepartmentModel.findByIdAndUpdate(departmentId, { $unset: { headOfDepartment: "" } }, { new: true });
            return this.mapToDepartmentEntity(department);
        }
        catch (error) {
            console.error("Failed to remove head of department:", error);
            throw error;
        }
    }
    async getStats() {
        try {
            const totalDepartments = await DepartmentModel.countDocuments();
            const departmentsWithEmployees = await DepartmentModel.countDocuments({
                "employees.0": { $exists: true },
            });
            const departmentsWithHead = await DepartmentModel.countDocuments({
                headOfDepartment: { $exists: true, $ne: null },
            });
            return {
                totalDepartments,
                departmentsWithEmployees,
                departmentsWithHead,
                emptyDepartments: totalDepartments - departmentsWithEmployees,
            };
        }
        catch (error) {
            console.error("Failed to get department stats:", error);
            throw error;
        }
    }
    async countDepartments() {
        try {
            return await DepartmentModel.countDocuments();
        }
        catch (error) {
            console.error("Failed to count departments:", error);
            throw error;
        }
    }
    async findDepartmentsByPermission(permission) {
        try {
            const departments = await DepartmentModel.find({
                permissions: permission,
            });
            return departments.map((department) => this.mapToDepartmentEntity(department));
        }
        catch (error) {
            console.error("Failed to find departments by permission:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=MongoDepartmentRepository.js.map