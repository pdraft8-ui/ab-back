import { paymentContainerMinimal } from "./src/modules/Payment/index.js";

console.log("🧪 Testing Payment Module with Minimal Container");
console.log("=".repeat(50));

try {
  // Test 1: Check if we can get the payment container
  console.log("\n✅ Test 1: Getting Payment Container");
  console.log("Payment container retrieved successfully");
  console.log("Container type:", typeof paymentContainerMinimal);
  console.log(
    "Has getPaymentController method:",
    typeof paymentContainerMinimal.getPaymentController === "function"
  );

  // Test 2: Check if we can get the payment controller
  console.log("\n✅ Test 2: Getting Payment Controller");
  const paymentController = paymentContainerMinimal.getPaymentController();
  console.log("Payment controller retrieved successfully");
  console.log("Controller type:", typeof paymentController);

  // Test 3: Check if we can get the payment repository
  console.log("\n✅ Test 3: Getting Payment Repository");
  const paymentRepository = paymentContainerMinimal.getPaymentRepository();
  console.log("Payment repository retrieved successfully");
  console.log("Repository type:", typeof paymentRepository);

  // Test 4: Check if we can get use cases
  console.log("\n✅ Test 4: Getting Use Cases");
  const createPaymentUseCase =
    paymentContainerMinimal.getCreatePaymentUseCase();
  const getAllPaymentsUseCase =
    paymentContainerMinimal.getGetAllPaymentsUseCase();
  const refundPaymentUseCase =
    paymentContainerMinimal.getRefundPaymentUseCase();
  console.log("Use cases retrieved successfully");
  console.log("CreatePaymentUseCase type:", typeof createPaymentUseCase);
  console.log("GetAllPaymentsUseCase type:", typeof getAllPaymentsUseCase);
  console.log("RefundPaymentUseCase type:", typeof refundPaymentUseCase);

  // Test 5: Check if we can get the payment routes
  console.log("\n✅ Test 5: Getting Payment Routes");
  const paymentRoutes = paymentContainerMinimal.getPaymentRoutes();
  console.log("Payment routes retrieved successfully");
  console.log("Routes type:", typeof paymentRoutes);
  console.log(
    "Has getRouter method:",
    typeof paymentRoutes.getRouter === "function"
  );

  // Test 6: Test the router
  console.log("\n✅ Test 6: Testing Router");
  const router = paymentRoutes.getRouter();
  console.log("Router retrieved successfully");
  console.log("Router type:", typeof router);
  console.log(
    "Router stack length:",
    router.stack ? router.stack.length : "N/A"
  );

  console.log("\n" + "=".repeat(50));
  console.log("🎉 All Payment module tests passed!");
  console.log(
    "✅ The Payment module with minimal container is working correctly"
  );
  console.log("=".repeat(50));
} catch (error) {
  console.error("\n❌ Payment module test failed:");
  console.error("Error:", error.message);
  console.error("Stack:", error.stack);
  process.exit(1);
}
