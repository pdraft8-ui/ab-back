import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Test the HolyLandsReport module with the new modular structure
async function testHolyLandsReportModule() {
  console.log(
    "🧪 Testing HolyLandsReport Module with Modular Clean Architecture"
  );
  console.log("=".repeat(80));

  try {
    // Import the minimal container for testing
    const { getHolyLandsReportContainerMinimal } = await import(
      "./src/modules/HolyLandsReport/index.js"
    );
    const container = await getHolyLandsReportContainerMinimal();

    // Test 1: HolyLandsReport Entity
    console.log("\n📋 Test 1: HolyLandsReport Entity");
    console.log("-".repeat(50));

    const { HolyLandsReport } = await import(
      "./src/modules/HolyLandsReport/domain/entities/HolyLandsReport.entity.js"
    );

    const testAccidentData = {
      customerId: "test-customer-id",
      insuranceDetails: {
        policyNumber: "POL123456",
        insuranceDuration: "1 Year",
        fromDate: new Date("2024-01-01"),
        toDate: new Date("2024-12-31"),
        insuranceType: "Comprehensive",
        vehicleNumber: "ABC123",
      },
      vehicleDetails: {
        vehicleColor: "White",
        vehicleBranch: "Test Branch",
        chassisNumber: "CHS123456",
        plateNumber: "ABC123",
        modelYear: 2020,
        vehicleUsage: "Personal",
      },
      ownerAndDriverDetails: {
        ownerName: "Test Owner",
        driverName: "Test Driver",
        driverID: "DRV123456",
        driverLicenseNumber: "DL123456",
        driverLicenseGrade: "B",
        licenseIssueDate: new Date("2020-01-01"),
        licenseExpiryDate: new Date("2025-12-31"),
        driverPhone: "+1234567890",
        driverAddress: "Test Address",
        driverProfession: "Engineer",
        licenseIssuePlace: "Test City",
      },
      accidentDetails: {
        accidentDate: new Date("2024-01-15"),
        accidentTime: "14:30",
        speedAtTime: "40 km/h",
        numberOfPassengers: 2,
        lightsUsed: "Headlights",
        directionFrom: "North",
        accidentDirection: "South",
        accidentLocation: "Test Street, Test City",
        accidentDetailsText: "Front collision",
        accidentCause: "Driver error",
        notesByBranchManager: "Test notes",
        policeNotified: true,
        whoInformedPolice: "Driver",
      },
      otherVehicles: [
        {
          vehicleNumber: "XYZ789",
          vehicleType: "SUV",
          make: "Honda",
          model: "CR-V",
          plateNumber: "XYZ789",
          insuranceCompany: "Other Insurance",
          driverName: "Other Driver",
          driverAddress: "Other Address",
          details: "Minor damage",
        },
      ],
      involvementDetails: {
        damageToUserCar: "Front bumper damage",
        damageToThirdParty: "Minor scratches",
      },
      injuries: [
        {
          name: "Test Injury",
          age: 25,
          address: "Test Address",
          occupation: "Student",
          maritalStatus: "Single",
          injuryType: "Minor bruising",
        },
      ],
      injuredNamesAndAddresses: "Test Injured Person, Test Address",
      passengerNamesAndAddresses: "Passenger 1, Passenger 2",
      additionalDetails: "Test additional details",
      signature: "Test Signature",
      signatureDate: new Date("2024-01-15"),
      employeeNotes: "Test employee notes",
      employeeSignature: "Test Employee Signature",
      employeeDate: new Date("2024-01-15"),
    };

    const accidentReport = new HolyLandsReport(testAccidentData);

    console.log("✅ Entity created successfully");
    console.log("✅ Entity ID:", accidentReport.getId());
    console.log("✅ Customer ID:", accidentReport.getCustomerId());
    console.log(
      "✅ Insurance Policy Number:",
      accidentReport.getInsuranceDetails().policyNumber
    );
    console.log(
      "✅ Vehicle Plate Number:",
      accidentReport.getVehicleDetails().plateNumber
    );
    console.log(
      "✅ Owner Name:",
      accidentReport.getOwnerAndDriverDetails().ownerName
    );
    console.log("✅ Is Valid:", accidentReport.isValid());
    console.log(
      "✅ Other Vehicles Count:",
      accidentReport.getOtherVehicles().length
    );
    console.log("✅ Injuries Count:", accidentReport.getInjuries().length);

    // Test entity methods
    console.log("\n🔧 Testing Entity Methods:");
    console.log(
      "✅ Add Other Vehicle:",
      accidentReport.addOtherVehicle({
        vehicleNumber: "NEW123",
        vehicleType: "Sedan",
        make: "Toyota",
        model: "Camry",
        plateNumber: "NEW123",
        insuranceCompany: "Test Insurance",
        driverName: "New Driver",
        driverAddress: "New Address",
        details: "Test details",
      })
    );
    console.log(
      "✅ Add Injury:",
      accidentReport.addInjury({
        name: "New Injury",
        age: 30,
        address: "New Address",
        occupation: "Engineer",
        maritalStatus: "Married",
        injuryType: "Minor",
      })
    );
    console.log(
      "✅ Set Signature:",
      accidentReport.setSignature("New Signature", new Date())
    );
    console.log(
      "✅ Set Employee Signature:",
      accidentReport.setEmployeeSignature("New Employee Signature", new Date())
    );

    // Test 2: Use Cases
    console.log("\n📋 Test 2: Use Cases");
    console.log("-".repeat(50));

    // Test CreateHolyLandsReportUseCase
    console.log("\n🔧 Testing CreateHolyLandsReportUseCase:");
    const createUseCase = container.get("createHolyLandsReportUseCase");
    const createdReport = await createUseCase.execute(
      testAccidentData,
      "ABC123",
      "test-user-id",
      "Test User"
    );
    console.log("✅ Create Use Case executed successfully");
    console.log("✅ Created Report ID:", createdReport.getId());

    // Test GetAllHolyLandsReportsUseCase
    console.log("\n🔧 Testing GetAllHolyLandsReportsUseCase:");
    const getAllUseCase = container.get("getAllHolyLandsReportsUseCase");
    const allReports = await getAllUseCase.execute();
    console.log("✅ Get All Use Case executed successfully");
    console.log("✅ Reports Count:", allReports.length);

    // Test GetHolyLandsReportByIdUseCase
    console.log("\n🔧 Testing GetHolyLandsReportByIdUseCase:");
    const getByIdUseCase = container.get("getHolyLandsReportByIdUseCase");
    const foundReport = await getByIdUseCase.execute("test-id");
    console.log("✅ Get By ID Use Case executed successfully");
    console.log("✅ Found Report ID:", foundReport.getId());

    // Test DeleteHolyLandsReportUseCase
    console.log("\n🔧 Testing DeleteHolyLandsReportUseCase:");
    const deleteUseCase = container.get("deleteHolyLandsReportUseCase");
    const deleteResult = await deleteUseCase.execute(
      "test-id",
      "test-user-id",
      "Test User"
    );
    console.log("✅ Delete Use Case executed successfully");
    console.log("✅ Delete Result:", deleteResult.message);

    // Test GetHolyLandsReportStatsUseCase
    console.log("\n🔧 Testing GetHolyLandsReportStatsUseCase:");
    const getStatsUseCase = container.get("getHolyLandsReportStatsUseCase");
    const stats = await getStatsUseCase.execute();
    console.log("✅ Get Stats Use Case executed successfully");
    console.log("✅ Total Reports:", stats.totalReports);
    console.log("✅ Reports This Month:", stats.reportsThisMonth);
    console.log("✅ Reports This Year:", stats.reportsThisYear);
    console.log("✅ Average Other Vehicles:", stats.averageOtherVehicles);
    console.log("✅ Average Injuries:", stats.averageInjuries);

    // Test 3: Controller
    console.log("\n📋 Test 3: Controller");
    console.log("-".repeat(50));

    const controller = container.get("holyLandsReportController");
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

    const routes = container.get("holyLandsReportRoutes");
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

    console.log("\n🎉 All HolyLandsReport Module Tests Passed!");
    console.log("=".repeat(80));
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  }
}

// Run the test
testHolyLandsReportModule();
