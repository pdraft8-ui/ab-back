import { Router } from "express";
import { auth } from "../../../../midlleWare/auth.js";
import { validation } from "../../../../midlleWare/validation.js";
import { endPoints } from "../../Payment.endpoints.js";
import {
  createPaymentValidation,
  getPaymentsValidation,
  updatePaymentValidation,
  refundPaymentValidation,
} from "../../Payment.validation.js";
import { PaymentController } from "../controllers/PaymentController.js";

export class PaymentRoutes {
  constructor(paymentController) {
    this.paymentController = paymentController;
    this.router = Router();
    this.setupRoutes();
  }

  setupRoutes() {
    // Create payment
    this.router.post(
      "/create",
      auth(endPoints.createPayment),
      validation(createPaymentValidation),
      this.paymentController.createPayment.bind(this.paymentController)
    );

    // Get all payments
    this.router.get(
      "/all",
      auth(endPoints.getAllPayments),
      validation(getPaymentsValidation),
      this.paymentController.getAllPayments.bind(this.paymentController)
    );

    // Get payment by ID
    this.router.get(
      "/:id",
      auth(endPoints.getPaymentById),
      this.paymentController.getPaymentById.bind(this.paymentController)
    );

    // Update payment
    this.router.patch(
      "/:id",
      auth(endPoints.updatePayment),
      validation(updatePaymentValidation),
      this.paymentController.updatePayment.bind(this.paymentController)
    );

    // Delete payment
    this.router.delete(
      "/:id",
      auth(endPoints.deletePayment),
      this.paymentController.deletePayment.bind(this.paymentController)
    );

    // Get payments by customer
    this.router.get(
      "/customer/:customerId",
      auth(endPoints.getPaymentsByCustomer),
      this.paymentController.getPaymentsByCustomer.bind(this.paymentController)
    );

    // Get payments by invoice
    this.router.get(
      "/invoice/:invoiceId",
      auth(endPoints.getPaymentsByInvoice),
      this.paymentController.getPaymentsByInvoice.bind(this.paymentController)
    );

    // Get payment statistics
    this.router.get(
      "/stats",
      auth(endPoints.getPaymentStats),
      this.paymentController.getPaymentStats.bind(this.paymentController)
    );

    // Refund payment
    this.router.post(
      "/:id/refund",
      auth(endPoints.refundPayment),
      validation(refundPaymentValidation),
      this.paymentController.refundPayment.bind(this.paymentController)
    );
  }

  getRouter() {
    return this.router;
  }
}
