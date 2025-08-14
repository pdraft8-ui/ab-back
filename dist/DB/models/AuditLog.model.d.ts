export default AuditLogModel;
declare const AuditLogModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: mongoose.Types.ObjectId;
    action: string;
    userName: string;
    entity: string;
    entityId: mongoose.Types.ObjectId;
    oldValue: any;
    newValue: any;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: mongoose.Types.ObjectId;
    action: string;
    userName: string;
    entity: string;
    entityId: mongoose.Types.ObjectId;
    oldValue: any;
    newValue: any;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: mongoose.Types.ObjectId;
    action: string;
    userName: string;
    entity: string;
    entityId: mongoose.Types.ObjectId;
    oldValue: any;
    newValue: any;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: mongoose.Types.ObjectId;
    action: string;
    userName: string;
    entity: string;
    entityId: mongoose.Types.ObjectId;
    oldValue: any;
    newValue: any;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: mongoose.Types.ObjectId;
    action: string;
    userName: string;
    entity: string;
    entityId: mongoose.Types.ObjectId;
    oldValue: any;
    newValue: any;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: mongoose.Types.ObjectId;
    action: string;
    userName: string;
    entity: string;
    entityId: mongoose.Types.ObjectId;
    oldValue: any;
    newValue: any;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
import mongoose from "mongoose";
//# sourceMappingURL=AuditLog.model.d.ts.map