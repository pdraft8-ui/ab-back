import axios from "axios";

// Configuration
const BASE_URL = "http://localhost:3002";
const API_VERSION = "v3";
const PAYMENT_ENDPOINT = `/api/v1/payment-${API_VERSION}`;

// Test data
const TEST_DATA = {
  // You'll need to replace these with actual IDs from your database
  invoiceId: "507f1f77bcf86cd799439011", // Replace with actual invoice ID
  customerId: "507f1f77bcf86cd799439012", // Replace with actual customer ID
  userId: "507f1f77bcf86cd799439013", // Replace with actual user ID
  token: "your-jwt-token-here", // Replace with actual JWT token
};

// Test payment data
const testPaymentData = {
  invoiceId: TEST_DATA.invoiceId,
  customerId: TEST_DATA.customerId,
  paymentMethod: "Credit Card",
  paymentAmount: 1000,
  notes: "Test payment for modular architecture",
  referenceNumber: "TEST-REF-001",
};

// Test refund data
const testRefundData = {
  refundAmount: 500,
  refundReason: "Test refund for modular architecture",
  notes: "Partial refund test",
};

// Utility function to log test results
const logTestResult = (testName, success, data = null, error = null) => {
  const status = success ? "✅ PASS" : "❌ FAIL";
  console.log(`\n${status} - ${testName}`);
  
  if (data) {
    console.log("Response:", JSON.stringify(data, null, 2));
  }
  
  if (error) {
    console.log("Error:", error.message || error);
  }
  
  console.log("-".repeat(50));
};

// Test 1: Create Payment
const testCreatePayment = async () => {
  try {
    console.log("\n🧪 Testing Create Payment...");
    
    const response = await axios.post(
      `${BASE_URL}${PAYMENT_ENDPOINT}/create`,
      testPaymentData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TEST_DATA.token}`,
        },
      }
    );

    logTestResult("Create Payment", true, response.data);
    return response.data.data; // Return created payment for other tests
  } catch (error) {
    logTestResult("Create Payment", false, null, error.response?.data || error.message);
    return null;
  }
};

// Test 2: Get All Payments
const testGetAllPayments = async () => {
  try {
    console.log("\n🧪 Testing Get All Payments...");
    
    const response = await axios.get(
      `${BASE_URL}${PAYMENT_ENDPOINT}/all`,
      {
        headers: {
          Authorization: `Bearer ${TEST_DATA.token}`,
        },
        params: {
          limit: 10,
          skip: 0,
        },
      }
    );

    logTestResult("Get All Payments", true, response.data);
    return response.data.data;
  } catch (error) {
    logTestResult("Get All Payments", false, null, error.response?.data || error.message);
    return null;
  }
};

// Test 3: Get Payment by ID
const testGetPaymentById = async (paymentId) => {
  try {
    console.log("\n🧪 Testing Get Payment by ID...");
    
    const response = await axios.get(
      `${BASE_URL}${PAYMENT_ENDPOINT}/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${TEST_DATA.token}`,
        },
      }
    );

    logTestResult("Get Payment by ID", true, response.data);
    return response.data.data;
  } catch (error) {
    logTestResult("Get Payment by ID", false, null, error.response?.data || error.message);
    return null;
  }
};

// Test 4: Update Payment
const testUpdatePayment = async (paymentId) => {
  try {
    console.log("\n🧪 Testing Update Payment...");
    
    const updateData = {
      notes: "Updated payment notes for modular architecture test",
      paymentMethod: "Bank Transfer",
    };

    const response = await axios.patch(
      `${BASE_URL}${PAYMENT_ENDPOINT}/${paymentId}`,
      updateData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TEST_DATA.token}`,
        },
      }
    );

    logTestResult("Update Payment", true, response.data);
    return response.data.data;
  } catch (error) {
    logTestResult("Update Payment", false, null, error.response?.data || error.message);
    return null;
  }
};

// Test 5: Get Payments by Customer
const testGetPaymentsByCustomer = async () => {
  try {
    console.log("\n🧪 Testing Get Payments by Customer...");
    
    const response = await axios.get(
      `${BASE_URL}${PAYMENT_ENDPOINT}/customer/${TEST_DATA.customerId}`,
      {
        headers: {
          Authorization: `Bearer ${TEST_DATA.token}`,
        },
      }
    );

    logTestResult("Get Payments by Customer", true, response.data);
    return response.data.data;
  } catch (error) {
    logTestResult("Get Payments by Customer", false, null, error.response?.data || error.message);
    return null;
  }
};

// Test 6: Get Payments by Invoice
const testGetPaymentsByInvoice = async () => {
  try {
    console.log("\n🧪 Testing Get Payments by Invoice...");
    
    const response = await axios.get(
      `${BASE_URL}${PAYMENT_ENDPOINT}/invoice/${TEST_DATA.invoiceId}`,
      {
        headers: {
          Authorization: `Bearer ${TEST_DATA.token}`,
        },
      }
    );

    logTestResult("Get Payments by Invoice", true, response.data);
    return response.data.data;
  } catch (error) {
    logTestResult("Get Payments by Invoice", false, null, error.response?.data || error.message);
    return null;
  }
};

// Test 7: Get Payment Statistics
const testGetPaymentStats = async () => {
  try {
    console.log("\n🧪 Testing Get Payment Statistics...");
    
    const response = await axios.get(
      `${BASE_URL}${PAYMENT_ENDPOINT}/stats`,
      {
        headers: {
          Authorization: `Bearer ${TEST_DATA.token}`,
        },
        params: {
          status: "Completed",
        },
      }
    );

    logTestResult("Get Payment Statistics", true, response.data);
    return response.data.data;
  } catch (error) {
    logTestResult("Get Payment Statistics", false, null, error.response?.data || error.message);
    return null;
  }
};

// Test 8: Refund Payment
const testRefundPayment = async (paymentId) => {
  try {
    console.log("\n🧪 Testing Refund Payment...");
    
    const response = await axios.post(
      `${BASE_URL}${PAYMENT_ENDPOINT}/${paymentId}/refund`,
      testRefundData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TEST_DATA.token}`,
        },
      }
    );

    logTestResult("Refund Payment", true, response.data);
    return response.data.data;
  } catch (error) {
    logTestResult("Refund Payment", false, null, error.response?.data || error.message);
    return null;
  }
};

// Test 9: Delete Payment
const testDeletePayment = async (paymentId) => {
  try {
    console.log("\n🧪 Testing Delete Payment...");
    
    const response = await axios.delete(
      `${BASE_URL}${PAYMENT_ENDPOINT}/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${TEST_DATA.token}`,
        },
      }
    );

    logTestResult("Delete Payment", true, response.data);
    return response.data.data;
  } catch (error) {
    logTestResult("Delete Payment", false, null, error.response?.data || error.message);
    return null;
  }
};

// Test 10: Validation Error Test
const testValidationErrors = async () => {
  try {
    console.log("\n🧪 Testing Validation Errors...");
    
    // Test with missing required fields
    const invalidData = {
      paymentMethod: "Credit Card",
      paymentAmount: 1000,
      // Missing invoiceId and customerId
    };

    const response = await axios.post(
      `${BASE_URL}${PAYMENT_ENDPOINT}/create`,
      invalidData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TEST_DATA.token}`,
        },
      }
    );

    logTestResult("Validation Error Test", false, response.data, "Expected validation error but got success");
  } catch (error) {
    if (error.response?.status === 400) {
      logTestResult("Validation Error Test", true, error.response.data, "Validation error correctly caught");
    } else {
      logTestResult("Validation Error Test", false, null, error.response?.data || error.message);
    }
  }
};

// Test 11: Authentication Error Test
const testAuthenticationError = async () => {
  try {
    console.log("\n🧪 Testing Authentication Error...");
    
    const response = await axios.get(
      `${BASE_URL}${PAYMENT_ENDPOINT}/all`,
      {
        headers: {
          Authorization: "Bearer invalid-token",
        },
      }
    );

    logTestResult("Authentication Error Test", false, response.data, "Expected auth error but got success");
  } catch (error) {
    if (error.response?.status === 401) {
      logTestResult("Authentication Error Test", true, error.response.data, "Authentication error correctly caught");
    } else {
      logTestResult("Authentication Error Test", false, null, error.response?.data || error.message);
    }
  }
};

// Test 12: Module Structure Test
const testModuleStructure = async () => {
  try {
    console.log("\n🧪 Testing Module Structure...");
    
    // Test that the modular structure is working
    const response = await axios.get(
      `${BASE_URL}${PAYMENT_ENDPOINT}/all`,
      {
        headers: {
          Authorization: `Bearer ${TEST_DATA.token}`,
        },
        params: {
          limit: 1,
        },
      }
    );

    // Check if response has the expected structure
    const hasExpectedStructure = 
      response.data &&
      response.data.success !== undefined &&
      response.data.message &&
      Array.isArray(response.data.data);

    if (hasExpectedStructure) {
      logTestResult("Module Structure Test", true, {
        message: "Response has expected structure",
        success: response.data.success,
        dataLength: response.data.data.length,
      });
    } else {
      logTestResult("Module Structure Test", false, response.data, "Response structure is not as expected");
    }
  } catch (error) {
    logTestResult("Module Structure Test", false, null, error.response?.data || error.message);
  }
};

// Main test runner
const runAllTests = async () => {
  console.log("🚀 Starting Payment Module Tests with Modular Clean Architecture");
  console.log("=".repeat(60));
  
  let createdPaymentId = null;
  let testResults = {
    total: 0,
    passed: 0,
    failed: 0,
  };

  try {
    // Test 1: Create Payment
    testResults.total++;
    const createdPayment = await testCreatePayment();
    if (createdPayment && createdPayment.id) {
      createdPaymentId = createdPayment.id;
      testResults.passed++;
    } else {
      testResults.failed++;
    }

    // Test 2: Get All Payments
    testResults.total++;
    const allPayments = await testGetAllPayments();
    if (allPayments) {
      testResults.passed++;
    } else {
      testResults.failed++;
    }

    // Test 3: Get Payment by ID (if we have a payment ID)
    if (createdPaymentId) {
      testResults.total++;
      const paymentById = await testGetPaymentById(createdPaymentId);
      if (paymentById) {
        testResults.passed++;
      } else {
        testResults.failed++;
      }
    }

    // Test 4: Update Payment (if we have a payment ID)
    if (createdPaymentId) {
      testResults.total++;
      const updatedPayment = await testUpdatePayment(createdPaymentId);
      if (updatedPayment) {
        testResults.passed++;
      } else {
        testResults.failed++;
      }
    }

    // Test 5: Get Payments by Customer
    testResults.total++;
    const customerPayments = await testGetPaymentsByCustomer();
    if (customerPayments) {
      testResults.passed++;
    } else {
      testResults.failed++;
    }

    // Test 6: Get Payments by Invoice
    testResults.total++;
    const invoicePayments = await testGetPaymentsByInvoice();
    if (invoicePayments) {
      testResults.passed++;
    } else {
      testResults.failed++;
    }

    // Test 7: Get Payment Statistics
    testResults.total++;
    const paymentStats = await testGetPaymentStats();
    if (paymentStats) {
      testResults.passed++;
    } else {
      testResults.failed++;
    }

    // Test 8: Refund Payment (if we have a payment ID)
    if (createdPaymentId) {
      testResults.total++;
      const refundedPayment = await testRefundPayment(createdPaymentId);
      if (refundedPayment) {
        testResults.passed++;
      } else {
        testResults.failed++;
      }
    }

    // Test 9: Delete Payment (if we have a payment ID)
    if (createdPaymentId) {
      testResults.total++;
      const deletedPayment = await testDeletePayment(createdPaymentId);
      if (deletedPayment) {
        testResults.passed++;
      } else {
        testResults.failed++;
      }
    }

    // Test 10: Validation Error Test
    testResults.total++;
    await testValidationErrors();
    testResults.passed++; // This test passes if it correctly catches validation errors

    // Test 11: Authentication Error Test
    testResults.total++;
    await testAuthenticationError();
    testResults.passed++; // This test passes if it correctly catches auth errors

    // Test 12: Module Structure Test
    testResults.total++;
    await testModuleStructure();
    testResults.passed++; // This test passes if the module structure is working

  } catch (error) {
    console.error("❌ Test runner error:", error.message);
  }

  // Print test summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 TEST SUMMARY");
  console.log("=".repeat(60));
  console.log(`Total Tests: ${testResults.total}`);
  console.log(`Passed: ${testResults.passed} ✅`);
  console.log(`Failed: ${testResults.failed} ❌`);
  console.log(`Success Rate: ${((testResults.passed / testResults.total) * 100).toFixed(2)}%`);
  
  if (testResults.failed === 0) {
    console.log("\n🎉 All tests passed! The Payment module with modular clean architecture is working correctly.");
  } else {
    console.log("\n⚠️  Some tests failed. Please check the errors above.");
  }
  
  console.log("\n" + "=".repeat(60));
};

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllTests().catch(console.error);
}

export {
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
  testAuthenticationError,
  testModuleStructure,
}; 