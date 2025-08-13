import { Router } from "express";
import { auth } from "../../../../midlleWare/auth.js";
import { validation } from "../../../../midlleWare/validation.js";
import { endPoints } from "../../Invoice.endpoints.js";
import {
  createInvoiceValidation,
  updateInvoiceValidation,
  getInvoicesValidation,
  getInvoiceStatsValidation,
} from "../../Invoice.validation.js";
import { InvoiceController } from "../controllers/InvoiceController.js";

export class InvoiceRoutes {
  constructor(invoiceController) {
    this.invoiceController = invoiceController;
    this.router = Router();
    this.setupRoutes();
  }

  setupRoutes() {
    // Create invoice
    this.router.post(
      "/create",
      auth(endPoints.createInvoice),
      validation(createInvoiceValidation),
      this.invoiceController.createInvoice.bind(this.invoiceController)
    );

    // Get all invoices with filters
    this.router.get(
      "/all",
      auth(endPoints.getAllInvoices),
      validation(getInvoicesValidation),
      this.invoiceController.getAllInvoices.bind(this.invoiceController)
    );

    // Get invoice by ID
    this.router.get(
      "/:id",
      auth(endPoints.getInvoiceById),
      this.invoiceController.getInvoiceById.bind(this.invoiceController)
    );

    // Update invoice
    this.router.patch(
      "/:id",
      auth(endPoints.updateInvoice),
      validation(updateInvoiceValidation),
      this.invoiceController.updateInvoice.bind(this.invoiceController)
    );

    // Delete invoice
    this.router.delete(
      "/:id",
      auth(endPoints.deleteInvoice),
      this.invoiceController.deleteInvoice.bind(this.invoiceController)
    );

    // Get invoices by customer
    this.router.get(
      "/customer/:customerId",
      auth(endPoints.getInvoicesByCustomer),
      validation(getInvoicesValidation),
      this.invoiceController.getInvoicesByCustomer.bind(this.invoiceController)
    );

    // Get invoice statistics
    this.router.get(
      "/stats/overview",
      auth(endPoints.getInvoiceStats),
      validation(getInvoiceStatsValidation),
      this.invoiceController.getInvoiceStats.bind(this.invoiceController)
    );

    // Mark overdue invoices
    this.router.post(
      "/mark-overdue",
      auth(endPoints.markOverdueInvoices),
      this.invoiceController.markOverdueInvoices.bind(this.invoiceController)
    );
  }

  getRouter() {
    return this.router;
  }
}
