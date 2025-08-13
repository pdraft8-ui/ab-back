import { Router } from "express";
import { auth } from "../../midlleWare/auth.js";
import { validation } from "../../midlleWare/validation.js";
import { endPoints } from "./Payment.endpoints.js";
import * as paymentController from "./controller/Payment.controller.js";
import {
  createPaymentValidation,
  updatePaymentValidation,
  getPaymentsValidation,
  getPaymentStatsValidation,
  refundPaymentValidation,
} from "./Payment.validation.js";

const paymentRouter = Router();

// Create payment
paymentRouter.post(
  "/create",
  auth(endPoints.createPayment),
  validation(createPaymentValidation),
  paymentController.createPayment
);

// Get all payments with filters and pagination
paymentRouter.get(
  "/all",
  auth(endPoints.getAllPayments),
  validation(getPaymentsValidation),
  paymentController.getAllPayments
);

// Get payment by ID
paymentRouter.get(
  "/:id",
  auth(endPoints.getPaymentById),
  paymentController.getPaymentById
);

// Update payment
paymentRouter.patch(
  "/:id",
  auth(endPoints.updatePayment),
  validation(updatePaymentValidation),
  paymentController.updatePayment
);

// Delete payment
paymentRouter.delete(
  "/:id",
  auth(endPoints.deletePayment),
  paymentController.deletePayment
);

// Get payments by customer
paymentRouter.get(
  "/customer/:customerId",
  auth(endPoints.getPaymentsByCustomer),
  paymentController.getPaymentsByCustomer
);

// Get payments by invoice
paymentRouter.get(
  "/invoice/:invoiceId",
  auth(endPoints.getPaymentsByInvoice),
  paymentController.getPaymentsByInvoice
);

// Get payment statistics
paymentRouter.get(
  "/stats/overview",
  auth(endPoints.getPaymentStats),
  validation(getPaymentStatsValidation),
  paymentController.getPaymentStats
);

// Refund payment
paymentRouter.patch(
  "/:id/refund",
  auth(endPoints.refundPayment),
  validation(refundPaymentValidation),
  paymentController.refundPayment
);

export default paymentRouter;
