export class AuditService extends IAuditService {
    logAction(auditData: any): Promise<AuditLog>;
    getAuditLogs(filters?: {}): Promise<{
        auditLogs: AuditLog[];
        pagination: {
            page: any;
            limit: any;
            total: number;
            pages: number;
        };
    }>;
    getAuditLogById(id: any): Promise<AuditLog>;
    getAuditLogsByUser(userId: any, filters?: {}): Promise<AuditLog[]>;
    getAuditLogsByEntity(entity: any, entityId: any, filters?: {}): Promise<AuditLog[]>;
    getAuditStats(): Promise<{
        totalLogs: number;
        todayLogs: number;
        actionStats: any[];
        entityStats: any[];
        userStats: any[];
    }>;
    mapToAuditLogEntity(auditLogDoc: any): AuditLog;
}
import { IAuditService } from "../../domain/interfaces/IAuditService.js";
import { AuditLog } from "../../domain/entities/AuditLog.entity.js";
//# sourceMappingURL=AuditService.d.ts.map