export default InsuranceCompany;
declare const InsuranceCompany: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    insuranceType: "mandatory" | "thirdPartyComprehensive";
    contact: string;
    address: string;
    rates: Map<string, {
        تحت_24: number;
        فوق_24: number;
        مبلغ_العرض: number;
        الحد_الأدنى_لـ_60_ألف: number;
    }>;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    insuranceType: "mandatory" | "thirdPartyComprehensive";
    contact: string;
    address: string;
    rates: Map<string, {
        تحت_24: number;
        فوق_24: number;
        مبلغ_العرض: number;
        الحد_الأدنى_لـ_60_ألف: number;
    }>;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    insuranceType: "mandatory" | "thirdPartyComprehensive";
    contact: string;
    address: string;
    rates: Map<string, {
        تحت_24: number;
        فوق_24: number;
        مبلغ_العرض: number;
        الحد_الأدنى_لـ_60_ألف: number;
    }>;
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
    name: string;
    insuranceType: "mandatory" | "thirdPartyComprehensive";
    contact: string;
    address: string;
    rates: Map<string, {
        تحت_24: number;
        فوق_24: number;
        مبلغ_العرض: number;
        الحد_الأدنى_لـ_60_ألف: number;
    }>;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    insuranceType: "mandatory" | "thirdPartyComprehensive";
    contact: string;
    address: string;
    rates: Map<string, {
        تحت_24: number;
        فوق_24: number;
        مبلغ_العرض: number;
        الحد_الأدنى_لـ_60_ألف: number;
    }>;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    insuranceType: "mandatory" | "thirdPartyComprehensive";
    contact: string;
    address: string;
    rates: Map<string, {
        تحت_24: number;
        فوق_24: number;
        مبلغ_العرض: number;
        الحد_الأدنى_لـ_60_ألف: number;
    }>;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
import mongoose from "mongoose";
//# sourceMappingURL=insuranceCompany.model.d.ts.map