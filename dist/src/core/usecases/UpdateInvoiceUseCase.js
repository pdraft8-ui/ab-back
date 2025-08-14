import { Invoice } from "../entities/Invoice.entity.js";
export class UpdateInvoiceUseCase {
    constructor(invoiceRepository, auditService) {
        this.invoiceRepository = invoiceRepository;
        this.auditService = auditService;
    }
    async execute(invoiceId, updateData, userId, userName) {
        try {
            // Get existing invoice
            const existingInvoice = await this.invoiceRepository.getInvoiceById(invoiceId);
            if (!existingInvoice) {
                throw new Error("Invoice not found");
            }
            // Check if invoice can be updated
            if (!existingInvoice.canBeUpdated()) {
                throw new Error("Invoice cannot be updated in its current status");
            }
            // Validate update data
            this.validateUpdateData(updateData);
            // Store old values for audit
            const oldValues = existingInvoice.toJSON();
            // Update invoice fields
            if (updateData.totalAmount !== undefined) {
                existingInvoice.totalAmount = updateData.totalAmount;
                // Recalculate balance if total amount changed
                const paidAmount = oldValues.totalAmount - oldValues.balanceDue;
                existingInvoice.balanceDue = Math.max(0, updateData.totalAmount - paidAmount);
            }
            if (updateData.description !== undefined) {
                existingInvoice.description = updateData.description;
            }
            if (updateData.notes !== undefined) {
                existingInvoice.notes = updateData.notes;
            }
            if (updateData.dueDate !== undefined) {
                existingInvoice.dueDate = new Date(updateData.dueDate);
            }
            if (updateData.status !== undefined) {
                existingInvoice.status = updateData.status;
            }
            // Update status based on business rules
            existingInvoice.updateStatus();
            // Set updated by
            existingInvoice.updatedBy = userId;
            existingInvoice.updatedAt = new Date();
            // Save updated invoice
            const updatedInvoice = await this.invoiceRepository.updateInvoice(invoiceId, existingInvoice);
            // Log audit
            await this.auditService.logAction({
                userId,
                action: "Update Invoice",
                userName,
                entity: "Invoice",
                entityId: invoiceId,
                oldValue: oldValues,
                newValue: updatedInvoice.toJSON(),
            });
            return updatedInvoice;
        }
        catch (error) {
            throw error;
        }
    }
    validateUpdateData(updateData) {
        if (updateData.totalAmount !== undefined && updateData.totalAmount <= 0) {
            throw new Error("Total amount must be positive");
        }
        if (updateData.status !== undefined &&
            !["Pending", "Partially Paid", "Paid", "Overdue"].includes(updateData.status)) {
            throw new Error("Invalid status");
        }
        if (updateData.dueDate !== undefined) {
            const dueDate = new Date(updateData.dueDate);
            if (isNaN(dueDate.getTime())) {
                throw new Error("Invalid due date");
            }
        }
    }
}
//# sourceMappingURL=UpdateInvoiceUseCase.js.map