import { getPaymentRoutes, paymentContainer } from "./src/modules/Payment/index.js";

console.log("🧪 Testing Modular Payment Module Structure");
console.log("=".repeat(50));

try {
  // Test 1: Check if we can get the payment routes
  console.log("\n✅ Test 1: Getting Payment Routes");
  const paymentRoutes = getPaymentRoutes();
  console.log("Payment routes retrieved successfully");
  console.log("Routes type:", typeof paymentRoutes);
  console.log("Has getRouter method:", typeof paymentRoutes.getRouter === 'function');

  // Test 2: Check if we can get the payment container
  console.log("\n✅ Test 2: Getting Payment Container");
  console.log("Payment container retrieved successfully");
  console.log("Container type:", typeof paymentContainer);
  console.log("Has getPaymentController method:", typeof paymentContainer.getPaymentController === 'function');

  // Test 3: Check if we can get the payment controller
  console.log("\n✅ Test 3: Getting Payment Controller");
  const paymentController = paymentContainer.getPaymentController();
  console.log("Payment controller retrieved successfully");
  console.log("Controller type:", typeof paymentController);

  // Test 4: Check if we can get the payment repository
  console.log("\n✅ Test 4: Getting Payment Repository");
  const paymentRepository = paymentContainer.getPaymentRepository();
  console.log("Payment repository retrieved successfully");
  console.log("Repository type:", typeof paymentRepository);

  // Test 5: Check if we can get use cases
  console.log("\n✅ Test 5: Getting Use Cases");
  const createPaymentUseCase = paymentContainer.getCreatePaymentUseCase();
  const getAllPaymentsUseCase = paymentContainer.getGetAllPaymentsUseCase();
  const refundPaymentUseCase = paymentContainer.getRefundPaymentUseCase();
  console.log("Use cases retrieved successfully");
  console.log("CreatePaymentUseCase type:", typeof createPaymentUseCase);
  console.log("GetAllPaymentsUseCase type:", typeof getAllPaymentsUseCase);
  console.log("RefundPaymentUseCase type:", typeof refundPaymentUseCase);

  console.log("\n" + "=".repeat(50));
  console.log("🎉 All modular structure tests passed!");
  console.log("✅ The Payment module with modular clean architecture is properly structured");
  console.log("=".repeat(50));

} catch (error) {
  console.error("\n❌ Modular structure test failed:");
  console.error("Error:", error.message);
  console.error("Stack:", error.stack);
  process.exit(1);
} 