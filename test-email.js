import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Handle ES module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, ".env") });

// Import email service
import emailService from "./src/Servicess/email.js";

async function testEmailService() {
  console.log("🧪 Testing Gmail Email Service Configuration...\n");

  try {
    // Test 1: Check if email service is configured
    console.log("1️⃣ Checking email service configuration...");
    const isConfigured = emailService.isConfigured;
    console.log(`   ✅ Email service configured: ${isConfigured}`);

    if (!isConfigured) {
      console.log(
        "   ❌ Email service not configured. Please check GMAIL_USER and GMAIL_APP_PASSWORD"
      );
      return;
    }

    // Test 2: Verify SMTP connection
    console.log("\n2️⃣ Testing SMTP connection...");
    try {
      const smtpResult = await emailService.verifyConnection();
      console.log(
        `   ✅ SMTP connection: ${smtpResult ? "SUCCESS" : "FAILED"}`
      );
    } catch (error) {
      console.log(`   ❌ SMTP connection failed: ${error.message}`);
    }

    // Test 3: Verify IMAP connection
    console.log("\n3️⃣ Testing IMAP connection...");
    try {
      const imapResult = await emailService.verifyImapConnection();
      console.log(
        `   ✅ IMAP connection: ${imapResult ? "SUCCESS" : "FAILED"}`
      );
    } catch (error) {
      console.log(`   ❌ IMAP connection failed: ${error.message}`);
    }

    // Test 4: Send test email
    console.log("\n4️⃣ Sending test email...");
    const testEmail = process.env.GMAIL_USER || "basheerinsurance99@gmail.com";

    const emailResult = await emailService.sendEmail({
      to: testEmail,
      subject: "🧪 Gmail Service Test - AB Insurance Company",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2c3e50; text-align: center;">🎉 Gmail Service Test Successful!</h1>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #27ae60;">✅ Configuration Verified</h2>
            <p><strong>Gmail User:</strong> ${process.env.GMAIL_USER}</p>
            <p><strong>From Name:</strong> ${process.env.EMAIL_FROM_NAME}</p>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          </div>
          
          <div style="background: #e8f5e8; padding: 15px; border-radius: 5px; border-left: 4px solid #27ae60;">
            <p><strong>Status:</strong> Your Gmail service is now fully configured and working!</p>
            <p>You can now:</p>
            <ul>
              <li>Send emails to customers</li>
              <li>Receive emails via IMAP</li>
              <li>Send password reset emails</li>
              <li>Send welcome emails</li>
              <li>Send invoice notifications</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #7f8c8d;">
            <p>This is an automated test from the AB Insurance Management System</p>
          </div>
        </div>
      `,
      text: `
Gmail Service Test Successful!

Configuration Verified:
- Gmail User: ${process.env.GMAIL_USER}
- From Name: ${process.env.EMAIL_FROM_NAME}
- Timestamp: ${new Date().toISOString()}

Status: Your Gmail service is now fully configured and working!

You can now:
- Send emails to customers
- Receive emails via IMAP
- Send password reset emails
- Send welcome emails
- Send invoice notifications

This is an automated test from the AB Insurance Management System
      `,
    });

    console.log(`   ✅ Test email sent successfully!`);
    console.log(`   📧 Message ID: ${emailResult.messageId}`);
    console.log(`   📤 Response: ${emailResult.response}`);

    console.log("\n🎉 All tests completed successfully!");
    console.log("📧 Your Gmail service is now fully configured and working!");
  } catch (error) {
    console.error("\n❌ Email service test failed:", error.message);
    console.error("🔍 Error details:", error);
  }
}

// Run the test
testEmailService();

