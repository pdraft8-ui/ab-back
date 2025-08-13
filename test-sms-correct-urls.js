import axios from "axios";

const BASE_URL = "http://localhost:3002/api/v1/user";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OTMzMTk4NDYzOTBjNzE4NTk3MTZlMSIsImVtYWlsIjoiaXNsYW1AYWIuY29tIiwibmFtZSI6IklzbGFtIEFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU0NzM3Njg4LCJleHAiOjE3NTQ4MjQwODh9._PLqMrPO3qdDBSY8Th7wOuQWViq9PsRFunF_miUv8Fs";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${TOKEN}`,
};

async function testCorrectSMSEndpoints() {
  console.log("📱 Testing SMS Endpoints with CORRECT URLs\n");

  try {
    // 1. Test SMS Status
    console.log("1️⃣ Testing SMS Status...");
    console.log(`URL: GET ${BASE_URL}/sms-status`);
    const statusResponse = await axios.get(`${BASE_URL}/sms-status`, {
      headers,
    });
    console.log("✅ Status:", statusResponse.data.message);
    console.log("📊 Configuration:", statusResponse.data.status);
    console.log("");

    // 2. Test Single SMS
    console.log("2️⃣ Testing Single SMS...");
    console.log(`URL: POST ${BASE_URL}/send-sms`);
    const singleSMSResponse = await axios.post(
      `${BASE_URL}/send-sms`,
      {
        phoneNumber: "0566008007",
        message: "Test SMS from AB Insurance - " + new Date().toISOString(),
        dlr: "test123",
      },
      { headers }
    );
    console.log("✅ Single SMS Response:", singleSMSResponse.data);
    console.log("");

    // 3. Test Bulk SMS
    console.log("3️⃣ Testing Bulk SMS...");
    console.log(`URL: POST ${BASE_URL}/send-bulk-sms`);
    const bulkSMSResponse = await axios.post(
      `${BASE_URL}/send-bulk-sms`,
      {
        recipients: ["0566008007"],
        message: "Bulk Test SMS from AB Insurance",
      },
      { headers }
    );
    console.log("✅ Bulk SMS Response:", bulkSMSResponse.data);
    console.log("");

    // 4. Test SMS Configuration
    console.log("4️⃣ Testing SMS Configuration...");
    console.log(`URL: POST ${BASE_URL}/test-sms-configuration`);
    const configResponse = await axios.post(
      `${BASE_URL}/test-sms-configuration`,
      {
        testPhoneNumber: "0566008007",
      },
      { headers }
    );
    console.log("✅ Config Test Response:", configResponse.data);
  } catch (error) {
    console.error("❌ Error Details:");
    console.error("Status:", error.response?.status);
    console.error("Message:", error.response?.data?.message || error.message);
    console.error("Error:", error.response?.data?.error || "Unknown error");

    if (error.response?.data?.response) {
      console.error(
        "External API Response:",
        error.response.data.response.substring(0, 200) + "..."
      );
    }
  }
}

console.log("🚀 Starting SMS Endpoint Tests...\n");
testCorrectSMSEndpoints();
