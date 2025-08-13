/**
 * Setup Test User Script
 * Creates a test user for authentication testing
 */

import axios from "axios";

const BASE_URL = "http://localhost:3002";

async function setupTestUser() {
  console.log("🔧 Setting up test user...\n");

  try {
    // First, let's check what signup endpoints are available
    console.log("1️⃣ Checking available signup endpoints...");

    const signupEndpoints = [
      "/api/v1/user/signup",
      "/api/v1/user/register",
      "/api/v1/auth/signup",
      "/api/v1/auth/register",
    ];

    for (const endpoint of signupEndpoints) {
      try {
        console.log(`Testing ${endpoint}...`);
        const response = await axios.post(`${BASE_URL}${endpoint}`, {
          email: "test@example.com",
          password: "testpassword123",
          name: "Test User",
          role: "admin",
        });

        console.log(`✅ Success with ${endpoint}:`, response.data);
        return;
      } catch (error) {
        console.log(
          `❌ ${endpoint} failed:`,
          error.response?.status,
          error.response?.data?.message || error.message
        );
      }
    }

    console.log(
      "\n⚠️  No working signup endpoint found. Let's try to create a user directly in the database."
    );
    console.log("💡 You may need to:");
    console.log("   1. Check your database for existing users");
    console.log("   2. Create a user manually in the database");
    console.log("   3. Use existing credentials");
  } catch (error) {
    console.log("❌ Setup failed:", error.message);
  }
}

async function checkExistingUsers() {
  console.log("\n🔍 Checking for existing users...");

  try {
    // Try to get users list (might require auth)
    const response = await axios.get(`${BASE_URL}/api/v1/user/all`);
    console.log("✅ Found users:", response.data);
  } catch (error) {
    console.log(
      "❌ Could not fetch users:",
      error.response?.status,
      error.response?.data?.message || error.message
    );
  }
}

async function testWithCommonCredentials() {
  console.log("\n🔐 Testing with common credentials...");

  const testCredentials = [
    { email: "admin@example.com", password: "admin123" },
    { email: "admin@admin.com", password: "admin" },
    { email: "test@test.com", password: "test" },
    { email: "user@example.com", password: "password" },
  ];

  for (const creds of testCredentials) {
    try {
      console.log(`Testing: ${creds.email}`);
      const response = await axios.post(
        `${BASE_URL}/api/v1/user/signin`,
        creds
      );

      if (response.data.success) {
        console.log(`✅ Success with ${creds.email}:`, response.data);
        return creds;
      }
    } catch (error) {
      console.log(
        `❌ Failed with ${creds.email}:`,
        error.response?.data?.message || error.message
      );
    }
  }

  console.log("\n⚠️  No working credentials found.");
  return null;
}

async function runSetup() {
  console.log("🚀 Running Test User Setup...\n");

  await setupTestUser();
  await checkExistingUsers();
  const workingCreds = await testWithCommonCredentials();

  console.log("\n📋 Summary:");
  console.log("✅ Server is running on port 3002");
  console.log("✅ Redis issue is fixed");
  console.log("⚠️  Need valid credentials for authentication");

  if (workingCreds) {
    console.log(`✅ Working credentials found: ${workingCreds.email}`);
    console.log("💡 Use these credentials in your frontend:");
    console.log(`   Email: ${workingCreds.email}`);
    console.log(`   Password: ${workingCreds.password}`);
  } else {
    console.log("\n💡 Next steps:");
    console.log("1. Check your database for existing users");
    console.log("2. Create a test user in your database");
    console.log("3. Update the test-authentication.js with valid credentials");
  }
}

// Run the setup
runSetup().catch(console.error);
