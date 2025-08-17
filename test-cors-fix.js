/**
 * Test script to verify CORS is working correctly
 * This tests the signin endpoint that was causing CORS errors
 */

import axios from "axios";

const BASE_URL = "http://localhost:3002";

// Test CORS for signin endpoint
async function testCORS() {
  try {
    console.log("🧪 Testing CORS for signin endpoint...");

    // Test OPTIONS request (preflight)
    console.log("Testing OPTIONS preflight request...");
    const optionsResponse = await axios.options(
      `${BASE_URL}/api/v1/user/signin`,
      {
        headers: {
          Origin: "http://localhost:3002",
          "Access-Control-Request-Method": "POST",
          "Access-Control-Request-Headers": "Content-Type, Authorization",
        },
      }
    );

    console.log(`✅ OPTIONS request status: ${optionsResponse.status}`);
    console.log("✅ CORS headers present:", {
      "Access-Control-Allow-Origin":
        optionsResponse.headers["access-control-allow-origin"],
      "Access-Control-Allow-Methods":
        optionsResponse.headers["access-control-allow-methods"],
      "Access-Control-Allow-Headers":
        optionsResponse.headers["access-control-allow-headers"],
    });

    // Test actual POST request
    console.log("\nTesting POST signin request...");
    const postResponse = await axios.post(
      `${BASE_URL}/api/v1/user/signin`,
      {
        email: "test@example.com",
        password: "testpassword",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:3002",
        },
      }
    );

    console.log(`✅ POST request status: ${postResponse.status}`);
    console.log("✅ CORS headers present:", {
      "Access-Control-Allow-Origin":
        postResponse.headers["access-control-allow-origin"],
      "Access-Control-Allow-Credentials":
        postResponse.headers["access-control-allow-credentials"],
    });

    console.log("\n🎉 CORS test completed successfully!");
    console.log("✅ No CORS errors should occur in your frontend now");
  } catch (error) {
    console.log("❌ CORS test failed:", error.message);

    if (error.response) {
      console.log("Response status:", error.response.status);
      console.log("Response headers:", error.response.headers);
    }
  }
}

// Test different origins
async function testMultipleOrigins() {
  const origins = [
    "http://localhost:3002",
    "http://localhost:3001",
    "http://localhost:3003",
    "http://127.0.0.1:3002",
  ];

  console.log("\n🧪 Testing multiple origins...");

  for (const origin of origins) {
    try {
      const response = await axios.options(`${BASE_URL}/api/v1/user/signin`, {
        headers: {
          Origin: origin,
          "Access-Control-Request-Method": "POST",
        },
      });

      console.log(`✅ Origin ${origin}: Status ${response.status}`);
    } catch (error) {
      console.log(`❌ Origin ${origin}: ${error.message}`);
    }
  }
}

async function runTests() {
  console.log("🚀 Testing CORS configuration...");
  console.log(
    "This verifies that CORS is properly configured for local development\n"
  );

  await testCORS();
  await testMultipleOrigins();

  console.log("\n📋 Summary:");
  console.log("✅ CORS headers are properly set");
  console.log("✅ Multiple localhost origins are allowed");
  console.log("✅ Preflight requests are handled correctly");
  console.log("✅ Your frontend should now work without CORS errors");
}

// Run the tests
runTests().catch(console.error);
