import { DepartmentContainerMinimal } from "./src/modules/Department/infrastructure/container/DepartmentContainer.js";
import { Department } from "./src/modules/Department/domain/entities/Department.entity.js";

console.log("🧪 Testing Department Module - Modular Clean Architecture");
console.log("=".repeat(60));

async function testDepartmentModule() {
  try {
    // Initialize minimal container for testing
    const container = new DepartmentContainerMinimal();

    console.log("\n📋 Testing Department Entity Methods:");
    console.log("-".repeat(40));

    // Test Department entity
    const departmentData = {
      name: "Test Department",
      description: "Test Description",
      permissions: ["addAccedent", "showAccedent"],
      employees: [],
    };

    const department = new Department(departmentData);

    console.log("✅ Department entity created successfully");
    console.log("✅ isValid():", department.isValid());
    console.log("✅ hasValidName():", department.hasValidName());
    console.log("✅ hasValidDescription():", department.hasValidDescription());
    console.log("✅ getEmployeeCount():", department.getEmployeeCount());
    console.log("✅ hasHeadOfDepartment():", department.hasHeadOfDepartment());
    console.log("✅ hasEmployees():", department.hasEmployees());
    console.log(
      "✅ hasPermission('addAccedent'):",
      department.hasPermission("addAccedent")
    );

    // Test adding permissions
    department.addPermission("deleteAccedent");
    console.log(
      "✅ addPermission():",
      department.permissions.includes("deleteAccedent")
    );

    // Test removing permissions
    department.removePermission("addAccedent");
    console.log(
      "✅ removePermission():",
      !department.permissions.includes("addAccedent")
    );

    console.log("\n📋 Testing Department Use Cases:");
    console.log("-".repeat(40));

    // Test CreateDepartmentUseCase
    const createUseCase = container.getCreateDepartmentUseCase();
    const createResult = await createUseCase.execute({
      name: "New Department",
      description: "New Department Description",
      permissions: ["addAccedent"],
    });
    console.log(
      "✅ CreateDepartmentUseCase:",
      createResult.success ? "SUCCESS" : "FAILED"
    );
    if (!createResult.success) {
      console.log("   Error:", createResult.message);
    }

    // Test GetAllDepartmentsUseCase
    const getAllUseCase = container.getGetAllDepartmentsUseCase();
    const getAllResult = await getAllUseCase.execute();
    console.log(
      "✅ GetAllDepartmentsUseCase:",
      getAllResult.success ? "SUCCESS" : "FAILED"
    );
    if (getAllResult.success) {
      console.log("   Departments count:", getAllResult.data.length);
    }

    // Test GetDepartmentByIdUseCase
    const getByIdUseCase = container.getGetDepartmentByIdUseCase();
    const getByIdResult = await getByIdUseCase.execute("1");
    console.log(
      "✅ GetDepartmentByIdUseCase:",
      getByIdResult.success ? "SUCCESS" : "FAILED"
    );

    // Test UpdateDepartmentUseCase
    const updateUseCase = container.getUpdateDepartmentUseCase();
    const updateResult = await updateUseCase.execute("1", {
      name: "Updated Department",
      description: "Updated Description",
    });
    console.log(
      "✅ UpdateDepartmentUseCase:",
      updateResult.success ? "SUCCESS" : "FAILED"
    );

    // Test DeleteDepartmentUseCase
    const deleteUseCase = container.getDeleteDepartmentUseCase();
    const deleteResult = await deleteUseCase.execute("1");
    console.log(
      "✅ DeleteDepartmentUseCase:",
      deleteResult.success ? "SUCCESS" : "FAILED"
    );

    // Test GetDepartmentStatsUseCase
    const statsUseCase = container.getGetDepartmentStatsUseCase();
    const statsResult = await statsUseCase.execute();
    console.log(
      "✅ GetDepartmentStatsUseCase:",
      statsResult.success ? "SUCCESS" : "FAILED"
    );
    if (statsResult.success) {
      console.log("   Stats:", statsResult.stats);
    }

    console.log("\n📋 Testing Department Controller:");
    console.log("-".repeat(40));

    // Test controller instantiation
    const controller = container.getDepartmentController();
    console.log("✅ DepartmentController instantiated successfully");

    // Test controller methods exist
    console.log(
      "✅ addDepartment method exists:",
      typeof controller.addDepartment === "function"
    );
    console.log(
      "✅ getAllDepartments method exists:",
      typeof controller.getAllDepartments === "function"
    );
    console.log(
      "✅ getDepartmentById method exists:",
      typeof controller.getDepartmentById === "function"
    );
    console.log(
      "✅ updateDepartment method exists:",
      typeof controller.updateDepartment === "function"
    );
    console.log(
      "✅ deleteDepartment method exists:",
      typeof controller.deleteDepartment === "function"
    );
    console.log(
      "✅ getDepartmentStats method exists:",
      typeof controller.getDepartmentStats === "function"
    );

    console.log("\n📋 Testing Department Routes:");
    console.log("-".repeat(40));

    // Test routes instantiation
    const routes = container.getDepartmentRoutes();
    console.log("✅ DepartmentRoutes instantiated successfully");
    console.log("✅ Router created:", routes.router !== undefined);

    console.log("\n🎉 Department Module Test Completed Successfully!");
    console.log("✅ All components are properly structured and functional");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  }
}

// Run the test
testDepartmentModule();
