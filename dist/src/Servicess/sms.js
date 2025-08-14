import axios from "axios";
import logger from "../utils/logService.js";
// SMS configuration class
class SMSService {
    constructor() {
        this.apiUrl =
            process.env.SMS_API_URL || "https://www.019sms.co.il:8090/api";
        this.username = process.env.SMS_USERNAME || "ab.stop";
        this.password = process.env.SMS_PASSWORD || "3ssX1Ud0:6";
        this.source = process.env.SMS_SOURCE || "0546060886";
        this.isConfigured = this.validateConfiguration();
    }
    // Validate SMS configuration
    validateConfiguration() {
        if (!this.username || !this.password || !this.source) {
            logger.warn("SMS configuration missing. SMS service will not work.");
            return false;
        }
        logger.info("SMS service configured successfully");
        return true;
    }
    // Generate XML for SMS request
    generateSMSXML(phoneNumber, message, dlr = "") {
        return `<?xml version="1.0" encoding="UTF-8"?>
<sms>
    <user>
        <username>${this.username}</username>
        <password>${this.password}</password>
    </user>
    <source>${this.source}</source>
    <destinations>
        <phone id="${dlr}">${phoneNumber}</phone>
    </destinations>
    <message>${message}</message>
</sms>`;
    }
    // Send single SMS
    async sendSingleSMS(phoneNumber, message, dlr = "") {
        if (!this.isConfigured) {
            throw new Error("SMS service not configured. Please check SMS_USERNAME, SMS_PASSWORD, and SMS_SOURCE environment variables.");
        }
        try {
            const xml = this.generateSMSXML(phoneNumber, message, dlr);
            const response = await axios.post(this.apiUrl, xml, {
                headers: {
                    "Content-Type": "application/xml",
                    charset: "utf-8",
                },
                timeout: 30000, // 30 seconds timeout
            });
            logger.info(`SMS sent successfully to ${phoneNumber}`, {
                response: response.data,
                status: response.status,
            });
            return {
                success: true,
                messageId: response.data,
                phoneNumber: phoneNumber,
                status: "sent",
            };
        }
        catch (error) {
            logger.error("Failed to send SMS:", {
                error: error.message,
                phoneNumber: phoneNumber,
                response: error.response?.data,
            });
            throw new Error(`Failed to send SMS: ${error.message}`);
        }
    }
    // Send bulk SMS
    async sendBulkSMS(recipients, message) {
        if (!this.isConfigured) {
            throw new Error("SMS service not configured. Please check SMS_USERNAME, SMS_PASSWORD, and SMS_SOURCE environment variables.");
        }
        if (!Array.isArray(recipients) || recipients.length === 0) {
            throw new Error("Recipients must be a non-empty array");
        }
        const results = [];
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        for (let i = 0; i < recipients.length; i++) {
            try {
                const result = await this.sendSingleSMS(recipients[i], message);
                results.push({
                    phoneNumber: recipients[i],
                    success: true,
                    messageId: result.messageId,
                    status: "sent",
                });
                // Add delay between SMS to avoid rate limiting
                if (i < recipients.length - 1) {
                    await delay(1000); // 1 second delay
                }
            }
            catch (error) {
                results.push({
                    phoneNumber: recipients[i],
                    success: false,
                    error: error.message,
                    status: "failed",
                });
            }
        }
        const successful = results.filter((r) => r.success).length;
        const failed = results.filter((r) => !r.success).length;
        logger.info(`Bulk SMS completed: ${successful} successful, ${failed} failed`);
        return {
            success: true,
            total: recipients.length,
            successful: successful,
            failed: failed,
            results: results,
        };
    }
    // Test SMS configuration
    async testSMSConfiguration(testPhoneNumber = "0546060886") {
        if (!this.isConfigured) {
            return {
                success: false,
                message: "SMS service not configured",
                error: "Please check SMS_USERNAME, SMS_PASSWORD, and SMS_SOURCE environment variables",
            };
        }
        try {
            const testMessage = "SMS Configuration Test - " + new Date().toISOString();
            const result = await this.sendSingleSMS(testPhoneNumber, testMessage, "test");
            return {
                success: true,
                message: "SMS configuration test successful",
                testResult: result,
            };
        }
        catch (error) {
            return {
                success: false,
                message: "SMS configuration test failed",
                error: error.message,
            };
        }
    }
    // Get SMS service status
    getServiceStatus() {
        return {
            configured: this.isConfigured,
            apiUrl: this.apiUrl,
            username: this.username,
            source: this.source,
        };
    }
}
// Create singleton instance
const smsService = new SMSService();
// Export functions for direct use
export const sendSingleSMS = (phoneNumber, message, dlr) => smsService.sendSingleSMS(phoneNumber, message, dlr);
export const sendBulkSMS = (recipients, message) => smsService.sendBulkSMS(recipients, message);
export const testSMSConfiguration = (testPhoneNumber) => smsService.testSMSConfiguration(testPhoneNumber);
export const getSMSServiceStatus = () => smsService.getServiceStatus();
export default smsService;
//# sourceMappingURL=sms.js.map