export class MarkOverdueInvoicesUseCase {
    constructor(invoiceRepository, notificationService, auditService) {
        this.invoiceRepository = invoiceRepository;
        this.notificationService = notificationService;
        this.auditService = auditService;
    }
    async execute(userId, userName) {
        try {
            // Mark overdue invoices
            const overdueInvoices = await this.invoiceRepository.markOverdueInvoices();
            // Send notifications for overdue invoices
            for (const invoice of overdueInvoices) {
                const message = `Invoice ${invoice.invoiceNumber} is overdue. Please take action.`;
                await this.notificationService.sendNotification({
                    senderId: userId,
                    message,
                });
                // Log audit for each overdue invoice
                await this.auditService.logAction({
                    userId,
                    action: "Mark Invoice as Overdue",
                    userName,
                    entity: "Invoice",
                    entityId: invoice.id,
                    oldValue: { status: "Pending" },
                    newValue: { status: "Overdue" },
                });
            }
            return {
                message: `${overdueInvoices.length} invoices marked as overdue`,
                overdueCount: overdueInvoices.length,
                invoices: overdueInvoices,
            };
        }
        catch (error) {
            throw error;
        }
    }
}
//# sourceMappingURL=MarkOverdueInvoicesUseCase.js.map