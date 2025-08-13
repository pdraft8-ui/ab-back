import mongoose from "mongoose";

const tranzilaPaymentSchema = new mongoose.Schema(
  {
    paymentId: {
      type: String,
      unique: true,
      required: true,
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
    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },
    currency: {
      type: String,
      enum: ["ILS", "USD", "EUR"],
      default: "ILS",
      required: true,
    },
    description: {
      type: String,
      maxlength: 255,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded", "cancelled"],
      default: "pending",
    },
    tranzilaTransactionId: {
      type: String,
      unique: true,
      sparse: true,
    },
    tranzilaResponse: {
      type: mongoose.Schema.Types.Mixed,
    },
    customerEmail: {
      type: String,
    },
    customerPhone: {
      type: String,
    },
    returnUrl: {
      type: String,
    },
    cancelUrl: {
      type: String,
    },
    paymentUrl: {
      type: String,
    },
    refundAmount: {
      type: Number,
      default: 0,
    },
    refundReason: {
      type: String,
      maxlength: 255,
    },
    refundedAt: {
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
    completedAt: {
      type: Date,
    },
    failedAt: {
      type: Date,
    },
    errorMessage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
// Note: paymentId and tranzilaTransactionId already have unique: true in schema
tranzilaPaymentSchema.index({ invoice: 1 });
tranzilaPaymentSchema.index({ customer: 1 });
tranzilaPaymentSchema.index({ status: 1 });
tranzilaPaymentSchema.index({ createdAt: -1 });

// Pre-save middleware to auto-generate payment ID
tranzilaPaymentSchema.pre("save", async function (next) {
  try {
    if (this.isNew && !this.paymentId) {
      // Generate unique payment ID
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 8);
      this.paymentId = `TZ_${timestamp}_${random}`;
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Post-save middleware to update invoice when payment is completed
tranzilaPaymentSchema.post("save", async function (doc) {
  if (doc.status === "completed" && !doc.completedAt) {
    const Invoice = mongoose.model("Invoice");
    const invoice = await Invoice.findById(doc.invoice);

    if (invoice) {
      // Create a regular payment record
      const Payment = mongoose.model("Payment");
      const newPayment = new Payment({
        invoice: doc.invoice,
        customer: doc.customer,
        paymentMethod: "Online Payment",
        paymentAmount: doc.amount,
        paymentDate: new Date(),
        notes: `Tranzila payment: ${doc.paymentId}`,
        referenceNumber: doc.tranzilaTransactionId,
        status: "Completed",
        createdBy: doc.createdBy,
      });

      await newPayment.save();
    }
  }
});

const TranzilaPayment = mongoose.model(
  "TranzilaPayment",
  tranzilaPaymentSchema
);
export default TranzilaPayment;
