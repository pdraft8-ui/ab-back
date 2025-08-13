import express from "express";
import * as chequeController from "./controller/cheque.controller.js";
import { auth } from "../../midlleWare/auth.js";

const router = express.Router();

router.post("/", auth, chequeController.createCheque);
router.get("/", auth, chequeController.getAllCheques);
router.get("/:id", auth, chequeController.getChequeById);
router.put("/:id", auth, chequeController.updateCheque);
router.delete("/:id", auth, chequeController.deleteCheque);
router.get("/customer/:customerId", auth, chequeController.getCustomerCheques);

export default router;
