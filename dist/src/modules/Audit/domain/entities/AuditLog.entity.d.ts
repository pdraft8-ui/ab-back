export class AuditLog {
    static fromJSON(json: any): AuditLog;
    constructor(auditData: any);
    id: any;
    user: any;
    action: any;
    entity: any;
    entityId: any;
    oldValue: any;
    newValue: any;
    userName: any;
    createdAt: any;
    updatedAt: any;
    isValid(): boolean;
    getActionDescription(): string;
    hasChanges(): boolean;
    getChangeSummary(): "No changes recorded" | "Updated" | "Created" | "Deleted" | "Modified";
    toJSON(): {
        id: any;
        user: any;
        action: any;
        entity: any;
        entityId: any;
        oldValue: any;
        newValue: any;
        userName: any;
        createdAt: any;
        updatedAt: any;
    };
}
//# sourceMappingURL=AuditLog.entity.d.ts.map