import { IAuditService } from "../../domain/interfaces/IAuditService.js";
import { AuditLog } from "../../domain/entities/AuditLog.entity.js";
import AuditLogModel from "../../../../../DB/models/AuditLog.model.js";
export class AuditService extends IAuditService {
    async logAction(auditData) {
        try {
            const { userId, action, entity, entityId, userName, oldValue = null, newValue = null, } = auditData;
            const auditLog = await AuditLogModel.create({
                user: userId,
                action,
                entity,
                entityId,
                oldValue,
                newValue,
                userName,
            });
            return this.mapToAuditLogEntity(auditLog);
        }
        catch (error) {
            console.error("Failed to create audit log:", error);
            throw error;
        }
    }
    async getAuditLogs(filters = {}) {
        try {
            const { page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc", ...otherFilters } = filters;
            const query = {};
            if (otherFilters.user)
                query.user = otherFilters.user;
            if (otherFilters.action)
                query.action = otherFilters.action;
            if (otherFilters.entity)
                query.entity = otherFilters.entity;
            if (otherFilters.entityId)
                query.entityId = otherFilters.entityId;
            if (otherFilters.startDate)
                query.createdAt = { $gte: new Date(otherFilters.startDate) };
            if (otherFilters.endDate) {
                if (query.createdAt) {
                    query.createdAt.$lte = new Date(otherFilters.endDate);
                }
                else {
                    query.createdAt = { $lte: new Date(otherFilters.endDate) };
                }
            }
            const skip = (page - 1) * limit;
            const sort = { [sortBy]: sortOrder === "desc" ? -1 : 1 };
            const auditLogs = await AuditLogModel.find(query)
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .populate("user", "name email");
            const total = await AuditLogModel.countDocuments(query);
            return {
                auditLogs: auditLogs.map((log) => this.mapToAuditLogEntity(log)),
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit),
                },
            };
        }
        catch (error) {
            console.error("Failed to get audit logs:", error);
            throw error;
        }
    }
    async getAuditLogById(id) {
        try {
            const auditLog = await AuditLogModel.findById(id).populate("user", "name email");
            return auditLog ? this.mapToAuditLogEntity(auditLog) : null;
        }
        catch (error) {
            console.error("Failed to get audit log by ID:", error);
            throw error;
        }
    }
    async getAuditLogsByUser(userId, filters = {}) {
        try {
            const query = { user: userId, ...filters };
            const auditLogs = await AuditLogModel.find(query)
                .sort({ createdAt: -1 })
                .populate("user", "name email");
            return auditLogs.map((log) => this.mapToAuditLogEntity(log));
        }
        catch (error) {
            console.error("Failed to get audit logs by user:", error);
            throw error;
        }
    }
    async getAuditLogsByEntity(entity, entityId, filters = {}) {
        try {
            const query = { entity, entityId, ...filters };
            const auditLogs = await AuditLogModel.find(query)
                .sort({ createdAt: -1 })
                .populate("user", "name email");
            return auditLogs.map((log) => this.mapToAuditLogEntity(log));
        }
        catch (error) {
            console.error("Failed to get audit logs by entity:", error);
            throw error;
        }
    }
    async getAuditStats() {
        try {
            const totalLogs = await AuditLogModel.countDocuments();
            const todayLogs = await AuditLogModel.countDocuments({
                createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
            });
            const actionStats = await AuditLogModel.aggregate([
                { $group: { _id: "$action", count: { $sum: 1 } } },
                { $sort: { count: -1 } },
            ]);
            const entityStats = await AuditLogModel.aggregate([
                { $group: { _id: "$entity", count: { $sum: 1 } } },
                { $sort: { count: -1 } },
            ]);
            const userStats = await AuditLogModel.aggregate([
                { $group: { _id: "$user", count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 10 },
            ]);
            return {
                totalLogs,
                todayLogs,
                actionStats,
                entityStats,
                userStats,
            };
        }
        catch (error) {
            console.error("Failed to get audit stats:", error);
            throw error;
        }
    }
    mapToAuditLogEntity(auditLogDoc) {
        return new AuditLog({
            id: auditLogDoc._id,
            user: auditLogDoc.user,
            action: auditLogDoc.action,
            entity: auditLogDoc.entity,
            entityId: auditLogDoc.entityId,
            oldValue: auditLogDoc.oldValue,
            newValue: auditLogDoc.newValue,
            userName: auditLogDoc.userName,
            createdAt: auditLogDoc.createdAt,
            updatedAt: auditLogDoc.updatedAt,
        });
    }
}
//# sourceMappingURL=AuditService.js.map