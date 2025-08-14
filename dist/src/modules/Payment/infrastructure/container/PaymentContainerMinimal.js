import { MongoPaymentRepository } from "../repositories/MongoPaymentRepository.js";
import { CreatePaymentUseCase } from "../../application/usecases/CreatePaymentUseCase.js";
import { GetAllPaymentsUseCase } from "../../application/usecases/GetAllPaymentsUseCase.js";
import { RefundPaymentUseCase } from "../../application/usecases/RefundPaymentUseCase.js";
import { CreateTranzilaPaymentUseCase } from "../../application/usecases/CreateTranzilaPaymentUseCase.js";
import { PaymentController } from "../../presentation/controllers/PaymentController.js";
import { PaymentRoutes } from "../../presentation/routes/PaymentRoutes.js";
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
class MockTranzilaService {
    async createPayment(data) {
        console.log("Mock Tranzila payment created:", data);
        return {
            transactionId: "mock-transaction-id",
            paymentUrl: "https://mock-payment-url.com",
        };
    }
}
class MockInvoiceRepository {
    async getInvoiceById(id) {
        return {
            id,
            balanceDue: 1000,
            totalAmount: 1000,
        };
    }
    async updateInvoiceBalance(invoiceId, amount) {
        console.log("Mock invoice balance updated:", { invoiceId, amount });
        return true;
    }
}
class MockCustomerRepository {
    async getCustomerById(id) {
        return {
            id,
            name: "Mock Customer",
            email: "mock@example.com",
        };
    }
}
export class PaymentContainerMinimal {
    constructor() {
        this.services = new Map();
        this.initializeServices();
    }
    initializeServices() {
        // Initialize repositories
        this.services.set("paymentRepository", new MongoPaymentRepository());
        // Initialize mock services
        this.services.set("tranzilaService", new MockTranzilaService());
        this.services.set("notificationService", new MockNotificationService());
        this.services.set("auditService", new MockAuditService());
        this.services.set("invoiceRepository", new MockInvoiceRepository());
        this.services.set("customerRepository", new MockCustomerRepository());
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
const paymentContainerMinimal = new PaymentContainerMinimal();
export default paymentContainerMinimal;
//# sourceMappingURL=PaymentContainerMinimal.js.map