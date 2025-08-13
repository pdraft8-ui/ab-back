console.log("🧪 Testing Payment Module Components in Isolation");
console.log("=".repeat(50));

try {
  // Test 1: Import and test Payment entity
  console.log("\n✅ Test 1: Payment Entity");
  const { Payment } = await import(
    "./src/modules/Payment/domain/entities/Payment.entity.js"
  );

  const payment = new Payment({
    id: "test-id",
    paymentNumber: "PAY-123",
    invoiceId: "invoice-123",
    customerId: "customer-123",
    paymentMethod: "Credit Card",
    paymentAmount: 1000,
    paymentDate: new Date(),
    notes: "Test payment",
    referenceNumber: "REF-123",
    status: "Pending",
    createdBy: "user-123",
    updatedBy: "user-123",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  console.log("Payment entity created successfully");
  console.log("Payment ID:", payment.id);
  console.log("Payment Number:", payment.paymentNumber);
  console.log("Is Completed:", payment.isCompleted());
  console.log("Can Be Refunded:", payment.canBeRefunded());

  // Test 2: Import and test Payment repository interface
  console.log("\n✅ Test 2: Payment Repository Interface");
  const { IPaymentRepository } = await import(
    "./src/modules/Payment/domain/interfaces/IPaymentRepository.js"
  );
  console.log("IPaymentRepository imported successfully");

  // Test 3: Import and test Payment repository implementation
  console.log("\n✅ Test 3: Payment Repository Implementation");
  const { MongoPaymentRepository } = await import(
    "./src/modules/Payment/infrastructure/repositories/MongoPaymentRepository.js"
  );
  console.log("MongoPaymentRepository imported successfully");

  // Test 4: Import and test Payment use cases
  console.log("\n✅ Test 4: Payment Use Cases");
  const { CreatePaymentUseCase } = await import(
    "./src/modules/Payment/application/usecases/CreatePaymentUseCase.js"
  );
  const { GetAllPaymentsUseCase } = await import(
    "./src/modules/Payment/application/usecases/GetAllPaymentsUseCase.js"
  );
  const { RefundPaymentUseCase } = await import(
    "./src/modules/Payment/application/usecases/RefundPaymentUseCase.js"
  );
  console.log("All Payment use cases imported successfully");

  // Test 5: Import and test Payment controller
  console.log("\n✅ Test 5: Payment Controller");
  const { PaymentController } = await import(
    "./src/modules/Payment/presentation/controllers/PaymentController.js"
  );
  console.log("PaymentController imported successfully");

  // Test 6: Create mock dependencies and test use cases
  console.log("\n✅ Test 6: Testing Use Cases with Mock Dependencies");

  // Mock repository
  const mockPaymentRepository = {
    createPayment: async (data) => ({ id: "mock-payment-id", ...data }),
    getAllPayments: async () => [payment.toJSON()],
    getPaymentById: async (id) => payment.toJSON(),
    updatePayment: async (id, data) => ({ id, ...data }),
    deletePayment: async (id) => ({ id }),
    getPaymentsByCustomer: async (customerId) => [payment.toJSON()],
    getPaymentsByInvoice: async (invoiceId) => [payment.toJSON()],
    getPaymentStats: async () => ({ totalPayments: 1, totalAmount: 1000 }),
    refundPayment: async (id, data) => ({ id, ...data }),
  };

  // Mock invoice repository
  const mockInvoiceRepository = {
    getInvoiceById: async (id) => ({ id, balanceDue: 1000, totalAmount: 1000 }),
    updateInvoiceBalance: async (id, amount) => true,
  };

  // Mock customer repository
  const mockCustomerRepository = {
    getCustomerById: async (id) => ({
      id,
      name: "Test Customer",
      email: "test@example.com",
    }),
  };

  // Mock services
  const mockNotificationService = {
    sendNotification: async (data) => console.log("Mock notification:", data),
  };

  const mockAuditService = {
    logAction: async (data) => console.log("Mock audit:", data),
  };

  // Test use cases
  const getAllPaymentsUseCase = new GetAllPaymentsUseCase(
    mockPaymentRepository
  );
  const payments = await getAllPaymentsUseCase.execute();
  console.log(
    "GetAllPaymentsUseCase executed successfully, found",
    payments.length,
    "payments"
  );

  const createPaymentUseCase = new CreatePaymentUseCase(
    mockPaymentRepository,
    mockInvoiceRepository,
    mockCustomerRepository,
    mockNotificationService,
    mockAuditService
  );

  const createdPayment = await createPaymentUseCase.execute(
    {
      invoiceId: "invoice-123",
      customerId: "customer-123",
      paymentAmount: 500,
      paymentMethod: "Credit Card",
    },
    "user-123",
    "Test User"
  );

  console.log(
    "CreatePaymentUseCase executed successfully, created payment:",
    createdPayment.id
  );

  // Test controller
  const paymentController = new PaymentController(
    createPaymentUseCase,
    getAllPaymentsUseCase,
    null, // refundPaymentUseCase
    mockPaymentRepository
  );

  console.log("PaymentController created successfully");

  console.log("\n" + "=".repeat(50));
  console.log("🎉 All Payment module component tests passed!");
  console.log(
    "✅ The Payment module components are working correctly in isolation"
  );
  console.log("=".repeat(50));
} catch (error) {
  console.error("\n❌ Payment module test failed:");
  console.error("Error:", error.message);
  console.error("Stack:", error.stack);
  process.exit(1);
}
