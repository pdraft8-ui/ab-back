import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import UserModel from "./DB/models/user.model.js";

// Load environment variables
dotenv.config();

// Connect to Production Docker MongoDB
async function connectDB() {
  try {
    // Use the production database URL
    const mongoUrl = process.env.DBURL || "mongodb://mongo:27017/AB_insurance_production";
    console.log("🔗 Connecting to Production MongoDB at:", mongoUrl);
    
    await mongoose.connect(mongoUrl);
    console.log("✅ Connected to Production MongoDB successfully!");
    console.log("🗄️  Database:", mongoose.connection.db.databaseName);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}

// Create production test user
async function createProductionUser() {
  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email: "admin@production.com" });
    
    if (existingUser) {
      console.log("⚠️  Production user already exists!");
      console.log("📧 Email: admin@production.com");
      console.log("🔑 Password: production123");
      console.log("👤 Role: admin");
      console.log("🆔 User ID:", existingUser._id);
      return;
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash("production123", saltRounds);

    // Create new user
    const testUser = new UserModel({
      name: "Production Admin",
      email: "admin@production.com",
      phone: "+1234567890",
      password: hashedPassword,
      role: "admin",
      status: "active"
    });

    // Save user to database
    await testUser.save();

    console.log("✅ Production user created successfully!");
    console.log("📧 Email: admin@production.com");
    console.log("🔑 Password: production123");
    console.log("👤 Role: admin");
    console.log("🆔 User ID:", testUser._id);
    console.log("🗄️  Database:", mongoose.connection.db.databaseName);

  } catch (error) {
    console.error("❌ Error creating production user:", error);
  }
}

// List all users in production database
async function listUsers() {
  try {
    const users = await UserModel.find({}).select('name email role status createdAt');
    console.log("\n📋 Current users in production database:");
    console.log("=" .repeat(50));
    
    if (users.length === 0) {
      console.log("No users found in production database");
    } else {
      users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.name} (${user.email})`);
        console.log(`   Role: ${user.role} | Status: ${user.status}`);
        console.log(`   Created: ${user.createdAt.toLocaleDateString()}`);
        console.log("");
      });
    }
  } catch (error) {
    console.error("❌ Error listing users:", error);
  }
}

// Main function
async function main() {
  console.log("🐳 Creating production user in Docker MongoDB...\n");
  
  await connectDB();
  await createProductionUser();
  await listUsers();
  
  console.log("\n🎉 Production setup complete! You can now login with the credentials above.");
  console.log("🌐 API Endpoint: http://localhost:3002/api/v1/user/signin");
  
  // Close database connection
  await mongoose.connection.close();
  console.log("🔌 Database connection closed");
}

// Run the script
main().catch(console.error);

