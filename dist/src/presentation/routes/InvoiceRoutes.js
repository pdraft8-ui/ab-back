import { Router } from "express";
import { auth } from "../../midlleWare/auth.js";
import { validation } from "../../midlleWare/validation.js";
import { endPoints } from "../../modules/Invoice/Invoice.endpoints.js";
import { createInvoiceValidation, updateInvoiceValidation, getInvoicesValidation, getInvoiceStatsValidation, } from "../../modules/Invoice/Invoice.validation.js";
import container from "../../infrastructure/config/container.js";
const router = Router();
const invoiceController = container.getInvoiceController();
// Create invoice
router.post("/create", auth(endPoints.createInvoice), validation(createInvoiceValidation), invoiceController.createInvoice.bind(invoiceController));
// Get all invoices with filters
router.get("/all", auth(endPoints.getAllInvoices), validation(getInvoicesValidation), invoiceController.getAllInvoices.bind(invoiceController));
// Get invoice by ID
router.get("/:id", auth(endPoints.getInvoiceById), invoiceController.getInvoiceById.bind(invoiceController));
// Update invoice
router.patch("/:id", auth(endPoints.updateInvoice), validation(updateInvoiceValidation), invoiceController.updateInvoice.bind(invoiceController));
// Delete invoice
router.delete("/:id", auth(endPoints.deleteInvoice), invoiceController.deleteInvoice.bind(invoiceController));
// Get invoices by customer
router.get("/customer/:customerId", auth(endPoints.getInvoicesByCustomer), validation(getInvoicesValidation), invoiceController.getInvoicesByCustomer.bind(invoiceController));
// Get invoice statistics
router.get("/stats/overview", auth(endPoints.getInvoiceStats), validation(getInvoiceStatsValidation), invoiceController.getInvoiceStats.bind(invoiceController));
// Mark overdue invoices
router.post("/mark-overdue", auth(endPoints.markOverdueInvoices), invoiceController.markOverdueInvoices.bind(invoiceController));
export default router;
//# sourceMappingURL=InvoiceRoutes.js.map