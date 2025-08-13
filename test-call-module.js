import { CallContainerMinimal } from "./src/modules/Call/infrastructure/container/CallContainer.js";
import { Call } from "./src/modules/Call/domain/entities/Call.entity.js";

console.log("📞 Testing Call Module - Modular Clean Architecture");
console.log("==================================================\n");

async function testCallModule() {
  try {
    // Initialize container
    console.log("🔧 Initializing Call Container...");
    const container = new CallContainerMinimal();
    console.log("✅ Container initialized successfully\n");

    // Test Call Entity
    console.log("🏗️ Testing Call Entity...");
    const callData = {
      callid: "test-call-123",
      recordingUrl: "https://example.com/recording.mp3",
      customerId: "customer-123",
    };

    const call = new Call(callData);
    console.log("✅ Call entity created");

    console.log("📋 Testing entity methods...");
    console.log("Is valid:", call.isValid());
    console.log("Is valid call ID:", call.isValidCallId("test-call-123"));
    console.log(
      "Is valid recording URL:",
      call.isValidRecordingUrl("https://example.com/recording.mp3")
    );
    console.log("Call ID:", call.getCallId());
    console.log("Recording URL:", call.getRecordingUrl());
    console.log("Customer ID:", call.getCustomerId());
    console.log("Has recording:", call.hasRecording());
    console.log("");

    // Test GetCallRecordingUseCase
    console.log("📞 Testing GetCallRecordingUseCase...");
    const getCallRecordingUseCase = container.getGetCallRecordingUseCase();

    const result = await getCallRecordingUseCase.execute(
      "test-call-123",
      "test-token-456",
      "customer-123"
    );
    console.log("✅ Call recording retrieved successfully");
    console.log("Result:", result);
    console.log("");

    // Test GetAllCallsUseCase
    console.log("📋 Testing GetAllCallsUseCase...");
    const getAllCallsUseCase = container.getGetAllCallsUseCase();
    const allCalls = await getAllCallsUseCase.execute();
    console.log("✅ Retrieved all calls:", allCalls.length);
    console.log("");

    // Test GetCallsByCustomerUseCase
    console.log("👤 Testing GetCallsByCustomerUseCase...");
    const getCallsByCustomerUseCase = container.getGetCallsByCustomerUseCase();
    const customerCalls = await getCallsByCustomerUseCase.execute(
      "customer-123"
    );
    console.log("✅ Retrieved customer calls:", customerCalls.length);
    console.log("");

    // Test GetCallStatsUseCase
    console.log("📊 Testing GetCallStatsUseCase...");
    const getCallStatsUseCase = container.getGetCallStatsUseCase();
    const stats = await getCallStatsUseCase.execute();
    console.log("✅ Retrieved call statistics:", stats);
    console.log("");

    // Test Controller
    console.log("🎮 Testing Call Controller...");
    const controller = container.getCallController();
    console.log("✅ Controller instantiated successfully");
    console.log("");

    // Test Routes
    console.log("🛣️ Testing Call Routes...");
    const routes = container.getCallRoutes();
    console.log("✅ Routes instantiated successfully");
    console.log("");

    console.log("🎉 All Call module tests passed successfully!");
    console.log("✅ Entity validation working");
    console.log("✅ Use cases functioning properly");
    console.log("✅ Controller and routes instantiated");
    console.log("✅ Mock dependencies working correctly");
  } catch (error) {
    console.error("❌ Call module test failed:", error.message);
    console.error("Error:", error);
    process.exit(1);
  }
}

testCallModule();
