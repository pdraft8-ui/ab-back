import {
  VehicleContainerMinimal,
  Vehicle,
} from "./src/modules/Vehicle/index.js";

console.log("🚗 Testing Vehicle Module - Modular Clean Architecture");
console.log("=".repeat(60));

async function testVehicleModule() {
  try {
    // Initialize container with mock dependencies
    const container = new VehicleContainerMinimal();

    console.log("✅ Vehicle Container initialized successfully");

    // Test Vehicle Entity
    console.log("\n📋 Testing Vehicle Entity...");
    const vehicleData = {
      id: "test-vehicle-1",
      customerId: "customer-123",
      plateNumber: 12345,
      model: "Toyota Camry",
      type: "Car",
      ownership: "Private",
      modelNumber: "CAM2023",
      licenseExpiry: new Date("2024-12-31"),
      lastTest: new Date("2023-12-31"),
      color: "Red",
      price: 50000,
      image: "test-image.jpg",
    };

    const vehicle = new Vehicle(vehicleData);
    console.log("✅ Vehicle entity created:", vehicle.isValid());
    console.log(
      "✅ Vehicle has valid plate number:",
      vehicle.hasValidPlateNumber()
    );
    console.log("✅ Vehicle has valid customer:", vehicle.hasValidCustomer());
    console.log("✅ Vehicle has insurance:", vehicle.hasInsurance());
    console.log("✅ Vehicle has expired license:", vehicle.hasExpiredLicense());
    console.log("✅ Vehicle has expired test:", vehicle.hasExpiredTest());

    // Test CreateVehicleUseCase
    console.log("\n🔧 Testing CreateVehicleUseCase...");
    const createVehicleUseCase = container.getCreateVehicleUseCase();
    const newVehicleData = {
      customerId: "customer-123",
      plateNumber: 54321,
      model: "Honda Civic",
      type: "Car",
      ownership: "Private",
      modelNumber: "CIV2023",
      licenseExpiry: new Date("2024-12-31"),
      lastTest: new Date("2023-12-31"),
      color: "Blue",
      price: 45000,
    };

    const createdVehicle = await createVehicleUseCase.execute(
      newVehicleData,
      "user-123",
      "Test User"
    );
    console.log("✅ Vehicle created successfully:", createdVehicle.id);

    // Test GetAllVehiclesUseCase
    console.log("\n📋 Testing GetAllVehiclesUseCase...");
    const getAllVehiclesUseCase = container.getGetAllVehiclesUseCase();
    const allVehicles = await getAllVehiclesUseCase.execute();
    console.log("✅ Retrieved vehicles:", allVehicles.length);

    // Test GetVehicleByIdUseCase
    console.log("\n🔍 Testing GetVehicleByIdUseCase...");
    const getVehicleByIdUseCase = container.getGetVehicleByIdUseCase();
    const foundVehicle = await getVehicleByIdUseCase.execute("1");
    console.log("✅ Vehicle found by ID:", foundVehicle.id);

    // Test UpdateVehicleUseCase
    console.log("\n✏️ Testing UpdateVehicleUseCase...");
    const updateVehicleUseCase = container.getUpdateVehicleUseCase();
    const updateData = { color: "Green", price: 55000 };
    const updatedVehicle = await updateVehicleUseCase.execute(
      "1",
      updateData,
      "user-123",
      "Test User"
    );
    console.log("✅ Vehicle updated successfully:", updatedVehicle.id);

    // Test DeleteVehicleUseCase
    console.log("\n🗑️ Testing DeleteVehicleUseCase...");
    const deleteVehicleUseCase = container.getDeleteVehicleUseCase();
    const deletedVehicle = await deleteVehicleUseCase.execute(
      "1",
      "user-123",
      "Test User"
    );
    console.log("✅ Vehicle deleted successfully:", deletedVehicle.id);

    // Test GetVehiclesByCustomerUseCase
    console.log("\n👤 Testing GetVehiclesByCustomerUseCase...");
    const getVehiclesByCustomerUseCase =
      container.getGetVehiclesByCustomerUseCase();
    const customerVehicles = await getVehiclesByCustomerUseCase.execute(
      "customer-123"
    );
    console.log("✅ Customer vehicles retrieved:", customerVehicles.length);

    // Test AddInsuranceToVehicleUseCase
    console.log("\n🛡️ Testing AddInsuranceToVehicleUseCase...");
    const addInsuranceToVehicleUseCase =
      container.getAddInsuranceToVehicleUseCase();
    const insuranceData = {
      insuranceStartDate: new Date("2026-01-01"),
      insuranceEndDate: new Date("2026-12-31"),
      isUnder24: false,
      insuranceCategory: "CarInsurance",
      insuranceType: "Comprehensive",
      insuranceCompany: "Test Insurance Co",
      paymentMethod: "cash",
      insuranceAmount: 1000,
      paidAmount: 500,
    };

    const vehicleWithInsurance = await addInsuranceToVehicleUseCase.execute(
      "1",
      insuranceData,
      "user-123",
      "Test User"
    );
    console.log("✅ Insurance added to vehicle successfully");

    // Test GetVehicleStatsUseCase
    console.log("\n📊 Testing GetVehicleStatsUseCase...");
    const getVehicleStatsUseCase = container.getGetVehicleStatsUseCase();
    const stats = await getVehicleStatsUseCase.execute();
    console.log("✅ Vehicle stats retrieved:", stats);

    // Test Controller instantiation
    console.log("\n🎮 Testing VehicleController...");
    const vehicleController = container.getVehicleController();
    console.log("✅ VehicleController created successfully");

    // Test Routes instantiation
    console.log("\n🛣️ Testing VehicleRoutes...");
    const vehicleRoutes = container.getVehicleRoutes();
    console.log("✅ VehicleRoutes created successfully");

    console.log("\n🎉 All Vehicle module tests passed successfully!");
    console.log("=".repeat(60));
  } catch (error) {
    console.error("❌ Vehicle module test failed:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the tests
testVehicleModule();
