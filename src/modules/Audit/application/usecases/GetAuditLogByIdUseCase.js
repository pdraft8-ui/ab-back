export class GetAuditLogByIdUseCase {
  constructor(auditService) {
    this.auditService = auditService;
  }

  async execute(id) {
    try {
      if (!id) {
        throw new Error("Audit log ID is required");
      }

      const auditLog = await this.auditService.getAuditLogById(id);

      if (!auditLog) {
        throw new Error("Audit log not found");
      }

      return auditLog;
    } catch (error) {
      console.error("Failed to get audit log by ID:", error);
      throw error;
    }
  }
}
