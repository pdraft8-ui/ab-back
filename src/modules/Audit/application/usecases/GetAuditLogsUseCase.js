export class GetAuditLogsUseCase {
  constructor(auditService) {
    this.auditService = auditService;
  }

  async execute(filters = {}) {
    try {
      const auditLogs = await this.auditService.getAuditLogs(filters);
      return auditLogs;
    } catch (error) {
      console.error("Failed to get audit logs:", error);
      throw error;
    }
  }
}
