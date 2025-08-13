import { Router } from "express";
import { auth } from "../../../../midlleWare/auth.js";
import { validation } from "../../../../midlleWare/validation.js";
import { AuditController } from "../controllers/AuditController.js";

export class AuditRoutes {
  constructor(auditController) {
    this.router = Router();
    this.auditController = auditController;
    this.setupRoutes();
  }

  setupRoutes() {
    // Log an action
    this.router.post(
      "/log",
      auth(["admin", "manager"]),
      this.auditController.logAction.bind(this.auditController)
    );

    // Get all audit logs with filters
    this.router.get(
      "/logs",
      auth(["admin", "manager"]),
      this.auditController.getAuditLogs.bind(this.auditController)
    );

    // Get audit log by ID
    this.router.get(
      "/logs/:id",
      auth(["admin", "manager"]),
      this.auditController.getAuditLogById.bind(this.auditController)
    );

    // Get audit logs by user
    this.router.get(
      "/logs/user/:userId",
      auth(["admin", "manager"]),
      this.auditController.getAuditLogsByUser.bind(this.auditController)
    );

    // Get audit logs by entity
    this.router.get(
      "/logs/entity/:entity/:entityId",
      auth(["admin", "manager"]),
      this.auditController.getAuditLogsByEntity.bind(this.auditController)
    );

    // Get audit statistics
    this.router.get(
      "/stats",
      auth(["admin"]),
      this.auditController.getAuditStats.bind(this.auditController)
    );
  }

  getRouter() {
    return this.router;
  }
}
