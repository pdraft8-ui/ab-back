import { Payment } from "../../domain/entities/Payment.entity.js";
export class CreatePaymentUseCase {
    constructor(paymentRepository, invoiceRepository, customerRepository, notificationService, auditService) {
        this.paymentRepository = paymentRepository;
        this.invoiceRepository = invoiceRepository;
        this.customerRepository = customerRepository;
        this.notificationService = notificationService;
        this.auditService = auditService;
    }
    async execute(paymentData, userId, userName) {
        try {
            // Validate input data
            if (!paymentData.invoiceId ||
                !paymentData.customerId ||
                !paymentData.paymentAmount) {
                throw new Error("Missing required payment data");
            }
            // Check if invoice exists
            const invoice = await this.invoiceRepository.getInvoiceById(paymentData.invoiceId);
            if (!invoice) {
                throw new Error("Invoice not found");
            }
            // Check if customer exists
            const customer = await this.customerRepository.getCustomerById(paymentData.customerId);
            if (!customer) {
                throw new Error("Customer not found");
            }
            // Validate payment amount against invoice balance
            if (paymentData.paymentAmount > invoice.balanceDue) {
                throw new Error("Payment amount cannot exceed invoice balance");
            }
            // Create payment entity
            const payment = new Payment({
                ...paymentData,
                paymentNumber: this.generatePaymentNumber(),
                status: "Pending",
                createdBy: userId,
                updatedBy: userId,
            });
            // Save payment
            const createdPayment = await this.paymentRepository.createPayment(payment.toJSON());
            // Update invoice balance
            await this.invoiceRepository.updateInvoiceBalance(paymentData.invoiceId, paymentData.paymentAmount);
            // Log audit
            await this.auditService.logAction({
                userId,
                userName,
                action: "CREATE_PAYMENT",
                entity: "Payment",
                entityId: createdPayment.id,
                oldValue: null,
                newValue: createdPayment,
            });
            // Send notification
            await this.notificationService.sendNotification({
                type: "PAYMENT_CREATED",
                userId: customer.id,
                title: "Payment Created",
                message: `Payment of ${paymentData.paymentAmount} has been created for invoice ${paymentData.invoiceId}`,
                data: {
                    paymentId: createdPayment.id,
                    invoiceId: paymentData.invoiceId,
                    amount: paymentData.paymentAmount,
                },
            });
            return createdPayment;
        }
        catch (error) {
            throw new Error(`Failed to create payment: ${error.message}`);
        }
    }
    generatePaymentNumber() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `PAY-${timestamp}-${random}`;
    }
}
//# sourceMappingURL=CreatePaymentUseCase.js.map