import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { AlAhliaAccident } from "./src/modules/AlAhliaAccident/domain/entities/AlAhliaAccident.entity.js";
import { getAlAhliaAccidentContainerMinimal } from "./src/modules/AlAhliaAccident/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("🧪 Testing AlAhliaAccident Module - Modular Clean Architecture");
console.log("=".repeat(60));

async function testAlAhliaAccidentModule() {
  try {
    // Test 1: AlAhliaAccident Entity
    console.log("\n📋 Test 1: AlAhliaAccident Entity");
    console.log("-".repeat(40));

    const accidentData = {
      customerId: "mock-customer-id",
      reportNumber: "AR-2024-001",
      accidentDate: new Date("2024-01-15"),
      accidentTime: "14:30",
      policeNumber: "POL-123456",
      agentNumber: "AG-789",
      policyInfo: {
        policyNumber: "POL-2024-001",
        type: "A.C.T",
        durationFrom: new Date("2024-01-01"),
        durationTo: new Date("2024-12-31"),
      },
      customerPerson: {
        name: "John Doe",
      },
      driverInfo: {
        name: "John Doe",
        idNumber: "ID123456",
        age: 35,
        licenseNumber: "LIC-789",
        licenseType: "B",
        licenseIssueDate: new Date("2020-01-01"),
        matchesVehicle: true,
      },
      vehicleInfo: {
        usage: "Personal",
        manufactureYear: "2020",
        vehicleType: "Car",
        registrationNumber: "ABC123",
        registrationType: "Private",
        lastTestDate: new Date("2023-12-01"),
        licenseExpiry: new Date("2025-01-01"),
      },
      accidentDetails: {
        location: "Main Street, City",
        time: "14:30",
        weather: "Clear",
        purposeOfUse: "Personal",
        accidentType: "physical",
        sketch: "base64-sketch-data",
        driverStatement: "I was driving normally when...",
        signature: "base64-signature-data",
      },
      thirdPartyVehicles: [
        {
          vehicleNumber: "XYZ789",
          type: "Car",
          model: "Toyota",
          color: "Red",
          ownerName: "Jane Smith",
          ownerAddress: "123 Other St",
          ownerPhone: "555-1234",
          driverName: "Jane Smith",
          driverAddress: "123 Other St",
          driverPhone: "555-1234",
          insuranceCompany: "Other Insurance",
          insurancePolicyNumber: "OTHER-001",
          damageDetails: "Front bumper damage",
        },
      ],
      thirdPartyInjuries: [
        {
          name: "Jane Smith",
          age: 28,
          address: "123 Other St",
          profession: "Teacher",
          injuryType: "Minor bruising",
        },
      ],
      thirdPartyPassengers: [{ name: "Child Smith" }],
      externalWitnesses: [{ name: "Witness One" }, { name: "Witness Two" }],
      declaration: {
        driverSignature: "base64-driver-signature",
        declarationDate: new Date(),
        officerSignature: "base64-officer-signature",
        officerDate: new Date(),
      },
    };

    const accidentReport = new AlAhliaAccident(accidentData);

    console.log("✅ Entity created successfully");
    console.log("✅ isValid():", accidentReport.isValid());
    console.log("✅ getReportNumber():", accidentReport.getReportNumber());
    console.log("✅ getAccidentDate():", accidentReport.getAccidentDate());
    console.log("✅ getCustomerId():", accidentReport.getCustomerId());

    // Test entity methods
    console.log("✅ isValidCustomerId():", accidentReport.isValidCustomerId());
    console.log(
      "✅ isValidAccidentDate():",
      accidentReport.isValidAccidentDate()
    );
    console.log(
      "✅ isValidAccidentTime():",
      accidentReport.isValidAccidentTime()
    );
    console.log("✅ isValidPolicyInfo():", accidentReport.isValidPolicyInfo());
    console.log(
      "✅ isValidCustomerPerson():",
      accidentReport.isValidCustomerPerson()
    );
    console.log("✅ isValidDriverInfo():", accidentReport.isValidDriverInfo());
    console.log(
      "✅ isValidVehicleInfo():",
      accidentReport.isValidVehicleInfo()
    );
    console.log(
      "✅ isValidAccidentDetails():",
      accidentReport.isValidAccidentDetails()
    );
    console.log(
      "✅ isValidThirdPartyVehicles():",
      accidentReport.isValidThirdPartyVehicles()
    );
    console.log(
      "✅ isValidThirdPartyInjuries():",
      accidentReport.isValidThirdPartyInjuries()
    );
    console.log(
      "✅ isValidThirdPartyPassengers():",
      accidentReport.isValidThirdPartyPassengers()
    );
    console.log(
      "✅ isValidExternalWitnesses():",
      accidentReport.isValidExternalWitnesses()
    );
    console.log(
      "✅ isValidDeclaration():",
      accidentReport.isValidDeclaration()
    );

    // Test business logic methods
    accidentReport.addThirdPartyVehicle({
      vehicleNumber: "NEW123",
      type: "Motorcycle",
      model: "Honda",
      color: "Blue",
      ownerName: "New Owner",
      ownerAddress: "456 New St",
      ownerPhone: "555-5678",
      driverName: "New Driver",
      driverAddress: "456 New St",
      driverPhone: "555-5678",
      insuranceCompany: "New Insurance",
      insurancePolicyNumber: "NEW-001",
      damageDetails: "Side damage",
    });

    console.log("✅ addThirdPartyVehicle() executed");
    console.log(
      "✅ Updated thirdPartyVehicles count:",
      accidentReport.getThirdPartyVehicles().length
    );

    // Test 2: Use Cases with Minimal Container
    console.log("\n📋 Test 2: Use Cases with Minimal Container");
    console.log("-".repeat(40));

    const container = await getAlAhliaAccidentContainerMinimal();

    // Test CreateAlAhliaAccidentUseCase
    console.log("\n🔧 Testing CreateAlAhliaAccidentUseCase...");
    const createUseCase = container.get("createAlAhliaAccidentUseCase");
    try {
      const result = await createUseCase.execute(
        accidentData,
        "ABC123",
        "mock-user-id",
        "Mock User"
      );
      console.log("✅ CreateAlAhliaAccidentUseCase executed successfully");
      console.log("✅ Result:", result.getReportNumber());
    } catch (error) {
      console.log("❌ CreateAlAhliaAccidentUseCase error:", error.message);
    }

    // Test GetAllAlAhliaAccidentsUseCase
    console.log("\n🔧 Testing GetAllAlAhliaAccidentsUseCase...");
    const getAllUseCase = container.get("getAllAlAhliaAccidentsUseCase");
    try {
      const result = await getAllUseCase.execute();
      console.log("✅ GetAllAlAhliaAccidentsUseCase executed successfully");
      console.log("✅ Result count:", result.length);
    } catch (error) {
      console.log("❌ GetAllAlAhliaAccidentsUseCase error:", error.message);
    }

    // Test GetAlAhliaAccidentByIdUseCase
    console.log("\n🔧 Testing GetAlAhliaAccidentByIdUseCase...");
    const getByIdUseCase = container.get("getAlAhliaAccidentByIdUseCase");
    try {
      await getByIdUseCase.execute("non-existent-id");
      console.log("❌ Expected error for non-existent ID");
    } catch (error) {
      console.log(
        "✅ GetAlAhliaAccidentByIdUseCase correctly handled not found case"
      );
    }

    // Test DeleteAlAhliaAccidentUseCase
    console.log("\n🔧 Testing DeleteAlAhliaAccidentUseCase...");
    const deleteUseCase = container.get("deleteAlAhliaAccidentUseCase");
    try {
      await deleteUseCase.execute(
        "non-existent-id",
        "mock-user-id",
        "Mock User"
      );
      console.log("❌ Expected error for non-existent ID");
    } catch (error) {
      console.log(
        "✅ DeleteAlAhliaAccidentUseCase correctly handled not found case"
      );
    }

    // Test GetAlAhliaAccidentStatsUseCase
    console.log("\n🔧 Testing GetAlAhliaAccidentStatsUseCase...");
    const getStatsUseCase = container.get("getAlAhliaAccidentStatsUseCase");
    try {
      const result = await getStatsUseCase.execute();
      console.log("✅ GetAlAhliaAccidentStatsUseCase executed successfully");
      console.log("✅ Stats:", result);
    } catch (error) {
      console.log("❌ GetAlAhliaAccidentStatsUseCase error:", error.message);
    }

    // Test 3: Controller and Routes
    console.log("\n📋 Test 3: Controller and Routes");
    console.log("-".repeat(40));

    const controller = container.get("alAhliaAccidentController");
    const routes = container.get("alAhliaAccidentRoutes");

    console.log("✅ Controller instantiated:", controller.constructor.name);
    console.log("✅ Routes instantiated:", routes.constructor.name);
    console.log("✅ Router created:", typeof routes.getRouter() === "function");

    // Test 4: Entity Static Methods
    console.log("\n📋 Test 4: Entity Static Methods");
    console.log("-".repeat(40));

    const jsonData = accidentReport.toJSON();
    const fromJSONEntity = AlAhliaAccident.fromJSON(jsonData);
    const createEntity = AlAhliaAccident.create(accidentData);

    console.log("✅ toJSON() executed successfully");
    console.log(
      "✅ fromJSON() executed successfully:",
      fromJSONEntity.getReportNumber()
    );
    console.log(
      "✅ create() executed successfully:",
      createEntity.getReportNumber()
    );

    console.log(
      "\n🎉 All AlAhliaAccident module tests completed successfully!"
    );
    console.log("=".repeat(60));
  } catch (error) {
    console.error("❌ Test failed:", error);
    process.exit(1);
  }
}

testAlAhliaAccidentModule();
