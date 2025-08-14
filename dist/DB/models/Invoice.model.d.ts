export default Invoice;
declare const Invoice: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    customer: mongoose.Types.ObjectId;
    insurancePolicy: mongoose.Types.ObjectId;
    invoiceDate: NativeDate;
    dueDate: NativeDate;
    status: "Pending" | "Partially Paid" | "Paid" | "Overdue";
    totalAmount: number;
    balanceDue: number;
    createdBy: mongoose.Types.ObjectId;
    notes?: string;
    invoiceNumber?: string;
    vehicle?: mongoose.Types.ObjectId;
    updatedBy?: mongoose.Types.ObjectId;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    customer: mongoose.Types.ObjectId;
    insurancePolicy: mongoose.Types.ObjectId;
    invoiceDate: NativeDate;
    dueDate: NativeDate;
    status: "Pending" | "Partially Paid" | "Paid" | "Overdue";
    totalAmount: number;
    balanceDue: number;
    createdBy: mongoose.Types.ObjectId;
    notes?: string;
    invoiceNumber?: string;
    vehicle?: mongoose.Types.ObjectId;
    updatedBy?: mongoose.Types.ObjectId;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    customer: mongoose.Types.ObjectId;
    insurancePolicy: mongoose.Types.ObjectId;
    invoiceDate: NativeDate;
    dueDate: NativeDate;
    status: "Pending" | "Partially Paid" | "Paid" | "Overdue";
    totalAmount: number;
    balanceDue: number;
    createdBy: mongoose.Types.ObjectId;
    notes?: string;
    invoiceNumber?: string;
    vehicle?: mongoose.Types.ObjectId;
    updatedBy?: mongoose.Types.ObjectId;
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
    description: string;
    customer: mongoose.Types.ObjectId;
    insurancePolicy: mongoose.Types.ObjectId;
    invoiceDate: NativeDate;
    dueDate: NativeDate;
    status: "Pending" | "Partially Paid" | "Paid" | "Overdue";
    totalAmount: number;
    balanceDue: number;
    createdBy: mongoose.Types.ObjectId;
    notes?: string;
    invoiceNumber?: string;
    vehicle?: mongoose.Types.ObjectId;
    updatedBy?: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    customer: mongoose.Types.ObjectId;
    insurancePolicy: mongoose.Types.ObjectId;
    invoiceDate: NativeDate;
    dueDate: NativeDate;
    status: "Pending" | "Partially Paid" | "Paid" | "Overdue";
    totalAmount: number;
    balanceDue: number;
    createdBy: mongoose.Types.ObjectId;
    notes?: string;
    invoiceNumber?: string;
    vehicle?: mongoose.Types.ObjectId;
    updatedBy?: mongoose.Types.ObjectId;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    customer: mongoose.Types.ObjectId;
    insurancePolicy: mongoose.Types.ObjectId;
    invoiceDate: NativeDate;
    dueDate: NativeDate;
    status: "Pending" | "Partially Paid" | "Paid" | "Overdue";
    totalAmount: number;
    balanceDue: number;
    createdBy: mongoose.Types.ObjectId;
    notes?: string;
    invoiceNumber?: string;
    vehicle?: mongoose.Types.ObjectId;
    updatedBy?: mongoose.Types.ObjectId;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
import mongoose from "mongoose";
//# sourceMappingURL=Invoice.model.d.ts.map