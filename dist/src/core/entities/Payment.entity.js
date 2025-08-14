export class Payment {
    constructor({ id, paymentNumber, invoiceId, customerId, paymentMethod, paymentAmount, paymentDate, notes, referenceNumber, status, createdBy, updatedBy, createdAt, updatedAt, }) {
        this.id = id;
        this.paymentNumber = paymentNumber;
        this.invoiceId = invoiceId;
        this.customerId = customerId;
        this.paymentMethod = paymentMethod;
        this.paymentAmount = paymentAmount;
        this.paymentDate = paymentDate;
        this.notes = notes;
        this.referenceNumber = referenceNumber;
        this.status = status || "Completed";
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    // Business logic methods
    isCompleted() {
        return this.status === "Completed";
    }
    isPending() {
        return this.status === "Pending";
    }
    isFailed() {
        return this.status === "Failed";
    }
    isRefunded() {
        return this.status === "Refunded";
    }
    canBeRefunded() {
        return this.isCompleted() && this.paymentAmount > 0;
    }
    validateAmount() {
        return this.paymentAmount > 0;
    }
    validatePaymentMethod() {
        const validMethods = [
            "Cash",
            "Credit Card",
            "Bank Transfer",
            "Check",
            "Online Payment",
        ];
        return validMethods.includes(this.paymentMethod);
    }
    markAsCompleted() {
        this.status = "Completed";
        this.updatedAt = new Date();
    }
    markAsFailed() {
        this.status = "Failed";
        this.updatedAt = new Date();
    }
    markAsRefunded() {
        this.status = "Refunded";
        this.updatedAt = new Date();
    }
    generatePaymentNumber(invoiceNumber, paymentCount) {
        return `${invoiceNumber}#${paymentCount + 1}`;
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
    static fromJSON(data) {
        return new Payment(data);
    }
}
//# sourceMappingURL=Payment.entity.js.map