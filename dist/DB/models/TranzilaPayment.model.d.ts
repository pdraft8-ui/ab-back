export default TranzilaPayment;
declare const TranzilaPayment: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    customer: mongoose.Types.ObjectId;
    status: "pending" | "cancelled" | "completed" | "failed" | "refunded";
    createdBy: mongoose.Types.ObjectId;
    invoice: mongoose.Types.ObjectId;
    amount: number;
    refundAmount: number;
    paymentId: string;
    currency: "ILS" | "USD" | "EUR";
    description?: string;
    updatedBy?: mongoose.Types.ObjectId;
    customerPhone?: string;
    customerEmail?: string;
    tranzilaTransactionId?: string;
    tranzilaResponse?: any;
    returnUrl?: string;
    cancelUrl?: string;
    paymentUrl?: string;
    refundReason?: string;
    refundedAt?: NativeDate;
    completedAt?: NativeDate;
    failedAt?: NativeDate;
    errorMessage?: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    customer: mongoose.Types.ObjectId;
    status: "pending" | "cancelled" | "completed" | "failed" | "refunded";
    createdBy: mongoose.Types.ObjectId;
    invoice: mongoose.Types.ObjectId;
    amount: number;
    refundAmount: number;
    paymentId: string;
    currency: "ILS" | "USD" | "EUR";
    description?: string;
    updatedBy?: mongoose.Types.ObjectId;
    customerPhone?: string;
    customerEmail?: string;
    tranzilaTransactionId?: string;
    tranzilaResponse?: any;
    returnUrl?: string;
    cancelUrl?: string;
    paymentUrl?: string;
    refundReason?: string;
    refundedAt?: NativeDate;
    completedAt?: NativeDate;
    failedAt?: NativeDate;
    errorMessage?: string;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    customer: mongoose.Types.ObjectId;
    status: "pending" | "cancelled" | "completed" | "failed" | "refunded";
    createdBy: mongoose.Types.ObjectId;
    invoice: mongoose.Types.ObjectId;
    amount: number;
    refundAmount: number;
    paymentId: string;
    currency: "ILS" | "USD" | "EUR";
    description?: string;
    updatedBy?: mongoose.Types.ObjectId;
    customerPhone?: string;
    customerEmail?: string;
    tranzilaTransactionId?: string;
    tranzilaResponse?: any;
    returnUrl?: string;
    cancelUrl?: string;
    paymentUrl?: string;
    refundReason?: string;
    refundedAt?: NativeDate;
    completedAt?: NativeDate;
    failedAt?: NativeDate;
    errorMessage?: string;
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
    status: "pending" | "cancelled" | "completed" | "failed" | "refunded";
    createdBy: mongoose.Types.ObjectId;
    invoice: mongoose.Types.ObjectId;
    amount: number;
    refundAmount: number;
    paymentId: string;
    currency: "ILS" | "USD" | "EUR";
    description?: string;
    updatedBy?: mongoose.Types.ObjectId;
    customerPhone?: string;
    customerEmail?: string;
    tranzilaTransactionId?: string;
    tranzilaResponse?: any;
    returnUrl?: string;
    cancelUrl?: string;
    paymentUrl?: string;
    refundReason?: string;
    refundedAt?: NativeDate;
    completedAt?: NativeDate;
    failedAt?: NativeDate;
    errorMessage?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    customer: mongoose.Types.ObjectId;
    status: "pending" | "cancelled" | "completed" | "failed" | "refunded";
    createdBy: mongoose.Types.ObjectId;
    invoice: mongoose.Types.ObjectId;
    amount: number;
    refundAmount: number;
    paymentId: string;
    currency: "ILS" | "USD" | "EUR";
    description?: string;
    updatedBy?: mongoose.Types.ObjectId;
    customerPhone?: string;
    customerEmail?: string;
    tranzilaTransactionId?: string;
    tranzilaResponse?: any;
    returnUrl?: string;
    cancelUrl?: string;
    paymentUrl?: string;
    refundReason?: string;
    refundedAt?: NativeDate;
    completedAt?: NativeDate;
    failedAt?: NativeDate;
    errorMessage?: string;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    customer: mongoose.Types.ObjectId;
    status: "pending" | "cancelled" | "completed" | "failed" | "refunded";
    createdBy: mongoose.Types.ObjectId;
    invoice: mongoose.Types.ObjectId;
    amount: number;
    refundAmount: number;
    paymentId: string;
    currency: "ILS" | "USD" | "EUR";
    description?: string;
    updatedBy?: mongoose.Types.ObjectId;
    customerPhone?: string;
    customerEmail?: string;
    tranzilaTransactionId?: string;
    tranzilaResponse?: any;
    returnUrl?: string;
    cancelUrl?: string;
    paymentUrl?: string;
    refundReason?: string;
    refundedAt?: NativeDate;
    completedAt?: NativeDate;
    failedAt?: NativeDate;
    errorMessage?: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
import mongoose from "mongoose";
//# sourceMappingURL=TranzilaPayment.model.d.ts.map