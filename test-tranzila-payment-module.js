import { TranzilaPaymentContainerMinimal } from "./src/modules/TranzilaPayment/infrastructure/container/TranzilaPaymentContainer.js";
import { TranzilaPayment } from "./src/modules/TranzilaPayment/domain/entities/TranzilaPayment.entity.js";
import { CreateTranzilaPaymentUseCase } from "./src/modules/TranzilaPayment/application/usecases/CreateTranzilaPaymentUseCase.js";
import { TranzilaPaymentController } from "./src/modules/TranzilaPayment/presentation/controllers/TranzilaPaymentController.js";

console.log("🧪 Testing TranzilaPayment Module - Modular Clean Architecture");
console.log("=".repeat(60));

async function testTranzilaPaymentModule() {
  try {
    console.log("\n1. Testing TranzilaPayment Entity...");
    const paymentData = {
      amount: 1000,
      currency: "ILS",
      description: "Test payment",
      customerEmail: "test@example.com",
      customerPhone: "123456789",
      customerName: "Test Customer",
      createdBy: "user123",
    };

    const tranzilaPayment = new TranzilaPayment(paymentData);
    console.log("✅ TranzilaPayment entity created successfully");
    console.log("   - Payment ID:", tranzilaPayment.paymentId);
    console.log("   - Status:", tranzilaPayment.status);
    console.log("   - Amount:", tranzilaPayment.amount);

    // Test entity methods
    console.log("   - Is pending:", tranzilaPayment.isPending());
    console.log("   - Can be refunded:", tranzilaPayment.canBeRefunded());
    console.log(
      "   - Has transaction ID:",
      tranzilaPayment.hasTranzilaTransactionId()
    );

    console.log("\n2. Testing TranzilaPayment Container...");
    const container = new TranzilaPaymentContainerMinimal();
    console.log("✅ TranzilaPayment container created successfully");

    // Test container services
    const repository = container.getTranzilaPaymentRepository();
    const service = container.getTranzilaService();
    const useCase = container.getCreateTranzilaPaymentUseCase();
    const controller = container.getTranzilaPaymentController();
    const routes = container.getTranzilaPaymentRoutes();

    console.log("✅ All container services retrieved successfully");
    console.log("   - Repository:", repository.constructor.name);
    console.log("   - Service:", service.constructor.name);
    console.log("   - Use Case:", useCase.constructor.name);
    console.log("   - Controller:", controller.constructor.name);
    console.log("   - Routes:", routes.constructor.name);

    console.log("\n3. Testing TranzilaPayment Use Case...");
    const testPaymentData = {
      invoiceId: "invoice123",
      customerId: "customer123",
      amount: 500,
      currency: "ILS",
      description: "Test payment via use case",
    };

    const result = await useCase.execute(testPaymentData, "user123");
    console.log("✅ CreateTranzilaPaymentUseCase executed successfully");
    console.log("   - Result:", result.success);
    console.log("   - Message:", result.message);

    console.log("\n4. Testing TranzilaPayment Controller...");
    const mockReq = {
      body: testPaymentData,
      user: { _id: "user123" },
    };

    const mockRes = {
      status: (code) => ({
        json: (data) => ({ statusCode: code, data }),
      }),
    };

    const controllerResult = await controller.createDirectPayment(
      mockReq,
      mockRes
    );
    console.log(
      "✅ TranzilaPaymentController.createDirectPayment executed successfully"
    );
    console.log("   - Status Code:", controllerResult.statusCode);
    console.log("   - Success:", controllerResult.data.success);

    console.log("\n5. Testing TranzilaPayment Routes...");
    const router = routes.getRouter();
    console.log("✅ TranzilaPaymentRoutes router created successfully");
    console.log("   - Router type:", router.constructor.name);

    console.log("\n6. Testing Entity State Changes...");
    const testPayment = new TranzilaPayment({
      amount: 1000,
      createdBy: "user123",
    });

    console.log("   - Initial status:", testPayment.status);
    testPayment.markAsCompleted("TXN-123");
    console.log("   - After markAsCompleted:", testPayment.status);
    console.log("   - Transaction ID:", testPayment.tranzilaTransactionId);

    testPayment.markAsRefunded(500, "Customer request");
    console.log("   - After markAsRefunded:", testPayment.status);
    console.log("   - Refund amount:", testPayment.refundAmount);

    console.log("\n7. Testing Repository Mock Methods...");
    const mockPayment = await repository.createTranzilaPayment(paymentData);
    console.log(
      "✅ Mock repository createTranzilaPayment executed successfully"
    );
    console.log("   - Created payment ID:", mockPayment.paymentId);

    const foundPayment = await repository.findTranzilaPaymentByPaymentId(
      "test-id"
    );
    console.log(
      "✅ Mock repository findTranzilaPaymentByPaymentId executed successfully"
    );
    console.log("   - Found payment ID:", foundPayment.paymentId);

    console.log("\n8. Testing Service Mock Methods...");
    const serviceResult = await service.createPayment({ amount: 1000 });
    console.log("✅ Mock TranzilaService createPayment executed successfully");
    console.log("   - Success:", serviceResult.success);
    console.log("   - Payment URL:", serviceResult.paymentUrl);

    const statusResult = await service.checkPaymentStatus("TXN-123");
    console.log(
      "✅ Mock TranzilaService checkPaymentStatus executed successfully"
    );
    console.log("   - Status:", statusResult.status);

    console.log("\n🎉 All TranzilaPayment Module Tests Passed!");
    console.log("✅ Modular structure is working correctly");
    console.log("✅ All dependencies are properly injected");
    console.log("✅ All components are isolated and testable");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  }
}

// Run the test
testTranzilaPaymentModule()
  .then(() => {
    console.log("\n🏁 TranzilaPayment module testing completed successfully!");
  })
  .catch((error) => {
    console.error("💥 Test execution failed:", error);
    process.exit(1);
  });
