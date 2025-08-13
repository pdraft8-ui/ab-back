const axios = require("axios");

// Configuration
const BASE_URL = "http://localhost:3002";
const API_VERSION = "v2";
const PAYMENT_BASE_URL = `${BASE_URL}/api/v1/payment-${API_VERSION}`;

// Test data - Replace with actual IDs from your database
const TEST_DATA = {
  // Replace these with actual IDs from your database
  invoiceId: "507f1f77bcf86cd799439011", // Example MongoDB ObjectId
  customerId: "507f1f77bcf86cd799439012", // Example MongoDB ObjectId
  paymentId: "507f1f77bcf86cd799439013", // Example MongoDB ObjectId
  userId: "507f1f77bcf86cd799439014", // Example MongoDB ObjectId

  // Test payment data
  paymentData: {
    invoiceId: "507f1f77bcf86cd799439011",
    customerId: "507f1f77bcf86cd799439012",
    paymentMethod: "Cash",
    paymentAmount: 1500.0,
    paymentDate: new Date().toISOString(),
    notes: "Test payment for clean architecture migration",
    referenceNumber: "REF-2024-001",
  },

  // Test update data
  updateData: {
    paymentMethod: "Credit Card",
    paymentAmount: 1600.0,
    notes: "Updated payment information",
  },

  // Test refund data
  refundData: {
    refundAmount: 500.0,
    refundReason: "Customer request",
    refundDate: new Date().toISOString(),
  },
};

// Authentication token - Replace with actual token
const AUTH_TOKEN = "YOUR_JWT_TOKEN_HERE";

// Headers for authenticated requests
const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${AUTH_TOKEN}`,
});

// Utility function to log responses
const logResponse = (endpoint, response) => {
  console.log(`\n✅ ${endpoint} - Success`);
  console.log(`Status: ${response.status}`);
  console.log("Response:", JSON.stringify(response.data, null, 2));
};

// Utility function to log errors
const logError = (endpoint, error) => {
  console.log(`\n❌ ${endpoint} - Error`);
  console.log(`Status: ${error.response?.status || "Network Error"}`);
  console.log("Error:", error.response?.data || error.message);
};

// Test 1: Create Payment
const testCreatePayment = async () => {
  console.log("\n🧪 Testing: Create Payment");
  try {
    const response = await axios.post(
      `${PAYMENT_BASE_URL}/create`,
      TEST_DATA.paymentData,
      { headers: getHeaders() }
    );
    logResponse("Create Payment", response);

    // Store the created payment ID for subsequent tests
    if (response.data.payment && response.data.payment._id) {
      TEST_DATA.paymentId = response.data.payment._id;
      console.log(`📝 Stored payment ID: ${TEST_DATA.paymentId}`);
    }

    return response.data;
  } catch (error) {
    logError("Create Payment", error);
    throw error;
  }
};

// Test 2: Get All Payments
const testGetAllPayments = async () => {
  console.log("\n🧪 Testing: Get All Payments");
  try {
    const response = await axios.get(`${PAYMENT_BASE_URL}/all`, {
      headers: getHeaders(),
      params: {
        page: 1,
        limit: 10,
        sortBy: "createdAt",
        sortOrder: "desc",
      },
    });
    logResponse("Get All Payments", response);
    return response.data;
  } catch (error) {
    logError("Get All Payments", error);
    throw error;
  }
};

// Test 3: Get Payment by ID
const testGetPaymentById = async () => {
  console.log("\n🧪 Testing: Get Payment by ID");
  try {
    const response = await axios.get(
      `${PAYMENT_BASE_URL}/${TEST_DATA.paymentId}`,
      { headers: getHeaders() }
    );
    logResponse("Get Payment by ID", response);
    return response.data;
  } catch (error) {
    logError("Get Payment by ID", error);
    throw error;
  }
};

// Test 4: Update Payment
const testUpdatePayment = async () => {
  console.log("\n🧪 Testing: Update Payment");
  try {
    const response = await axios.patch(
      `${PAYMENT_BASE_URL}/${TEST_DATA.paymentId}`,
      TEST_DATA.updateData,
      { headers: getHeaders() }
    );
    logResponse("Update Payment", response);
    return response.data;
  } catch (error) {
    logError("Update Payment", error);
    throw error;
  }
};

// Test 5: Get Payments by Customer
const testGetPaymentsByCustomer = async () => {
  console.log("\n🧪 Testing: Get Payments by Customer");
  try {
    const response = await axios.get(
      `${PAYMENT_BASE_URL}/customer/${TEST_DATA.customerId}`,
      {
        headers: getHeaders(),
        params: {
          page: 1,
          limit: 10,
        },
      }
    );
    logResponse("Get Payments by Customer", response);
    return response.data;
  } catch (error) {
    logError("Get Payments by Customer", error);
    throw error;
  }
};

// Test 6: Get Payments by Invoice
const testGetPaymentsByInvoice = async () => {
  console.log("\n🧪 Testing: Get Payments by Invoice");
  try {
    const response = await axios.get(
      `${PAYMENT_BASE_URL}/invoice/${TEST_DATA.invoiceId}`,
      {
        headers: getHeaders(),
        params: {
          page: 1,
          limit: 10,
        },
      }
    );
    logResponse("Get Payments by Invoice", response);
    return response.data;
  } catch (error) {
    logError("Get Payments by Invoice", error);
    throw error;
  }
};

// Test 7: Get Payment Statistics
const testGetPaymentStats = async () => {
  console.log("\n🧪 Testing: Get Payment Statistics");
  try {
    const response = await axios.get(`${PAYMENT_BASE_URL}/stats/overview`, {
      headers: getHeaders(),
      params: {
        startDate: new Date(
          Date.now() - 30 * 24 * 60 * 60 * 1000
        ).toISOString(), // Last 30 days
        endDate: new Date().toISOString(),
      },
    });
    logResponse("Get Payment Statistics", response);
    return response.data;
  } catch (error) {
    logError("Get Payment Statistics", error);
    throw error;
  }
};

// Test 8: Refund Payment
const testRefundPayment = async () => {
  console.log("\n🧪 Testing: Refund Payment");
  try {
    const response = await axios.patch(
      `${PAYMENT_BASE_URL}/${TEST_DATA.paymentId}/refund`,
      TEST_DATA.refundData,
      { headers: getHeaders() }
    );
    logResponse("Refund Payment", response);
    return response.data;
  } catch (error) {
    logError("Refund Payment", error);
    throw error;
  }
};

// Test 9: Delete Payment
const testDeletePayment = async () => {
  console.log("\n🧪 Testing: Delete Payment");
  try {
    const response = await axios.delete(
      `${PAYMENT_BASE_URL}/${TEST_DATA.paymentId}`,
      { headers: getHeaders() }
    );
    logResponse("Delete Payment", response);
    return response.data;
  } catch (error) {
    logError("Delete Payment", error);
    throw error;
  }
};

// Test 10: Validation Error Tests
const testValidationErrors = async () => {
  console.log("\n🧪 Testing: Validation Errors");

  const invalidData = {
    // Missing required fields
    paymentMethod: "Cash",
    // Missing invoiceId, customerId, paymentAmount
  };

  try {
    const response = await axios.post(
      `${PAYMENT_BASE_URL}/create`,
      invalidData,
      { headers: getHeaders() }
    );
    console.log("❌ Expected validation error but got success");
  } catch (error) {
    if (error.response?.status === 400) {
      console.log("✅ Validation error caught successfully");
      console.log("Error details:", error.response.data);
    } else {
      logError("Validation Test", error);
    }
  }
};

// Test 11: Authentication Error Tests
const testAuthenticationErrors = async () => {
  console.log("\n🧪 Testing: Authentication Errors");

  try {
    const response = await axios.post(
      `${PAYMENT_BASE_URL}/create`,
      TEST_DATA.paymentData,
      { headers: { "Content-Type": "application/json" } } // No Authorization header
    );
    console.log("❌ Expected authentication error but got success");
  } catch (error) {
    if (error.response?.status === 401) {
      console.log("✅ Authentication error caught successfully");
      console.log("Error details:", error.response.data);
    } else {
      logError("Authentication Test", error);
    }
  }
};

// Test 12: Compare with Old API
const testCompareWithOldAPI = async () => {
  console.log("\n🧪 Testing: Compare with Old API");

  try {
    // Test old API
    const oldResponse = await axios.post(
      `${BASE_URL}/api/v1/payment/create`,
      TEST_DATA.paymentData,
      { headers: getHeaders() }
    );
    console.log("✅ Old API response:", oldResponse.status);

    // Test new API
    const newResponse = await axios.post(
      `${PAYMENT_BASE_URL}/create`,
      TEST_DATA.paymentData,
      { headers: getHeaders() }
    );
    console.log("✅ New API response:", newResponse.status);

    console.log("✅ Both APIs are working");
  } catch (error) {
    logError("API Comparison Test", error);
  }
};

// Main test runner
const runAllTests = async () => {
  console.log("🚀 Starting Payment Module Endpoint Tests");
  console.log("==========================================");
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`API Version: ${API_VERSION}`);
  console.log(`Payment Endpoints: ${PAYMENT_BASE_URL}`);
  console.log("==========================================");

  const results = {
    passed: 0,
    failed: 0,
    tests: [],
  };

  const tests = [
    { name: "Create Payment", fn: testCreatePayment },
    { name: "Get All Payments", fn: testGetAllPayments },
    { name: "Get Payment by ID", fn: testGetPaymentById },
    { name: "Update Payment", fn: testUpdatePayment },
    { name: "Get Payments by Customer", fn: testGetPaymentsByCustomer },
    { name: "Get Payments by Invoice", fn: testGetPaymentsByInvoice },
    { name: "Get Payment Statistics", fn: testGetPaymentStats },
    { name: "Refund Payment", fn: testRefundPayment },
    { name: "Validation Errors", fn: testValidationErrors },
    { name: "Authentication Errors", fn: testAuthenticationErrors },
    { name: "Compare with Old API", fn: testCompareWithOldAPI },
    { name: "Delete Payment", fn: testDeletePayment },
  ];

  for (const test of tests) {
    try {
      console.log(`\n🔄 Running: ${test.name}`);
      await test.fn();
      results.passed++;
      results.tests.push({ name: test.name, status: "PASSED" });
    } catch (error) {
      results.failed++;
      results.tests.push({
        name: test.name,
        status: "FAILED",
        error: error.message,
      });
    }
  }

  // Print summary
  console.log("\n📊 Test Results Summary");
  console.log("========================");
  console.log(`Total Tests: ${results.passed + results.failed}`);
  console.log(`Passed: ${results.passed}`);
  console.log(`Failed: ${results.failed}`);
  console.log(
    `Success Rate: ${(
      (results.passed / (results.passed + results.failed)) *
      100
    ).toFixed(2)}%`
  );

  console.log("\n📋 Detailed Results:");
  results.tests.forEach((test) => {
    const status = test.status === "PASSED" ? "✅" : "❌";
    console.log(`${status} ${test.name}`);
    if (test.error) {
      console.log(`   Error: ${test.error}`);
    }
  });

  if (results.failed === 0) {
    console.log(
      "\n🎉 All tests passed! The Payment module is working correctly."
    );
  } else {
    console.log("\n⚠️  Some tests failed. Please check the errors above.");
  }
};

// Run tests if this file is executed directly
if (require.main === module) {
  // Check if server is running
  axios.get(`${BASE_URL}/health`).catch(() => {
    console.log(
      "⚠️  Warning: Server might not be running. Please start the server first."
    );
    console.log("   Run: npm start or node index.js");
  });

  // Check authentication token
  if (AUTH_TOKEN === "YOUR_JWT_TOKEN_HERE") {
    console.log("⚠️  Warning: Please update AUTH_TOKEN with a valid JWT token");
    console.log(
      "   You can get a token by logging in through your application"
    );
  }

  // Check test data
  console.log("📝 Test Data Configuration:");
  console.log(
    "   Make sure to update TEST_DATA with actual IDs from your database"
  );
  console.log("   Current test data uses example MongoDB ObjectIds");

  // Run tests after a short delay
  setTimeout(runAllTests, 2000);
}

module.exports = {
  runAllTests,
  testCreatePayment,
  testGetAllPayments,
  testGetPaymentById,
  testUpdatePayment,
  testGetPaymentsByCustomer,
  testGetPaymentsByInvoice,
  testGetPaymentStats,
  testRefundPayment,
  testDeletePayment,
  testValidationErrors,
  testAuthenticationErrors,
  testCompareWithOldAPI,
};
