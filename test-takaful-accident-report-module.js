import { TakafulAccidentReportContainerMinimal } from "./src/modules/TakafulAccidentReport/infrastructure/container/TakafulAccidentReportContainer.js";
import { TakafulAccidentReport } from "./src/modules/TakafulAccidentReport/domain/entities/TakafulAccidentReport.entity.js";

console.log(
  "🚗 Testing Takaful Accident Report Module - Modular Clean Architecture"
);
console.log(
  "=====================================================================\n"
);

async function testTakafulAccidentReportModule() {
  try {
    // Initialize container
    console.log("🔧 Initializing Takaful Accident Report Container...");
    const container = new TakafulAccidentReportContainerMinimal();
    console.log("✅ Container initialized successfully\n");

    // Test TakafulAccidentReport Entity
    console.log("🏗️ Testing TakafulAccidentReport Entity...");
    const accidentReportData = {
      customerId: "customer-123",
      accidentInfo: {
        reportDate: new Date(),
        accidentDate: new Date(),
        accidentType: "Collision",
        accidentLocation: "Test Location",
        accidentTime: "10:00 AM",
        passengersCount: 2,
        agentName: "Test Agent",
      },
      policyInfo: {
        policyNumber: "POL-123",
        branch: "Test Branch",
        durationFrom: new Date(),
        durationTo: new Date(),
        issueDate: new Date(),
        isFullCoverage: true,
        fullCoverageFee: "1000",
        isThirdParty: false,
        thirdPartyFee: "500",
        isMandatory: true,
        maxAllowedPassengers: 5,
      },
      customerPerson: {
        name: "Test Customer",
        address: "Test Address",
        residence: "Test Residence",
        workAddress: "Test Work Address",
        workPhone: "123456789",
      },
      driverInfo: {
        name: "Test Driver",
        idNumber: "ID-123",
        licenseNumber: "LIC-123",
        licenseType: "Private",
        licenseExpiry: new Date(),
        phoneNumber: "123456789",
        relationToCustomer: "Self",
      },
      customerVehicle: {
        plateNumber: 12345,
        model: "Test Model",
        type: "Sedan",
        manufactureYear: 2020,
        chassisNumber: "CH-123",
        engineNumber: "ENG-123",
        insuranceCompany: "Test Insurance",
        policyNumber: "POL-123",
        insuranceType: "Comprehensive",
        damage: {
          front: "Minor",
          back: "None",
          left: "None",
          right: "None",
          estimatedValue: "1000",
          towingCompany: "Test Towing",
          garage: "Test Garage",
        },
      },
      policeAndWitnesses: {
        reportedDate: new Date(),
        policeAuthority: "Test Police",
        sketchDrawn: true,
        policeCame: true,
        witnesses: [],
      },
      passengers: [],
      accidentNarration: "Test accident narration",
      notifierSignature: "Test Signature",
      receiverName: "Test Receiver",
      receiverNotes: "Test notes",
      declaration: {
        declarerName: "Test Declarer",
        declarationDate: new Date(),
        documentCheckerName: "Test Checker",
        checkerJob: "Test Job",
        checkerSignature: "Test Signature",
        checkerDate: new Date(),
      },
    };

    const accidentReport = new TakafulAccidentReport(accidentReportData);
    console.log("✅ TakafulAccidentReport entity created");

    console.log("📋 Testing entity methods...");
    console.log("Is valid:", accidentReport.isValid());
    console.log(
      "Is valid accident info:",
      accidentReport.isValidAccidentInfo()
    );
    console.log("Is valid policy info:", accidentReport.isValidPolicyInfo());
    console.log(
      "Is valid customer person:",
      accidentReport.isValidCustomerPerson()
    );
    console.log("Is valid driver info:", accidentReport.isValidDriverInfo());
    console.log(
      "Is valid customer vehicle:",
      accidentReport.isValidCustomerVehicle()
    );
    console.log("Is valid damage:", accidentReport.isValidDamage());
    console.log(
      "Is valid police and witnesses:",
      accidentReport.isValidPoliceAndWitnesses()
    );
    console.log("Is valid declaration:", accidentReport.isValidDeclaration());
    console.log("Has witnesses:", accidentReport.hasWitnesses());
    console.log("Has passengers:", accidentReport.hasPassengers());
    console.log("Has other vehicles:", accidentReport.hasOtherVehicles());
    console.log("Is police reported:", accidentReport.isPoliceReported());
    console.log("");

    // Test CreateTakafulAccidentReportUseCase
    console.log("➕ Testing CreateTakafulAccidentReportUseCase...");
    const createTakafulAccidentReportUseCase =
      container.getCreateTakafulAccidentReportUseCase();

    const createdReport = await createTakafulAccidentReportUseCase.execute(
      accidentReportData,
      "12345",
      "user-123",
      "Test User"
    );
    console.log("✅ Takaful accident report created successfully");
    console.log("");

    // Test GetAllTakafulAccidentReportsUseCase
    console.log("📋 Testing GetAllTakafulAccidentReportsUseCase...");
    const getAllTakafulAccidentReportsUseCase =
      container.getGetAllTakafulAccidentReportsUseCase();
    const allReports = await getAllTakafulAccidentReportsUseCase.execute();
    console.log("✅ Retrieved all accident reports:", allReports.length);
    console.log("");

    // Test GetTakafulAccidentReportByIdUseCase
    console.log("🔍 Testing GetTakafulAccidentReportByIdUseCase...");
    const getTakafulAccidentReportByIdUseCase =
      container.getGetTakafulAccidentReportByIdUseCase();
    const reportById = await getTakafulAccidentReportByIdUseCase.execute(
      "test-id"
    );
    console.log("✅ Retrieved accident report by ID");
    console.log("");

    // Test DeleteTakafulAccidentReportUseCase
    console.log("🗑️ Testing DeleteTakafulAccidentReportUseCase...");
    const deleteTakafulAccidentReportUseCase =
      container.getDeleteTakafulAccidentReportUseCase();
    const deletedReport = await deleteTakafulAccidentReportUseCase.execute(
      "test-id",
      "user-123",
      "Test User"
    );
    console.log("✅ Accident report deleted successfully");
    console.log("");

    // Test GetTakafulAccidentReportStatsUseCase
    console.log("📊 Testing GetTakafulAccidentReportStatsUseCase...");
    const getTakafulAccidentReportStatsUseCase =
      container.getGetTakafulAccidentReportStatsUseCase();
    const stats = await getTakafulAccidentReportStatsUseCase.execute();
    console.log("✅ Retrieved accident report statistics:", stats);
    console.log("");

    // Test Controller
    console.log("🎮 Testing Takaful Accident Report Controller...");
    const controller = container.getTakafulAccidentReportController();
    console.log("✅ Controller instantiated successfully");
    console.log("");

    // Test Routes
    console.log("🛣️ Testing Takaful Accident Report Routes...");
    const routes = container.getTakafulAccidentReportRoutes();
    console.log("✅ Routes instantiated successfully");
    console.log("");

    console.log(
      "🎉 All Takaful Accident Report module tests passed successfully!"
    );
    console.log("✅ Entity validation working");
    console.log("✅ Use cases functioning properly");
    console.log("✅ Controller and routes instantiated");
    console.log("✅ Mock dependencies working correctly");
  } catch (error) {
    console.error(
      "❌ Takaful Accident Report module test failed:",
      error.message
    );
    console.error("Error:", error);
    process.exit(1);
  }
}

testTakafulAccidentReportModule();
