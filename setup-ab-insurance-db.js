import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Import models
import UserModel from "./DB/models/user.model.js";
import CustomerModel from "./DB/models/Customer.model.js";
import PaymentModel from "./DB/models/Payment.model.js";
import InvoiceModel from "./DB/models/Invoice.model.js";
import DepartmentModel from "./DB/models/Department.model.js";
import InsuranceCompanyModel from "./DB/models/InsuranceCompany.model.js";

const setupDatabase = async () => {
  try {
    console.log("🔄 Connecting to AB_insurance database...");

    // Connect to database
    await mongoose.connect(
      process.env.DBURL || "mongodb://localhost:27017/AB_insurance",
      {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
        minPoolSize: 2,
        maxIdleTimeMS: 30000,
      }
    );

    console.log("✅ Connected to AB_insurance database successfully");

    // Clear existing data
    console.log("🧹 Clearing existing data...");
    await UserModel.deleteMany({});
    await CustomerModel.deleteMany({});
    await PaymentModel.deleteMany({});
    await InvoiceModel.deleteMany({});
    await DepartmentModel.deleteMany({});
    await InsuranceCompanyModel.deleteMany({});

    // Create default department
    console.log("🏢 Creating default department...");
    const defaultDepartment = await DepartmentModel.create({
      name: "Administration",
      description: "Default administration department",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Create default insurance company
    console.log("🏢 Creating default insurance company...");
    const defaultInsuranceCompany = await InsuranceCompanyModel.create({
      name: "AB Insurance",
      contact: "+1234567890",
      address: "Default Address",
      insuranceType: "mandatory",
      rates: {
        mandatory: {
          تحت_24: 1000,
          فوق_24: 1500,
          مبلغ_العرض: 2000,
          الحد_الأدنى_لـ_60_ألف: 500,
        },
        thirdPartyComprehensive: {
          تحت_24: 2000,
          فوق_24: 2500,
          مبلغ_العرض: 3000,
          الحد_الأدنى_لـ_60_ألف: 1000,
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Create admin user with specified credentials
    console.log("👤 Creating admin user...");
    const hashedPassword = await bcrypt.hash("Islam123..", 12);

    const adminUser = await UserModel.create({
      name: "Islam Admin",
      email: "islam@ab.com",
      password: hashedPassword,
      role: "admin",
      department: defaultDepartment._id,
      status: "active",
      phone: "+1234567890",
      address: "Default Address",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Create sample customer
    console.log("👥 Creating sample customer...");
    const sampleCustomer = await CustomerModel.create({
      first_name: "Sample",
      last_name: "Customer",
      id_Number: 123456789,
      phone_number: "+1234567891",
      city: "Sample City",
      email: "customer@example.com",
      birth_date: new Date("1990-01-01"),
      joining_date: new Date(),
      notes: "Sample customer for testing",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("✅ Database setup completed successfully!");
    console.log("\n📋 Setup Summary:");
    console.log("├── Database: AB_insurance");
    console.log("├── Admin User:");
    console.log("│   ├── Email: islam@ab.com");
    console.log("│   └── Password: Islam123..");
    console.log("├── Default Department: Administration");
    console.log("├── Default Insurance Company: AB Insurance");
    console.log("└── Sample Customer: 1");

    console.log("\n🚀 You can now start the server with: npm start");
    console.log("🔗 Health check: http://localhost:3002/api/v1/health");
    console.log("📚 API docs: http://localhost:3002/api-docs");
  } catch (error) {
    console.error("❌ Database setup failed:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from database");
  }
};

// Run the setup
setupDatabase();
