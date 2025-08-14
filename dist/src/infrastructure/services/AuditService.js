import { IAuditService } from "../../core/interfaces/IAuditService.js";
import AuditLogModel from "../../../DB/models/AuditLog.model.js";
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
            return auditLog;
        }
        catch (error) {
            console.error("Failed to create audit log:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=AuditService.js.map