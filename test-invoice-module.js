console.log("🧪 Testing Invoice Module Structure");
console.log("=".repeat(50));

try {
  // Test 1: Import and test Invoice entity
  console.log("\n✅ Test 1: Invoice Entity");
  const { Invoice } = await import(
    "./src/modules/Invoice/domain/entities/Invoice.entity.js"
  );

  const invoice = new Invoice({
    id: "test-id",
    invoiceNumber: "INV-123",
    customer: "customer-123",
    insurancePolicy: "policy-123",
    vehicle: "vehicle-123",
    invoiceDate: new Date(),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    status: "Pending",
    totalAmount: 1000,
    balanceDue: 1000,
    description: "Test invoice",
    notes: "Test notes",
    createdBy: "user-123",
    updatedBy: "user-123",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  console.log("Invoice entity created successfully");
  console.log("Invoice ID:", invoice.id);
  console.log("Invoice Number:", invoice.invoiceNumber);
  console.log("Is Overdue:", invoice.isOverdue());
  console.log("Is Paid:", invoice.isPaid());
  console.log("Is Partially Paid:", invoice.isPartiallyPaid());
  console.log("Can Be Updated:", invoice.canBeUpdated());

  // Test 2: Import and test Invoice repository interface
  console.log("\n✅ Test 2: Invoice Repository Interface");
  const { IInvoiceRepository } = await import(
    "./src/modules/Invoice/domain/interfaces/IInvoiceRepository.js"
  );
  console.log("IInvoiceRepository imported successfully");

  // Test 3: Import and test Invoice repository implementation
  console.log("\n✅ Test 3: Invoice Repository Implementation");
  const { MongoInvoiceRepository } = await import(
    "./src/modules/Invoice/infrastructure/repositories/MongoInvoiceRepository.js"
  );
  console.log("MongoInvoiceRepository imported successfully");

  // Test 4: Import and test Invoice use cases
  console.log("\n✅ Test 4: Invoice Use Cases");
  const { CreateInvoiceUseCase } = await import(
    "./src/modules/Invoice/application/usecases/CreateInvoiceUseCase.js"
  );
  const { GetAllInvoicesUseCase } = await import(
    "./src/modules/Invoice/application/usecases/GetAllInvoicesUseCase.js"
  );
  const { UpdateInvoiceUseCase } = await import(
    "./src/modules/Invoice/application/usecases/UpdateInvoiceUseCase.js"
  );
  const { GetInvoiceStatsUseCase } = await import(
    "./src/modules/Invoice/application/usecases/GetInvoiceStatsUseCase.js"
  );
  const { MarkOverdueInvoicesUseCase } = await import(
    "./src/modules/Invoice/application/usecases/MarkOverdueInvoicesUseCase.js"
  );
  console.log("All Invoice use cases imported successfully");

  // Test 5: Import and test Invoice controller
  console.log("\n✅ Test 5: Invoice Controller");
  const { InvoiceController } = await import(
    "./src/modules/Invoice/presentation/controllers/InvoiceController.js"
  );
  console.log("InvoiceController imported successfully");

  // Test 6: Import and test Invoice routes
  console.log("\n✅ Test 6: Invoice Routes");
  const { InvoiceRoutes } = await import(
    "./src/modules/Invoice/presentation/routes/InvoiceRoutes.js"
  );
  console.log("InvoiceRoutes imported successfully");

  // Test 7: Import and test Invoice container
  console.log("\n✅ Test 7: Invoice Container");
  const { invoiceContainer } = await import("./src/modules/Invoice/index.js");
  console.log("Invoice container imported successfully");

  // Test 8: Create mock dependencies and test use cases
  console.log("\n✅ Test 8: Testing Use Cases with Mock Dependencies");

  // Mock repository
  const mockInvoiceRepository = {
    createInvoice: async (data) => {
      const mockInvoice = new Invoice({
        id: "mock-invoice-id",
        invoiceNumber: "INV-001",
        customer: data.customer,
        insurancePolicy: data.insurancePolicy,
        vehicle: data.vehicle,
        totalAmount: data.totalAmount,
        balanceDue: data.balanceDue,
        description: data.description,
        notes: data.notes,
        dueDate: data.dueDate,
        createdBy: data.createdBy,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return mockInvoice;
    },
    getAllInvoices: async () => ({
      invoices: [invoice.toJSON()],
      pagination: { page: 1, limit: 10, total: 1, pages: 1 },
    }),
    getInvoiceById: async (id) => invoice.toJSON(),
    updateInvoice: async (id, data) => ({ id, ...data }),
    deleteInvoice: async (id) => ({ id }),
    getInvoicesByCustomer: async (customerId) => [invoice.toJSON()],
    getInvoiceStats: async () => ({
      totalInvoices: 1,
      totalAmount: 1000,
      totalBalance: 1000,
    }),
    markOverdueInvoices: async () => [invoice.toJSON()],
    getInvoiceByInsurancePolicy: async (policyId) => null,
    updateInvoiceBalance: async (id, balance) => ({ id, balanceDue: balance }),
    getInvoiceCount: async () => 1,
  };

  // Mock customer repository
  const mockCustomerRepository = {
    getCustomerById: async (id) => ({
      id,
      firstName: "Test",
      lastName: "Customer",
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
  const getAllInvoicesUseCase = new GetAllInvoicesUseCase(
    mockInvoiceRepository
  );
  const result = await getAllInvoicesUseCase.execute();
  console.log(
    "GetAllInvoicesUseCase executed successfully, found",
    result.invoices.length,
    "invoices"
  );

  const createInvoiceUseCase = new CreateInvoiceUseCase(
    mockInvoiceRepository,
    mockCustomerRepository,
    mockNotificationService,
    mockAuditService
  );

  const createdInvoice = await createInvoiceUseCase.execute(
    {
      customerId: "customer-123",
      insurancePolicyId: "policy-123",
      vehicleId: "vehicle-123",
      totalAmount: 500,
      description: "Test invoice",
    },
    "user-123",
    "Test User"
  );

  console.log(
    "CreateInvoiceUseCase executed successfully, created invoice:",
    createdInvoice.id
  );

  // Test controller
  const invoiceController = new InvoiceController(
    createInvoiceUseCase,
    getAllInvoicesUseCase,
    null, // updateInvoiceUseCase
    null, // getInvoiceStatsUseCase
    null, // markOverdueInvoicesUseCase
    mockInvoiceRepository
  );

  console.log("InvoiceController created successfully");

  // Test routes
  const invoiceRoutes = new InvoiceRoutes(invoiceController);
  const router = invoiceRoutes.getRouter();
  console.log("InvoiceRoutes created successfully");
  console.log(
    "Router stack length:",
    router.stack ? router.stack.length : "N/A"
  );

  console.log("\n" + "=".repeat(50));
  console.log("🎉 All Invoice module component tests passed!");
  console.log(
    "✅ The Invoice module components are working correctly in isolation"
  );
  console.log("=".repeat(50));
} catch (error) {
  console.error("\n❌ Invoice module test failed:");
  console.error("Error:", error.message);
  console.error("Stack:", error.stack);
  process.exit(1);
}
