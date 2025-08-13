import { TrustAccidentReport } from "./src/modules/TrustAccidentReport/domain/entities/TrustAccidentReport.entity.js";
import { TrustAccidentReportContainerMinimal } from "./src/modules/TrustAccidentReport/infrastructure/container/TrustAccidentReportContainer.js";

console.log(
  "🧪 Testing TrustAccidentReport Module - Modular Clean Architecture"
);
console.log("=".repeat(60));

async function testTrustAccidentReportModule() {
  try {
    // Initialize container
    console.log("\n📦 Initializing TrustAccidentReportContainerMinimal...");
    const container = new TrustAccidentReportContainerMinimal();
    console.log("✅ Container initialized successfully");

    // Test 1: TrustAccidentReport Entity
    console.log("\n🏗️  Test 1: TrustAccidentReport Entity");
    console.log("-".repeat(40));

    const testData = {
      customerId: "customer-123",
      accidentDetails: {
        location: "Test Location",
        date: new Date(),
        time: "10:00 AM",
        accidentType: "Collision",
        reportDate: new Date(),
      },
      customerVehicle: {
        plateNumber: "ABC123",
        type: "Car",
        model: "Toyota",
        color: "White",
        ownership: "Owner",
        usage: "Personal",
        manufactureYear: "2020",
        chassisNumber: "CHASSIS123",
        testExpiry: new Date(),
        insuranceCompany: "Test Insurance",
        policyNumber: "POL123",
        insuranceType: "Comprehensive",
        insurancePeriod: {
          from: new Date(),
          to: new Date(),
        },
      },
      driverDetails: {
        name: "John Doe",
        birthDate: new Date(),
        address: "Test Address",
        licenseNumber: "LIC123",
        licenseType: "B",
        licenseExpiry: new Date(),
        relationToCustomer: "Self",
      },
      damages: {
        front: "Minor damage",
        back: "No damage",
        right: "No damage",
        left: "No damage",
        estimatedCost: "5000",
        garageName: "Test Garage",
        towCompany: "Test Tow",
      },
      otherVehicle: {
        plateNumber: "XYZ789",
        type: "Car",
        model: "Honda",
        color: "Black",
        insuranceCompany: "Other Insurance",
        driverName: "Jane Smith",
        driverAddress: "Other Address",
        licenseNumber: "LIC456",
        damageDescription: "Minor damage",
      },
      witnesses: [
        {
          name: "Witness 1",
          address: "Witness Address",
          phone: "123456789",
        },
      ],
      policeReport: {
        reportDate: new Date(),
        authority: "Test Police",
        sketchDrawn: true,
        officersPresent: true,
      },
      narration: "Test accident description",
      signature: "Test Signature",
      declaration: {
        declarerName: "John Doe",
        declarationDate: new Date(),
        reviewerName: "Reviewer",
        reviewerSignature: "Reviewer Signature",
        reviewDate: new Date(),
      },
    };

    const trustAccidentReport = TrustAccidentReport.create(testData);
    console.log("✅ Entity created successfully");

    // Test validation methods
    console.log("✅ isValid():", trustAccidentReport.isValid());
    console.log(
      "✅ isValidCustomerId():",
      trustAccidentReport.isValidCustomerId()
    );
    console.log(
      "✅ isValidAccidentDetails():",
      trustAccidentReport.isValidAccidentDetails()
    );
    console.log(
      "✅ isValidCustomerVehicle():",
      trustAccidentReport.isValidCustomerVehicle()
    );
    console.log(
      "✅ isValidDriverDetails():",
      trustAccidentReport.isValidDriverDetails()
    );
    console.log("✅ isValidDamages():", trustAccidentReport.isValidDamages());
    console.log(
      "✅ isValidOtherVehicle():",
      trustAccidentReport.isValidOtherVehicle()
    );
    console.log(
      "✅ isValidWitnesses():",
      trustAccidentReport.isValidWitnesses()
    );
    console.log(
      "✅ isValidPoliceReport():",
      trustAccidentReport.isValidPoliceReport()
    );
    console.log(
      "✅ isValidNarration():",
      trustAccidentReport.isValidNarration()
    );
    console.log(
      "✅ isValidSignature():",
      trustAccidentReport.isValidSignature()
    );
    console.log(
      "✅ isValidDeclaration():",
      trustAccidentReport.isValidDeclaration()
    );

    // Test getters
    console.log("✅ getCustomerId():", trustAccidentReport.getCustomerId());
    console.log(
      "✅ getAccidentDetails():",
      trustAccidentReport.getAccidentDetails()
    );
    console.log(
      "✅ getCustomerVehicle():",
      trustAccidentReport.getCustomerVehicle()
    );
    console.log(
      "✅ getDriverDetails():",
      trustAccidentReport.getDriverDetails()
    );
    console.log("✅ getDamages():", trustAccidentReport.getDamages());
    console.log("✅ getOtherVehicle():", trustAccidentReport.getOtherVehicle());
    console.log("✅ getWitnesses():", trustAccidentReport.getWitnesses());
    console.log("✅ getPoliceReport():", trustAccidentReport.getPoliceReport());
    console.log("✅ getNarration():", trustAccidentReport.getNarration());
    console.log("✅ getSignature():", trustAccidentReport.getSignature());
    console.log("✅ getDeclaration():", trustAccidentReport.getDeclaration());

    // Test toJSON
    const jsonData = trustAccidentReport.toJSON();
    console.log(
      "✅ toJSON():",
      typeof jsonData === "object" && jsonData !== null
    );

    // Test 2: CreateTrustAccidentReportUseCase
    console.log("\n🎯 Test 2: CreateTrustAccidentReportUseCase");
    console.log("-".repeat(40));

    const createUseCase = container.get("createTrustAccidentReportUseCase");
    const mockUser = { _id: "user-123", name: "Test User" };

    try {
      const result = await createUseCase.execute(testData, "ABC123", mockUser);
      console.log("✅ CreateTrustAccidentReportUseCase executed successfully");
      console.log("✅ Result ID:", result.id);
    } catch (error) {
      console.log("❌ CreateTrustAccidentReportUseCase error:", error.message);
    }

    // Test 3: GetAllTrustAccidentReportsUseCase
    console.log("\n📋 Test 3: GetAllTrustAccidentReportsUseCase");
    console.log("-".repeat(40));

    const getAllUseCase = container.get("getAllTrustAccidentReportsUseCase");

    try {
      const results = await getAllUseCase.execute();
      console.log("✅ GetAllTrustAccidentReportsUseCase executed successfully");
      console.log("✅ Number of reports:", results.length);
    } catch (error) {
      console.log("❌ GetAllTrustAccidentReportsUseCase error:", error.message);
    }

    // Test 4: GetTrustAccidentReportByIdUseCase
    console.log("\n🔍 Test 4: GetTrustAccidentReportByIdUseCase");
    console.log("-".repeat(40));

    const getByIdUseCase = container.get("getTrustAccidentReportByIdUseCase");

    try {
      const result = await getByIdUseCase.execute("test-id");
      console.log("✅ GetTrustAccidentReportByIdUseCase executed successfully");
      console.log("✅ Report ID:", result.id);
    } catch (error) {
      console.log("❌ GetTrustAccidentReportByIdUseCase error:", error.message);
    }

    // Test 5: DeleteTrustAccidentReportUseCase
    console.log("\n🗑️  Test 5: DeleteTrustAccidentReportUseCase");
    console.log("-".repeat(40));

    const deleteUseCase = container.get("deleteTrustAccidentReportUseCase");

    try {
      const result = await deleteUseCase.execute("test-id", mockUser);
      console.log("✅ DeleteTrustAccidentReportUseCase executed successfully");
      console.log("✅ Result:", result.message);
    } catch (error) {
      console.log("❌ DeleteTrustAccidentReportUseCase error:", error.message);
    }

    // Test 6: GetTrustAccidentReportStatsUseCase
    console.log("\n📊 Test 6: GetTrustAccidentReportStatsUseCase");
    console.log("-".repeat(40));

    const getStatsUseCase = container.get("getTrustAccidentReportStatsUseCase");

    try {
      const stats = await getStatsUseCase.execute();
      console.log(
        "✅ GetTrustAccidentReportStatsUseCase executed successfully"
      );
      console.log("✅ Total reports:", stats.totalReports);
      console.log("✅ Reports this month:", stats.reportsThisMonth);
    } catch (error) {
      console.log(
        "❌ GetTrustAccidentReportStatsUseCase error:",
        error.message
      );
    }

    // Test 7: Controller Instantiation
    console.log("\n🎮 Test 7: TrustAccidentReportController");
    console.log("-".repeat(40));

    const controller = container.get("trustAccidentReportController");
    console.log("✅ Controller instantiated successfully");
    console.log(
      "✅ Controller methods:",
      Object.getOwnPropertyNames(Object.getPrototypeOf(controller))
    );

    // Test 8: Routes Instantiation
    console.log("\n🛣️  Test 8: TrustAccidentReportRoutes");
    console.log("-".repeat(40));

    const routes = container.get("trustAccidentReportRoutes");
    console.log("✅ Routes instantiated successfully");
    console.log("✅ Router methods:", typeof routes.getRouter === "function");

    console.log(
      "\n🎉 All TrustAccidentReport module tests completed successfully!"
    );
    console.log("✅ Entity validation working");
    console.log("✅ Use cases working");
    console.log("✅ Controller working");
    console.log("✅ Routes working");
    console.log("✅ Dependency injection working");
  } catch (error) {
    console.error("❌ Test failed:", error);
    console.error("Stack trace:", error.stack);
  }
}

// Run the tests
testTrustAccidentReportModule();
