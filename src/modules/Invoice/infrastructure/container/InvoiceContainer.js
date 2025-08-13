import { MongoInvoiceRepository } from "../repositories/MongoInvoiceRepository.js";
import { CreateInvoiceUseCase } from "../../application/usecases/CreateInvoiceUseCase.js";
import { GetAllInvoicesUseCase } from "../../application/usecases/GetAllInvoicesUseCase.js";
import { UpdateInvoiceUseCase } from "../../application/usecases/UpdateInvoiceUseCase.js";
import { GetInvoiceStatsUseCase } from "../../application/usecases/GetInvoiceStatsUseCase.js";
import { MarkOverdueInvoicesUseCase } from "../../application/usecases/MarkOverdueInvoicesUseCase.js";
import { InvoiceController } from "../../presentation/controllers/InvoiceController.js";
import { InvoiceRoutes } from "../../presentation/routes/InvoiceRoutes.js";

// Mock services for testing
class MockNotificationService {
  async sendNotification(data) {
    console.log("Mock notification sent:", data);
    return true;
  }
}

class MockAuditService {
  async logAction(data) {
    console.log("Mock audit logged:", data);
    return true;
  }
}

class MockCustomerRepository {
  async getCustomerById(id) {
    return {
      id,
      firstName: "Mock",
      lastName: "Customer",
      email: "mock@example.com",
    };
  }
}

export class InvoiceContainer {
  constructor() {
    this.services = new Map();
    this.initializeServices();
  }

  initializeServices() {
    // Initialize repositories
    this.services.set("invoiceRepository", new MongoInvoiceRepository());

    // Initialize mock services
    this.services.set("notificationService", new MockNotificationService());
    this.services.set("auditService", new MockAuditService());
    this.services.set("customerRepository", new MockCustomerRepository());

    // Initialize use cases
    this.services.set(
      "createInvoiceUseCase",
      new CreateInvoiceUseCase(
        this.get("invoiceRepository"),
        this.get("customerRepository"),
        this.get("notificationService"),
        this.get("auditService")
      )
    );

    this.services.set(
      "getAllInvoicesUseCase",
      new GetAllInvoicesUseCase(this.get("invoiceRepository"))
    );

    this.services.set(
      "updateInvoiceUseCase",
      new UpdateInvoiceUseCase(
        this.get("invoiceRepository"),
        this.get("auditService")
      )
    );

    this.services.set(
      "getInvoiceStatsUseCase",
      new GetInvoiceStatsUseCase(this.get("invoiceRepository"))
    );

    this.services.set(
      "markOverdueInvoicesUseCase",
      new MarkOverdueInvoicesUseCase(
        this.get("invoiceRepository"),
        this.get("notificationService"),
        this.get("auditService")
      )
    );

    // Initialize controllers
    this.services.set(
      "invoiceController",
      new InvoiceController(
        this.get("createInvoiceUseCase"),
        this.get("getAllInvoicesUseCase"),
        this.get("updateInvoiceUseCase"),
        this.get("getInvoiceStatsUseCase"),
        this.get("markOverdueInvoicesUseCase"),
        this.get("invoiceRepository")
      )
    );

    // Initialize routes
    this.services.set(
      "invoiceRoutes",
      new InvoiceRoutes(this.get("invoiceController"))
    );
  }

  get(serviceName) {
    return this.services.get(serviceName);
  }

  // Getters for easy access
  getInvoiceRepository() {
    return this.get("invoiceRepository");
  }

  getCreateInvoiceUseCase() {
    return this.get("createInvoiceUseCase");
  }

  getGetAllInvoicesUseCase() {
    return this.get("getAllInvoicesUseCase");
  }

  getUpdateInvoiceUseCase() {
    return this.get("updateInvoiceUseCase");
  }

  getGetInvoiceStatsUseCase() {
    return this.get("getInvoiceStatsUseCase");
  }

  getMarkOverdueInvoicesUseCase() {
    return this.get("markOverdueInvoicesUseCase");
  }

  getInvoiceController() {
    return this.get("invoiceController");
  }

  getInvoiceRoutes() {
    return this.get("invoiceRoutes");
  }
}

// Create and export a singleton instance
const invoiceContainer = new InvoiceContainer();
export default invoiceContainer;
