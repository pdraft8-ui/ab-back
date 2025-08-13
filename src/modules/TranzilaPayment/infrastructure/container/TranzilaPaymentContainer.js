import { CreateTranzilaPaymentUseCase } from "../../application/usecases/CreateTranzilaPaymentUseCase.js";
import { MongoTranzilaPaymentRepository } from "../repositories/MongoTranzilaPaymentRepository.js";
import { TranzilaPaymentController } from "../../presentation/controllers/TranzilaPaymentController.js";
import { TranzilaPaymentRoutes } from "../../presentation/routes/TranzilaPaymentRoutes.js";

// Import external services from global infrastructure
import { TranzilaService } from "../../../../infrastructure/external/TranzilaService.js";
import { NotificationService } from "../../../../infrastructure/services/NotificationService.js";
import { MongoInvoiceRepository } from "../../../../infrastructure/database/MongoInvoiceRepository.js";
import { MongoCustomerRepository } from "../../../../infrastructure/database/MongoCustomerRepository.js";

export class TranzilaPaymentContainer {
  constructor() {
    this.services = new Map();
    this.initializeServices();
  }

  initializeServices() {
    // Initialize repositories
    this.services.set(
      "tranzilaPaymentRepository",
      new MongoTranzilaPaymentRepository()
    );
    this.services.set("invoiceRepository", new MongoInvoiceRepository());
    this.services.set("customerRepository", new MongoCustomerRepository());

    // Initialize external services
    this.services.set("tranzilaService", new TranzilaService());
    this.services.set("notificationService", new NotificationService());

    // Initialize use cases
    this.services.set(
      "createTranzilaPaymentUseCase",
      new CreateTranzilaPaymentUseCase(
        this.services.get("tranzilaPaymentRepository"),
        this.services.get("tranzilaService"),
        this.services.get("invoiceRepository"),
        this.services.get("customerRepository"),
        this.services.get("notificationService")
      )
    );

    // Initialize controllers
    this.services.set(
      "tranzilaPaymentController",
      new TranzilaPaymentController(
        this.services.get("createTranzilaPaymentUseCase"),
        this.services.get("tranzilaPaymentRepository"),
        this.services.get("tranzilaService"),
        this.services.get("notificationService")
      )
    );

    // Initialize routes
    this.services.set(
      "tranzilaPaymentRoutes",
      new TranzilaPaymentRoutes(this.services.get("tranzilaPaymentController"))
    );
  }

  getTranzilaPaymentRepository() {
    return this.services.get("tranzilaPaymentRepository");
  }

  getTranzilaService() {
    return this.services.get("tranzilaService");
  }

  getNotificationService() {
    return this.services.get("notificationService");
  }

  getCreateTranzilaPaymentUseCase() {
    return this.services.get("createTranzilaPaymentUseCase");
  }

  getTranzilaPaymentController() {
    return this.services.get("tranzilaPaymentController");
  }

  getTranzilaPaymentRoutes() {
    return this.services.get("tranzilaPaymentRoutes");
  }

  getAllServices() {
    return this.services;
  }
}

// Create a minimal container for testing with mock services
export class TranzilaPaymentContainerMinimal {
  constructor() {
    this.services = new Map();
    this.initializeMockServices();
  }

  initializeMockServices() {
    // Mock repositories
    const mockTranzilaPaymentRepository = {
      createTranzilaPayment: async (data) =>
        new (
          await import("../../domain/entities/TranzilaPayment.entity.js")
        ).TranzilaPayment(data),
      findTranzilaPaymentByPaymentId: async (id) =>
        new (
          await import("../../domain/entities/TranzilaPayment.entity.js")
        ).TranzilaPayment({ id, paymentId: id }),
      updateTranzilaPayment: async (id, data) =>
        new (
          await import("../../domain/entities/TranzilaPayment.entity.js")
        ).TranzilaPayment({ id, ...data }),
      getAllTranzilaPayments: async () => [],
    };

    const mockInvoiceRepository = {
      findById: async (id) => ({
        id,
        invoiceNumber: "INV-001",
        balanceDue: 1000,
      }),
    };

    const mockCustomerRepository = {
      findById: async (id) => ({
        id,
        name: "Test Customer",
        email: "test@example.com",
        phone: "123456789",
      }),
    };

    // Mock external services
    const mockTranzilaService = {
      createPayment: async (data) => ({
        success: true,
        paymentUrl: "https://test.com",
        data: {},
      }),
      checkPaymentStatus: async (id) => ({
        success: true,
        status: "approved",
        transactionId: "TXN-001",
      }),
      processRefund: async (id, amount, reason) => ({
        success: true,
        data: {},
      }),
    };

    const mockNotificationService = {
      sendPaymentCreatedNotification: async (payment, invoice, customer) =>
        true,
      sendRefundNotification: async (payment, amount, reason) => true,
    };

    this.services.set(
      "tranzilaPaymentRepository",
      mockTranzilaPaymentRepository
    );
    this.services.set("invoiceRepository", mockInvoiceRepository);
    this.services.set("customerRepository", mockCustomerRepository);
    this.services.set("tranzilaService", mockTranzilaService);
    this.services.set("notificationService", mockNotificationService);

    // Initialize use cases with mock services
    this.services.set(
      "createTranzilaPaymentUseCase",
      new CreateTranzilaPaymentUseCase(
        this.services.get("tranzilaPaymentRepository"),
        this.services.get("tranzilaService"),
        this.services.get("invoiceRepository"),
        this.services.get("customerRepository"),
        this.services.get("notificationService")
      )
    );

    // Initialize controllers with mock services
    this.services.set(
      "tranzilaPaymentController",
      new TranzilaPaymentController(
        this.services.get("createTranzilaPaymentUseCase"),
        this.services.get("tranzilaPaymentRepository"),
        this.services.get("tranzilaService"),
        this.services.get("notificationService")
      )
    );

    // Initialize routes
    this.services.set(
      "tranzilaPaymentRoutes",
      new TranzilaPaymentRoutes(this.services.get("tranzilaPaymentController"))
    );
  }

  getTranzilaPaymentRepository() {
    return this.services.get("tranzilaPaymentRepository");
  }

  getTranzilaService() {
    return this.services.get("tranzilaService");
  }

  getNotificationService() {
    return this.services.get("notificationService");
  }

  getCreateTranzilaPaymentUseCase() {
    return this.services.get("createTranzilaPaymentUseCase");
  }

  getTranzilaPaymentController() {
    return this.services.get("tranzilaPaymentController");
  }

  getTranzilaPaymentRoutes() {
    return this.services.get("tranzilaPaymentRoutes");
  }

  getAllServices() {
    return this.services;
  }
}
