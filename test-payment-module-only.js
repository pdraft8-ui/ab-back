console.log("🧪 Testing Payment Module Structure Only");
console.log("=".repeat(50));

try {
  // Test 1: Check if we can import the Payment entity
  console.log("\n✅ Test 1: Importing Payment Entity");
  const { Payment } = await import(
    "./src/modules/Payment/domain/entities/Payment.entity.js"
  );
  console.log("Payment entity imported successfully");
  console.log("Payment entity type:", typeof Payment);

  // Test 2: Check if we can import the Payment repository interface
  console.log("\n✅ Test 2: Importing Payment Repository Interface");
  const { IPaymentRepository } = await import(
    "./src/modules/Payment/domain/interfaces/IPaymentRepository.js"
  );
  console.log("IPaymentRepository imported successfully");
  console.log("IPaymentRepository type:", typeof IPaymentRepository);

  // Test 3: Check if we can import the Payment repository implementation
  console.log("\n✅ Test 3: Importing Payment Repository Implementation");
  const { MongoPaymentRepository } = await import(
    "./src/modules/Payment/infrastructure/repositories/MongoPaymentRepository.js"
  );
  console.log("MongoPaymentRepository imported successfully");
  console.log("MongoPaymentRepository type:", typeof MongoPaymentRepository);

  // Test 4: Check if we can import the Payment use cases
  console.log("\n✅ Test 4: Importing Payment Use Cases");
  const { CreatePaymentUseCase } = await import(
    "./src/modules/Payment/application/usecases/CreatePaymentUseCase.js"
  );
  const { GetAllPaymentsUseCase } = await import(
    "./src/modules/Payment/application/usecases/GetAllPaymentsUseCase.js"
  );
  const { RefundPaymentUseCase } = await import(
    "./src/modules/Payment/application/usecases/RefundPaymentUseCase.js"
  );
  console.log("Payment use cases imported successfully");
  console.log("CreatePaymentUseCase type:", typeof CreatePaymentUseCase);
  console.log("GetAllPaymentsUseCase type:", typeof GetAllPaymentsUseCase);
  console.log("RefundPaymentUseCase type:", typeof RefundPaymentUseCase);

  // Test 5: Check if we can import the Payment controller
  console.log("\n✅ Test 5: Importing Payment Controller");
  const { PaymentController } = await import(
    "./src/modules/Payment/presentation/controllers/PaymentController.js"
  );
  console.log("PaymentController imported successfully");
  console.log("PaymentController type:", typeof PaymentController);

  // Test 6: Check if we can import the Payment routes
  console.log("\n✅ Test 6: Importing Payment Routes");
  const { PaymentRoutes } = await import(
    "./src/modules/Payment/presentation/routes/PaymentRoutes.js"
  );
  console.log("PaymentRoutes imported successfully");
  console.log("PaymentRoutes type:", typeof PaymentRoutes);

  // Test 7: Check if we can import the Payment container
  console.log("\n✅ Test 7: Importing Payment Container");
  const { default: PaymentContainer } = await import(
    "./src/modules/Payment/infrastructure/container/PaymentContainer.js"
  );
  console.log("PaymentContainer imported successfully");
  console.log("PaymentContainer type:", typeof PaymentContainer);

  // Test 8: Check if we can create instances
  console.log("\n✅ Test 8: Creating Instances");
  const paymentRepository = new MongoPaymentRepository();
  console.log("Payment repository instance created successfully");

  const getAllPaymentsUseCase = new GetAllPaymentsUseCase(paymentRepository);
  console.log("GetAllPaymentsUseCase instance created successfully");

  const paymentController = new PaymentController(
    null, // createPaymentUseCase
    getAllPaymentsUseCase,
    null, // refundPaymentUseCase
    paymentRepository
  );
  console.log("PaymentController instance created successfully");

  const paymentRoutes = new PaymentRoutes(paymentController);
  console.log("PaymentRoutes instance created successfully");

  console.log("\n" + "=".repeat(50));
  console.log("🎉 All Payment module tests passed!");
  console.log("✅ The Payment module structure is working correctly");
  console.log("=".repeat(50));
} catch (error) {
  console.error("\n❌ Payment module test failed:");
  console.error("Error:", error.message);
  console.error("Stack:", error.stack);
  process.exit(1);
}
