/**
 * Comprehensive CORS test to verify all scenarios
 * This tests multiple endpoints and provides detailed debugging
 */

import axios from "axios";

const BASE_URL = "http://localhost:3002";

// Test different endpoints that commonly have CORS issues
const testEndpoints = [
  {
    name: "User Signin",
    url: "/api/v1/user/signin",
    method: "POST",
    data: { email: "test@example.com", password: "testpassword" },
  },
  {
    name: "User Signup",
    url: "/api/v1/user/signup",
    method: "POST",
    data: {
      email: "test@example.com",
      password: "testpassword",
      name: "Test User",
    },
  },
  {
    name: "Health Check",
    url: "/api/v1/health",
    method: "GET",
  },
  {
    name: "Payment List",
    url: "/api/v1/payment/all",
    method: "GET",
  },
  {
    name: "Customer List",
    url: "/api/v1/customer/all",
    method: "GET",
  },
];

// Test different origins
const testOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://127.0.0.1:3000",
  "http://localhost:5173", // Vite default
  "http://localhost:8080", // Common dev server
  "http://localhost:4200", // Angular default
];

async function testCORSForEndpoint(endpoint) {
  console.log(`\n🧪 Testing CORS for: ${endpoint.name}`);
  console.log(`URL: ${endpoint.url}`);
  console.log(`Method: ${endpoint.method}`);

  try {
    // Test OPTIONS preflight
    console.log("Testing OPTIONS preflight...");
    const optionsResponse = await axios.options(`${BASE_URL}${endpoint.url}`, {
      headers: {
        Origin: "http://localhost:3000",
        "Access-Control-Request-Method": endpoint.method,
        "Access-Control-Request-Headers": "Content-Type, Authorization",
      },
    });

    console.log(`✅ OPTIONS Status: ${optionsResponse.status}`);
    console.log("CORS Headers:", {
      "Access-Control-Allow-Origin":
        optionsResponse.headers["access-control-allow-origin"],
      "Access-Control-Allow-Methods":
        optionsResponse.headers["access-control-allow-methods"],
      "Access-Control-Allow-Headers":
        optionsResponse.headers["access-control-allow-headers"],
      "Access-Control-Allow-Credentials":
        optionsResponse.headers["access-control-allow-credentials"],
    });

    // Test actual request
    console.log("Testing actual request...");
    const requestConfig = {
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
      },
    };

    let response;
    if (endpoint.method === "GET") {
      response = await axios.get(`${BASE_URL}${endpoint.url}`, requestConfig);
    } else if (endpoint.method === "POST") {
      response = await axios.post(
        `${BASE_URL}${endpoint.url}`,
        endpoint.data,
        requestConfig
      );
    }

    console.log(`✅ ${endpoint.method} Status: ${response.status}`);
    console.log("CORS Headers:", {
      "Access-Control-Allow-Origin":
        response.headers["access-control-allow-origin"],
      "Access-Control-Allow-Credentials":
        response.headers["access-control-allow-credentials"],
    });

    return true;
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);

    if (error.response) {
      console.log("Response Status:", error.response.status);
      console.log("Response Headers:", error.response.headers);
      console.log("Response Data:", error.response.data);
    }

    return false;
  }
}

async function testMultipleOrigins() {
  console.log("\n🧪 Testing multiple origins...");

  const results = [];

  for (const origin of testOrigins) {
    try {
      const response = await axios.options(`${BASE_URL}/api/v1/user/signin`, {
        headers: {
          Origin: origin,
          "Access-Control-Request-Method": "POST",
        },
      });

      const allowedOrigin = response.headers["access-control-allow-origin"];
      const isAllowed = allowedOrigin === "*" || allowedOrigin === origin;

      console.log(
        `✅ Origin ${origin}: ${isAllowed ? "ALLOWED" : "BLOCKED"} (${
          response.status
        })`
      );
      results.push({ origin, allowed: isAllowed });
    } catch (error) {
      console.log(`❌ Origin ${origin}: ERROR - ${error.message}`);
      results.push({ origin, allowed: false, error: error.message });
    }
  }

  return results;
}

async function testBrowserSimulation() {
  console.log("\n🧪 Simulating browser behavior...");

  try {
    // Simulate what a browser would do
    const response = await axios.post(
      `${BASE_URL}/api/v1/user/signin`,
      {
        email: "test@example.com",
        password: "testpassword",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:3000",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      }
    );

    console.log("✅ Browser simulation successful");
    console.log("Status:", response.status);
    console.log(
      "CORS Origin Header:",
      response.headers["access-control-allow-origin"]
    );

    return true;
  } catch (error) {
    console.log("❌ Browser simulation failed:", error.message);
    return false;
  }
}

async function runComprehensiveTest() {
  console.log("🚀 Running comprehensive CORS test...");
  console.log("This will test all scenarios that could cause CORS issues\n");

  let successCount = 0;
  let totalCount = 0;

  // Test each endpoint
  for (const endpoint of testEndpoints) {
    const success = await testCORSForEndpoint(endpoint);
    if (success) successCount++;
    totalCount++;
  }

  // Test multiple origins
  const originResults = await testMultipleOrigins();
  const allowedOrigins = originResults.filter((r) => r.allowed).length;

  // Test browser simulation
  const browserSuccess = await testBrowserSimulation();
  if (browserSuccess) successCount++;
  totalCount++;

  console.log("\n📊 Test Results Summary:");
  console.log(`✅ Successful tests: ${successCount}/${totalCount}`);
  console.log(`✅ Allowed origins: ${allowedOrigins}/${testOrigins.length}`);
  console.log(`✅ Browser simulation: ${browserSuccess ? "PASSED" : "FAILED"}`);

  if (successCount === totalCount) {
    console.log(
      "\n🎉 All CORS tests passed! Your API should work with any frontend."
    );
  } else {
    console.log("\n⚠️  Some CORS tests failed. Check the details above.");
  }

  return {
    successCount,
    totalCount,
    allowedOrigins,
    browserSuccess,
  };
}

// Run the comprehensive test
runComprehensiveTest().catch(console.error);
