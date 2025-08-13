import axios from "axios";

async function testSMS() {
  console.log("Testing SMS endpoint...");

  try {
    // First, get a fresh token
    console.log("1. Getting fresh token...");
    const loginResponse = await axios.post(
      "http://localhost:3002/api/v1/user/signin",
      {
        email: "islam@ab.com",
        password: "Islam123..",
      }
    );

    const token = loginResponse.data.token;
    console.log("✅ Token received");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Test SMS status first
    console.log("2. Testing SMS status...");
    const statusResponse = await axios.get(
      "http://localhost:3002/api/v1/user/sms-status",
      { headers }
    );
    console.log("✅ SMS Status:", statusResponse.data.message);

    // Test bulk SMS
    console.log("3. Testing bulk SMS...");
    const payload = {
      recipients: ["0566008007"],
      message: "Test message",
    };

    console.log("Payload:", JSON.stringify(payload, null, 2));

    const smsResponse = await axios.post(
      "http://localhost:3002/api/v1/user/send-bulk-sms",
      payload,
      {
        headers,
        timeout: 10000,
      }
    );

    console.log("✅ SMS Response:", JSON.stringify(smsResponse.data, null, 2));
  } catch (error) {
    console.error("❌ Error:");
    console.error("Status:", error.response?.status);
    console.error("Message:", error.response?.data?.message);
    console.error("Data:", JSON.stringify(error.response?.data, null, 2));
  }
}

testSMS();
