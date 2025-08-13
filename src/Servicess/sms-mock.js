import logger from "../utils/logService.js";

// Mock SMS service for testing
class MockSMSService {
  constructor() {
    this.isConfigured = true;
    this.apiUrl = "mock://sms-service";
    this.username = "mock-user";
    this.source = "mock-source";
  }

  // Send single SMS (mock)
  async sendSingleSMS(phoneNumber, message, dlr = "") {
    logger.info(`Mock SMS sent to ${phoneNumber}: ${message}`);

    return {
      success: true,
      messageId: `mock_${Date.now()}`,
      phoneNumber: phoneNumber,
      status: "sent",
      mock: true,
    };
  }

  // Send bulk SMS (mock)
  async sendBulkSMS(recipients, message) {
    logger.info(
      `Mock bulk SMS sent to ${recipients.length} recipients: ${message}`
    );

    const results = recipients.map((phoneNumber) => ({
      phoneNumber: phoneNumber,
      success: true,
      messageId: `mock_${Date.now()}_${Math.random()}`,
      status: "sent",
      mock: true,
    }));

    return {
      success: true,
      total: recipients.length,
      successful: recipients.length,
      failed: 0,
      results: results,
      mock: true,
    };
  }

  // Test SMS configuration (mock)
  async testSMSConfiguration(testPhoneNumber = "0546060886") {
    logger.info(`Mock SMS configuration test with ${testPhoneNumber}`);

    return {
      success: true,
      message: "Mock SMS configuration test successful",
      testResult: {
        success: true,
        messageId: `mock_test_${Date.now()}`,
        phoneNumber: testPhoneNumber,
        status: "sent",
        mock: true,
      },
      mock: true,
    };
  }

  // Get SMS service status (mock)
  getServiceStatus() {
    return {
      configured: this.isConfigured,
      apiUrl: this.apiUrl,
      username: this.username,
      source: this.source,
      mock: true,
    };
  }
}

// Create singleton instance
const mockSmsService = new MockSMSService();

// Export functions for direct use
export const sendSingleSMS = (phoneNumber, message, dlr) =>
  mockSmsService.sendSingleSMS(phoneNumber, message, dlr);

export const sendBulkSMS = (recipients, message) =>
  mockSmsService.sendBulkSMS(recipients, message);

export const testSMSConfiguration = (testPhoneNumber) =>
  mockSmsService.testSMSConfiguration(testPhoneNumber);

export const getSMSServiceStatus = () => mockSmsService.getServiceStatus();

export default mockSmsService;
