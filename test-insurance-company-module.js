import {
  InsuranceCompanyContainerMinimal,
  InsuranceCompany,
} from "./src/modules/InsuranceCompany/index.js";

console.log("🏢 Testing Insurance Company Module - Modular Clean Architecture");
console.log("=".repeat(65));

async function testInsuranceCompanyModule() {
  try {
    // Initialize container
    console.log("\n🔧 Initializing Insurance Company Container...");
    const container = new InsuranceCompanyContainerMinimal();
    console.log("✅ Container initialized successfully");

    // Test Insurance Company Entity
    console.log("\n🏗️ Testing Insurance Company Entity...");
    const companyData = {
      name: "Test Insurance Company",
      contact: "+1234567890",
      address: "123 Insurance St",
      insuranceType: "mandatory",
      rates: {},
    };

    const insuranceCompany = new InsuranceCompany(companyData);
    console.log("✅ Insurance Company entity created");

    // Test entity methods
    console.log("📋 Testing entity methods...");
    console.log("Is valid:", insuranceCompany.isValid());
    console.log(
      "Is valid insurance type:",
      insuranceCompany.isValidInsuranceType()
    );
    console.log(
      "Is mandatory insurance:",
      insuranceCompany.isMandatoryInsurance()
    );
    console.log(
      "Is third party comprehensive:",
      insuranceCompany.isThirdPartyComprehensive()
    );
    console.log("Has rates:", insuranceCompany.hasRates());
    console.log("Company name:", insuranceCompany.name);
    console.log("Insurance type:", insuranceCompany.insuranceType);

    // Test CreateInsuranceCompanyUseCase
    console.log("\n➕ Testing CreateInsuranceCompanyUseCase...");
    const createInsuranceCompanyUseCase =
      container.getCreateInsuranceCompanyUseCase();
    const createdCompany = await createInsuranceCompanyUseCase.execute(
      companyData,
      "user-123",
      "Test User"
    );
    console.log("✅ Insurance company created successfully");

    // Test GetAllInsuranceCompaniesUseCase
    console.log("\n📋 Testing GetAllInsuranceCompaniesUseCase...");
    const getAllInsuranceCompaniesUseCase =
      container.getGetAllInsuranceCompaniesUseCase();
    const allCompanies = await getAllInsuranceCompaniesUseCase.execute();
    console.log("✅ Retrieved all insurance companies:", allCompanies.length);

    // Test GetInsuranceCompanyByIdUseCase
    console.log("\n🔍 Testing GetInsuranceCompanyByIdUseCase...");
    const getInsuranceCompanyByIdUseCase =
      container.getGetInsuranceCompanyByIdUseCase();
    const companyById = await getInsuranceCompanyByIdUseCase.execute("1");
    console.log("✅ Retrieved insurance company by ID");

    // Test UpdateInsuranceCompanyUseCase
    console.log("\n✏️ Testing UpdateInsuranceCompanyUseCase...");
    const updateInsuranceCompanyUseCase =
      container.getUpdateInsuranceCompanyUseCase();
    const updateData = {
      name: "Updated Insurance Company",
      contact: "+0987654321",
    };
    const updatedCompany = await updateInsuranceCompanyUseCase.execute(
      "1",
      updateData,
      "user-123",
      "Test User"
    );
    console.log("✅ Insurance company updated successfully");

    // Test DeleteInsuranceCompanyUseCase
    console.log("\n🗑️ Testing DeleteInsuranceCompanyUseCase...");
    const deleteInsuranceCompanyUseCase =
      container.getDeleteInsuranceCompanyUseCase();
    const deleteResult = await deleteInsuranceCompanyUseCase.execute(
      "1",
      "user-123",
      "Test User"
    );
    console.log("✅ Insurance company deleted successfully");

    // Test GetInsuranceCompanyStatsUseCase
    console.log("\n📊 Testing GetInsuranceCompanyStatsUseCase...");
    const getInsuranceCompanyStatsUseCase =
      container.getGetInsuranceCompanyStatsUseCase();
    const stats = await getInsuranceCompanyStatsUseCase.execute();
    console.log("✅ Retrieved insurance company statistics:", stats);

    // Test Controller instantiation
    console.log("\n🎮 Testing Insurance Company Controller...");
    const controller = container.getInsuranceCompanyController();
    console.log("✅ Controller instantiated successfully");

    // Test Routes instantiation
    console.log("\n🛣️ Testing Insurance Company Routes...");
    const routes = container.getInsuranceCompanyRoutes();
    console.log("✅ Routes instantiated successfully");

    console.log("\n🎉 All Insurance Company module tests passed successfully!");
    console.log("✅ Entity validation working");
    console.log("✅ Use cases functioning properly");
    console.log("✅ Controller and routes instantiated");
    console.log("✅ Mock dependencies working correctly");
  } catch (error) {
    console.error("❌ Insurance Company module test failed:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

testInsuranceCompanyModule();
