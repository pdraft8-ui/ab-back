import { LogActionUseCase } from "../../application/usecases/LogActionUseCase.js";
import { GetAuditLogsUseCase } from "../../application/usecases/GetAuditLogsUseCase.js";
import { GetAuditLogByIdUseCase } from "../../application/usecases/GetAuditLogByIdUseCase.js";
import { GetAuditStatsUseCase } from "../../application/usecases/GetAuditStatsUseCase.js";
export class AuditController {
    constructor(logActionUseCase, getAuditLogsUseCase, getAuditLogByIdUseCase, getAuditStatsUseCase) {
        this.logActionUseCase = logActionUseCase;
        this.getAuditLogsUseCase = getAuditLogsUseCase;
        this.getAuditLogByIdUseCase = getAuditLogByIdUseCase;
        this.getAuditStatsUseCase = getAuditStatsUseCase;
    }
    // Log an action
    async logAction(req, res) {
        try {
            const auditData = {
                userId: req.user.id,
                action: req.body.action,
                entity: req.body.entity,
                entityId: req.body.entityId,
                userName: req.user.name || req.user.email,
                oldValue: req.body.oldValue,
                newValue: req.body.newValue,
            };
            const result = await this.logActionUseCase.execute(auditData);
            res.status(201).json({
                success: true,
                message: "Action logged successfully",
                data: result,
            });
        }
        catch (error) {
            console.error("Error logging action:", error);
            res.status(500).json({
                success: false,
                message: "Failed to log action",
                error: error.message,
            });
        }
    }
    // Get all audit logs with filters
    async getAuditLogs(req, res) {
        try {
            const filters = {
                page: parseInt(req.query.page) || 1,
                limit: parseInt(req.query.limit) || 10,
                sortBy: req.query.sortBy || "createdAt",
                sortOrder: req.query.sortOrder || "desc",
                user: req.query.user,
                action: req.query.action,
                entity: req.query.entity,
                entityId: req.query.entityId,
                startDate: req.query.startDate,
                endDate: req.query.endDate,
            };
            const result = await this.getAuditLogsUseCase.execute(filters);
            res.status(200).json({
                success: true,
                message: "Audit logs retrieved successfully",
                data: result,
            });
        }
        catch (error) {
            console.error("Error getting audit logs:", error);
            res.status(500).json({
                success: false,
                message: "Failed to get audit logs",
                error: error.message,
            });
        }
    }
    // Get audit log by ID
    async getAuditLogById(req, res) {
        try {
            const { id } = req.params;
            const auditLog = await this.getAuditLogByIdUseCase.execute(id);
            res.status(200).json({
                success: true,
                message: "Audit log retrieved successfully",
                data: auditLog,
            });
        }
        catch (error) {
            console.error("Error getting audit log by ID:", error);
            if (error.message === "Audit log not found") {
                return res.status(404).json({
                    success: false,
                    message: "Audit log not found",
                });
            }
            res.status(500).json({
                success: false,
                message: "Failed to get audit log",
                error: error.message,
            });
        }
    }
    // Get audit logs by user
    async getAuditLogsByUser(req, res) {
        try {
            const { userId } = req.params;
            const filters = {
                page: parseInt(req.query.page) || 1,
                limit: parseInt(req.query.limit) || 10,
                action: req.query.action,
                entity: req.query.entity,
                startDate: req.query.startDate,
                endDate: req.query.endDate,
            };
            const auditLogs = await this.auditService.getAuditLogsByUser(userId, filters);
            res.status(200).json({
                success: true,
                message: "User audit logs retrieved successfully",
                data: auditLogs,
            });
        }
        catch (error) {
            console.error("Error getting user audit logs:", error);
            res.status(500).json({
                success: false,
                message: "Failed to get user audit logs",
                error: error.message,
            });
        }
    }
    // Get audit logs by entity
    async getAuditLogsByEntity(req, res) {
        try {
            const { entity, entityId } = req.params;
            const filters = {
                page: parseInt(req.query.page) || 1,
                limit: parseInt(req.query.limit) || 10,
                action: req.query.action,
                startDate: req.query.startDate,
                endDate: req.query.endDate,
            };
            const auditLogs = await this.auditService.getAuditLogsByEntity(entity, entityId, filters);
            res.status(200).json({
                success: true,
                message: "Entity audit logs retrieved successfully",
                data: auditLogs,
            });
        }
        catch (error) {
            console.error("Error getting entity audit logs:", error);
            res.status(500).json({
                success: false,
                message: "Failed to get entity audit logs",
                error: error.message,
            });
        }
    }
    // Get audit statistics
    async getAuditStats(req, res) {
        try {
            const stats = await this.getAuditStatsUseCase.execute();
            res.status(200).json({
                success: true,
                message: "Audit statistics retrieved successfully",
                data: stats,
            });
        }
        catch (error) {
            console.error("Error getting audit stats:", error);
            res.status(500).json({
                success: false,
                message: "Failed to get audit statistics",
                error: error.message,
            });
        }
    }
}
//# sourceMappingURL=AuditController.js.map