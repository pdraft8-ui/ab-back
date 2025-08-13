import axios from "axios";

// Configuration
const BASE_URL = "http://localhost:3002/api/v1";
const AUTH_TOKEN = "your_jwt_token_here"; // Replace with actual token

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${AUTH_TOKEN}`,
};

// Test functions
async function testCreateDirectPayment() {
  try {
    console.log("Testing Create Direct Payment...");

    const paymentData = {
      invoiceId: "507f1f77bcf86cd799439011", // Replace with actual invoice ID
      customerId: "507f1f77bcf86cd799439012", // Replace with actual customer ID
      amount: 1500.0,
      currency: "ILS",
      description: "Insurance premium payment - Test",
      customerEmail: "test@example.com",
      customerPhone: "+972501234567",
      returnUrl: "https://your-frontend.com/payment/success",
      cancelUrl: "https://your-frontend.com/payment/cancel",
    };

    const response = await axios.post(
      `${BASE_URL}/tranzila-payment/create`,
      paymentData,
      { headers }
    );

    console.log("✅ Create Direct Payment Success:", response.data);
    return response.data.data.paymentId;
  } catch (error) {
    console.error(
      "❌ Create Direct Payment Error:",
      error.response?.data || error.message
    );
    return null;
  }
}

async function testGetPaymentStatus(paymentId) {
  try {
    console.log(`Testing Get Payment Status for: ${paymentId}...`);

    const response = await axios.get(
      `${BASE_URL}/tranzila-payment/status/${paymentId}`,
      { headers }
    );

    console.log("✅ Get Payment Status Success:", response.data);
    return response.data.data;
  } catch (error) {
    console.error(
      "❌ Get Payment Status Error:",
      error.response?.data || error.message
    );
    return null;
  }
}

async function testGetPaymentHistory() {
  try {
    console.log("Testing Get Payment History...");

    const response = await axios.get(
      `${BASE_URL}/tranzila-payment/history?page=1&limit=5`,
      { headers }
    );

    console.log("✅ Get Payment History Success:", response.data);
    return response.data.data;
  } catch (error) {
    console.error(
      "❌ Get Payment History Error:",
      error.response?.data || error.message
    );
    return null;
  }
}

async function testRefundPayment(paymentId) {
  try {
    console.log(`Testing Refund Payment for: ${paymentId}...`);

    const refundData = {
      amount: 750.0,
      reason: "Test refund - Customer request",
    };

    const response = await axios.patch(
      `${BASE_URL}/tranzila-payment/refund/${paymentId}`,
      refundData,
      { headers }
    );

    console.log("✅ Refund Payment Success:", response.data);
    return response.data.data;
  } catch (error) {
    console.error(
      "❌ Refund Payment Error:",
      error.response?.data || error.message
    );
    return null;
  }
}

// Main test function
async function runTests() {
  console.log("🚀 Starting Tranzila Payment API Tests...\n");

  // Test 1: Create Direct Payment
  const paymentId = await testCreateDirectPayment();

  if (paymentId) {
    console.log("\n" + "=".repeat(50) + "\n");

    // Test 2: Get Payment Status
    await testGetPaymentStatus(paymentId);

    console.log("\n" + "=".repeat(50) + "\n");

    // Test 3: Get Payment History
    await testGetPaymentHistory();

    console.log("\n" + "=".repeat(50) + "\n");

    // Test 4: Refund Payment (only if payment is completed)
    // Uncomment the following lines after a payment is completed
    // await testRefundPayment(paymentId);
  }

  console.log("\n🏁 Tests completed!");
}

// Environment check
function checkEnvironment() {
  console.log("🔧 Environment Check:");
  console.log(`- Base URL: ${BASE_URL}`);
  console.log(`- Auth Token: ${AUTH_TOKEN ? "✅ Set" : "❌ Not set"}`);
  console.log(`- Node.js version: ${process.version}`);
  console.log(`- Axios version: ${require("axios/package.json").version}`);
  console.log("");
}

// Run the tests
if (import.meta.url === `file://${process.argv[1]}`) {
  checkEnvironment();
  runTests().catch(console.error);
}

export {
  testCreateDirectPayment,
  testGetPaymentStatus,
  testGetPaymentHistory,
  testRefundPayment,
  runTests,
};
