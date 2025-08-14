declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    role: string;
    name: string;
    description: string;
    employees: mongoose.Types.DocumentArray<{
        role: string;
        name: string;
        email: string;
        status: string;
        _id?: mongoose.Types.ObjectId;
        phone?: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        role: string;
        name: string;
        email: string;
        status: string;
        _id?: mongoose.Types.ObjectId;
        phone?: string;
    }> & {
        role: string;
        name: string;
        email: string;
        status: string;
        _id?: mongoose.Types.ObjectId;
        phone?: string;
    }>;
    permissions: ("addAccedent" | "showAccedent" | "deleteAccedent" | "createNotification" | "getNotifications" | "markAsRead" | "Deletenotification" | "addCustomer" | "deleteCustomer" | "allCustomer" | "findbyidCustomer" | "addcar" | "removeCar" | "showVehicles" | "addRoad" | "deleteRoad" | "updateRoad" | "allRoad" | "addAgents" | "deleteAgents" | "updateAgents" | "allAgents" | "addCompany" | "deleteCompany" | "upateCompany" | "allCompany")[];
    headOfDepartment?: mongoose.Types.ObjectId;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    role: string;
    name: string;
    description: string;
    employees: mongoose.Types.DocumentArray<{
        role: string;
        name: string;
        email: string;
        status: string;
        _id?: mongoose.Types.ObjectId;
        phone?: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        role: string;
        name: string;
        email: string;
        status: string;
        _id?: mongoose.Types.ObjectId;
        phone?: string;
    }> & {
        role: string;
        name: string;
        email: string;
        status: string;
        _id?: mongoose.Types.ObjectId;
        phone?: string;
    }>;
    permissions: ("addAccedent" | "showAccedent" | "deleteAccedent" | "createNotification" | "getNotifications" | "markAsRead" | "Deletenotification" | "addCustomer" | "deleteCustomer" | "allCustomer" | "findbyidCustomer" | "addcar" | "removeCar" | "showVehicles" | "addRoad" | "deleteRoad" | "updateRoad" | "allRoad" | "addAgents" | "deleteAgents" | "updateAgents" | "allAgents" | "addCompany" | "deleteCompany" | "upateCompany" | "allCompany")[];
    headOfDepartment?: mongoose.Types.ObjectId;
}, {}, {
    timestamps: true;
    toJSON: {
        virtuals: true;
    };
    toObject: {
        virtuals: true;
    };
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    role: string;
    name: string;
    description: string;
    employees: mongoose.Types.DocumentArray<{
        role: string;
        name: string;
        email: string;
        status: string;
        _id?: mongoose.Types.ObjectId;
        phone?: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        role: string;
        name: string;
        email: string;
        status: string;
        _id?: mongoose.Types.ObjectId;
        phone?: string;
    }> & {
        role: string;
        name: string;
        email: string;
        status: string;
        _id?: mongoose.Types.ObjectId;
        phone?: string;
    }>;
    permissions: ("addAccedent" | "showAccedent" | "deleteAccedent" | "createNotification" | "getNotifications" | "markAsRead" | "Deletenotification" | "addCustomer" | "deleteCustomer" | "allCustomer" | "findbyidCustomer" | "addcar" | "removeCar" | "showVehicles" | "addRoad" | "deleteRoad" | "updateRoad" | "allRoad" | "addAgents" | "deleteAgents" | "updateAgents" | "allAgents" | "addCompany" | "deleteCompany" | "upateCompany" | "allCompany")[];
    headOfDepartment?: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    toJSON: {
        virtuals: true;
    };
    toObject: {
        virtuals: true;
    };
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    role: string;
    name: string;
    description: string;
    employees: mongoose.Types.DocumentArray<{
        role: string;
        name: string;
        email: string;
        status: string;
        _id?: mongoose.Types.ObjectId;
        phone?: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        role: string;
        name: string;
        email: string;
        status: string;
        _id?: mongoose.Types.ObjectId;
        phone?: string;
    }> & {
        role: string;
        name: string;
        email: string;
        status: string;
        _id?: mongoose.Types.ObjectId;
        phone?: string;
    }>;
    permissions: ("addAccedent" | "showAccedent" | "deleteAccedent" | "createNotification" | "getNotifications" | "markAsRead" | "Deletenotification" | "addCustomer" | "deleteCustomer" | "allCustomer" | "findbyidCustomer" | "addcar" | "removeCar" | "showVehicles" | "addRoad" | "deleteRoad" | "updateRoad" | "allRoad" | "addAgents" | "deleteAgents" | "updateAgents" | "allAgents" | "addCompany" | "deleteCompany" | "upateCompany" | "allCompany")[];
    headOfDepartment?: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    role: string;
    name: string;
    description: string;
    employees: mongoose.Types.DocumentArray<{
        role: string;
        name: string;
        email: string;
        status: string;
        _id?: mongoose.Types.ObjectId;
        phone?: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        role: string;
        name: string;
        email: string;
        status: string;
        _id?: mongoose.Types.ObjectId;
        phone?: string;
    }> & {
        role: string;
        name: string;
        email: string;
        status: string;
        _id?: mongoose.Types.ObjectId;
        phone?: string;
    }>;
    permissions: ("addAccedent" | "showAccedent" | "deleteAccedent" | "createNotification" | "getNotifications" | "markAsRead" | "Deletenotification" | "addCustomer" | "deleteCustomer" | "allCustomer" | "findbyidCustomer" | "addcar" | "removeCar" | "showVehicles" | "addRoad" | "deleteRoad" | "updateRoad" | "allRoad" | "addAgents" | "deleteAgents" | "updateAgents" | "allAgents" | "addCompany" | "deleteCompany" | "upateCompany" | "allCompany")[];
    headOfDepartment?: mongoose.Types.ObjectId;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    toJSON: {
        virtuals: true;
    };
    toObject: {
        virtuals: true;
    };
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    role: string;
    name: string;
    description: string;
    employees: mongoose.Types.DocumentArray<{
        role: string;
        name: string;
        email: string;
        status: string;
        _id?: mongoose.Types.ObjectId;
        phone?: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        role: string;
        name: string;
        email: string;
        status: string;
        _id?: mongoose.Types.ObjectId;
        phone?: string;
    }> & {
        role: string;
        name: string;
        email: string;
        status: string;
        _id?: mongoose.Types.ObjectId;
        phone?: string;
    }>;
    permissions: ("addAccedent" | "showAccedent" | "deleteAccedent" | "createNotification" | "getNotifications" | "markAsRead" | "Deletenotification" | "addCustomer" | "deleteCustomer" | "allCustomer" | "findbyidCustomer" | "addcar" | "removeCar" | "showVehicles" | "addRoad" | "deleteRoad" | "updateRoad" | "allRoad" | "addAgents" | "deleteAgents" | "updateAgents" | "allAgents" | "addCompany" | "deleteCompany" | "upateCompany" | "allCompany")[];
    headOfDepartment?: mongoose.Types.ObjectId;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
import mongoose from "mongoose";
import { Schema } from "mongoose";
//# sourceMappingURL=Department.model.d.ts.map