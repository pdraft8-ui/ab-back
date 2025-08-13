export class TranzilaPayment {
  constructor(data) {
    this.id = data.id || null;
    this.paymentId = data.paymentId || this.generatePaymentId();
    this.amount = data.amount;
    this.currency = data.currency || "ILS";
    this.description = data.description;
    this.customerEmail = data.customerEmail;
    this.customerPhone = data.customerPhone;
    this.customerName = data.customerName;
    this.status = data.status || "pending";
    this.paymentMethod = data.paymentMethod || "credit_card";
    this.tranzilaTransactionId = data.tranzilaTransactionId || null;
    this.paymentUrl = data.paymentUrl || null;
    this.completedAt = data.completedAt || null;
    this.failedAt = data.failedAt || null;
    this.errorMessage = data.errorMessage || null;
    this.refundAmount = data.refundAmount || null;
    this.refundReason = data.refundReason || null;
    this.refundedAt = data.refundedAt || null;
    this.createdBy = data.createdBy;
    this.updatedBy = data.updatedBy || data.createdBy;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
    this.tranzilaResponse = data.tranzilaResponse || null;
  }

  generatePaymentId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `TZ${timestamp}${random}`;
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

  hasTranzilaTransactionId() {
    return !!this.tranzilaTransactionId;
  }

  canBeRefunded() {
    return this.isCompleted() && !this.isRefunded();
  }

  validateRefundAmount(amount) {
    if (!amount || amount <= 0) return false;
    if (amount > this.amount) return false;
    if (this.refundAmount && amount + this.refundAmount > this.amount)
      return false;
    return true;
  }

  markAsCompleted(transactionId) {
    this.status = "completed";
    this.tranzilaTransactionId = transactionId;
    this.completedAt = new Date();
    this.updatedAt = new Date();
  }

  markAsFailed(errorMessage) {
    this.status = "failed";
    this.errorMessage = errorMessage;
    this.failedAt = new Date();
    this.updatedAt = new Date();
  }

  markAsRefunded(amount, reason) {
    this.status = "refunded";
    this.refundAmount = amount;
    this.refundReason = reason;
    this.refundedAt = new Date();
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      paymentId: this.paymentId,
      amount: this.amount,
      currency: this.currency,
      description: this.description,
      customerEmail: this.customerEmail,
      customerPhone: this.customerPhone,
      customerName: this.customerName,
      status: this.status,
      paymentMethod: this.paymentMethod,
      tranzilaTransactionId: this.tranzilaTransactionId,
      paymentUrl: this.paymentUrl,
      completedAt: this.completedAt,
      failedAt: this.failedAt,
      errorMessage: this.errorMessage,
      refundAmount: this.refundAmount,
      refundReason: this.refundReason,
      refundedAt: this.refundedAt,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      tranzilaResponse: this.tranzilaResponse,
    };
  }
}
