import {
  DocumentSettingsContainerMinimal,
  DocumentSettings,
} from "./src/modules/DocumentSettings/index.js";

console.log("📄 Testing Document Settings Module - Modular Clean Architecture");
console.log("=".repeat(60));

async function testDocumentSettingsModule() {
  try {
    // Initialize container
    console.log("\n🔧 Initializing Document Settings Container...");
    const container = new DocumentSettingsContainerMinimal();
    console.log("✅ Container initialized successfully");

    // Test Document Settings Entity
    console.log("\n🏗️ Testing Document Settings Entity...");
    const settingsData = {
      documentType: "invoice",
      header: {
        companyName: "Test Insurance Co",
        companyAddress: "123 Test St",
        companyPhone: "+1234567890",
        companyEmail: "test@insurance.com",
        companyWebsite: "www.testinsurance.com",
      },
      footer: {
        footerText: "Thank you for your business",
        termsAndConditions: "Standard terms apply",
      },
    };

    const documentSettings = new DocumentSettings(settingsData);
    console.log("✅ Document Settings entity created");

    // Test entity methods
    console.log("📋 Testing entity methods...");
    console.log("Is valid:", documentSettings.isValid());
    console.log(
      "Is valid document type:",
      documentSettings.isValidDocumentType()
    );
    console.log("Has header logo:", documentSettings.hasHeaderLogo());
    console.log("Has footer logo:", documentSettings.hasFooterLogo());
    console.log("Has signature:", documentSettings.hasSignature());
    console.log("Has company info:", documentSettings.hasCompanyInfo());
    console.log("Company name:", documentSettings.getCompanyName());
    console.log("Footer text:", documentSettings.getFooterText());

    // Test CreateDocumentSettingsUseCase
    console.log("\n➕ Testing CreateDocumentSettingsUseCase...");
    const createDocumentSettingsUseCase =
      container.getCreateDocumentSettingsUseCase();
    const createdSettings = await createDocumentSettingsUseCase.execute(
      settingsData,
      "user-123",
      "Test User"
    );
    console.log("✅ Document settings created successfully");

    // Test GetAllDocumentSettingsUseCase
    console.log("\n📋 Testing GetAllDocumentSettingsUseCase...");
    const getAllDocumentSettingsUseCase =
      container.getGetAllDocumentSettingsUseCase();
    const allSettings = await getAllDocumentSettingsUseCase.execute();
    console.log("✅ Retrieved all document settings:", allSettings.length);

    // Test GetDocumentSettingsByIdUseCase
    console.log("\n🔍 Testing GetDocumentSettingsByIdUseCase...");
    const getDocumentSettingsByIdUseCase =
      container.getGetDocumentSettingsByIdUseCase();
    const settingsById = await getDocumentSettingsByIdUseCase.execute("1");
    console.log("✅ Retrieved document settings by ID");

    // Test GetDocumentSettingsByTypeUseCase
    console.log("\n📄 Testing GetDocumentSettingsByTypeUseCase...");
    const getDocumentSettingsByTypeUseCase =
      container.getGetDocumentSettingsByTypeUseCase();
    const settingsByType = await getDocumentSettingsByTypeUseCase.execute(
      "invoice"
    );
    console.log("✅ Retrieved document settings by type");

    // Test UpdateDocumentSettingsUseCase
    console.log("\n✏️ Testing UpdateDocumentSettingsUseCase...");
    const updateDocumentSettingsUseCase =
      container.getUpdateDocumentSettingsUseCase();
    const updateData = {
      header: {
        companyName: "Updated Insurance Co",
      },
    };
    const updatedSettings = await updateDocumentSettingsUseCase.execute(
      "1",
      updateData,
      "user-123",
      "Test User"
    );
    console.log("✅ Document settings updated successfully");

    // Test ToggleDocumentSettingsStatusUseCase
    console.log("\n🔄 Testing ToggleDocumentSettingsStatusUseCase...");
    const toggleDocumentSettingsStatusUseCase =
      container.getToggleDocumentSettingsStatusUseCase();
    const toggledSettings = await toggleDocumentSettingsStatusUseCase.execute(
      "1",
      "user-123",
      "Test User"
    );
    console.log("✅ Document settings status toggled successfully");

    // Test UploadHeaderLogoUseCase
    console.log("\n🖼️ Testing UploadHeaderLogoUseCase...");
    const uploadHeaderLogoUseCase = container.getUploadHeaderLogoUseCase();
    const headerLogoData = {
      url: "uploads/logos/header-logo.png",
      publicId: "header-logo-123",
    };
    const settingsWithHeaderLogo = await uploadHeaderLogoUseCase.execute(
      "invoice",
      headerLogoData,
      "user-123",
      "Test User"
    );
    console.log("✅ Header logo uploaded successfully");

    // Test UploadFooterLogoUseCase
    console.log("\n🖼️ Testing UploadFooterLogoUseCase...");
    const uploadFooterLogoUseCase = container.getUploadFooterLogoUseCase();
    const footerLogoData = {
      url: "uploads/logos/footer-logo.png",
      publicId: "footer-logo-123",
    };
    const settingsWithFooterLogo = await uploadFooterLogoUseCase.execute(
      "invoice",
      footerLogoData,
      "user-123",
      "Test User"
    );
    console.log("✅ Footer logo uploaded successfully");

    // Test UploadSignatureUseCase
    console.log("\n✍️ Testing UploadSignatureUseCase...");
    const uploadSignatureUseCase = container.getUploadSignatureUseCase();
    const signatureData = {
      url: "uploads/signatures/signature.png",
      publicId: "signature-123",
    };
    const settingsWithSignature = await uploadSignatureUseCase.execute(
      "invoice",
      signatureData,
      "user-123",
      "Test User"
    );
    console.log("✅ Signature uploaded successfully");

    // Test GetDocumentSettingsStatsUseCase
    console.log("\n📊 Testing GetDocumentSettingsStatsUseCase...");
    const getDocumentSettingsStatsUseCase =
      container.getGetDocumentSettingsStatsUseCase();
    const stats = await getDocumentSettingsStatsUseCase.execute();
    console.log("✅ Document settings statistics retrieved:", stats);

    // Test DeleteDocumentSettingsUseCase
    console.log("\n🗑️ Testing DeleteDocumentSettingsUseCase...");
    const deleteDocumentSettingsUseCase =
      container.getDeleteDocumentSettingsUseCase();
    const deleteResult = await deleteDocumentSettingsUseCase.execute(
      "1",
      "user-123",
      "Test User"
    );
    console.log("✅ Document settings deleted successfully");

    // Test Controller
    console.log("\n🎮 Testing Document Settings Controller...");
    const controller = container.getDocumentSettingsController();
    console.log("✅ Controller initialized successfully");

    // Test Routes
    console.log("\n🛣️ Testing Document Settings Routes...");
    const routes = container.getDocumentSettingsRoutes();
    console.log("✅ Routes initialized successfully");

    console.log("\n🎉 All Document Settings Module tests passed successfully!");
    console.log("=".repeat(60));
  } catch (error) {
    console.error("❌ Document Settings module test failed:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

testDocumentSettingsModule();
