console.log("🧪 Testing Customer Module Structure");
console.log("=".repeat(50));

try {
  // Test 1: Import and test Customer entity
  console.log("\n✅ Test 1: Customer Entity");
  const { Customer } = await import(
    "./src/modules/Customer/domain/entities/Customer.entity.js"
  );

  const customer = new Customer({
    id: "test-id",
    image: "profile.jpg",
    first_name: "John",
    last_name: "Doe",
    id_Number: "123456789",
    phone_number: "+1234567890",
    joining_date: new Date(),
    notes: "Test customer",
    city: "Test City",
    email: "john.doe@example.com",
    birth_date: new Date("1990-01-01"),
    agentsId: "agent-123",
    agentsName: "Test Agent",
    vehicles: [],
    insurances: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  console.log("Customer entity created successfully");
  console.log("Customer ID:", customer.id);
  console.log("Full Name:", customer.getFullName());
  console.log("Age:", customer.getAge());
  console.log("Customer Since:", customer.getCustomerSince(), "days");
  console.log("Has Vehicles:", customer.hasVehicles());
  console.log("Has Insurances:", customer.hasInsurances());

  // Test 2: Import and test Customer repository interface
  console.log("\n✅ Test 2: Customer Repository Interface");
  const { ICustomerRepository } = await import(
    "./src/modules/Customer/domain/interfaces/ICustomerRepository.js"
  );
  console.log("ICustomerRepository imported successfully");

  // Test 3: Import and test Customer repository implementation
  console.log("\n✅ Test 3: Customer Repository Implementation");
  const { MongoCustomerRepository } = await import(
    "./src/modules/Customer/infrastructure/repositories/MongoCustomerRepository.js"
  );
  console.log("MongoCustomerRepository imported successfully");

  // Test 4: Import and test Customer use cases
  console.log("\n✅ Test 4: Customer Use Cases");
  const { CreateCustomerUseCase } = await import(
    "./src/modules/Customer/application/usecases/CreateCustomerUseCase.js"
  );
  const { GetAllCustomersUseCase } = await import(
    "./src/modules/Customer/application/usecases/GetAllCustomersUseCase.js"
  );
  const { UpdateCustomerUseCase } = await import(
    "./src/modules/Customer/application/usecases/UpdateCustomerUseCase.js"
  );
  const { DeleteCustomerUseCase } = await import(
    "./src/modules/Customer/application/usecases/DeleteCustomerUseCase.js"
  );
  const { AddVehicleToCustomerUseCase } = await import(
    "./src/modules/Customer/application/usecases/AddVehicleToCustomerUseCase.js"
  );
  const { GetCustomerStatsUseCase } = await import(
    "./src/modules/Customer/application/usecases/GetCustomerStatsUseCase.js"
  );
  console.log("All Customer use cases imported successfully");

  // Test 5: Import and test Customer controller
  console.log("\n✅ Test 5: Customer Controller");
  const { CustomerController } = await import(
    "./src/modules/Customer/presentation/controllers/CustomerController.js"
  );
  console.log("CustomerController imported successfully");

  // Test 6: Import and test Customer routes
  console.log("\n✅ Test 6: Customer Routes");
  const { CustomerRoutes } = await import(
    "./src/modules/Customer/presentation/routes/CustomerRoutes.js"
  );
  console.log("CustomerRoutes imported successfully");

  // Test 7: Import and test Customer container
  console.log("\n✅ Test 7: Customer Container");
  const { customerContainer } = await import("./src/modules/Customer/index.js");
  console.log("Customer container imported successfully");

  // Test 8: Create mock dependencies and test use cases
  console.log("\n✅ Test 8: Testing Use Cases with Mock Dependencies");

  // Mock repository
  const mockCustomerRepository = {
    createCustomer: async (data) => {
      const mockCustomer = new Customer({
        id: "mock-customer-id",
        first_name: data.first_name,
        last_name: data.last_name,
        id_Number: data.id_Number,
        phone_number: data.phone_number,
        email: data.email,
        city: data.city,
        vehicles: [],
        insurances: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return mockCustomer;
    },
    getAllCustomers: async () => ({
      customers: [customer.toJSON()],
      pagination: { page: 1, limit: 10, total: 1, pages: 1 },
    }),
    getCustomerById: async (id) => customer.toJSON(),
    updateCustomer: async (id, data) => ({ id, ...data }),
    deleteCustomer: async (id) => ({ id }),
    getCustomerByIdNumber: async (idNumber) => null,
    getCustomerByPhoneNumber: async (phoneNumber) => null,
    getCustomersByAgent: async (agentId) => [customer.toJSON()],
    getCustomersByCity: async (city) => [customer.toJSON()],
    getCustomerCount: async () => 1,
    addVehicleToCustomer: async (customerId, vehicleData) => ({
      id: customerId,
      vehicle: vehicleData,
    }),
    removeVehicleFromCustomer: async (customerId, vehicleId) => ({
      id: customerId,
    }),
    getCustomerVehicles: async (customerId) => [],
    getVehicleByPlateNumber: async (plateNumber) => null,
    getCustomerStats: async () => ({
      totalCustomers: 1,
      customersWithVehicles: 0,
      customersWithInsurances: 0,
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
  const getAllCustomersUseCase = new GetAllCustomersUseCase(
    mockCustomerRepository
  );
  const result = await getAllCustomersUseCase.execute();
  console.log(
    "GetAllCustomersUseCase executed successfully, found",
    result.customers.length,
    "customers"
  );

  const createCustomerUseCase = new CreateCustomerUseCase(
    mockCustomerRepository,
    mockNotificationService,
    mockAuditService
  );

  const createdCustomer = await createCustomerUseCase.execute(
    {
      first_name: "Jane",
      last_name: "Smith",
      id_Number: "987654321",
      phone_number: "+0987654321",
      email: "jane.smith@example.com",
      city: "Test City",
    },
    "user-123",
    "Test User"
  );

  console.log(
    "CreateCustomerUseCase executed successfully, created customer:",
    createdCustomer.getFullName()
  );

  // Test controller
  const customerController = new CustomerController(
    createCustomerUseCase,
    getAllCustomersUseCase,
    null, // updateCustomerUseCase
    null, // deleteCustomerUseCase
    null, // addVehicleToCustomerUseCase
    null, // getCustomerStatsUseCase
    mockCustomerRepository
  );

  console.log("CustomerController created successfully");

  // Test routes
  const customerRoutes = new CustomerRoutes(customerController);
  const router = customerRoutes.getRouter();
  console.log("CustomerRoutes created successfully");
  console.log(
    "Router stack length:",
    router.stack ? router.stack.length : "N/A"
  );

  console.log("\n" + "=".repeat(50));
  console.log("🎉 All Customer module component tests passed!");
  console.log(
    "✅ The Customer module components are working correctly in isolation"
  );
  console.log("=".repeat(50));
} catch (error) {
  console.error("\n❌ Customer module test failed:");
  console.error("Error:", error.message);
  console.error("Stack:", error.stack);
  process.exit(1);
}
