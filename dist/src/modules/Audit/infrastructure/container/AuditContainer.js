import { AuditService } from "../services/AuditService.js";
import { LogActionUseCase } from "../../application/usecases/LogActionUseCase.js";
import { GetAuditLogsUseCase } from "../../application/usecases/GetAuditLogsUseCase.js";
import { GetAuditLogByIdUseCase } from "../../application/usecases/GetAuditLogByIdUseCase.js";
import { GetAuditStatsUseCase } from "../../application/usecases/GetAuditStatsUseCase.js";
import { AuditController } from "../../presentation/controllers/AuditController.js";
import { AuditRoutes } from "../../presentation/routes/AuditRoutes.js";
export class AuditContainer {
    constructor() {
        this.services = new Map();
        this.initializeServices();
    }
    initializeServices() {
        // Infrastructure services
        this.services.set("auditService", new AuditService());
        // Application use cases
        this.services.set("logActionUseCase", new LogActionUseCase(this.services.get("auditService")));
        this.services.set("getAuditLogsUseCase", new GetAuditLogsUseCase(this.services.get("auditService")));
        this.services.set("getAuditLogByIdUseCase", new GetAuditLogByIdUseCase(this.services.get("auditService")));
        this.services.set("getAuditStatsUseCase", new GetAuditStatsUseCase(this.services.get("auditService")));
        // Presentation controllers
        this.services.set("auditController", new AuditController(this.services.get("logActionUseCase"), this.services.get("getAuditLogsUseCase"), this.services.get("getAuditLogByIdUseCase"), this.services.get("getAuditStatsUseCase")));
        // Presentation routes
        this.services.set("auditRoutes", new AuditRoutes(this.services.get("auditController")));
    }
    getAuditService() {
        return this.services.get("auditService");
    }
    getLogActionUseCase() {
        return this.services.get("logActionUseCase");
    }
    getGetAuditLogsUseCase() {
        return this.services.get("getAuditLogsUseCase");
    }
    getGetAuditLogByIdUseCase() {
        return this.services.get("getAuditLogByIdUseCase");
    }
    getGetAuditStatsUseCase() {
        return this.services.get("getAuditStatsUseCase");
    }
    getAuditController() {
        return this.services.get("auditController");
    }
    getAuditRoutes() {
        return this.services.get("auditRoutes");
    }
}
// Minimal container for testing with mock services
export class AuditContainerMinimal {
    constructor() {
        this.services = new Map();
        this.initializeServices();
    }
    initializeServices() {
        // Mock audit service for testing
        const mockAuditService = {
            async logAction(auditData) {
                return {
                    id: "mock-audit-id",
                    user: auditData.userId,
                    action: auditData.action,
                    entity: auditData.entity,
                    entityId: auditData.entityId,
                    oldValue: auditData.oldValue,
                    newValue: auditData.newValue,
                    userName: auditData.userName,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
            },
            async getAuditLogs(filters = {}) {
                return {
                    auditLogs: [
                        {
                            id: "mock-audit-1",
                            user: "user1",
                            action: "CREATE",
                            entity: "Customer",
                            entityId: "customer1",
                            oldValue: null,
                            newValue: { name: "John Doe" },
                            userName: "admin",
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        },
                    ],
                    pagination: {
                        page: 1,
                        limit: 10,
                        total: 1,
                        pages: 1,
                    },
                };
            },
            async getAuditLogById(id) {
                return {
                    id: id,
                    user: "user1",
                    action: "CREATE",
                    entity: "Customer",
                    entityId: "customer1",
                    oldValue: null,
                    newValue: { name: "John Doe" },
                    userName: "admin",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
            },
            async getAuditStats() {
                return {
                    totalLogs: 100,
                    todayLogs: 5,
                    actionStats: [
                        { _id: "CREATE", count: 50 },
                        { _id: "UPDATE", count: 30 },
                        { _id: "DELETE", count: 20 },
                    ],
                    entityStats: [
                        { _id: "Customer", count: 40 },
                        { _id: "Invoice", count: 35 },
                        { _id: "Payment", count: 25 },
                    ],
                    userStats: [
                        { _id: "user1", count: 30 },
                        { _id: "user2", count: 25 },
                        { _id: "user3", count: 20 },
                    ],
                };
            },
        };
        this.services.set("auditService", mockAuditService);
        // Application use cases
        this.services.set("logActionUseCase", new LogActionUseCase(this.services.get("auditService")));
        this.services.set("getAuditLogsUseCase", new GetAuditLogsUseCase(this.services.get("auditService")));
        this.services.set("getAuditLogByIdUseCase", new GetAuditLogByIdUseCase(this.services.get("auditService")));
        this.services.set("getAuditStatsUseCase", new GetAuditStatsUseCase(this.services.get("auditService")));
        // Presentation controllers
        this.services.set("auditController", new AuditController(this.services.get("logActionUseCase"), this.services.get("getAuditLogsUseCase"), this.services.get("getAuditLogByIdUseCase"), this.services.get("getAuditStatsUseCase")));
        // Presentation routes
        this.services.set("auditRoutes", new AuditRoutes(this.services.get("auditController")));
    }
    getAuditService() {
        return this.services.get("auditService");
    }
    getLogActionUseCase() {
        return this.services.get("logActionUseCase");
    }
    getGetAuditLogsUseCase() {
        return this.services.get("getAuditLogsUseCase");
    }
    getGetAuditLogByIdUseCase() {
        return this.services.get("getAuditLogByIdUseCase");
    }
    getGetAuditStatsUseCase() {
        return this.services.get("getAuditStatsUseCase");
    }
    getAuditController() {
        return this.services.get("auditController");
    }
    getAuditRoutes() {
        return this.services.get("auditRoutes");
    }
}
//# sourceMappingURL=AuditContainer.js.map