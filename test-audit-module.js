import { AuditContainerMinimal } from "./src/modules/Audit/infrastructure/container/AuditContainer.js";
import { AuditLog } from "./src/modules/Audit/domain/entities/AuditLog.entity.js";

console.log("🧪 Testing Audit Module - Modular Clean Architecture");
console.log("=".repeat(60));

async function testAuditModule() {
  try {
    console.log("\n1. Testing AuditLog Entity...");
    const auditData = {
      userId: "user123",
      action: "CREATE",
      entity: "Customer",
      entityId: "customer456",
      userName: "admin",
      user: "user123", // Add the user field
      oldValue: null,
      newValue: { name: "John Doe", email: "john@example.com" },
    };

    const auditLog = new AuditLog(auditData);
    console.log("✅ AuditLog entity created successfully");
    console.log("   - Action Description:", auditLog.getActionDescription());
    console.log("   - Has Changes:", auditLog.hasChanges());
    console.log("   - Change Summary:", auditLog.getChangeSummary());
    console.log("   - Is Valid:", auditLog.isValid());

    console.log("\n2. Testing Audit Container (Minimal)...");
    const container = new AuditContainerMinimal();
    console.log("✅ Audit container created successfully");

    console.log("\n3. Testing LogActionUseCase...");
    const logActionUseCase = container.getLogActionUseCase();
    const logResult = await logActionUseCase.execute(auditData);
    console.log("✅ LogActionUseCase executed successfully");
    console.log("   - Logged Action:", logResult.action);
    console.log("   - Entity:", logResult.entity);

    console.log("\n4. Testing GetAuditLogsUseCase...");
    const getAuditLogsUseCase = container.getGetAuditLogsUseCase();
    const logsResult = await getAuditLogsUseCase.execute({
      page: 1,
      limit: 10,
    });
    console.log("✅ GetAuditLogsUseCase executed successfully");
    console.log("   - Total Logs:", logsResult.pagination.total);
    console.log("   - Logs Count:", logsResult.auditLogs.length);

    console.log("\n5. Testing GetAuditLogByIdUseCase...");
    const getAuditLogByIdUseCase = container.getGetAuditLogByIdUseCase();
    const logByIdResult = await getAuditLogByIdUseCase.execute("mock-audit-1");
    console.log("✅ GetAuditLogByIdUseCase executed successfully");
    console.log("   - Log ID:", logByIdResult.id);
    console.log("   - Action:", logByIdResult.action);

    console.log("\n6. Testing GetAuditStatsUseCase...");
    const getAuditStatsUseCase = container.getGetAuditStatsUseCase();
    const statsResult = await getAuditStatsUseCase.execute();
    console.log("✅ GetAuditStatsUseCase executed successfully");
    console.log("   - Total Logs:", statsResult.totalLogs);
    console.log("   - Today Logs:", statsResult.todayLogs);
    console.log("   - Action Stats Count:", statsResult.actionStats.length);

    console.log("\n7. Testing AuditController...");
    const auditController = container.getAuditController();
    console.log("✅ AuditController created successfully");
    console.log(
      "   - Controller methods available:",
      Object.getOwnPropertyNames(Object.getPrototypeOf(auditController)).filter(
        (name) => name !== "constructor"
      )
    );

    console.log("\n8. Testing AuditRoutes...");
    const auditRoutes = container.getAuditRoutes();
    console.log("✅ AuditRoutes created successfully");
    console.log(
      "   - Router stack length:",
      auditRoutes.getRouter().stack.length
    );

    console.log("\n🎉 All Audit module tests passed successfully!");
    console.log("\n📋 Audit Module Structure:");
    console.log("   ✅ Domain Layer:");
    console.log("      - AuditLog.entity.js");
    console.log("      - IAuditService.js");
    console.log("   ✅ Application Layer:");
    console.log("      - LogActionUseCase.js");
    console.log("      - GetAuditLogsUseCase.js");
    console.log("      - GetAuditLogByIdUseCase.js");
    console.log("      - GetAuditStatsUseCase.js");
    console.log("   ✅ Infrastructure Layer:");
    console.log("      - AuditService.js");
    console.log("      - AuditContainer.js");
    console.log("   ✅ Presentation Layer:");
    console.log("      - AuditController.js");
    console.log("      - AuditRoutes.js");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  }
}

testAuditModule();
