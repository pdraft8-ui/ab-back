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

  // Business logic methods
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

  isCancelled() {
    return this.status === "cancelled";
  }

  canBeRefunded() {
    return this.isCompleted() && !this.isRefunded();
  }

  canBeCancelled() {
    return this.isPending();
  }

  hasPaymentUrl() {
    return !!this.paymentUrl;
  }

  hasTranzilaTransactionId() {
    return !!this.tranzilaTransactionId;
  }

  // Validation methods
  validateAmount() {
    return this.amount > 0;
  }

  validateCurrency() {
    const validCurrencies = ["ILS", "USD", "EUR"];
    return validCurrencies.includes(this.currency);
  }

  validateRefundAmount(refundAmount) {
    return refundAmount > 0 && refundAmount <= this.amount;
  }

  // Business rules
  canProcessPayment() {
    return this.validateAmount() && this.validateCurrency() && this.isPending();
  }

  canProcessRefund(refundAmount) {
    return this.canBeRefunded() && this.validateRefundAmount(refundAmount);
  }

  // Status transitions
  markAsCompleted(transactionId) {
    this.status = "completed";
    this.tranzilaTransactionId = transactionId;
    this.completedAt = new Date();
  }

  markAsFailed(errorMessage) {
    this.status = "failed";
    this.errorMessage = errorMessage;
    this.failedAt = new Date();
  }

  markAsRefunded(refundAmount, reason) {
    this.status = "refunded";
    this.refundAmount = refundAmount;
    this.refundReason = reason;
    this.refundedAt = new Date();
  }

  // Generate payment ID if not exists
  generatePaymentId() {
    if (!this.paymentId) {
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 8);
      this.paymentId = `TZ_${timestamp}_${random}`;
    }
    return this.paymentId;
  }
}
