export class IAuditService {
    logAction(auditData: any): Promise<void>;
    getAuditLogs(filters?: {}): Promise<void>;
    getAuditLogById(id: any): Promise<void>;
    getAuditLogsByUser(userId: any, filters?: {}): Promise<void>;
    getAuditLogsByEntity(entity: any, entityId: any, filters?: {}): Promise<void>;
    getAuditStats(): Promise<void>;
}
//# sourceMappingURL=IAuditService.d.ts.map