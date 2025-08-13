import { Payment } from "../entities/Payment.entity.js";

export class RefundPaymentUseCase {
  constructor(
    paymentRepository,
    invoiceRepository,
    notificationService,
    auditService
  ) {
    this.paymentRepository = paymentRepository;
    this.invoiceRepository = invoiceRepository;
    this.notificationService = notificationService;
    this.auditService = auditService;
  }

  async execute(paymentId, refundData, userId, userName) {
    try {
      // Validate input
      this.validateRefundInput(refundData);

      // Get payment
      const payment = await this.paymentRepository.getPaymentById(paymentId);
      if (!payment) {
        throw new Error("Payment not found");
      }

      // Create payment entity for validation
      const paymentEntity = new Payment(payment);

      // Check if payment can be refunded
      if (!paymentEntity.canBeRefunded()) {
        throw new Error("Payment cannot be refunded");
      }

      // Validate refund amount
      if (refundData.refundAmount > paymentEntity.paymentAmount) {
        throw new Error(
          `Refund amount (${refundData.refundAmount}) cannot exceed original payment amount (${paymentEntity.paymentAmount})`
        );
      }

      // Get invoice for balance update
      const invoice = await this.invoiceRepository.getInvoiceById(
        paymentEntity.invoiceId
      );
      if (!invoice) {
        throw new Error("Invoice not found");
      }

      // Update payment status
      paymentEntity.markAsRefunded();
      paymentEntity.updatedBy = userId;

      // Save updated payment
      const updatedPayment = await this.paymentRepository.updatePayment(
        paymentId,
        paymentEntity.toJSON()
      );

      // Update invoice balance (add back the refunded amount)
      const currentBalance = await this.invoiceRepository.getInvoiceBalance(
        paymentEntity.invoiceId
      );
      const newBalance = currentBalance + refundData.refundAmount;
      await this.invoiceRepository.updateInvoiceBalance(
        paymentEntity.invoiceId,
        newBalance
      );

      // Send notification
      if (this.notificationService) {
        const message = `${userName} refunded payment ${paymentEntity.paymentNumber} - Amount: ${refundData.refundAmount}, Reason: ${refundData.reason}`;
        await this.notificationService.sendNotification({
          senderId: userId,
          message,
        });
      }

      // Log audit
      if (this.auditService) {
        await this.auditService.logAction({
          userId,
          action: `Refund Payment by ${userName}`,
          userName,
          entity: "Payment",
          entityId: paymentId,
          oldValue: payment,
          newValue: updatedPayment,
        });
      }

      return updatedPayment;
    } catch (error) {
      throw error;
    }
  }

  validateRefundInput(refundData) {
    if (!refundData.refundAmount || refundData.refundAmount <= 0) {
      throw new Error("Refund amount must be positive");
    }

    if (!refundData.reason || refundData.reason.trim() === "") {
      throw new Error("Refund reason is required");
    }
  }
}
