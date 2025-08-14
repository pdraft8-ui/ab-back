export class Payment {
    constructor({ id, paymentNumber, invoiceId, customerId, paymentMethod, paymentAmount, paymentDate, notes, referenceNumber, status, createdBy, updatedBy, createdAt, updatedAt, }: {
        id: any;
        paymentNumber: any;
        invoiceId: any;
        customerId: any;
        paymentMethod: any;
        paymentAmount: any;
        paymentDate: any;
        notes: any;
        referenceNumber: any;
        status: any;
        createdBy: any;
        updatedBy: any;
        createdAt: any;
        updatedAt: any;
    });
    id: any;
    paymentNumber: any;
    invoiceId: any;
    customerId: any;
    paymentMethod: any;
    paymentAmount: any;
    paymentDate: any;
    notes: any;
    referenceNumber: any;
    status: any;
    createdBy: any;
    updatedBy: any;
    createdAt: any;
    updatedAt: any;
    isCompleted(): boolean;
    isPending(): boolean;
    isFailed(): boolean;
    canBeRefunded(): boolean;
    markAsCompleted(): void;
    markAsFailed(): void;
    validateAmount(amount: any): boolean;
    generatePaymentNumber(): string;
    toJSON(): {
        id: any;
        paymentNumber: any;
        invoiceId: any;
        customerId: any;
        paymentMethod: any;
        paymentAmount: any;
        paymentDate: any;
        notes: any;
        referenceNumber: any;
        status: any;
        createdBy: any;
        updatedBy: any;
        createdAt: any;
        updatedAt: any;
    };
}
//# sourceMappingURL=Payment.entity.d.ts.map