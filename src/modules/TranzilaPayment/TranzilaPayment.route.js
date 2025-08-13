import { Router } from "express";
import { auth } from "../../midlleWare/auth.js";
import { validation } from "../../midlleWare/validation.js";
import { endPoints } from "./TranzilaPayment.endpoints.js";
import * as tranzilaPaymentController from "./controller/TranzilaPayment.controller.js";
import {
  createDirectPaymentValidation,
  getPaymentStatusValidation,
  refundDirectPaymentValidation,
  getPaymentHistoryValidation,
} from "./TranzilaPayment.validation.js";

const tranzilaPaymentRouter = Router();

// Create direct payment
tranzilaPaymentRouter.post(
  "/create",
  auth(endPoints.createDirectPayment),
  validation(createDirectPaymentValidation),
  tranzilaPaymentController.createDirectPayment
);

// Get payment status
tranzilaPaymentRouter.get(
  "/status/:paymentId",
  auth(endPoints.getPaymentStatus),
  validation(getPaymentStatusValidation),
  tranzilaPaymentController.getPaymentStatus
);

// Refund direct payment
tranzilaPaymentRouter.patch(
  "/refund/:paymentId",
  auth(endPoints.refundDirectPayment),
  validation(refundDirectPaymentValidation),
  tranzilaPaymentController.refundDirectPayment
);

// Get payment history
tranzilaPaymentRouter.get(
  "/history",
  auth(endPoints.getPaymentHistory),
  validation(getPaymentHistoryValidation),
  tranzilaPaymentController.getPaymentHistory
);

export default tranzilaPaymentRouter;
