export default DocumentSettings;
declare const DocumentSettings: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    createdBy: mongoose.Types.ObjectId;
    documentType: "invoice" | "receipt" | "contract" | "policy" | "report";
    isActive: boolean;
    updatedBy?: mongoose.Types.ObjectId;
    header?: {
        companyName: string;
        companyAddress?: string;
        companyPhone?: string;
        companyEmail?: string;
        companyWebsite?: string;
        logo?: {
            url?: string;
            publicId?: string;
        };
    };
    footer?: {
        signature?: {
            url?: string;
            publicId?: string;
        };
        logo?: {
            url?: string;
            publicId?: string;
        };
        footerText?: string;
        termsAndConditions?: string;
    };
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    createdBy: mongoose.Types.ObjectId;
    documentType: "invoice" | "receipt" | "contract" | "policy" | "report";
    isActive: boolean;
    updatedBy?: mongoose.Types.ObjectId;
    header?: {
        companyName: string;
        companyAddress?: string;
        companyPhone?: string;
        companyEmail?: string;
        companyWebsite?: string;
        logo?: {
            url?: string;
            publicId?: string;
        };
    };
    footer?: {
        signature?: {
            url?: string;
            publicId?: string;
        };
        logo?: {
            url?: string;
            publicId?: string;
        };
        footerText?: string;
        termsAndConditions?: string;
    };
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    createdBy: mongoose.Types.ObjectId;
    documentType: "invoice" | "receipt" | "contract" | "policy" | "report";
    isActive: boolean;
    updatedBy?: mongoose.Types.ObjectId;
    header?: {
        companyName: string;
        companyAddress?: string;
        companyPhone?: string;
        companyEmail?: string;
        companyWebsite?: string;
        logo?: {
            url?: string;
            publicId?: string;
        };
    };
    footer?: {
        signature?: {
            url?: string;
            publicId?: string;
        };
        logo?: {
            url?: string;
            publicId?: string;
        };
        footerText?: string;
        termsAndConditions?: string;
    };
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
    createdBy: mongoose.Types.ObjectId;
    documentType: "invoice" | "receipt" | "contract" | "policy" | "report";
    isActive: boolean;
    updatedBy?: mongoose.Types.ObjectId;
    header?: {
        companyName: string;
        companyAddress?: string;
        companyPhone?: string;
        companyEmail?: string;
        companyWebsite?: string;
        logo?: {
            url?: string;
            publicId?: string;
        };
    };
    footer?: {
        signature?: {
            url?: string;
            publicId?: string;
        };
        logo?: {
            url?: string;
            publicId?: string;
        };
        footerText?: string;
        termsAndConditions?: string;
    };
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    createdBy: mongoose.Types.ObjectId;
    documentType: "invoice" | "receipt" | "contract" | "policy" | "report";
    isActive: boolean;
    updatedBy?: mongoose.Types.ObjectId;
    header?: {
        companyName: string;
        companyAddress?: string;
        companyPhone?: string;
        companyEmail?: string;
        companyWebsite?: string;
        logo?: {
            url?: string;
            publicId?: string;
        };
    };
    footer?: {
        signature?: {
            url?: string;
            publicId?: string;
        };
        logo?: {
            url?: string;
            publicId?: string;
        };
        footerText?: string;
        termsAndConditions?: string;
    };
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    createdBy: mongoose.Types.ObjectId;
    documentType: "invoice" | "receipt" | "contract" | "policy" | "report";
    isActive: boolean;
    updatedBy?: mongoose.Types.ObjectId;
    header?: {
        companyName: string;
        companyAddress?: string;
        companyPhone?: string;
        companyEmail?: string;
        companyWebsite?: string;
        logo?: {
            url?: string;
            publicId?: string;
        };
    };
    footer?: {
        signature?: {
            url?: string;
            publicId?: string;
        };
        logo?: {
            url?: string;
            publicId?: string;
        };
        footerText?: string;
        termsAndConditions?: string;
    };
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
import mongoose from "mongoose";
//# sourceMappingURL=documentSettings.model.d.ts.map