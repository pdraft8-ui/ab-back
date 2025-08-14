export class AuditService extends IAuditService {
    logAction(auditData: any): Promise<import("mongoose").Document<unknown, {}, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        user: import("mongoose").Types.ObjectId;
        action: string;
        userName: string;
        entity: string;
        entityId: import("mongoose").Types.ObjectId;
        oldValue: any;
        newValue: any;
    }, {}, {
        timestamps: true;
    }> & {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        user: import("mongoose").Types.ObjectId;
        action: string;
        userName: string;
        entity: string;
        entityId: import("mongoose").Types.ObjectId;
        oldValue: any;
        newValue: any;
    } & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
import { IAuditService } from "../../core/interfaces/IAuditService.js";
//# sourceMappingURL=AuditService.d.ts.map