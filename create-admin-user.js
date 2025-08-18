import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import UserModel from "./DB/models/user.model.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
async function connectDB() {
  try {
    // Use the production database URL
    const mongoUrl = process.env.MONGODB_URI || process.env.DBURL || "mongodb://localhost:27017/AB_insurance_production";
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
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date()
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
    const users = await UserModel.find({}, { password: 0 }).sort({ createdAt: -1 });
    console.log("\n📋 All users in database:");
    console.log("Total users:", users.length);
    
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email}) - ${user.role} - ${user.status}`);
    });
  } catch (error) {
    console.error("❌ Error listing users:", error);
  }
}

// Main function
async function main() {
  console.log("👤 Creating admin user in production database...\n");
  
  await connectDB();
  await createAdminUser();
  await listUsers();
  
  console.log("\n🎉 Admin user setup complete! You can now login with the credentials above.");
  console.log("🌐 API Endpoint: http://52.21.181.107:3002/api/v1/user/signin");
  
  // Close database connection
  await mongoose.connection.close();
  console.log("🔌 Database connection closed.");
}

// Run the script
main().catch(console.error);


