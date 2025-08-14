/**
 * Cheque Domain Entity
 * Contains business logic and validation for cheque operations
 */
export class Cheque {
    /**
     * Validate cheque data
     */
    static validate(data: any): {
        isValid: boolean;
        errors: string[];
    };
    constructor({ id, chequeNumber, amount, bankName, branchName, accountNumber, issueDate, dueDate, status, customer, invoice, notes, imageUrl, createdBy, updatedBy, createdAt, updatedAt, }: {
        id: any;
        chequeNumber: any;
        amount: any;
        bankName: any;
        branchName: any;
        accountNumber: any;
        issueDate: any;
        dueDate: any;
        status?: string;
        customer: any;
        invoice: any;
        notes: any;
        imageUrl: any;
        createdBy: any;
        updatedBy: any;
        createdAt: any;
        updatedAt: any;
    });
    id: any;
    chequeNumber: any;
    amount: any;
    bankName: any;
    branchName: any;
    accountNumber: any;
    issueDate: any;
    dueDate: any;
    status: string;
    customer: any;
    invoice: any;
    notes: any;
    imageUrl: any;
    createdBy: any;
    updatedBy: any;
    createdAt: any;
    updatedAt: any;
    /**
     * Check if cheque can be updated
     */
    canBeUpdated(): boolean;
    /**
     * Check if cheque can be deleted
     */
    canBeDeleted(): boolean;
    /**
     * Check if cheque is overdue
     */
    isOverdue(): boolean;
    /**
     * Check if cheque is cleared
     */
    isCleared(): boolean;
    /**
     * Check if cheque is bounced
     */
    isBounced(): boolean;
    /**
     * Get days until due
     */
    getDaysUntilDue(): number;
    /**
     * Get days overdue
     */
    getDaysOverdue(): number;
    /**
     * Update cheque status
     */
    updateStatus(newStatus: any): void;
    /**
     * Mark cheque as cleared
     */
    markAsCleared(): void;
    /**
     * Mark cheque as bounced
     */
    markAsBounced(): void;
    /**
     * Mark cheque as processing
     */
    markAsProcessing(): void;
    /**
     * Cancel cheque
     */
    cancel(): void;
    /**
     * Get cheque summary
     */
    getSummary(): {
        id: any;
        chequeNumber: any;
        amount: any;
        bankName: any;
        status: string;
        dueDate: any;
        isOverdue: boolean;
        daysUntilDue: number;
        daysOverdue: number;
    };
    /**
     * Convert to plain object
     */
    toJSON(): {
        id: any;
        chequeNumber: any;
        amount: any;
        bankName: any;
        branchName: any;
        accountNumber: any;
        issueDate: any;
        dueDate: any;
        status: string;
        customer: any;
        invoice: any;
        notes: any;
        imageUrl: any;
        createdBy: any;
        updatedBy: any;
        createdAt: any;
        updatedAt: any;
    };
}
//# sourceMappingURL=Cheque.entity.d.ts.map