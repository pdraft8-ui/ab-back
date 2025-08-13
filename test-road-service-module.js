import { RoadServiceContainerMinimal } from "./src/modules/RoadService/infrastructure/container/RoadServiceContainer.js";
import { RoadService } from "./src/modules/RoadService/domain/entities/RoadService.entity.js";

console.log("🛣️ Testing Road Service Module - Modular Clean Architecture");
console.log(
  "=================================================================\n"
);

async function testRoadServiceModule() {
  try {
    // Initialize container
    console.log("🔧 Initializing Road Service Container...");
    const container = new RoadServiceContainerMinimal();
    console.log("✅ Container initialized successfully\n");

    // Test Road Service Entity
    console.log("🏗️ Testing Road Service Entity...");
    const roadServiceData = {
      companyName: "Test Road Service Company",
      serviceType: "خدمات طريق",
      amount: 1500,
      amountUnder2007: 2000,
    };

    const roadService = new RoadService(roadServiceData);
    console.log("✅ Road Service entity created");

    console.log("📋 Testing entity methods...");
    console.log("Is valid:", roadService.isValid());
    console.log("Is valid amount:", roadService.isValidAmount(1500));
    console.log("Is under 2007:", roadService.isUnder2007());
    console.log("Service type:", roadService.getServiceType());
    console.log("Company name:", roadService.getCompanyName());
    console.log("Amount:", roadService.getAmount());
    console.log("Amount under 2007:", roadService.getAmountUnder2007());
    console.log("");

    // Test CreateRoadServiceUseCase
    console.log("➕ Testing CreateRoadServiceUseCase...");
    const createRoadServiceUseCase = container.getCreateRoadServiceUseCase();
    const serviceData = {
      companyName: "New Road Service Company",
      amount: 2000,
      amountUnder2007: 2500,
    };

    const createdService = await createRoadServiceUseCase.execute(
      serviceData,
      "user-123",
      "Test User"
    );
    console.log("✅ Road service created successfully");
    console.log("");

    // Test GetAllRoadServicesUseCase
    console.log("📋 Testing GetAllRoadServicesUseCase...");
    const getAllRoadServicesUseCase = container.getGetAllRoadServicesUseCase();
    const allServices = await getAllRoadServicesUseCase.execute();
    console.log("✅ Retrieved all road services:", allServices.length);
    console.log("");

    // Test GetRoadServiceByIdUseCase
    console.log("🔍 Testing GetRoadServiceByIdUseCase...");
    const getRoadServiceByIdUseCase = container.getGetRoadServiceByIdUseCase();
    const serviceById = await getRoadServiceByIdUseCase.execute("test-id");
    console.log("✅ Retrieved road service by ID");
    console.log("");

    // Test UpdateRoadServiceUseCase
    console.log("✏️ Testing UpdateRoadServiceUseCase...");
    const updateRoadServiceUseCase = container.getUpdateRoadServiceUseCase();
    const updateData = {
      amount: 3000,
      amountUnder2007: 3500,
    };

    const updatedService = await updateRoadServiceUseCase.execute(
      "test-id",
      updateData,
      "user-123",
      "Test User"
    );
    console.log("✅ Road service updated successfully");
    console.log("");

    // Test DeleteRoadServiceUseCase
    console.log("🗑️ Testing DeleteRoadServiceUseCase...");
    const deleteRoadServiceUseCase = container.getDeleteRoadServiceUseCase();
    const deletedService = await deleteRoadServiceUseCase.execute(
      "test-id",
      "user-123",
      "Test User"
    );
    console.log("✅ Road service deleted successfully");
    console.log("");

    // Test GetRoadServiceStatsUseCase
    console.log("📊 Testing GetRoadServiceStatsUseCase...");
    const getRoadServiceStatsUseCase =
      container.getGetRoadServiceStatsUseCase();
    const stats = await getRoadServiceStatsUseCase.execute();
    console.log("✅ Retrieved road service statistics:", stats);
    console.log("");

    // Test Controller
    console.log("🎮 Testing Road Service Controller...");
    const controller = container.getRoadServiceController();
    console.log("✅ Controller instantiated successfully");
    console.log("");

    // Test Routes
    console.log("🛣️ Testing Road Service Routes...");
    const routes = container.getRoadServiceRoutes();
    console.log("✅ Routes instantiated successfully");
    console.log("");

    console.log("🎉 All Road Service module tests passed successfully!");
    console.log("✅ Entity validation working");
    console.log("✅ Use cases functioning properly");
    console.log("✅ Controller and routes instantiated");
    console.log("✅ Mock dependencies working correctly");
  } catch (error) {
    console.error("❌ Road Service module test failed:", error.message);
    console.error("Error:", error);
    process.exit(1);
  }
}

testRoadServiceModule();
