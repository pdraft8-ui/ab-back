import { MongoPaymentRepository } from "../database/MongoPaymentRepository.js";
import { MongoInvoiceRepository } from "../database/MongoInvoiceRepository.js";
import { MongoCustomerRepository } from "../database/MongoCustomerRepository.js";
import { TranzilaService } from "../external/TranzilaService.js";
import { NotificationService } from "../services/NotificationService.js";
import { AuditService } from "../services/AuditService.js";
// Use Cases
import { CreateTranzilaPaymentUseCase } from "../../core/usecases/CreateTranzilaPaymentUseCase.js";
import { CreatePaymentUseCase } from "../../core/usecases/CreatePaymentUseCase.js";
import { GetAllPaymentsUseCase } from "../../core/usecases/GetAllPaymentsUseCase.js";
import { RefundPaymentUseCase } from "../../core/usecases/RefundPaymentUseCase.js";
// Invoice Use Cases
import { CreateInvoiceUseCase } from "../../core/usecases/CreateInvoiceUseCase.js";
import { GetAllInvoicesUseCase } from "../../core/usecases/GetAllInvoicesUseCase.js";
import { UpdateInvoiceUseCase } from "../../core/usecases/UpdateInvoiceUseCase.js";
import { GetInvoiceStatsUseCase } from "../../core/usecases/GetInvoiceStatsUseCase.js";
import { MarkOverdueInvoicesUseCase } from "../../core/usecases/MarkOverdueInvoicesUseCase.js";
// Customer Use Cases
import { CreateCustomerUseCase } from "../../core/usecases/CreateCustomerUseCase.js";
import { GetAllCustomersUseCase } from "../../core/usecases/GetAllCustomersUseCase.js";
import { UpdateCustomerUseCase } from "../../core/usecases/UpdateCustomerUseCase.js";
import { DeleteCustomerUseCase } from "../../core/usecases/DeleteCustomerUseCase.js";
import { AddVehicleToCustomerUseCase } from "../../core/usecases/AddVehicleToCustomerUseCase.js";
import { GetCustomerStatsUseCase } from "../../core/usecases/GetCustomerStatsUseCase.js";
// Controllers
import { TranzilaPaymentController } from "../../presentation/controllers/TranzilaPaymentController.js";
import { PaymentController } from "../../presentation/controllers/PaymentController.js";
import { InvoiceController } from "../../presentation/controllers/InvoiceController.js";
import { CustomerController } from "../../presentation/controllers/CustomerController.js";
class Container {
    constructor() {
        this.services = new Map();
        this.initializeServices();
    }
    initializeServices() {
        // Infrastructure Layer - Repositories
        this.services.set("paymentRepository", new MongoPaymentRepository());
        this.services.set("invoiceRepository", new MongoInvoiceRepository());
        this.services.set("customerRepository", new MongoCustomerRepository());
        // Infrastructure Layer - External Services
        this.services.set("tranzilaService", new TranzilaService());
        // Infrastructure Layer - Internal Services
        this.services.set("notificationService", new NotificationService());
        this.services.set("auditService", new AuditService());
        // Use Cases
        this.services.set("createTranzilaPaymentUseCase", new CreateTranzilaPaymentUseCase(this.services.get("paymentRepository"), this.services.get("tranzilaService"), this.services.get("invoiceRepository"), this.services.get("customerRepository"), this.services.get("notificationService")));
        this.services.set("createPaymentUseCase", new CreatePaymentUseCase(this.services.get("paymentRepository"), this.services.get("invoiceRepository"), this.services.get("customerRepository"), this.services.get("notificationService"), this.services.get("auditService")));
        this.services.set("getAllPaymentsUseCase", new GetAllPaymentsUseCase(this.services.get("paymentRepository")));
        this.services.set("refundPaymentUseCase", new RefundPaymentUseCase(this.services.get("paymentRepository"), this.services.get("invoiceRepository"), this.services.get("notificationService"), this.services.get("auditService")));
        // Invoice Use Cases
        this.services.set("createInvoiceUseCase", new CreateInvoiceUseCase(this.services.get("invoiceRepository"), this.services.get("customerRepository"), this.services.get("notificationService"), this.services.get("auditService")));
        this.services.set("getAllInvoicesUseCase", new GetAllInvoicesUseCase(this.services.get("invoiceRepository")));
        this.services.set("updateInvoiceUseCase", new UpdateInvoiceUseCase(this.services.get("invoiceRepository"), this.services.get("auditService")));
        this.services.set("getInvoiceStatsUseCase", new GetInvoiceStatsUseCase(this.services.get("invoiceRepository")));
        this.services.set("markOverdueInvoicesUseCase", new MarkOverdueInvoicesUseCase(this.services.get("invoiceRepository"), this.services.get("notificationService"), this.services.get("auditService")));
        // Customer Use Cases
        this.services.set("createCustomerUseCase", new CreateCustomerUseCase(this.services.get("customerRepository"), this.services.get("notificationService"), this.services.get("auditService")));
        this.services.set("getAllCustomersUseCase", new GetAllCustomersUseCase(this.services.get("customerRepository")));
        this.services.set("updateCustomerUseCase", new UpdateCustomerUseCase(this.services.get("customerRepository"), this.services.get("auditService")));
        this.services.set("deleteCustomerUseCase", new DeleteCustomerUseCase(this.services.get("customerRepository"), this.services.get("auditService")));
        this.services.set("addVehicleToCustomerUseCase", new AddVehicleToCustomerUseCase(this.services.get("customerRepository"), this.services.get("auditService")));
        this.services.set("getCustomerStatsUseCase", new GetCustomerStatsUseCase(this.services.get("customerRepository")));
        // Controllers
        this.services.set("tranzilaPaymentController", new TranzilaPaymentController(this.services.get("createTranzilaPaymentUseCase"), this.services.get("paymentRepository"), this.services.get("tranzilaService"), this.services.get("notificationService")));
        this.services.set("paymentController", new PaymentController(this.services.get("createPaymentUseCase"), this.services.get("getAllPaymentsUseCase"), this.services.get("refundPaymentUseCase"), this.services.get("paymentRepository")));
        this.services.set("invoiceController", new InvoiceController(this.services.get("createInvoiceUseCase"), this.services.get("getAllInvoicesUseCase"), this.services.get("updateInvoiceUseCase"), this.services.get("getInvoiceStatsUseCase"), this.services.get("markOverdueInvoicesUseCase"), this.services.get("invoiceRepository")));
        this.services.set("customerController", new CustomerController(this.services.get("createCustomerUseCase"), this.services.get("getAllCustomersUseCase"), this.services.get("updateCustomerUseCase"), this.services.get("deleteCustomerUseCase"), this.services.get("addVehicleToCustomerUseCase"), this.services.get("getCustomerStatsUseCase"), this.services.get("customerRepository")));
    }
    get(serviceName) {
        const service = this.services.get(serviceName);
        if (!service) {
            throw new Error(`Service '${serviceName}' not found in container`);
        }
        return service;
    }
    // Helper methods for Tranzila Payment
    getTranzilaPaymentController() {
        return this.get("tranzilaPaymentController");
    }
    getCreateTranzilaPaymentUseCase() {
        return this.get("createTranzilaPaymentUseCase");
    }
    getTranzilaService() {
        return this.get("tranzilaService");
    }
    // Helper methods for Payment
    getPaymentController() {
        return this.get("paymentController");
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
    getPaymentRepository() {
        return this.get("paymentRepository");
    }
    getInvoiceRepository() {
        return this.get("invoiceRepository");
    }
    getCustomerRepository() {
        return this.get("customerRepository");
    }
    getNotificationService() {
        return this.get("notificationService");
    }
    getAuditService() {
        return this.get("auditService");
    }
    // Invoice Module
    getInvoiceController() {
        return this.get("invoiceController");
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
    // Customer Module
    getCustomerController() {
        return this.get("customerController");
    }
    getCreateCustomerUseCase() {
        return this.get("createCustomerUseCase");
    }
    getGetAllCustomersUseCase() {
        return this.get("getAllCustomersUseCase");
    }
    getUpdateCustomerUseCase() {
        return this.get("updateCustomerUseCase");
    }
    getDeleteCustomerUseCase() {
        return this.get("deleteCustomerUseCase");
    }
    getAddVehicleToCustomerUseCase() {
        return this.get("addVehicleToCustomerUseCase");
    }
    getGetCustomerStatsUseCase() {
        return this.get("getCustomerStatsUseCase");
    }
}
// Create singleton instance
const container = new Container();
export default container;
//# sourceMappingURL=container.js.map