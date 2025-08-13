import { Router } from "express";
import { auth } from "../../../../midlleWare/auth.js";
import { validation } from "../../../../midlleWare/validation.js";
import { endPoints } from "../../TranzilaPayment.endpoints.js";
import {
  createDirectPaymentValidation,
  getPaymentStatusValidation,
  refundDirectPaymentValidation,
  getPaymentHistoryValidation,
} from "../../TranzilaPayment.validation.js";
import { TranzilaPaymentController } from "../controllers/TranzilaPaymentController.js";

export class TranzilaPaymentRoutes {
  constructor(tranzilaPaymentController) {
    this.router = Router();
    this.tranzilaPaymentController = tranzilaPaymentController;
    this.setupRoutes();
  }

  setupRoutes() {
    // Create direct payment
    this.router.post(
      "/create",
      auth(endPoints.createDirectPayment),
      validation(createDirectPaymentValidation),
      this.tranzilaPaymentController.createDirectPayment.bind(
        this.tranzilaPaymentController
      )
    );

    // Get payment status
    this.router.get(
      "/status/:paymentId",
      auth(endPoints.getPaymentStatus),
      validation(getPaymentStatusValidation),
      this.tranzilaPaymentController.getPaymentStatus.bind(
        this.tranzilaPaymentController
      )
    );

    // Refund direct payment
    this.router.patch(
      "/refund/:paymentId",
      auth(endPoints.refundDirectPayment),
      validation(refundDirectPaymentValidation),
      this.tranzilaPaymentController.refundPayment.bind(
        this.tranzilaPaymentController
      )
    );

    // Get payment history
    this.router.get(
      "/history",
      auth(endPoints.getPaymentHistory),
      validation(getPaymentHistoryValidation),
      this.tranzilaPaymentController.getPaymentHistory.bind(
        this.tranzilaPaymentController
      )
    );
  }

  getRouter() {
    return this.router;
  }
}
