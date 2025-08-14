export default Vehicle;
declare const Vehicle: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: string;
    model: string;
    image: string;
    plateNumber: number;
    ownership: string;
    modelNumber: string;
    licenseExpiry: NativeDate;
    lastTest: NativeDate;
    color: string;
    price: number;
    insurance: mongoose.Types.DocumentArray<{
        insuranceStartDate: NativeDate;
        insuranceEndDate: NativeDate;
        isUnder24: boolean;
        insuranceCategory: "CarInsurance";
        insuranceType: string;
        insuranceCompany: string;
        paymentMethod: "cash" | "card" | "bank_transfer" | "check";
        insuranceAmount: number;
        paidAmount: number;
        insuranceFiles: string[];
        checkDetails: mongoose.Types.DocumentArray<{
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }> & {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }>;
        agent?: string;
        remainingDebt?: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        insuranceStartDate: NativeDate;
        insuranceEndDate: NativeDate;
        isUnder24: boolean;
        insuranceCategory: "CarInsurance";
        insuranceType: string;
        insuranceCompany: string;
        paymentMethod: "cash" | "card" | "bank_transfer" | "check";
        insuranceAmount: number;
        paidAmount: number;
        insuranceFiles: string[];
        checkDetails: mongoose.Types.DocumentArray<{
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }> & {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }>;
        agent?: string;
        remainingDebt?: number;
    }> & {
        insuranceStartDate: NativeDate;
        insuranceEndDate: NativeDate;
        isUnder24: boolean;
        insuranceCategory: "CarInsurance";
        insuranceType: string;
        insuranceCompany: string;
        paymentMethod: "cash" | "card" | "bank_transfer" | "check";
        insuranceAmount: number;
        paidAmount: number;
        insuranceFiles: string[];
        checkDetails: mongoose.Types.DocumentArray<{
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }> & {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }>;
        agent?: string;
        remainingDebt?: number;
    }>;
    customerId: mongoose.Types.ObjectId;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: string;
    model: string;
    image: string;
    plateNumber: number;
    ownership: string;
    modelNumber: string;
    licenseExpiry: NativeDate;
    lastTest: NativeDate;
    color: string;
    price: number;
    insurance: mongoose.Types.DocumentArray<{
        insuranceStartDate: NativeDate;
        insuranceEndDate: NativeDate;
        isUnder24: boolean;
        insuranceCategory: "CarInsurance";
        insuranceType: string;
        insuranceCompany: string;
        paymentMethod: "cash" | "card" | "bank_transfer" | "check";
        insuranceAmount: number;
        paidAmount: number;
        insuranceFiles: string[];
        checkDetails: mongoose.Types.DocumentArray<{
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }> & {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }>;
        agent?: string;
        remainingDebt?: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        insuranceStartDate: NativeDate;
        insuranceEndDate: NativeDate;
        isUnder24: boolean;
        insuranceCategory: "CarInsurance";
        insuranceType: string;
        insuranceCompany: string;
        paymentMethod: "cash" | "card" | "bank_transfer" | "check";
        insuranceAmount: number;
        paidAmount: number;
        insuranceFiles: string[];
        checkDetails: mongoose.Types.DocumentArray<{
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }> & {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }>;
        agent?: string;
        remainingDebt?: number;
    }> & {
        insuranceStartDate: NativeDate;
        insuranceEndDate: NativeDate;
        isUnder24: boolean;
        insuranceCategory: "CarInsurance";
        insuranceType: string;
        insuranceCompany: string;
        paymentMethod: "cash" | "card" | "bank_transfer" | "check";
        insuranceAmount: number;
        paidAmount: number;
        insuranceFiles: string[];
        checkDetails: mongoose.Types.DocumentArray<{
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }> & {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }>;
        agent?: string;
        remainingDebt?: number;
    }>;
    customerId: mongoose.Types.ObjectId;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: string;
    model: string;
    image: string;
    plateNumber: number;
    ownership: string;
    modelNumber: string;
    licenseExpiry: NativeDate;
    lastTest: NativeDate;
    color: string;
    price: number;
    insurance: mongoose.Types.DocumentArray<{
        insuranceStartDate: NativeDate;
        insuranceEndDate: NativeDate;
        isUnder24: boolean;
        insuranceCategory: "CarInsurance";
        insuranceType: string;
        insuranceCompany: string;
        paymentMethod: "cash" | "card" | "bank_transfer" | "check";
        insuranceAmount: number;
        paidAmount: number;
        insuranceFiles: string[];
        checkDetails: mongoose.Types.DocumentArray<{
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }> & {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }>;
        agent?: string;
        remainingDebt?: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        insuranceStartDate: NativeDate;
        insuranceEndDate: NativeDate;
        isUnder24: boolean;
        insuranceCategory: "CarInsurance";
        insuranceType: string;
        insuranceCompany: string;
        paymentMethod: "cash" | "card" | "bank_transfer" | "check";
        insuranceAmount: number;
        paidAmount: number;
        insuranceFiles: string[];
        checkDetails: mongoose.Types.DocumentArray<{
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }> & {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }>;
        agent?: string;
        remainingDebt?: number;
    }> & {
        insuranceStartDate: NativeDate;
        insuranceEndDate: NativeDate;
        isUnder24: boolean;
        insuranceCategory: "CarInsurance";
        insuranceType: string;
        insuranceCompany: string;
        paymentMethod: "cash" | "card" | "bank_transfer" | "check";
        insuranceAmount: number;
        paidAmount: number;
        insuranceFiles: string[];
        checkDetails: mongoose.Types.DocumentArray<{
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }> & {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }>;
        agent?: string;
        remainingDebt?: number;
    }>;
    customerId: mongoose.Types.ObjectId;
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
    type: string;
    model: string;
    image: string;
    plateNumber: number;
    ownership: string;
    modelNumber: string;
    licenseExpiry: NativeDate;
    lastTest: NativeDate;
    color: string;
    price: number;
    insurance: mongoose.Types.DocumentArray<{
        insuranceStartDate: NativeDate;
        insuranceEndDate: NativeDate;
        isUnder24: boolean;
        insuranceCategory: "CarInsurance";
        insuranceType: string;
        insuranceCompany: string;
        paymentMethod: "cash" | "card" | "bank_transfer" | "check";
        insuranceAmount: number;
        paidAmount: number;
        insuranceFiles: string[];
        checkDetails: mongoose.Types.DocumentArray<{
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }> & {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }>;
        agent?: string;
        remainingDebt?: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        insuranceStartDate: NativeDate;
        insuranceEndDate: NativeDate;
        isUnder24: boolean;
        insuranceCategory: "CarInsurance";
        insuranceType: string;
        insuranceCompany: string;
        paymentMethod: "cash" | "card" | "bank_transfer" | "check";
        insuranceAmount: number;
        paidAmount: number;
        insuranceFiles: string[];
        checkDetails: mongoose.Types.DocumentArray<{
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }> & {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }>;
        agent?: string;
        remainingDebt?: number;
    }> & {
        insuranceStartDate: NativeDate;
        insuranceEndDate: NativeDate;
        isUnder24: boolean;
        insuranceCategory: "CarInsurance";
        insuranceType: string;
        insuranceCompany: string;
        paymentMethod: "cash" | "card" | "bank_transfer" | "check";
        insuranceAmount: number;
        paidAmount: number;
        insuranceFiles: string[];
        checkDetails: mongoose.Types.DocumentArray<{
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }> & {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }>;
        agent?: string;
        remainingDebt?: number;
    }>;
    customerId: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: string;
    model: string;
    image: string;
    plateNumber: number;
    ownership: string;
    modelNumber: string;
    licenseExpiry: NativeDate;
    lastTest: NativeDate;
    color: string;
    price: number;
    insurance: mongoose.Types.DocumentArray<{
        insuranceStartDate: NativeDate;
        insuranceEndDate: NativeDate;
        isUnder24: boolean;
        insuranceCategory: "CarInsurance";
        insuranceType: string;
        insuranceCompany: string;
        paymentMethod: "cash" | "card" | "bank_transfer" | "check";
        insuranceAmount: number;
        paidAmount: number;
        insuranceFiles: string[];
        checkDetails: mongoose.Types.DocumentArray<{
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }> & {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }>;
        agent?: string;
        remainingDebt?: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        insuranceStartDate: NativeDate;
        insuranceEndDate: NativeDate;
        isUnder24: boolean;
        insuranceCategory: "CarInsurance";
        insuranceType: string;
        insuranceCompany: string;
        paymentMethod: "cash" | "card" | "bank_transfer" | "check";
        insuranceAmount: number;
        paidAmount: number;
        insuranceFiles: string[];
        checkDetails: mongoose.Types.DocumentArray<{
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }> & {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }>;
        agent?: string;
        remainingDebt?: number;
    }> & {
        insuranceStartDate: NativeDate;
        insuranceEndDate: NativeDate;
        isUnder24: boolean;
        insuranceCategory: "CarInsurance";
        insuranceType: string;
        insuranceCompany: string;
        paymentMethod: "cash" | "card" | "bank_transfer" | "check";
        insuranceAmount: number;
        paidAmount: number;
        insuranceFiles: string[];
        checkDetails: mongoose.Types.DocumentArray<{
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }> & {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }>;
        agent?: string;
        remainingDebt?: number;
    }>;
    customerId: mongoose.Types.ObjectId;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: string;
    model: string;
    image: string;
    plateNumber: number;
    ownership: string;
    modelNumber: string;
    licenseExpiry: NativeDate;
    lastTest: NativeDate;
    color: string;
    price: number;
    insurance: mongoose.Types.DocumentArray<{
        insuranceStartDate: NativeDate;
        insuranceEndDate: NativeDate;
        isUnder24: boolean;
        insuranceCategory: "CarInsurance";
        insuranceType: string;
        insuranceCompany: string;
        paymentMethod: "cash" | "card" | "bank_transfer" | "check";
        insuranceAmount: number;
        paidAmount: number;
        insuranceFiles: string[];
        checkDetails: mongoose.Types.DocumentArray<{
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }> & {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }>;
        agent?: string;
        remainingDebt?: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        insuranceStartDate: NativeDate;
        insuranceEndDate: NativeDate;
        isUnder24: boolean;
        insuranceCategory: "CarInsurance";
        insuranceType: string;
        insuranceCompany: string;
        paymentMethod: "cash" | "card" | "bank_transfer" | "check";
        insuranceAmount: number;
        paidAmount: number;
        insuranceFiles: string[];
        checkDetails: mongoose.Types.DocumentArray<{
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }> & {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }>;
        agent?: string;
        remainingDebt?: number;
    }> & {
        insuranceStartDate: NativeDate;
        insuranceEndDate: NativeDate;
        isUnder24: boolean;
        insuranceCategory: "CarInsurance";
        insuranceType: string;
        insuranceCompany: string;
        paymentMethod: "cash" | "card" | "bank_transfer" | "check";
        insuranceAmount: number;
        paidAmount: number;
        insuranceFiles: string[];
        checkDetails: mongoose.Types.DocumentArray<{
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }> & {
            isReturned: boolean;
            checkNumber?: string;
            checkDueDate?: NativeDate;
            checkAmount?: number;
            checkImage?: string;
        }>;
        agent?: string;
        remainingDebt?: number;
    }>;
    customerId: mongoose.Types.ObjectId;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
import mongoose from "mongoose";
//# sourceMappingURL=Vehicle.model.d.ts.map