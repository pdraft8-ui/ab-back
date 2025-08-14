export default Cheque;
declare const Cheque: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    customer: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
    customerName: string;
    customerPhone: string;
    chequeNumber: string;
    chequeAmount: number;
    chequeDate: NativeDate;
    chequeStatus: "pending" | "cancelled" | "cleared" | "bounced" | "on_hold";
    bankName: string;
    notes?: string;
    updatedBy?: mongoose.Types.ObjectId;
    accountNumber?: string;
    chequeImage?: string;
    clearedDate?: NativeDate;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    customer: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
    customerName: string;
    customerPhone: string;
    chequeNumber: string;
    chequeAmount: number;
    chequeDate: NativeDate;
    chequeStatus: "pending" | "cancelled" | "cleared" | "bounced" | "on_hold";
    bankName: string;
    notes?: string;
    updatedBy?: mongoose.Types.ObjectId;
    accountNumber?: string;
    chequeImage?: string;
    clearedDate?: NativeDate;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    customer: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
    customerName: string;
    customerPhone: string;
    chequeNumber: string;
    chequeAmount: number;
    chequeDate: NativeDate;
    chequeStatus: "pending" | "cancelled" | "cleared" | "bounced" | "on_hold";
    bankName: string;
    notes?: string;
    updatedBy?: mongoose.Types.ObjectId;
    accountNumber?: string;
    chequeImage?: string;
    clearedDate?: NativeDate;
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
    customer: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
    customerName: string;
    customerPhone: string;
    chequeNumber: string;
    chequeAmount: number;
    chequeDate: NativeDate;
    chequeStatus: "pending" | "cancelled" | "cleared" | "bounced" | "on_hold";
    bankName: string;
    notes?: string;
    updatedBy?: mongoose.Types.ObjectId;
    accountNumber?: string;
    chequeImage?: string;
    clearedDate?: NativeDate;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    customer: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
    customerName: string;
    customerPhone: string;
    chequeNumber: string;
    chequeAmount: number;
    chequeDate: NativeDate;
    chequeStatus: "pending" | "cancelled" | "cleared" | "bounced" | "on_hold";
    bankName: string;
    notes?: string;
    updatedBy?: mongoose.Types.ObjectId;
    accountNumber?: string;
    chequeImage?: string;
    clearedDate?: NativeDate;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    customer: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
    customerName: string;
    customerPhone: string;
    chequeNumber: string;
    chequeAmount: number;
    chequeDate: NativeDate;
    chequeStatus: "pending" | "cancelled" | "cleared" | "bounced" | "on_hold";
    bankName: string;
    notes?: string;
    updatedBy?: mongoose.Types.ObjectId;
    accountNumber?: string;
    chequeImage?: string;
    clearedDate?: NativeDate;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
import mongoose from "mongoose";
//# sourceMappingURL=Cheque.model.d.ts.map