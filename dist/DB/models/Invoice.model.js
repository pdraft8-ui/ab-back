import mongoose from "mongoose";
const invoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
        unique: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    insurancePolicy: {
        type: mongoose.Schema.Types.ObjectId,
        // This can reference either vehicle insurance or customer insurance
        required: true,
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle", // This will reference the vehicle document (optional for non-vehicle insurances)
        required: false,
    },
    invoiceDate: {
        type: Date,
        default: Date.now,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Partially Paid", "Paid", "Overdue"],
        default: "Pending",
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    balanceDue: {
        type: Number,
        required: true,
        min: 0,
    },
    description: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
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
// Index for better query performance
invoiceSchema.index({ customer: 1, status: 1 });
invoiceSchema.index({ dueDate: 1 });
// Pre-save middleware to auto-generate invoice number
invoiceSchema.pre("save", async function (next) {
    try {
        if (this.isNew && !this.invoiceNumber) {
            // Get the total count of invoices to generate the next number
            const count = await mongoose.model("Invoice").countDocuments();
            this.invoiceNumber = String(count + 1).padStart(5, "0");
            // Set due date to 1 month after invoice date if not provided
            if (!this.dueDate) {
                this.dueDate = new Date(this.invoiceDate);
                this.dueDate.setMonth(this.dueDate.getMonth() + 1);
            }
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
// Method to update status based on balance
invoiceSchema.methods.updateStatus = function () {
    if (this.balanceDue <= 0) {
        this.status = "Paid";
    }
    else if (this.balanceDue < this.totalAmount) {
        this.status = "Partially Paid";
    }
    else if (new Date() > this.dueDate) {
        this.status = "Overdue";
    }
    else {
        this.status = "Pending";
    }
};
const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;
//# sourceMappingURL=Invoice.model.js.map