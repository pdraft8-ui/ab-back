import mongoose from "mongoose";
const insuranceDetailsSchema = new mongoose.Schema({
    تحت_24: { type: Number, required: true },
    فوق_24: { type: Number, required: true },
    مبلغ_العرض: { type: Number, required: true },
    الحد_الأدنى_لـ_60_ألف: { type: Number, required: true },
}, { _id: false });
const insuranceCompanySchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, default: "" },
    address: { type: String, default: "" },
    insuranceType: {
        type: String,
        enum: ["mandatory", "thirdPartyComprehensive"],
        required: true,
    },
    rates: {
        type: Map,
        of: insuranceDetailsSchema,
        default: {},
    },
}, { timestamps: true });
const InsuranceCompany = mongoose.model("InsuranceCompany", insuranceCompanySchema);
export default InsuranceCompany;
//# sourceMappingURL=insuranceCompany.model.js.map