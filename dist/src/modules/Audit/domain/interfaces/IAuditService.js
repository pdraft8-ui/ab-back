import { AuditLog } from "../entities/AuditLog.entity.js";
export class IAuditService {
    async logAction(auditData) {
        throw new Error("Method not implemented");
    }
    async getAuditLogs(filters = {}) {
        throw new Error("Method not implemented");
    }
    async getAuditLogById(id) {
        throw new Error("Method not implemented");
    }
    async getAuditLogsByUser(userId, filters = {}) {
        throw new Error("Method not implemented");
    }
    async getAuditLogsByEntity(entity, entityId, filters = {}) {
        throw new Error("Method not implemented");
    }
    async getAuditStats() {
        throw new Error("Method not implemented");
    }
}
//# sourceMappingURL=IAuditService.js.map