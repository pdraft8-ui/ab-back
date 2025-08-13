export class TranzilaPayment {
  constructor({
    id,
    paymentId,
    invoiceId,
    customerId,
    amount,
    currency,
    description,
    status,
    tranzilaTransactionId,
    tranzilaResponse,
    customerEmail,
    customerPhone,
    returnUrl,
    cancelUrl,
    paymentUrl,
    refundAmount,
    refundReason,
    refundedAt,
    createdBy,
    updatedBy,
    completedAt,
    failedAt,
    errorMessage,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.paymentId = paymentId;
    this.invoiceId = invoiceId;
    this.customerId = customerId;
    this.amount = amount;
    this.currency = currency;
    this.description = description;
    this.status = status;
    this.tranzilaTransactionId = tranzilaTransactionId;
    this.tranzilaResponse = tranzilaResponse;
    this.customerEmail = customerEmail;
    this.customerPhone = customerPhone;
    this.returnUrl = returnUrl;
    this.cancelUrl = cancelUrl;
    this.paymentUrl = paymentUrl;
    this.refundAmount = refundAmount;
    this.refundReason = refundReason;
    this.refundedAt = refundedAt;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
    this.completedAt = completedAt;
    this.failedAt = failedAt;
    this.errorMessage = errorMessage;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  isPending() {
    return this.status === "pending";
  }

  isCompleted() {
    return this.status === "completed";
  }

  isFailed() {
    return this.status === "failed";
  }

  isRefunded() {
    return this.status === "refunded";
  }

  canBeRefunded() {
    return this.isCompleted() && !this.isRefunded() && this.amount > 0;
  }

  markAsCompleted() {
    this.status = "completed";
    this.completedAt = new Date();
  }

  markAsFailed(errorMessage = null) {
    this.status = "failed";
    this.failedAt = new Date();
    if (errorMessage) {
      this.errorMessage = errorMessage;
    }
  }

  refund(refundAmount, reason) {
    if (!this.canBeRefunded()) {
      throw new Error("Payment cannot be refunded");
    }
    this.status = "refunded";
    this.refundAmount = refundAmount;
    this.refundReason = reason;
    this.refundedAt = new Date();
  }

  validateAmount(amount) {
    return amount > 0;
  }

  generatePaymentId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `TZ-${timestamp}-${random}`;
  }

  toJSON() {
    return {
      id: this.id,
      paymentId: this.paymentId,
      invoiceId: this.invoiceId,
      customerId: this.customerId,
      amount: this.amount,
      currency: this.currency,
      description: this.description,
      status: this.status,
      tranzilaTransactionId: this.tranzilaTransactionId,
      tranzilaResponse: this.tranzilaResponse,
      customerEmail: this.customerEmail,
      customerPhone: this.customerPhone,
      returnUrl: this.returnUrl,
      cancelUrl: this.cancelUrl,
      paymentUrl: this.paymentUrl,
      refundAmount: this.refundAmount,
      refundReason: this.refundReason,
      refundedAt: this.refundedAt,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy,
      completedAt: this.completedAt,
      failedAt: this.failedAt,
      errorMessage: this.errorMessage,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
