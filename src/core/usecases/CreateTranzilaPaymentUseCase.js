import { TranzilaPayment } from "../entities/TranzilaPayment.entity.js";

export class CreateTranzilaPaymentUseCase {
  constructor(
    paymentRepository,
    tranzilaService,
    invoiceRepository,
    customerRepository,
    notificationService
  ) {
    this.paymentRepository = paymentRepository;
    this.tranzilaService = tranzilaService;
    this.invoiceRepository = invoiceRepository;
    this.customerRepository = customerRepository;
    this.notificationService = notificationService;
  }

  async execute(paymentData, userId) {
    try {
      // 1. Validate input data
      const validationResult = this.validateInput(paymentData);
      if (!validationResult.isValid) {
        throw new Error(validationResult.error);
      }

      // 2. Check if invoice exists and is valid
      const invoice = await this.invoiceRepository.findById(
        paymentData.invoiceId
      );
      if (!invoice) {
        throw new Error("Invoice not found");
      }

      // 3. Check if customer exists
      const customer = await this.customerRepository.findById(
        paymentData.customerId
      );
      if (!customer) {
        throw new Error("Customer not found");
      }

      // 4. Validate payment amount
      if (paymentData.amount > invoice.balanceDue) {
        throw new Error(
          `Payment amount (${paymentData.amount}) exceeds remaining balance (${invoice.balanceDue})`
        );
      }

      if (invoice.balanceDue <= 0) {
        throw new Error("Invoice is already fully paid");
      }

      // 5. Create Tranzila payment entity
      const tranzilaPayment = new TranzilaPayment({
        invoiceId: paymentData.invoiceId,
        customerId: paymentData.customerId,
        amount: paymentData.amount,
        currency: paymentData.currency || "ILS",
        description:
          paymentData.description ||
          `Payment for invoice ${invoice.invoiceNumber}`,
        customerEmail: paymentData.customerEmail || customer.email,
        customerPhone: paymentData.customerPhone || customer.phone,
        returnUrl:
          paymentData.returnUrl ||
          `${process.env.FRONTEND_URL}/payment/success`,
        cancelUrl:
          paymentData.cancelUrl || `${process.env.FRONTEND_URL}/payment/cancel`,
        createdBy: userId,
        status: "pending",
      });

      // 6. Generate payment ID
      tranzilaPayment.generatePaymentId();

      // 7. Save to database
      const savedPayment = await this.paymentRepository.createTranzilaPayment(
        tranzilaPayment
      );

      // 8. Create payment with Tranzila
      const tranzilaRequest = this.buildTranzilaRequest(
        savedPayment,
        invoice,
        customer
      );
      const tranzilaResponse = await this.tranzilaService.createPayment(
        tranzilaRequest
      );

      // 9. Update payment with Tranzila response
      if (tranzilaResponse.success) {
        savedPayment.paymentUrl = tranzilaResponse.paymentUrl;
        savedPayment.tranzilaResponse = tranzilaResponse.data;
        await this.paymentRepository.updateTranzilaPayment(savedPayment.id, {
          paymentUrl: savedPayment.paymentUrl,
          tranzilaResponse: savedPayment.tranzilaResponse,
        });

        // 10. Send notification
        await this.notificationService.sendPaymentCreatedNotification(
          savedPayment,
          invoice,
          customer
        );

        return {
          success: true,
          message: "Payment created successfully",
          data: {
            paymentId: savedPayment.paymentId,
            paymentUrl: savedPayment.paymentUrl,
            amount: savedPayment.amount,
            currency: savedPayment.currency,
            status: savedPayment.status,
            invoiceNumber: invoice.invoiceNumber,
            customerName: customer.name,
          },
        };
      } else {
        // Payment creation failed
        savedPayment.markAsFailed(tranzilaResponse.error);
        await this.paymentRepository.updateTranzilaPayment(savedPayment.id, {
          status: savedPayment.status,
          errorMessage: savedPayment.errorMessage,
          failedAt: savedPayment.failedAt,
          tranzilaResponse: tranzilaResponse.data,
        });

        throw new Error(`Failed to create payment: ${tranzilaResponse.error}`);
      }
    } catch (error) {
      throw new Error(`Create payment failed: ${error.message}`);
    }
  }

  validateInput(paymentData) {
    const requiredFields = ["invoiceId", "customerId", "amount"];

    for (const field of requiredFields) {
      if (!paymentData[field]) {
        return { isValid: false, error: `${field} is required` };
      }
    }

    if (paymentData.amount <= 0) {
      return { isValid: false, error: "Amount must be positive" };
    }

    if (
      paymentData.currency &&
      !["ILS", "USD", "EUR"].includes(paymentData.currency)
    ) {
      return { isValid: false, error: "Invalid currency" };
    }

    return { isValid: true };
  }

  buildTranzilaRequest(payment, invoice, customer) {
    return {
      supplier: process.env.TRANZILA_SUPPLIER_ID,
      terminal: process.env.TRANZILA_TERMINAL_ID,
      password: process.env.TRANZILA_PASSWORD,
      sum: payment.amount,
      currency: payment.currency,
      payment_simple: "1",
      payment_type: "1",
      ccno: "",
      expmonth: "",
      expyear: "",
      myid: payment.paymentId,
      cred_type: "1",
      tranmode: "1",
      oref: invoice.invoiceNumber,
      uref: customer.name,
      lang: "he",
      email: payment.customerEmail,
      phone: payment.customerPhone,
      return_url: payment.returnUrl,
      cancel_url: payment.cancelUrl,
    };
  }
}
