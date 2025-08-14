import { MongoCustomerRepository } from "../repositories/MongoCustomerRepository.js";
import { CreateCustomerUseCase } from "../../application/usecases/CreateCustomerUseCase.js";
import { GetAllCustomersUseCase } from "../../application/usecases/GetAllCustomersUseCase.js";
import { UpdateCustomerUseCase } from "../../application/usecases/UpdateCustomerUseCase.js";
import { DeleteCustomerUseCase } from "../../application/usecases/DeleteCustomerUseCase.js";
import { AddVehicleToCustomerUseCase } from "../../application/usecases/AddVehicleToCustomerUseCase.js";
import { GetCustomerStatsUseCase } from "../../application/usecases/GetCustomerStatsUseCase.js";
import { CustomerController } from "../../presentation/controllers/CustomerController.js";
import { CustomerRoutes } from "../../presentation/routes/CustomerRoutes.js";
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
export class CustomerContainer {
    constructor() {
        this.services = new Map();
        this.initializeServices();
    }
    initializeServices() {
        // Initialize repositories
        this.services.set("customerRepository", new MongoCustomerRepository());
        // Initialize mock services
        this.services.set("notificationService", new MockNotificationService());
        this.services.set("auditService", new MockAuditService());
        // Initialize use cases
        this.services.set("createCustomerUseCase", new CreateCustomerUseCase(this.get("customerRepository"), this.get("notificationService"), this.get("auditService")));
        this.services.set("getAllCustomersUseCase", new GetAllCustomersUseCase(this.get("customerRepository")));
        this.services.set("updateCustomerUseCase", new UpdateCustomerUseCase(this.get("customerRepository"), this.get("auditService")));
        this.services.set("deleteCustomerUseCase", new DeleteCustomerUseCase(this.get("customerRepository"), this.get("auditService")));
        this.services.set("addVehicleToCustomerUseCase", new AddVehicleToCustomerUseCase(this.get("customerRepository"), this.get("auditService")));
        this.services.set("getCustomerStatsUseCase", new GetCustomerStatsUseCase(this.get("customerRepository")));
        // Initialize controllers
        this.services.set("customerController", new CustomerController(this.get("createCustomerUseCase"), this.get("getAllCustomersUseCase"), this.get("updateCustomerUseCase"), this.get("deleteCustomerUseCase"), this.get("addVehicleToCustomerUseCase"), this.get("getCustomerStatsUseCase"), this.get("customerRepository")));
        // Initialize routes
        this.services.set("customerRoutes", new CustomerRoutes(this.get("customerController")));
    }
    get(serviceName) {
        return this.services.get(serviceName);
    }
    // Getters for easy access
    getCustomerRepository() {
        return this.get("customerRepository");
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
    getCustomerController() {
        return this.get("customerController");
    }
    getCustomerRoutes() {
        return this.get("customerRoutes");
    }
}
// Create and export a singleton instance
const customerContainer = new CustomerContainer();
export default customerContainer;
//# sourceMappingURL=CustomerContainer.js.map