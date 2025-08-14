export default notificationModel;
declare const notificationModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    message: string;
    recipient: mongoose.Types.ObjectId;
    sender: mongoose.Types.ObjectId;
    isRead: boolean;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    message: string;
    recipient: mongoose.Types.ObjectId;
    sender: mongoose.Types.ObjectId;
    isRead: boolean;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    message: string;
    recipient: mongoose.Types.ObjectId;
    sender: mongoose.Types.ObjectId;
    isRead: boolean;
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
    message: string;
    recipient: mongoose.Types.ObjectId;
    sender: mongoose.Types.ObjectId;
    isRead: boolean;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    message: string;
    recipient: mongoose.Types.ObjectId;
    sender: mongoose.Types.ObjectId;
    isRead: boolean;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    message: string;
    recipient: mongoose.Types.ObjectId;
    sender: mongoose.Types.ObjectId;
    isRead: boolean;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
import mongoose from "mongoose";
//# sourceMappingURL=notification.model.d.ts.map