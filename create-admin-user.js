import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import UserModel from "./DB/models/user.model.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
async function connectDB() {
  try {
    // Use the database URL from environment or default to local
    const mongoUrl = process.env.DBURL || "mongodb://localhost:27017/AB_insurance";
    console.log("🔗 Connecting to MongoDB at:", mongoUrl);
    
    await mongoose.connect(mongoUrl);
    console.log("✅ Connected to MongoDB successfully!");
    console.log("🗄️  Database:", mongoose.connection.db.databaseName);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}

// Create admin user
async function createAdminUser() {
  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email: "admin@admin.com" });
    
    if (existingUser) {
      console.log("⚠️  Admin user already exists!");
      console.log("📧 Email: admin@admin.com");
      console.log("🔑 Password: admin123");
      console.log("👤 Role: admin");
      console.log("🆔 User ID:", existingUser._id);
      return;
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash("admin123", saltRounds);

    // Create new admin user
    const adminUser = new UserModel({
      name: "Admin User",
      email: "admin@admin.com",
      phone: "+1234567890",
      password: hashedPassword,
      role: "admin",
      status: "active"
    });

    // Save user to database
    await adminUser.save();

    console.log("✅ Admin user created successfully!");
    console.log("📧 Email: admin@admin.com");
    console.log("🔑 Password: admin123");
    console.log("👤 Role: admin");
    console.log("🆔 User ID:", adminUser._id);
    console.log("🗄️  Database:", mongoose.connection.db.databaseName);

  } catch (error) {
    console.error("❌ Error creating admin user:", error);
  }
}

// List all users in database
async function listUsers() {
  try {
    const users = await UserModel.find({}).select('name email role status createdAt');
    console.log("\n📋 Current users in database:");
    console.log("=" .repeat(50));
    
    if (users.length === 0) {
      console.log("No users found in database");
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
  console.log("👤 Creating admin user in database...\n");
  
  await connectDB();
  await createAdminUser();
  await listUsers();
  
  console.log("\n🎉 Admin user setup complete! You can now login with the credentials above.");
  console.log("🌐 API Endpoint: http://localhost:3002/api/v1/user/signin");
  
  // Close database connection
  await mongoose.connection.close();
  console.log("🔌 Database connection closed.");
}

// Run the script
main().catch(console.error);
