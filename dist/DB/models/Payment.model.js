import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema({
    paymentNumber: {
        type: String,
        unique: true,
    },
    invoice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invoice",
        required: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ["Cash", "Credit Card", "Bank Transfer", "Check", "Online Payment"],
        required: true,
    },
    paymentAmount: {
        type: Number,
        required: true,
        min: 0.01,
    },
    paymentDate: {
        type: Date,
        default: Date.now,
        required: true,
    },
    notes: {
        type: String,
    },
    referenceNumber: {
        type: String, // For bank transfer, check number, etc.
    },
    status: {
        type: String,
        enum: ["Pending", "Completed", "Failed", "Refunded"],
        default: "Completed",
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
paymentSchema.index({ invoice: 1, paymentDate: -1 });
paymentSchema.index({ customer: 1, paymentDate: -1 });
paymentSchema.index({ status: 1 });
// Pre-save middleware to auto-generate payment number
paymentSchema.pre("save", async function (next) {
    try {
        if (this.isNew && !this.paymentNumber) {
            // Get the invoice to get its invoice number
            const Invoice = mongoose.model("Invoice");
            const invoice = await Invoice.findById(this.invoice);
            if (invoice) {
                // Count existing payments for this invoice
                const paymentCount = await mongoose.model("Payment").countDocuments({
                    invoice: this.invoice,
                });
                // Generate payment number in format: {InvoiceNumber}#{counter}
                this.paymentNumber = `${invoice.invoiceNumber}#${paymentCount + 1}`;
            }
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
// Post-save middleware to update invoice balance
paymentSchema.post("save", async function (doc) {
    if (doc.status === "Completed") {
        const Invoice = mongoose.model("Invoice");
        const invoice = await Invoice.findById(doc.invoice);
        if (invoice) {
            // Calculate new balance
            const newBalance = Math.max(0, invoice.balanceDue - doc.paymentAmount);
            invoice.balanceDue = newBalance;
            // Update status
            invoice.updateStatus();
            await invoice.save();
        }
    }
});
// Post-update middleware to handle payment updates
paymentSchema.post("findOneAndUpdate", async function (doc) {
    if (doc && doc.status === "Completed") {
        const Invoice = mongoose.model("Invoice");
        const invoice = await Invoice.findById(doc.invoice);
        if (invoice) {
            // Recalculate balance from all completed payments
            const Payment = mongoose.model("Payment");
            const totalPaid = await Payment.aggregate([
                {
                    $match: {
                        invoice: invoice._id,
                        status: "Completed",
                    },
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$paymentAmount" },
                    },
                },
            ]);
            const totalPaidAmount = totalPaid.length > 0 ? totalPaid[0].total : 0;
            invoice.balanceDue = Math.max(0, invoice.totalAmount - totalPaidAmount);
            invoice.updateStatus();
            await invoice.save();
        }
    }
});
const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
//# sourceMappingURL=Payment.model.js.map