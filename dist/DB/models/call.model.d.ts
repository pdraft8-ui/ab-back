export default CallModel;
declare const CallModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    customerId: mongoose.Types.ObjectId;
    callid: string;
    recordingUrl: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    customerId: mongoose.Types.ObjectId;
    callid: string;
    recordingUrl: string;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    customerId: mongoose.Types.ObjectId;
    callid: string;
    recordingUrl: string;
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
    customerId: mongoose.Types.ObjectId;
    callid: string;
    recordingUrl: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    customerId: mongoose.Types.ObjectId;
    callid: string;
    recordingUrl: string;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    customerId: mongoose.Types.ObjectId;
    callid: string;
    recordingUrl: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
import mongoose from "mongoose";
//# sourceMappingURL=call.model.d.ts.map