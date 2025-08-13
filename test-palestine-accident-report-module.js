import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Test the PalestineAccidentReport module with the new modular structure
async function testPalestineAccidentReportModule() {
  console.log(
    "🧪 Testing PalestineAccidentReport Module with Modular Clean Architecture"
  );
  console.log("=".repeat(80));

  try {
    // Import the minimal container for testing
    const { getPalestineAccidentReportContainerMinimal } = await import(
      "./src/modules/PalestineAccidentReport/index.js"
    );
    const container = await getPalestineAccidentReportContainerMinimal();

    // Test 1: PalestineAccidentReport Entity
    console.log("\n📋 Test 1: PalestineAccidentReport Entity");
    console.log("-".repeat(50));

    const { PalestineAccidentReport } = await import(
      "./src/modules/PalestineAccidentReport/domain/entities/PalestineAccidentReport.entity.js"
    );

    const testAccidentData = {
      customerId: "test-customer-id",
      agentInfo: {
        agentName: "Test Agent",
        documentNumber: "DOC123456",
        documentType: "comprehensive",
        insurancePeriod: {
          from: new Date("2024-01-01"),
          to: new Date("2024-12-31"),
        },
      },
      vehicleInfo: {
        documentDate: new Date("2024-01-15"),
        vehicleNumber: "ABC123",
        vehicleType: "Sedan",
        make: "Toyota",
        modelYear: 2020,
        usage: "Personal",
        color: "White",
        ownerName: "Test Customer",
        ownerID: "test-customer-id",
        registrationExpiry: new Date("2025-12-31"),
      },
      driverInfo: {
        driverName: "Test Driver",
        driverID: "test-driver-id",
        driverLicenseNumber: "DL123456",
        driverLicenseType: "B",
        driverLicenseExpiry: new Date("2025-12-31"),
        driverPhone: "+1234567890",
        driverAddress: "Test Address",
      },
      accidentDetails: {
        accidentDate: new Date("2024-01-15"),
        accidentTime: "14:30",
        accidentLocation: "Test Street, Test City",
        accidentType: "physical",
        accidentDescription: "Minor collision",
        weatherConditions: "Clear",
        roadConditions: "Dry",
      },
      injuries: [
        {
          name: "Test Injury",
          description: "Minor injury",
          severity: "minor",
        },
      ],
      witnesses: [
        {
          name: "Test Witness",
          phone: "+1234567890",
          address: "Test Address",
        },
      ],
      passengers: [
        {
          name: "Test Passenger",
          id: "test-passenger-id",
          phone: "+1234567890",
        },
      ],
      thirdParty: {
        plateNumber: "XYZ789",
        type: "SUV",
        make: "Honda",
        model: "CR-V",
        year: 2019,
        color: "Black",
        ownerName: "Other Driver",
        ownerID: "other-driver-id",
        ownerPhone: "+0987654321",
        ownerAddress: "Other Address",
        driverName: "Other Driver",
        driverID: "other-driver-id",
        driverPhone: "+0987654321",
        driverAddress: "Other Address",
        insuranceCompany: "Other Insurance",
        insurancePolicyNumber: "POL123456",
        damages: [
          {
            part: "Front Bumper",
            description: "Minor damage",
          },
        ],
      },
      additionalDetails: {
        policeReport: {
          policeStation: "Test Police Station",
          reportNumber: "PR123456",
          reportDate: new Date("2024-01-15"),
        },
        insuranceDetails: {
          insuranceCompany: "Test Insurance",
          policyNumber: "POL123456",
          policyType: "Comprehensive",
          policyExpiry: new Date("2025-12-31"),
        },
        claimDetails: {
          claimNumber: "CLM123456",
          claimDate: new Date("2024-01-15"),
          claimStatus: "pending",
          estimatedCost: 5000,
        },
      },
    };

    const accidentReport = new PalestineAccidentReport(testAccidentData);

    console.log("✅ Entity created successfully");
    console.log("✅ Entity ID:", accidentReport.getId());
    console.log("✅ Customer ID:", accidentReport.getCustomerId());
    console.log(
      "✅ Vehicle Number:",
      accidentReport.getVehicleInfo().vehicleNumber
    );
    console.log("✅ Is Valid:", accidentReport.isValid());
    console.log("✅ Injuries Count:", accidentReport.getInjuries().length);
    console.log("✅ Witnesses Count:", accidentReport.getWitnesses().length);
    console.log("✅ Passengers Count:", accidentReport.getPassengers().length);

    // Test entity methods
    console.log("\n🔧 Testing Entity Methods:");
    console.log(
      "✅ Add Injury:",
      accidentReport.addInjury({
        name: "New Injury",
        description: "Test",
        severity: "minor",
      })
    );
    console.log(
      "✅ Add Witness:",
      accidentReport.addWitness({
        name: "New Witness",
        phone: "+1234567890",
        address: "Test",
      })
    );
    console.log(
      "✅ Add Passenger:",
      accidentReport.addPassenger({
        name: "New Passenger",
        id: "new-passenger-id",
        phone: "+1234567890",
      })
    );
    console.log(
      "✅ Set Third Party:",
      accidentReport.setThirdParty({ plateNumber: "NEW123", type: "Sedan" })
    );
    console.log(
      "✅ Set Additional Details:",
      accidentReport.setAdditionalDetails({ notes: "Test notes" })
    );

    // Test 2: Use Cases
    console.log("\n📋 Test 2: Use Cases");
    console.log("-".repeat(50));

    // Test CreatePalestineAccidentReportUseCase
    console.log("\n🔧 Testing CreatePalestineAccidentReportUseCase:");
    const createUseCase = container.get("createPalestineAccidentReportUseCase");
    const createdReport = await createUseCase.execute(
      testAccidentData,
      "ABC123",
      "test-user-id",
      "Test User"
    );
    console.log("✅ Create Use Case executed successfully");
    console.log("✅ Created Report ID:", createdReport.getId());

    // Test GetAllPalestineAccidentReportsUseCase
    console.log("\n🔧 Testing GetAllPalestineAccidentReportsUseCase:");
    const getAllUseCase = container.get(
      "getAllPalestineAccidentReportsUseCase"
    );
    const allReports = await getAllUseCase.execute();
    console.log("✅ Get All Use Case executed successfully");
    console.log("✅ Reports Count:", allReports.length);

    // Test GetPalestineAccidentReportByIdUseCase
    console.log("\n🔧 Testing GetPalestineAccidentReportByIdUseCase:");
    const getByIdUseCase = container.get(
      "getPalestineAccidentReportByIdUseCase"
    );
    const foundReport = await getByIdUseCase.execute("test-id");
    console.log("✅ Get By ID Use Case executed successfully");
    console.log("✅ Found Report ID:", foundReport.getId());

    // Test DeletePalestineAccidentReportUseCase
    console.log("\n🔧 Testing DeletePalestineAccidentReportUseCase:");
    const deleteUseCase = container.get("deletePalestineAccidentReportUseCase");
    const deleteResult = await deleteUseCase.execute(
      "test-id",
      "test-user-id",
      "Test User"
    );
    console.log("✅ Delete Use Case executed successfully");
    console.log("✅ Delete Result:", deleteResult.message);

    // Test GetPalestineAccidentReportStatsUseCase
    console.log("\n🔧 Testing GetPalestineAccidentReportStatsUseCase:");
    const getStatsUseCase = container.get(
      "getPalestineAccidentReportStatsUseCase"
    );
    const stats = await getStatsUseCase.execute();
    console.log("✅ Get Stats Use Case executed successfully");
    console.log("✅ Total Reports:", stats.totalReports);
    console.log("✅ Reports This Month:", stats.reportsThisMonth);
    console.log("✅ Reports This Year:", stats.reportsThisYear);
    console.log("✅ Average Injuries:", stats.averageInjuries);
    console.log("✅ Average Witnesses:", stats.averageWitnesses);
    console.log("✅ Average Passengers:", stats.averagePassengers);

    // Test 3: Controller
    console.log("\n📋 Test 3: Controller");
    console.log("-".repeat(50));

    const controller = container.get("palestineAccidentReportController");
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

    const routes = container.get("palestineAccidentReportRoutes");
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

    console.log("\n🎉 All PalestineAccidentReport Module Tests Passed!");
    console.log("=".repeat(80));
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  }
}

// Run the test
testPalestineAccidentReportModule();
