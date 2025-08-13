import { Router } from "express";
import { auth } from "../../midlleWare/auth.js";
import { validation } from "../../midlleWare/validation.js";
import { endPoints } from "./cheque.endpoints.js";
import * as chequeController from "./controller/cheque.controller.js";
import {
  createChequeValidation,
  updateChequeValidation,
  getChequeFiltersValidation,
  chequeIdValidation,
  bulkUpdateChequeValidation,
} from "./cheque.validation.js";
import { myMulterAllFiles } from "../../Servicess/multer.js";

const chequeRouter = Router();

// Create a new cheque
chequeRouter.post(
  "/create",
  auth(endPoints.createCheque),
  myMulterAllFiles("cheques").single("chequeImage"),
  validation(createChequeValidation),
  chequeController.createCheque
);

// Get all cheques with filters
chequeRouter.get(
  "/",
  auth(endPoints.getAllCheques),
  validation(getChequeFiltersValidation, "query"),
  chequeController.getAllCheques
);

// Get cheques for specific customer
chequeRouter.get(
  "/customer/:customerId",
  auth(endPoints.getCustomerCheques),
  validation(getChequeFiltersValidation, "query"),
  chequeController.getCustomerCheques
);

// Get cheque by ID
chequeRouter.get(
  "/:chequeId",
  auth(endPoints.getChequeById),
  validation(chequeIdValidation, "params"),
  chequeController.getChequeById
);

// Update cheque
chequeRouter.put(
  "/:chequeId",
  auth(endPoints.updateCheque),
  myMulterAllFiles("cheques").single("chequeImage"),
  validation(chequeIdValidation, "params"),
  validation(updateChequeValidation),
  chequeController.updateCheque
);

// Delete cheque
chequeRouter.delete(
  "/:chequeId",
  auth(endPoints.deleteCheque),
  validation(chequeIdValidation, "params"),
  chequeController.deleteCheque
);

// Bulk update cheque status
chequeRouter.patch(
  "/bulk-update-status",
  auth(endPoints.bulkUpdateChequeStatus),
  validation(bulkUpdateChequeValidation),
  chequeController.bulkUpdateChequeStatus
);

// Get cheque statistics
chequeRouter.get(
  "/statistics/overview",
  auth(endPoints.getChequeStatistics),
  chequeController.getChequeStatistics
);

export default chequeRouter;
