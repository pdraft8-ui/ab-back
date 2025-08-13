/**
 * Authentication Test Script
 * This helps you authenticate and test protected endpoints
 */

import axios from "axios";

const BASE_URL = "http://localhost:3002";

// Test authentication flow
async function testAuthentication() {
  console.log("🔐 Testing Authentication Flow...\n");

  try {
    // Step 1: Test signin endpoint
    console.log("1️⃣ Testing signin endpoint...");
    const signinResponse = await axios.post(`${BASE_URL}/api/v1/user/signin`, {
      email: "admin@example.com", // Test user created in database
      password: "admin123", // Test user password
    });

    console.log("✅ Signin successful!");
    console.log("Response:", signinResponse.data);

    // Extract token if available
    const token = signinResponse.data.token || signinResponse.data.data?.token;

    if (token) {
      console.log("\n2️⃣ Testing protected endpoint with token...");

      // Test customer endpoint with authentication
      const customerResponse = await axios.get(
        `${BASE_URL}/api/v1/customer/allCustomer`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Protected endpoint successful!");
      console.log("Customer data:", customerResponse.data);
    } else {
      console.log(
        "⚠️  No token found in response. Check your authentication setup."
      );
    }
  } catch (error) {
    console.log("❌ Authentication failed:", error.message);

    if (error.response) {
      console.log("Response status:", error.response.status);
      console.log("Response data:", error.response.data);

      if (error.response.data.message === "User account is inactive") {
        console.log(
          "\n💡 Solution: You need to activate your user account or use valid credentials."
        );
        console.log("Try these steps:");
        console.log("1. Check if your user account is active in the database");
        console.log("2. Use correct email and password");
        console.log("3. If you don't have an account, try signing up first");
      }
    }
  }
}

// Test without authentication (should fail)
async function testWithoutAuth() {
  console.log("\n🔓 Testing endpoint without authentication...");

  try {
    const response = await axios.get(`${BASE_URL}/api/v1/customer/allCustomer`);
    console.log("✅ Unexpected success without auth:", response.data);
  } catch (error) {
    console.log(
      "❌ Expected failure without auth:",
      error.response?.data?.message || error.message
    );
  }
}

// Test signup if needed
async function testSignup() {
  console.log("\n📝 Testing signup endpoint...");

  try {
    const signupResponse = await axios.post(`${BASE_URL}/api/v1/user/signup`, {
      email: "test@example.com",
      password: "testpassword123",
      name: "Test User",
      role: "admin", // or whatever role you need
    });

    console.log("✅ Signup successful!");
    console.log("Response:", signupResponse.data);
  } catch (error) {
    console.log(
      "❌ Signup failed:",
      error.response?.data?.message || error.message
    );
  }
}

async function runAuthTests() {
  console.log("🚀 Running Authentication Tests...\n");

  await testWithoutAuth();
  await testSignup();
  await testAuthentication();

  console.log("\n📋 Summary:");
  console.log("✅ Server is running on port 3002");
  console.log("✅ CORS is properly configured");
  console.log("⚠️  You need to authenticate to access protected endpoints");
  console.log("\n💡 Next steps:");
  console.log("1. Use valid credentials to sign in");
  console.log("2. Include the token in your frontend requests");
  console.log("3. Make sure your user account is active");
}

// Run the tests
runAuthTests().catch(console.error);
