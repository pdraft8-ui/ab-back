export class Invoice {
  constructor({
    id,
    invoiceNumber,
    customer,
    insurancePolicy,
    vehicle,
    invoiceDate,
    dueDate,
    status,
    totalAmount,
    balanceDue,
    description,
    notes,
    createdBy,
    updatedBy,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.invoiceNumber = invoiceNumber;
    this.customer = customer;
    this.insurancePolicy = insurancePolicy;
    this.vehicle = vehicle;
    this.invoiceDate = invoiceDate;
    this.dueDate = dueDate;
    this.status = status || "Pending";
    this.totalAmount = totalAmount;
    this.balanceDue = balanceDue;
    this.description = description;
    this.notes = notes;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Business logic methods
  isOverdue() {
    return new Date() > this.dueDate && this.balanceDue > 0;
  }

  isPaid() {
    return this.balanceDue <= 0;
  }

  isPartiallyPaid() {
    return this.balanceDue > 0 && this.balanceDue < this.totalAmount;
  }

  isPending() {
    return this.balanceDue === this.totalAmount && !this.isOverdue();
  }

  canBeUpdated() {
    return this.status !== "Paid";
  }

  canBeDeleted() {
    return this.status === "Pending";
  }

  updateStatus() {
    if (this.balanceDue <= 0) {
      this.status = "Paid";
    } else if (this.balanceDue < this.totalAmount) {
      this.status = "Partially Paid";
    } else if (this.isOverdue()) {
      this.status = "Overdue";
    } else {
      this.status = "Pending";
    }
    this.updatedAt = new Date();
  }

  updateBalance(newBalance) {
    this.balanceDue = Math.max(0, newBalance);
    this.updateStatus();
  }

  validateAmount() {
    return this.totalAmount > 0;
  }

  validateDueDate() {
    return this.dueDate > this.invoiceDate;
  }

  validateCustomer() {
    return this.customer && this.customer.toString().length > 0;
  }

  validateInsurancePolicy() {
    return this.insurancePolicy && this.insurancePolicy.toString().length > 0;
  }

  generateInvoiceNumber(invoiceCount) {
    return String(invoiceCount + 1).padStart(5, "0");
  }

  calculateDaysUntilDue() {
    const today = new Date();
    const dueDate = new Date(this.dueDate);
    const diffTime = dueDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  calculateDaysOverdue() {
    if (!this.isOverdue()) return 0;
    const today = new Date();
    const dueDate = new Date(this.dueDate);
    const diffTime = today - dueDate;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getPaymentPercentage() {
    if (this.totalAmount === 0) return 0;
    const paidAmount = this.totalAmount - this.balanceDue;
    return Math.round((paidAmount / this.totalAmount) * 100);
  }

  toJSON() {
    return {
      id: this.id,
      invoiceNumber: this.invoiceNumber,
      customer: this.customer,
      insurancePolicy: this.insurancePolicy,
      vehicle: this.vehicle,
      invoiceDate: this.invoiceDate,
      dueDate: this.dueDate,
      status: this.status,
      totalAmount: this.totalAmount,
      balanceDue: this.balanceDue,
      description: this.description,
      notes: this.notes,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromJSON(data) {
    return new Invoice(data);
  }
}
