import { Payment } from "../entities/Payment.entity.js";

export class CreatePaymentUseCase {
  constructor(
    paymentRepository,
    invoiceRepository,
    customerRepository,
    notificationService,
    auditService
  ) {
    this.paymentRepository = paymentRepository;
    this.invoiceRepository = invoiceRepository;
    this.customerRepository = customerRepository;
    this.notificationService = notificationService;
    this.auditService = auditService;
  }

  async execute(paymentData, userId, userName) {
    try {
      // Validate input
      this.validateInput(paymentData);

      // Check if invoice exists and get its details
      const invoice = await this.invoiceRepository.getInvoiceById(
        paymentData.invoiceId
      );
      if (!invoice) {
        throw new Error("Invoice not found");
      }

      // Check if customer exists
      const customer = await this.customerRepository.getCustomerById(
        paymentData.customerId
      );
      if (!customer) {
        throw new Error("Customer not found");
      }

      // Validate payment amount against invoice balance
      const currentBalance = await this.invoiceRepository.getInvoiceBalance(
        paymentData.invoiceId
      );
      if (paymentData.paymentAmount > currentBalance) {
        throw new Error(
          `Payment amount (${paymentData.paymentAmount}) exceeds remaining balance (${currentBalance})`
        );
      }

      if (currentBalance <= 0) {
        throw new Error("Invoice is already fully paid");
      }

      // Create payment entity
      const payment = new Payment({
        invoiceId: paymentData.invoiceId,
        customerId: paymentData.customerId,
        paymentMethod: paymentData.paymentMethod,
        paymentAmount: paymentData.paymentAmount,
        paymentDate: paymentData.paymentDate || new Date(),
        notes: paymentData.notes,
        referenceNumber: paymentData.referenceNumber,
        createdBy: userId,
      });

      // Validate payment entity
      if (!payment.validateAmount()) {
        throw new Error("Payment amount must be positive");
      }

      if (!payment.validatePaymentMethod()) {
        throw new Error("Invalid payment method");
      }

      // Save payment to repository
      const savedPayment = await this.paymentRepository.createPayment(
        payment.toJSON()
      );

      // Update invoice balance
      const newBalance = Math.max(
        0,
        currentBalance - paymentData.paymentAmount
      );
      await this.invoiceRepository.updateInvoiceBalance(
        paymentData.invoiceId,
        newBalance
      );

      // Send notification
      if (this.notificationService) {
        const message = `${userName} recorded payment ${savedPayment.paymentNumber} for invoice ${invoice.invoiceNumber} - Amount: ${paymentData.paymentAmount}`;
        await this.notificationService.sendNotification({
          senderId: userId,
          message,
        });
      }

      // Log audit
      if (this.auditService) {
        await this.auditService.logAction({
          userId,
          action: `Create Payment by ${userName}`,
          userName,
          entity: "Payment",
          entityId: savedPayment.id,
          newValue: savedPayment,
        });
      }

      return savedPayment;
    } catch (error) {
      throw error;
    }
  }

  validateInput(paymentData) {
    if (!paymentData.invoiceId) {
      throw new Error("Invoice ID is required");
    }
    if (!paymentData.customerId) {
      throw new Error("Customer ID is required");
    }
    if (!paymentData.paymentMethod) {
      throw new Error("Payment method is required");
    }
    if (!paymentData.paymentAmount || paymentData.paymentAmount <= 0) {
      throw new Error("Payment amount must be positive");
    }
  }
}
