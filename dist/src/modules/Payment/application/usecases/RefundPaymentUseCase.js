import { Payment } from "../../domain/entities/Payment.entity.js";
export class RefundPaymentUseCase {
    constructor(paymentRepository, invoiceRepository, notificationService, auditService) {
        this.paymentRepository = paymentRepository;
        this.invoiceRepository = invoiceRepository;
        this.notificationService = notificationService;
        this.auditService = auditService;
    }
    async execute(paymentId, refundData, userId, userName) {
        try {
            // Get existing payment
            const existingPayment = await this.paymentRepository.getPaymentById(paymentId);
            if (!existingPayment) {
                throw new Error("Payment not found");
            }
            // Create payment entity to validate refund
            const payment = new Payment(existingPayment);
            if (!payment.canBeRefunded()) {
                throw new Error("Payment cannot be refunded");
            }
            // Validate refund amount
            if (refundData.refundAmount > payment.paymentAmount) {
                throw new Error("Refund amount cannot exceed payment amount");
            }
            // Update payment with refund information
            const updatedPayment = await this.paymentRepository.refundPayment(paymentId, {
                ...refundData,
                status: "Refunded",
                updatedBy: userId,
            });
            // Update invoice balance (add back the refunded amount)
            await this.invoiceRepository.updateInvoiceBalance(payment.invoiceId, -refundData.refundAmount);
            // Log audit
            await this.auditService.logAction({
                userId,
                userName,
                action: "REFUND_PAYMENT",
                entity: "Payment",
                entityId: paymentId,
                oldValue: existingPayment,
                newValue: updatedPayment,
            });
            // Send notification
            await this.notificationService.sendNotification({
                type: "PAYMENT_REFUNDED",
                userId: payment.customerId,
                title: "Payment Refunded",
                message: `Payment ${payment.paymentNumber} has been refunded for ${refundData.refundAmount}`,
                data: {
                    paymentId,
                    refundAmount: refundData.refundAmount,
                    refundReason: refundData.refundReason,
                },
            });
            return updatedPayment;
        }
        catch (error) {
            throw new Error(`Failed to refund payment: ${error.message}`);
        }
    }
}
//# sourceMappingURL=RefundPaymentUseCase.js.map