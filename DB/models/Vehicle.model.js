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
      "Mandatory",
      "ThirdParty",
      "Comprehensive",
      "RoadServices",
      "AccidentFeeExemption"
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

const vehicleSchema = new mongoose.Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    plateNumber: { type: Number, required: true, unique: true },
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
      default:
        "https://www.bing.com/images/search?view=detailV2&ccid=eUdZe6jP&id=4FC8766F458838654929A06B2EC9D65088D0A1C8&thid=OIP.eUdZe6jPSNXtNAbxcswuIgHaE8",
    },
    insurance: [vehicleInsuranceSchema],
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
