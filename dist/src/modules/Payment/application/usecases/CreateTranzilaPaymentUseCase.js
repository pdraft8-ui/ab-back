import { TranzilaPayment } from "../../domain/entities/TranzilaPayment.entity.js";
export class CreateTranzilaPaymentUseCase {
    constructor(paymentRepository, tranzilaService, invoiceRepository, customerRepository, notificationService) {
        this.paymentRepository = paymentRepository;
        this.tranzilaService = tranzilaService;
        this.invoiceRepository = invoiceRepository;
        this.customerRepository = customerRepository;
        this.notificationService = notificationService;
    }
    async execute(paymentData, userId) {
        try {
            // Validate input data
            if (!paymentData.invoiceId ||
                !paymentData.customerId ||
                !paymentData.amount) {
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
            if (paymentData.amount > invoice.balanceDue) {
                throw new Error("Payment amount cannot exceed invoice balance");
            }
            // Create Tranzila payment entity
            const tranzilaPayment = new TranzilaPayment({
                ...paymentData,
                paymentId: this.generatePaymentId(),
                status: "pending",
                createdBy: userId,
                updatedBy: userId,
            });
            // Call Tranzila service to create payment
            const tranzilaResponse = await this.tranzilaService.createPayment({
                amount: paymentData.amount,
                currency: paymentData.currency || "ILS",
                description: paymentData.description ||
                    `Payment for invoice ${paymentData.invoiceId}`,
                customerEmail: paymentData.customerEmail,
                customerPhone: paymentData.customerPhone,
                returnUrl: paymentData.returnUrl,
                cancelUrl: paymentData.cancelUrl,
            });
            // Update payment with Tranzila response
            tranzilaPayment.tranzilaTransactionId = tranzilaResponse.transactionId;
            tranzilaPayment.tranzilaResponse = tranzilaResponse;
            tranzilaPayment.paymentUrl = tranzilaResponse.paymentUrl;
            // Save payment to database
            const createdPayment = await this.paymentRepository.createTranzilaPayment(tranzilaPayment.toJSON());
            // Send notification
            await this.notificationService.sendNotification({
                type: "TRANZILA_PAYMENT_CREATED",
                userId: customer.id,
                title: "Tranzila Payment Created",
                message: `Tranzila payment of ${paymentData.amount} has been created for invoice ${paymentData.invoiceId}`,
                data: {
                    paymentId: createdPayment.id,
                    invoiceId: paymentData.invoiceId,
                    amount: paymentData.amount,
                    paymentUrl: tranzilaResponse.paymentUrl,
                },
            });
            return createdPayment;
        }
        catch (error) {
            throw new Error(`Failed to create Tranzila payment: ${error.message}`);
        }
    }
    generatePaymentId() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `TZ-${timestamp}-${random}`;
    }
}
//# sourceMappingURL=CreateTranzilaPaymentUseCase.js.map