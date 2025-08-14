import mongoose from "mongoose";
const chequeSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    customerPhone: {
        type: String,
        required: true,
    },
    chequeNumber: {
        type: String,
        required: true,
    },
    chequeAmount: {
        type: Number,
        required: true,
    },
    chequeDate: {
        type: Date,
        required: true,
    },
    chequeStatus: {
        type: String,
        enum: ["pending", "cleared", "bounced", "cancelled", "on_hold"],
        default: "pending",
    },
    bankName: {
        type: String,
        required: true,
    },
    accountNumber: {
        type: String,
    },
    chequeImage: {
        type: String,
    },
    notes: {
        type: String,
    },
    clearedDate: {
        type: Date,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
});
// Indexes for better query performance
chequeSchema.index({ customer: 1 });
chequeSchema.index({ customerName: 1 });
chequeSchema.index({ customerPhone: 1 });
chequeSchema.index({ chequeStatus: 1 });
chequeSchema.index({ chequeDate: 1 });
chequeSchema.index({ chequeAmount: 1 });
chequeSchema.index({ bankName: 1 });
chequeSchema.index({ createdBy: 1 });
chequeSchema.index({ chequeNumber: 1 }, { unique: true });
const Cheque = mongoose.model("Cheque", chequeSchema);
export default Cheque;
//# sourceMappingURL=Cheque.model.js.map