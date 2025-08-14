import mongoose, { Schema } from "mongoose";
// سكيمة التأمين للمركبة
const vehicleInsuranceSchema = new mongoose.Schema({
    insuranceStartDate: { type: Date, required: true },
    insuranceEndDate: { type: Date, required: true },
    isUnder24: { type: Boolean, required: true },
    insuranceCategory: {
        type: String,
        required: true,
        enum: ["CarInsurance"],
    },
    insuranceType: {
        type: String,
        required: true,
        /*enum: [
          "إلزامي",
          "تأمين ثالث",
          "تأمين شامل",
          "تأمين خدمات الطرق",
          "إعفاء رسوم الحادث"
        ]*/
    },
    insuranceCompany: { type: String, required: true },
    agent: { type: String },
    paymentMethod: {
        type: String,
        required: true,
        enum: ["cash", "card", "check", "bank_transfer"],
    },
    insuranceAmount: { type: Number, required: true },
    paidAmount: { type: Number, required: true },
    remainingDebt: { type: Number },
    insuranceFiles: [{ type: String, required: true }],
    checkDetails: [
        {
            checkNumber: { type: String },
            checkDueDate: { type: Date },
            checkAmount: { type: Number },
            isReturned: { type: Boolean, default: false },
            checkImage: { type: String },
        },
    ],
});
vehicleInsuranceSchema.pre("save", function (next) {
    this.remainingDebt = this.insuranceAmount - this.paidAmount;
    next();
});
const vehicleSchema = new mongoose.Schema({
    plateNumber: { type: Number, required: true },
    model: { type: String, required: true },
    type: { type: String, required: true },
    ownership: { type: String, required: true },
    modelNumber: { type: String, required: true },
    licenseExpiry: { type: Date, required: true },
    lastTest: { type: Date, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    image: {
        type: String,
        default: "https://www.bing.com/images/search?view=detailV2&ccid=eUdZe6jP&id=4FC8766F458838654929A06B2EC9D65088D0A1C8&thid=OIP.eUdZe6jPSNXtNAbxcswuIgHaE8",
    },
    insurance: [vehicleInsuranceSchema],
});
// Customer insurance schema (for non-vehicle insurances)
const customerInsuranceSchema = new mongoose.Schema({
    // Insurance type (health, life, etc.)
    insuranceType: {
        type: String,
        required: true,
        enum: [
            "Health Insurance",
            "Life Insurance",
            "Property Insurance",
            "Travel Insurance",
            "Civil Liability Insurance",
            "Corporate Insurance",
        ],
    },
    // Policy number
    policyNumber: { type: String, required: true },
    // Issue and expiration date
    issueDate: { type: Date, required: true },
    expirationDate: { type: Date, required: true },
    // Insurance amount
    insuranceAmount: { type: Number, required: true },
    // Premium and its payment schedule
    premiumAmount: { type: Number, required: true },
    premiumFrequency: {
        type: String,
        required: true,
        enum: ["Monthly", "Quarterly", "Semi-Annual", "Annual"],
    },
    premiumPaymentMethod: {
        type: String,
        required: true,
        enum: ["cash", "card", "check", "bank_transfer"],
    },
    // Policy status (active, expired, suspended)
    policyStatus: {
        type: String,
        enum: ["Active", "Expired", "Suspended", "Cancelled"],
        default: "Active",
    },
    // Coverage details
    coverageDetails: { type: String, required: true },
    // Additional fields
    insuranceCompany: { type: String, required: true },
    agent: { type: String },
    beneficiaries: [{ type: String }],
    insuranceFiles: [{ type: String }],
    notes: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
customerInsuranceSchema.pre("save", function (next) {
    this.remainingDebt = this.insuranceAmount - this.paidAmount;
    this.updatedAt = new Date();
    next();
});
const customerSchema = new mongoose.Schema({
    image: { type: String },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    id_Number: { type: Number, required: true },
    phone_number: { type: String, required: true },
    joining_date: { type: Date, default: Date.now },
    notes: { type: String },
    city: { type: String, required: true },
    email: { type: String, required: false },
    birth_date: { type: Date, required: true },
    agentsId: { type: Schema.Types.ObjectId, ref: "User" },
    agentsName: { type: String },
    vehicles: [vehicleSchema],
    insurances: [customerInsuranceSchema], // New field for customer insurances
}, { timestamps: true });
const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
//# sourceMappingURL=Customer.model.js.map