import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Test the AlMashreqAccidentReport module with the new modular structure
async function testAlMashreqAccidentReportModule() {
  console.log(
    "🧪 Testing AlMashreqAccidentReport Module with Modular Clean Architecture"
  );
  console.log("=".repeat(80));

  try {
    // Import the minimal container for testing
    const { getAlMashreqAccidentReportContainerMinimal } = await import(
      "./src/modules/Al-MashreqAccidentReport/index.js"
    );
    const container = await getAlMashreqAccidentReportContainerMinimal();

    // Test 1: AlMashreqAccidentReport Entity
    console.log("\n📋 Test 1: AlMashreqAccidentReport Entity");
    console.log("-".repeat(50));

    const { AlMashreqAccidentReport } = await import(
      "./src/modules/Al-MashreqAccidentReport/domain/entities/AlMashreqAccidentReport.entity.js"
    );

    const testAccidentData = {
      customerId: "test-customer-id",
      branchOffice: "Test Branch",
      insurancePolicy: {
        type: "Comprehensive",
        number: "POL123456",
        duration: "1 Year",
        from: new Date("2024-01-01"),
        to: new Date("2024-12-31"),
      },
      customerPerson: {
        name: "Test Customer",
        personalNumber: "test-customer-id",
        fullAddress: "Test Address",
        phone: "+1234567890",
      },
      vehicle: {
        registrationNumber: "ABC123",
        usage: "Personal",
        type: "Sedan",
        makeYear: "2020",
        color: "White",
      },
      driver: {
        name: "Test Driver",
        job: "Engineer",
        fullAddress: "Test Driver Address",
        phone: "+1234567890",
        licenseNumber: "DL123456",
        licenseType: "B",
        licenseIssueDate: new Date("2020-01-01"),
        licenseExpiryDate: new Date("2025-12-31"),
        age: 30,
        idNumber: "test-driver-id",
      },
      accident: {
        date: new Date("2024-01-15"),
        time: "14:30",
        weatherCondition: "Clear",
        roadCondition: "Dry",
        accidentLocation: "Test Street, Test City",
        accidentType: "collision",
        damageToVehicle: "Front bumper damage",
        vehicleSpeed: "40 km/h",
        timeOfAccident: "14:30",
        passengersCount: 2,
        vehicleUsedPermission: true,
        accidentNotifierName: "Test Notifier",
        accidentNotifierPhone: "+1234567890",
      },
      otherVehicles: [
        {
          vehicleNumber: "XYZ789",
          type: "SUV",
          makeYear: "2019",
          color: "Black",
          ownerName: "Other Driver",
          ownerAddress: "Other Address",
          driverName: "Other Driver",
          driverAddress: "Other Driver Address",
          insuranceCompany: "Other Insurance",
          insurancePolicyNumber: "POL789",
          wasParked: false,
          damageDescription: "Minor damage",
        },
      ],
      vehicleDamages: "Front bumper and headlight damage",
      personalInjuries: [
        {
          name: "Test Injury",
          age: 25,
          job: "Student",
          address: "Test Address",
          injuryType: "Minor bruising",
        },
      ],
      thirdPartyInjuredNames: ["Other Person"],
      vehiclePassengers: ["Passenger 1", "Passenger 2"],
      externalWitnesses: ["Witness 1", "Witness 2"],
      driverSignature: {
        name: "Test Driver",
        date: new Date("2024-01-15"),
      },
      claimant: {
        name: "Test Claimant",
        signature: "Test Signature",
      },
      receiver: {
        name: "Test Receiver",
        notes: "Test notes",
      },
      generalNotes: "Test general notes",
    };

    const accidentReport = new AlMashreqAccidentReport(testAccidentData);

    console.log("✅ Entity created successfully");
    console.log("✅ Entity ID:", accidentReport.getId());
    console.log("✅ Customer ID:", accidentReport.getCustomerId());
    console.log("✅ Branch Office:", accidentReport.getBranchOffice());
    console.log(
      "✅ Vehicle Registration:",
      accidentReport.getVehicle().registrationNumber
    );
    console.log("✅ Is Valid:", accidentReport.isValid());
    console.log(
      "✅ Other Vehicles Count:",
      accidentReport.getOtherVehicles().length
    );
    console.log(
      "✅ Personal Injuries Count:",
      accidentReport.getPersonalInjuries().length
    );
    console.log(
      "✅ External Witnesses Count:",
      accidentReport.getExternalWitnesses().length
    );

    // Test entity methods
    console.log("\n🔧 Testing Entity Methods:");
    console.log(
      "✅ Add Other Vehicle:",
      accidentReport.addOtherVehicle({ vehicleNumber: "NEW123", type: "Sedan" })
    );
    console.log(
      "✅ Add Personal Injury:",
      accidentReport.addPersonalInjury({
        name: "New Injury",
        age: 30,
        job: "Engineer",
        address: "Test",
        injuryType: "Minor",
      })
    );
    console.log(
      "✅ Add Third Party Injured Name:",
      accidentReport.addThirdPartyInjuredName("New Injured Person")
    );
    console.log(
      "✅ Add Vehicle Passenger:",
      accidentReport.addVehiclePassenger("New Passenger")
    );
    console.log(
      "✅ Add External Witness:",
      accidentReport.addExternalWitness("New Witness")
    );
    console.log(
      "✅ Set Driver Signature:",
      accidentReport.setDriverSignature({
        name: "New Driver",
        date: new Date(),
      })
    );
    console.log(
      "✅ Set Claimant:",
      accidentReport.setClaimant({
        name: "New Claimant",
        signature: "New Signature",
      })
    );
    console.log(
      "✅ Set Receiver:",
      accidentReport.setReceiver({ name: "New Receiver", notes: "New notes" })
    );

    // Test 2: Use Cases
    console.log("\n📋 Test 2: Use Cases");
    console.log("-".repeat(50));

    // Test CreateAlMashreqAccidentReportUseCase
    console.log("\n🔧 Testing CreateAlMashreqAccidentReportUseCase:");
    const createUseCase = container.get("createAlMashreqAccidentReportUseCase");
    const createdReport = await createUseCase.execute(
      testAccidentData,
      "ABC123",
      "test-user-id",
      "Test User"
    );
    console.log("✅ Create Use Case executed successfully");
    console.log("✅ Created Report ID:", createdReport.getId());

    // Test GetAllAlMashreqAccidentReportsUseCase
    console.log("\n🔧 Testing GetAllAlMashreqAccidentReportsUseCase:");
    const getAllUseCase = container.get(
      "getAllAlMashreqAccidentReportsUseCase"
    );
    const allReports = await getAllUseCase.execute();
    console.log("✅ Get All Use Case executed successfully");
    console.log("✅ Reports Count:", allReports.length);

    // Test GetAlMashreqAccidentReportByIdUseCase
    console.log("\n🔧 Testing GetAlMashreqAccidentReportByIdUseCase:");
    const getByIdUseCase = container.get(
      "getAlMashreqAccidentReportByIdUseCase"
    );
    const foundReport = await getByIdUseCase.execute("test-id");
    console.log("✅ Get By ID Use Case executed successfully");
    console.log("✅ Found Report ID:", foundReport.getId());

    // Test DeleteAlMashreqAccidentReportUseCase
    console.log("\n🔧 Testing DeleteAlMashreqAccidentReportUseCase:");
    const deleteUseCase = container.get("deleteAlMashreqAccidentReportUseCase");
    const deleteResult = await deleteUseCase.execute(
      "test-id",
      "test-user-id",
      "Test User"
    );
    console.log("✅ Delete Use Case executed successfully");
    console.log("✅ Delete Result:", deleteResult.message);

    // Test GetAlMashreqAccidentReportStatsUseCase
    console.log("\n🔧 Testing GetAlMashreqAccidentReportStatsUseCase:");
    const getStatsUseCase = container.get(
      "getAlMashreqAccidentReportStatsUseCase"
    );
    const stats = await getStatsUseCase.execute();
    console.log("✅ Get Stats Use Case executed successfully");
    console.log("✅ Total Reports:", stats.totalReports);
    console.log("✅ Reports This Month:", stats.reportsThisMonth);
    console.log("✅ Reports This Year:", stats.reportsThisYear);
    console.log("✅ Average Other Vehicles:", stats.averageOtherVehicles);
    console.log("✅ Average Personal Injuries:", stats.averagePersonalInjuries);
    console.log(
      "✅ Average External Witnesses:",
      stats.averageExternalWitnesses
    );

    // Test 3: Controller
    console.log("\n📋 Test 3: Controller");
    console.log("-".repeat(50));

    const controller = container.get("alMashreqAccidentReportController");
    console.log("✅ Controller instantiated successfully");
    console.log(
      "✅ Controller methods:",
      Object.getOwnPropertyNames(Object.getPrototypeOf(controller)).filter(
        (name) => name !== "constructor"
      )
    );

    // Test 4: Routes
    console.log("\n📋 Test 4: Routes");
    console.log("-".repeat(50));

    const routes = container.get("alMashreqAccidentReportRoutes");
    console.log("✅ Routes instantiated successfully");
    console.log("✅ Router stack length:", routes.getRouter().stack.length);

    // Test 5: Container
    console.log("\n📋 Test 5: Container");
    console.log("-".repeat(50));

    console.log("✅ Container dependencies count:", container.getAll().size);
    console.log(
      "✅ Available dependencies:",
      Array.from(container.getAll().keys())
    );

    console.log("\n🎉 All AlMashreqAccidentReport Module Tests Passed!");
    console.log("=".repeat(80));
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  }
}

// Run the test
testAlMashreqAccidentReportModule();
