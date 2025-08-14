export default Payment;
declare const Payment: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    paymentMethod: "Cash" | "Credit Card" | "Bank Transfer" | "Check" | "Online Payment";
    customer: mongoose.Types.ObjectId;
    status: "Pending" | "Completed" | "Failed" | "Refunded";
    createdBy: mongoose.Types.ObjectId;
    invoice: mongoose.Types.ObjectId;
    paymentAmount: number;
    paymentDate: NativeDate;
    notes?: string;
    updatedBy?: mongoose.Types.ObjectId;
    paymentNumber?: string;
    referenceNumber?: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    paymentMethod: "Cash" | "Credit Card" | "Bank Transfer" | "Check" | "Online Payment";
    customer: mongoose.Types.ObjectId;
    status: "Pending" | "Completed" | "Failed" | "Refunded";
    createdBy: mongoose.Types.ObjectId;
    invoice: mongoose.Types.ObjectId;
    paymentAmount: number;
    paymentDate: NativeDate;
    notes?: string;
    updatedBy?: mongoose.Types.ObjectId;
    paymentNumber?: string;
    referenceNumber?: string;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    paymentMethod: "Cash" | "Credit Card" | "Bank Transfer" | "Check" | "Online Payment";
    customer: mongoose.Types.ObjectId;
    status: "Pending" | "Completed" | "Failed" | "Refunded";
    createdBy: mongoose.Types.ObjectId;
    invoice: mongoose.Types.ObjectId;
    paymentAmount: number;
    paymentDate: NativeDate;
    notes?: string;
    updatedBy?: mongoose.Types.ObjectId;
    paymentNumber?: string;
    referenceNumber?: string;
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
    paymentMethod: "Cash" | "Credit Card" | "Bank Transfer" | "Check" | "Online Payment";
    customer: mongoose.Types.ObjectId;
    status: "Pending" | "Completed" | "Failed" | "Refunded";
    createdBy: mongoose.Types.ObjectId;
    invoice: mongoose.Types.ObjectId;
    paymentAmount: number;
    paymentDate: NativeDate;
    notes?: string;
    updatedBy?: mongoose.Types.ObjectId;
    paymentNumber?: string;
    referenceNumber?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    paymentMethod: "Cash" | "Credit Card" | "Bank Transfer" | "Check" | "Online Payment";
    customer: mongoose.Types.ObjectId;
    status: "Pending" | "Completed" | "Failed" | "Refunded";
    createdBy: mongoose.Types.ObjectId;
    invoice: mongoose.Types.ObjectId;
    paymentAmount: number;
    paymentDate: NativeDate;
    notes?: string;
    updatedBy?: mongoose.Types.ObjectId;
    paymentNumber?: string;
    referenceNumber?: string;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    paymentMethod: "Cash" | "Credit Card" | "Bank Transfer" | "Check" | "Online Payment";
    customer: mongoose.Types.ObjectId;
    status: "Pending" | "Completed" | "Failed" | "Refunded";
    createdBy: mongoose.Types.ObjectId;
    invoice: mongoose.Types.ObjectId;
    paymentAmount: number;
    paymentDate: NativeDate;
    notes?: string;
    updatedBy?: mongoose.Types.ObjectId;
    paymentNumber?: string;
    referenceNumber?: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
import mongoose from "mongoose";
//# sourceMappingURL=Payment.model.d.ts.map