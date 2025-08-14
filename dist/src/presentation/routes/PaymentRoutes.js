import { Router } from "express";
import { auth } from "../../midlleWare/auth.js";
import { validation } from "../../midlleWare/validation.js";
import { endPoints } from "../../modules/Payment/Payment.endpoints.js";
import { createPaymentValidation, updatePaymentValidation, getPaymentsValidation, getPaymentStatsValidation, refundPaymentValidation, } from "../../modules/Payment/Payment.validation.js";
import container from "../../infrastructure/config/container.js";
const router = Router();
const paymentController = container.getPaymentController();
// Create payment
router.post("/create", auth(endPoints.createPayment), validation(createPaymentValidation), paymentController.createPayment.bind(paymentController));
// Get all payments with filters and pagination
router.get("/all", auth(endPoints.getAllPayments), validation(getPaymentsValidation), paymentController.getAllPayments.bind(paymentController));
// Get payment by ID
router.get("/:id", auth(endPoints.getPaymentById), paymentController.getPaymentById.bind(paymentController));
// Update payment
router.patch("/:id", auth(endPoints.updatePayment), validation(updatePaymentValidation), paymentController.updatePayment.bind(paymentController));
// Delete payment
router.delete("/:id", auth(endPoints.deletePayment), paymentController.deletePayment.bind(paymentController));
// Get payments by customer
router.get("/customer/:customerId", auth(endPoints.getPaymentsByCustomer), paymentController.getPaymentsByCustomer.bind(paymentController));
// Get payments by invoice
router.get("/invoice/:invoiceId", auth(endPoints.getPaymentsByInvoice), paymentController.getPaymentsByInvoice.bind(paymentController));
// Get payment statistics
router.get("/stats/overview", auth(endPoints.getPaymentStats), validation(getPaymentStatsValidation), paymentController.getPaymentStats.bind(paymentController));
// Refund payment
router.patch("/:id/refund", auth(endPoints.refundPayment), validation(refundPaymentValidation), paymentController.refundPayment.bind(paymentController));
export default router;
//# sourceMappingURL=PaymentRoutes.js.map