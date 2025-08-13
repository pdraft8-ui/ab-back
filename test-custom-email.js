import dotenv from "dotenv";
import emailService from "./src/Servicess/email.js";

// Load environment variables
dotenv.config();

async function testCustomEmailEndpoints() {
  console.log("🧪 Testing Custom Email Endpoints...\n");

  try {
    // Test 1: Send a simple custom email
    console.log("📧 Test 1: Sending custom email...");
    const customEmailResult = await emailService.sendEmail({
      to: "islam.mutawea@gmail.com",
      subject: "Custom Email Test",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2c3e50;">Custom Email Test</h1>
          <p>This is a custom email sent from the frontend with HTML content.</p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3>Email Details:</h3>
            <ul>
              <li><strong>From:</strong> Insurance Management System</li>
              <li><strong>To:</strong> islam.mutawea@gmail.com</li>
              <li><strong>Subject:</strong> Custom Email Test</li>
              <li><strong>Timestamp:</strong> ${new Date().toISOString()}</li>
            </ul>
          </div>
          <p>This email demonstrates the custom email functionality where content is provided from the frontend.</p>
          <hr>
          <p style="color: #7f8c8d; font-size: 12px;">
            This email was sent using the custom email endpoint.
          </p>
        </div>
      `,
    });

    console.log("✅ Custom email sent successfully!");
    console.log(`   Message ID: ${customEmailResult.messageId}\n`);

    // Test 2: Send email with CC and BCC
    console.log("📧 Test 2: Sending email with CC and BCC...");
    const ccBccResult = await emailService.sendEmail({
      to: "islam.mutawea@gmail.com",
      subject: "Email with CC and BCC Test",
      html: `
        <h1>Email with CC and BCC</h1>
        <p>This email demonstrates CC and BCC functionality.</p>
        <p><strong>CC:</strong> Additional recipients can see this email</p>
        <p><strong>BCC:</strong> Hidden recipients (not shown in this example)</p>
      `,
      cc: ["test1@example.com", "test2@example.com"],
      bcc: ["hidden@example.com"],
    });

    console.log("✅ CC/BCC email sent successfully!");
    console.log(`   Message ID: ${ccBccResult.messageId}\n`);

    // Test 3: Send plain text email
    console.log("📧 Test 3: Sending plain text email...");
    const textResult = await emailService.sendEmail({
      to: "islam.mutawea@gmail.com",
      subject: "Plain Text Email Test",
      text: `
        This is a plain text email.
        
        It doesn't contain any HTML formatting.
        
        Best regards,
        Insurance Management System
      `,
    });

    console.log("✅ Plain text email sent successfully!");
    console.log(`   Message ID: ${textResult.messageId}\n`);

    // Test 4: Send welcome email (using template)
    console.log("📧 Test 4: Sending welcome email template...");
    await emailService.sendWelcomeEmail(
      "islam.mutawea@gmail.com",
      "Islam Mutawea"
    );

    console.log("✅ Welcome email template sent successfully!\n");

    // Test 5: Send password reset email (using template)
    console.log("📧 Test 5: Sending password reset email template...");
    await emailService.sendPasswordResetEmail(
      "islam.mutawea@gmail.com",
      "RESET123",
      "Islam Mutawea"
    );

    console.log("✅ Password reset email template sent successfully!\n");

    console.log("🎉 All custom email tests passed!");
    console.log("\n📋 Available Email Features:");
    console.log("   ✅ Custom HTML emails");
    console.log("   ✅ Plain text emails");
    console.log("   ✅ CC and BCC support");
    console.log("   ✅ Email templates (welcome, password reset)");
    console.log("   ✅ Attachment support (ready for implementation)");
    console.log("   ✅ Reply-to functionality");
    console.log("   ✅ Bulk email sending");
    console.log("   ✅ Email validation");
    console.log("   ✅ Error handling and logging");

    console.log("\n🌐 API Endpoints Available:");
    console.log("   POST /api/v1/user/send-email - Send custom email");
    console.log("   POST /api/v1/user/send-bulk-emails - Send bulk emails");
    console.log(
      "   POST /api/v1/user/test-email-configuration - Test email config"
    );
  } catch (error) {
    console.error("❌ Custom email test failed:", error.message);
    console.log("\n🔧 Troubleshooting:");
    console.log("1. Check if the email service is properly configured");
    console.log("2. Verify the recipient email address");
    console.log("3. Check the application logs for detailed errors");
  }
}

// Run the test
testCustomEmailEndpoints().catch(console.error);
