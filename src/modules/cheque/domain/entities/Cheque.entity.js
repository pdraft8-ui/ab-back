/**
 * Cheque Domain Entity
 * Contains business logic and validation for cheque operations
 */

export class Cheque {
  constructor({
    id,
    chequeNumber,
    amount,
    bankName,
    branchName,
    accountNumber,
    issueDate,
    dueDate,
    status = "Pending",
    customer,
    invoice,
    notes,
    imageUrl,
    createdBy,
    updatedBy,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.chequeNumber = chequeNumber;
    this.amount = amount;
    this.bankName = bankName;
    this.branchName = branchName;
    this.accountNumber = accountNumber;
    this.issueDate = issueDate;
    this.dueDate = dueDate;
    this.status = status;
    this.customer = customer;
    this.invoice = invoice;
    this.notes = notes;
    this.imageUrl = imageUrl;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /**
   * Validate cheque data
   */
  static validate(data) {
    const errors = [];

    if (!data.chequeNumber || data.chequeNumber.trim().length === 0) {
      errors.push("Cheque number is required");
    }

    if (!data.amount || data.amount <= 0) {
      errors.push("Valid amount is required");
    }

    if (!data.bankName || data.bankName.trim().length === 0) {
      errors.push("Bank name is required");
    }

    if (!data.branchName || data.branchName.trim().length === 0) {
      errors.push("Branch name is required");
    }

    if (!data.accountNumber || data.accountNumber.trim().length === 0) {
      errors.push("Account number is required");
    }

    if (!data.issueDate) {
      errors.push("Issue date is required");
    }

    if (!data.dueDate) {
      errors.push("Due date is required");
    }

    if (
      data.issueDate &&
      data.dueDate &&
      new Date(data.issueDate) > new Date(data.dueDate)
    ) {
      errors.push("Issue date cannot be after due date");
    }

    if (!data.customer) {
      errors.push("Customer is required");
    }

    if (!data.invoice) {
      errors.push("Invoice is required");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Check if cheque can be updated
   */
  canBeUpdated() {
    return this.status === "Pending" || this.status === "Processing";
  }

  /**
   * Check if cheque can be deleted
   */
  canBeDeleted() {
    return this.status === "Pending";
  }

  /**
   * Check if cheque is overdue
   */
  isOverdue() {
    return (
      this.dueDate &&
      new Date() > new Date(this.dueDate) &&
      this.status !== "Cleared"
    );
  }

  /**
   * Check if cheque is cleared
   */
  isCleared() {
    return this.status === "Cleared";
  }

  /**
   * Check if cheque is bounced
   */
  isBounced() {
    return this.status === "Bounced";
  }

  /**
   * Get days until due
   */
  getDaysUntilDue() {
    if (!this.dueDate) return null;
    const today = new Date();
    const dueDate = new Date(this.dueDate);
    const diffTime = dueDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Get days overdue
   */
  getDaysOverdue() {
    if (!this.isOverdue()) return 0;
    const today = new Date();
    const dueDate = new Date(this.dueDate);
    const diffTime = today - dueDate;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Update cheque status
   */
  updateStatus(newStatus) {
    const validStatuses = [
      "Pending",
      "Processing",
      "Cleared",
      "Bounced",
      "Cancelled",
    ];
    if (!validStatuses.includes(newStatus)) {
      throw new Error("Invalid cheque status");
    }
    this.status = newStatus;
    this.updatedAt = new Date();
  }

  /**
   * Mark cheque as cleared
   */
  markAsCleared() {
    this.updateStatus("Cleared");
  }

  /**
   * Mark cheque as bounced
   */
  markAsBounced() {
    this.updateStatus("Bounced");
  }

  /**
   * Mark cheque as processing
   */
  markAsProcessing() {
    this.updateStatus("Processing");
  }

  /**
   * Cancel cheque
   */
  cancel() {
    this.updateStatus("Cancelled");
  }

  /**
   * Get cheque summary
   */
  getSummary() {
    return {
      id: this.id,
      chequeNumber: this.chequeNumber,
      amount: this.amount,
      bankName: this.bankName,
      status: this.status,
      dueDate: this.dueDate,
      isOverdue: this.isOverdue(),
      daysUntilDue: this.getDaysUntilDue(),
      daysOverdue: this.getDaysOverdue(),
    };
  }

  /**
   * Convert to plain object
   */
  toJSON() {
    return {
      id: this.id,
      chequeNumber: this.chequeNumber,
      amount: this.amount,
      bankName: this.bankName,
      branchName: this.branchName,
      accountNumber: this.accountNumber,
      issueDate: this.issueDate,
      dueDate: this.dueDate,
      status: this.status,
      customer: this.customer,
      invoice: this.invoice,
      notes: this.notes,
      imageUrl: this.imageUrl,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
