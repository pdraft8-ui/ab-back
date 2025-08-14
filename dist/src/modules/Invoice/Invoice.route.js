import { Router } from "express";
import { auth } from "../../midlleWare/auth.js";
import { validation } from "../../midlleWare/validation.js";
import { endPoints } from "./Invoice.endpoints.js";
import * as invoiceController from "./controller/Invoice.controller.js";
import { createInvoiceValidation, updateInvoiceValidation, getInvoicesValidation, getInvoiceStatsValidation, } from "./Invoice.validation.js";
const invoiceRouter = Router();
// Create invoice
invoiceRouter.post("/create", auth(endPoints.createInvoice), validation(createInvoiceValidation), invoiceController.createInvoice);
// Get all invoices with filters and pagination
invoiceRouter.get("/all", auth(endPoints.getAllInvoices), validation(getInvoicesValidation), invoiceController.getAllInvoices);
// Get invoice by ID with payment history
invoiceRouter.get("/:id", auth(endPoints.getInvoiceById), invoiceController.getInvoiceById);
// Update invoice
invoiceRouter.patch("/:id", auth(endPoints.updateInvoice), validation(updateInvoiceValidation), invoiceController.updateInvoice);
// Delete invoice
invoiceRouter.delete("/:id", auth(endPoints.deleteInvoice), invoiceController.deleteInvoice);
// Get invoices by customer
invoiceRouter.get("/customer/:customerId", auth(endPoints.getInvoicesByCustomer), invoiceController.getInvoicesByCustomer);
// Get invoice statistics
invoiceRouter.get("/stats/overview", auth(endPoints.getInvoiceStats), validation(getInvoiceStatsValidation), invoiceController.getInvoiceStats);
// Mark overdue invoices
invoiceRouter.patch("/mark-overdue", auth(endPoints.markOverdueInvoices), invoiceController.markOverdueInvoices);
export default invoiceRouter;
//# sourceMappingURL=Invoice.route.js.map