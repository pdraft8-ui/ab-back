export class Payment {
  constructor({
    id,
    paymentNumber,
    invoiceId,
    customerId,
    paymentMethod,
    paymentAmount,
    paymentDate,
    notes,
    referenceNumber,
    status,
    createdBy,
    updatedBy,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.paymentNumber = paymentNumber;
    this.invoiceId = invoiceId;
    this.customerId = customerId;
    this.paymentMethod = paymentMethod;
    this.paymentAmount = paymentAmount;
    this.paymentDate = paymentDate;
    this.notes = notes;
    this.referenceNumber = referenceNumber;
    this.status = status;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  isCompleted() {
    return this.status === "Completed";
  }

  isPending() {
    return this.status === "Pending";
  }

  isFailed() {
    return this.status === "Failed";
  }

  canBeRefunded() {
    return this.isCompleted() && this.paymentAmount > 0;
  }

  markAsCompleted() {
    this.status = "Completed";
    this.paymentDate = new Date();
  }

  markAsFailed() {
    this.status = "Failed";
  }

  validateAmount(amount) {
    return amount > 0;
  }

  generatePaymentNumber() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `PAY-${timestamp}-${random}`;
  }

  toJSON() {
    return {
      id: this.id,
      paymentNumber: this.paymentNumber,
      invoiceId: this.invoiceId,
      customerId: this.customerId,
      paymentMethod: this.paymentMethod,
      paymentAmount: this.paymentAmount,
      paymentDate: this.paymentDate,
      notes: this.notes,
      referenceNumber: this.referenceNumber,
      status: this.status,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
