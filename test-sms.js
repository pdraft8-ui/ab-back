import axios from "axios";

const BASE_URL = "http://localhost:3002/api/v1/user";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OTMzMTk4NDYzOTBjNzE4NTk3MTZlMSIsImVtYWlsIjoiaXNsYW1AYWIuY29tIiwibmFtZSI6IklzbGFtIEFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU0NzM3Njg4LCJleHAiOjE3NTQ4MjQwODh9._PLqMrPO3qdDBSY8Th7wOuQWViq9PsRFunF_miUv8Fs";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${TOKEN}`,
};

async function testSMSEndpoints() {
  try {
    console.log("🔍 Testing SMS Service Status...");
    const statusResponse = await axios.get(`${BASE_URL}/sms-status`, {
      headers,
    });
    console.log("✅ SMS Status:", JSON.stringify(statusResponse.data, null, 2));

    console.log("\n🧪 Testing SMS Configuration...");
    const configResponse = await axios.post(
      `${BASE_URL}/test-sms-configuration`,
      {
        testPhoneNumber: "0566008007",
      },
      { headers }
    );
    console.log(
      "✅ SMS Config Test:",
      JSON.stringify(configResponse.data, null, 2)
    );

    console.log("\n📱 Testing Single SMS...");
    const singleSMSResponse = await axios.post(
      `${BASE_URL}/send-sms`,
      {
        phoneNumber: "0566008007",
        message:
          "Test SMS from AB Insurance System - " + new Date().toISOString(),
        dlr: "test123",
      },
      { headers }
    );
    console.log(
      "✅ Single SMS Response:",
      JSON.stringify(singleSMSResponse.data, null, 2)
    );

    console.log("\n📱 Testing Bulk SMS...");
    const bulkSMSResponse = await axios.post(
      `${BASE_URL}/send-bulk-sms`,
      {
        recipients: ["0566008007"],
        message: "Bulk Test SMS from AB Insurance System",
      },
      { headers }
    );
    console.log(
      "✅ Bulk SMS Response:",
      JSON.stringify(bulkSMSResponse.data, null, 2)
    );
  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message);
    if (error.response?.status) {
      console.error("Status Code:", error.response.status);
    }
  }
}

testSMSEndpoints();
