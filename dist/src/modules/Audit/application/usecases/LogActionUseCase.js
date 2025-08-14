import { AuditLog } from "../../domain/entities/AuditLog.entity.js";
export class LogActionUseCase {
    constructor(auditService) {
        this.auditService = auditService;
    }
    async execute(auditData) {
        try {
            // Validate audit data
            const auditLog = new AuditLog(auditData);
            if (!auditLog.isValid()) {
                throw new Error("Invalid audit data: action, entity, and user are required");
            }
            // Log the action using the audit service
            const result = await this.auditService.logAction(auditData);
            return result;
        }
        catch (error) {
            console.error("Failed to log action:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=LogActionUseCase.js.map