export default UserModel;
declare const UserModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    password: string;
    role: "admin" | "customer" | "employee" | "headOfDepartment" | "agents";
    name: string;
    email: string;
    status: "active" | "inactive";
    departmentId: mongoose.Types.ObjectId;
    sendCode: string;
    phone?: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    password: string;
    role: "admin" | "customer" | "employee" | "headOfDepartment" | "agents";
    name: string;
    email: string;
    status: "active" | "inactive";
    departmentId: mongoose.Types.ObjectId;
    sendCode: string;
    phone?: string;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    password: string;
    role: "admin" | "customer" | "employee" | "headOfDepartment" | "agents";
    name: string;
    email: string;
    status: "active" | "inactive";
    departmentId: mongoose.Types.ObjectId;
    sendCode: string;
    phone?: string;
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
    password: string;
    role: "admin" | "customer" | "employee" | "headOfDepartment" | "agents";
    name: string;
    email: string;
    status: "active" | "inactive";
    departmentId: mongoose.Types.ObjectId;
    sendCode: string;
    phone?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    password: string;
    role: "admin" | "customer" | "employee" | "headOfDepartment" | "agents";
    name: string;
    email: string;
    status: "active" | "inactive";
    departmentId: mongoose.Types.ObjectId;
    sendCode: string;
    phone?: string;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    password: string;
    role: "admin" | "customer" | "employee" | "headOfDepartment" | "agents";
    name: string;
    email: string;
    status: "active" | "inactive";
    departmentId: mongoose.Types.ObjectId;
    sendCode: string;
    phone?: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
import mongoose from "mongoose";
//# sourceMappingURL=user.model.d.ts.map