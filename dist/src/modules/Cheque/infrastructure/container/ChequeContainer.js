/**
 * Cheque Container
 * Manages dependencies for the Cheque module
 */
import { MongoChequeRepository } from "../repositories/MongoChequeRepository.js";
import { MongoCustomerRepository } from "../../../Customer/infrastructure/repositories/MongoCustomerRepository.js";
import { MongoInvoiceRepository } from "../../../Invoice/infrastructure/repositories/MongoInvoiceRepository.js";
import { AuditService } from "../../../../infrastructure/services/AuditService.js";
import { CreateChequeUseCase } from "../../application/usecases/CreateChequeUseCase.js";
import { GetAllChequesUseCase } from "../../application/usecases/GetAllChequesUseCase.js";
import { ChequeController } from "../../presentation/controllers/ChequeController.js";
import { ChequeRoutes } from "../../presentation/routes/ChequeRoutes.js";
export class ChequeContainer {
    constructor() {
        this.services = new Map();
        this.initializeServices();
    }
    initializeServices() {
        // Initialize repositories
        this.services.set("chequeRepository", new MongoChequeRepository());
        this.services.set("customerRepository", new MongoCustomerRepository());
        this.services.set("invoiceRepository", new MongoInvoiceRepository());
        // Initialize services
        this.services.set("auditService", new AuditService());
        // Initialize use cases
        this.services.set("createChequeUseCase", new CreateChequeUseCase(this.services.get("chequeRepository"), this.services.get("customerRepository"), this.services.get("invoiceRepository"), this.services.get("auditService")));
        this.services.set("getAllChequesUseCase", new GetAllChequesUseCase(this.services.get("chequeRepository")));
        // Initialize controller
        this.services.set("chequeController", new ChequeController(this.services.get("createChequeUseCase"), this.services.get("getAllChequesUseCase")));
        // Initialize routes
        this.services.set("chequeRoutes", new ChequeRoutes(this.services.get("chequeController")));
    }
    // Getter methods for services
    getChequeRepository() {
        return this.services.get("chequeRepository");
    }
    getCustomerRepository() {
        return this.services.get("customerRepository");
    }
    getInvoiceRepository() {
        return this.services.get("invoiceRepository");
    }
    getAuditService() {
        return this.services.get("auditService");
    }
    // Getter methods for use cases
    getCreateChequeUseCase() {
        return this.services.get("createChequeUseCase");
    }
    getAllChequesUseCase() {
        return this.services.get("getAllChequesUseCase");
    }
    // Getter methods for presentation layer
    getChequeController() {
        return this.services.get("chequeController");
    }
    getChequeRoutes() {
        return this.services.get("chequeRoutes");
    }
    // Get all services (for testing)
    getAllServices() {
        return this.services;
    }
}
//# sourceMappingURL=ChequeContainer.js.map