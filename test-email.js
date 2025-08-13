import dotenv from "dotenv";
import emailService from "./src/Servicess/email.js";

// Load environment variables
dotenv.config();

async function testEmailConfiguration() {
  console.log("🧪 Testing Email Configuration...\n");

  // Check environment variables
  console.log("📋 Environment Variables:");
  console.log(
    `GMAIL_USER: ${process.env.GMAIL_USER ? "✅ Set" : "❌ Not set"}`
  );
  console.log(
    `GMAIL_APP_PASSWORD: ${
      process.env.GMAIL_APP_PASSWORD ? "✅ Set" : "❌ Not set"
    }`
  );
  console.log(
    `EMAIL_FROM_NAME: ${
      process.env.EMAIL_FROM_NAME || "Insurance Management System"
    }\n`
  );

  try {
    // Test email connection
    console.log("🔗 Testing email connection...");
    const isConnected = await emailService.verifyConnection();

    if (isConnected) {
      console.log("✅ Email connection successful!\n");

      // Test sending a simple email
      console.log("📧 Testing email sending...");
      const testResult = await emailService.sendEmail({
        to: "islam.mutawea@gmail.com",
        subject: "Email Configuration Test",
        html: `
          <h1>🎉 Email Configuration Test Successful!</h1>
          <p>This is a test email to verify that the Gmail configuration is working properly.</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <p><strong>Status:</strong> ✅ Email service is working correctly!</p>
          <hr>
          <p><em>This email was sent from the Insurance Management System using Gmail SMTP.</em></p>
        `,
      });

      console.log("✅ Email sent successfully!");
      console.log("📊 Email Details:");
      console.log(`   Message ID: ${testResult.messageId}`);
      console.log(`   Response: ${testResult.response}`);
      console.log(`   Success: ${testResult.success}\n`);

      // Test password reset email
      console.log("🔐 Testing password reset email...");
      await emailService.sendPasswordResetEmail(
        "islam.mutawea@gmail.com",
        "TEST123",
        "Test User"
      );
      console.log("✅ Password reset email sent successfully!\n");

      // Test welcome email
      console.log("👋 Testing welcome email...");
      await emailService.sendWelcomeEmail(
        "islam.mutawea@gmail.com",
        "Test User"
      );
      console.log("✅ Welcome email sent successfully!\n");

      console.log(
        "🎉 All email tests passed! The Gmail configuration is working correctly."
      );
      console.log("\n📧 Available Email Functions:");
      console.log("   - sendPasswordResetEmail(email, code, userName)");
      console.log("   - sendWelcomeEmail(email, userName)");
      console.log(
        "   - sendInvoiceNotification(email, invoiceData, customerName)"
      );
      console.log(
        "   - sendPaymentConfirmation(email, paymentData, customerName)"
      );
      console.log("   - sendEmail(options)");
    } else {
      console.log("❌ Email connection failed!");
      console.log(
        "Please check your Gmail credentials and ensure 2-Factor Authentication is enabled."
      );
    }
  } catch (error) {
    console.error("❌ Email configuration test failed:", error.message);
    console.log("\n🔧 Troubleshooting Steps:");
    console.log("1. Verify Gmail username: basheerinsurance99@gmail.com");
    console.log("2. Verify app password: aobg elxm xxdr ejhc");
    console.log(
      "3. Ensure 2-Factor Authentication is enabled on the Gmail account"
    );
    console.log("4. Check internet connection");
    console.log("5. Verify firewall settings");
  }
}

// Run the test
testEmailConfiguration().catch(console.error);
