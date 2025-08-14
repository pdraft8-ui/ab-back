import { MongoPaymentRepository } from "../repositories/MongoPaymentRepository.js";
import { CreatePaymentUseCase } from "../../application/usecases/CreatePaymentUseCase.js";
import { GetAllPaymentsUseCase } from "../../application/usecases/GetAllPaymentsUseCase.js";
import { RefundPaymentUseCase } from "../../application/usecases/RefundPaymentUseCase.js";
import { CreateTranzilaPaymentUseCase } from "../../application/usecases/CreateTranzilaPaymentUseCase.js";
import { PaymentController } from "../../presentation/controllers/PaymentController.js";
import { PaymentRoutes } from "../../presentation/routes/PaymentRoutes.js";
// Import external dependencies (these would be injected from the main container)
import { TranzilaService } from "../../../../infrastructure/external/TranzilaService.js";
import { NotificationService } from "../../../../infrastructure/services/NotificationService.js";
import { AuditService } from "../../../../infrastructure/services/AuditService.js";
import { MongoInvoiceRepository } from "../../../../infrastructure/database/MongoInvoiceRepository.js";
import { MongoCustomerRepository } from "../../../../infrastructure/database/MongoCustomerRepository.js";
export class PaymentContainer {
    constructor() {
        this.services = new Map();
        this.initializeServices();
    }
    initializeServices() {
        // Initialize repositories
        this.services.set("paymentRepository", new MongoPaymentRepository());
        // Initialize external services (these would be injected from main container)
        this.services.set("tranzilaService", new TranzilaService());
        this.services.set("notificationService", new NotificationService());
        this.services.set("auditService", new AuditService());
        this.services.set("invoiceRepository", new MongoInvoiceRepository());
        this.services.set("customerRepository", new MongoCustomerRepository());
        // Initialize use cases
        this.services.set("createPaymentUseCase", new CreatePaymentUseCase(this.get("paymentRepository"), this.get("invoiceRepository"), this.get("customerRepository"), this.get("notificationService"), this.get("auditService")));
        this.services.set("getAllPaymentsUseCase", new GetAllPaymentsUseCase(this.get("paymentRepository")));
        this.services.set("refundPaymentUseCase", new RefundPaymentUseCase(this.get("paymentRepository"), this.get("invoiceRepository"), this.get("notificationService"), this.get("auditService")));
        this.services.set("createTranzilaPaymentUseCase", new CreateTranzilaPaymentUseCase(this.get("paymentRepository"), this.get("tranzilaService"), this.get("invoiceRepository"), this.get("customerRepository"), this.get("notificationService")));
        // Initialize controllers
        this.services.set("paymentController", new PaymentController(this.get("createPaymentUseCase"), this.get("getAllPaymentsUseCase"), this.get("refundPaymentUseCase"), this.get("paymentRepository")));
        // Initialize routes
        this.services.set("paymentRoutes", new PaymentRoutes(this.get("paymentController")));
    }
    get(serviceName) {
        return this.services.get(serviceName);
    }
    // Getters for easy access
    getPaymentRepository() {
        return this.get("paymentRepository");
    }
    getCreatePaymentUseCase() {
        return this.get("createPaymentUseCase");
    }
    getGetAllPaymentsUseCase() {
        return this.get("getAllPaymentsUseCase");
    }
    getRefundPaymentUseCase() {
        return this.get("refundPaymentUseCase");
    }
    getCreateTranzilaPaymentUseCase() {
        return this.get("createTranzilaPaymentUseCase");
    }
    getPaymentController() {
        return this.get("paymentController");
    }
    getPaymentRoutes() {
        return this.get("paymentRoutes");
    }
}
// Create and export a singleton instance
const paymentContainer = new PaymentContainer();
export default paymentContainer;
//# sourceMappingURL=PaymentContainer.js.map