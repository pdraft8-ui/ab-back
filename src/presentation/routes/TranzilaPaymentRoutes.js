import { Router } from "express";
import { auth } from "../../midlleWare/auth.js";
import { validation } from "../../midlleWare/validation.js";
import { endPoints } from "../../modules/TranzilaPayment/TranzilaPayment.endpoints.js";
import {
  createDirectPaymentValidation,
  getPaymentStatusValidation,
  refundDirectPaymentValidation,
  getPaymentHistoryValidation,
} from "../../modules/TranzilaPayment/TranzilaPayment.validation.js";
import container from "../../infrastructure/config/container.js";

const router = Router();

// Get controller from container
const tranzilaPaymentController = container.getTranzilaPaymentController();

// Create direct payment
router.post(
  "/create",
  auth(endPoints.createDirectPayment),
  validation(createDirectPaymentValidation),
  tranzilaPaymentController.createDirectPayment.bind(tranzilaPaymentController)
);

// Get payment status
router.get(
  "/status/:paymentId",
  auth(endPoints.getPaymentStatus),
  validation(getPaymentStatusValidation),
  tranzilaPaymentController.getPaymentStatus.bind(tranzilaPaymentController)
);

// Refund direct payment
router.patch(
  "/refund/:paymentId",
  auth(endPoints.refundDirectPayment),
  validation(refundDirectPaymentValidation),
  tranzilaPaymentController.refundPayment.bind(tranzilaPaymentController)
);

// Get payment history
router.get(
  "/history",
  auth(endPoints.getPaymentHistory),
  validation(getPaymentHistoryValidation),
  tranzilaPaymentController.getPaymentHistory.bind(tranzilaPaymentController)
);

export default router;
