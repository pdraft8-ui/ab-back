import dotenv from "dotenv";
dotenv.config();
import {
  verifyImapConnection,
  fetchInboxEmails,
  getEmailByUid,
  markEmailAsRead,
  deleteEmail,
} from "./src/Servicess/email.js";

console.log("🧪 Testing Inbox Email Functionality\n");

// Test IMAP connection
async function testImapConnection() {
  console.log("1. Testing IMAP Connection...");
  try {
    const isConnected = await verifyImapConnection();
    if (isConnected) {
      console.log("✅ IMAP connection successful");
    } else {
      console.log("❌ IMAP connection failed");
    }
  } catch (error) {
    console.log("❌ IMAP connection error:", error.message);
  }
  console.log("");
}

// Test fetching inbox emails
async function testFetchInboxEmails() {
  console.log("2. Testing Fetch Inbox Emails...");
  try {
    const result = await fetchInboxEmails({
      limit: 5,
      offset: 0,
      unreadOnly: false,
    });

    console.log(`✅ Fetched ${result.emails.length} emails`);
    console.log(`📊 Total emails in inbox: ${result.total}`);
    console.log(
      `📄 Pagination: Page ${result.pagination.currentPage} of ${result.pagination.totalPages}`
    );

    if (result.emails.length > 0) {
      console.log("📧 Sample email:");
      const sampleEmail = result.emails[0];
      console.log(`   From: ${sampleEmail.from}`);
      console.log(`   Subject: ${sampleEmail.subject}`);
      console.log(`   Date: ${sampleEmail.date}`);
      console.log(`   Size: ${sampleEmail.size} bytes`);
      console.log(`   Flags: ${sampleEmail.flags.join(", ")}`);
    }
  } catch (error) {
    console.log("❌ Fetch inbox emails error:", error.message);
  }
  console.log("");
}

// Test fetching with search
async function testSearchEmails() {
  console.log("3. Testing Email Search...");
  try {
    const result = await fetchInboxEmails({
      limit: 3,
      offset: 0,
      search: "test",
      unreadOnly: false,
    });

    console.log(`✅ Found ${result.emails.length} emails matching 'test'`);
    console.log(`📊 Total matching emails: ${result.total}`);

    result.emails.forEach((email, index) => {
      console.log(`   ${index + 1}. ${email.subject} (from: ${email.from})`);
    });
  } catch (error) {
    console.log("❌ Search emails error:", error.message);
  }
  console.log("");
}

// Test getting specific email
async function testGetSpecificEmail() {
  console.log("4. Testing Get Specific Email...");
  try {
    // First get a list of emails to find a UID
    const inboxResult = await fetchInboxEmails({
      limit: 1,
      offset: 0,
    });

    if (inboxResult.emails.length > 0) {
      const emailUid = inboxResult.emails[0].uid;
      console.log(`🔍 Getting email with UID: ${emailUid}`);

      const email = await getEmailByUid(emailUid);
      console.log("✅ Retrieved specific email:");
      console.log(`   From: ${email.from}`);
      console.log(`   Subject: ${email.subject}`);
      console.log(`   Date: ${email.date}`);
      console.log(`   Size: ${email.size} bytes`);
      console.log(`   Body length: ${email.text.length} characters`);
    } else {
      console.log("ℹ️ No emails found to test specific email retrieval");
    }
  } catch (error) {
    console.log("❌ Get specific email error:", error.message);
  }
  console.log("");
}

// Test marking email as read
async function testMarkEmailAsRead() {
  console.log("5. Testing Mark Email as Read...");
  try {
    // First get a list of emails to find a UID
    const inboxResult = await fetchInboxEmails({
      limit: 1,
      offset: 0,
    });

    if (inboxResult.emails.length > 0) {
      const emailUid = inboxResult.emails[0].uid;
      console.log(`📝 Marking email ${emailUid} as read...`);

      const result = await markEmailAsRead(emailUid, true);
      console.log("✅ Email marked as read:", result.message);

      // Test marking as unread
      console.log(`📝 Marking email ${emailUid} as unread...`);
      const unreadResult = await markEmailAsRead(emailUid, false);
      console.log("✅ Email marked as unread:", unreadResult.message);
    } else {
      console.log("ℹ️ No emails found to test read status");
    }
  } catch (error) {
    console.log("❌ Mark email as read error:", error.message);
  }
  console.log("");
}

// Test inbox statistics
async function testInboxStats() {
  console.log("6. Testing Inbox Statistics...");
  try {
    // Get total emails
    const totalEmails = await fetchInboxEmails({ limit: 1, offset: 0 });

    // Get unread emails
    const unreadEmails = await fetchInboxEmails({
      limit: 1,
      offset: 0,
      unreadOnly: true,
    });

    // Get today's emails
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayEmails = await fetchInboxEmails({
      limit: 1,
      offset: 0,
      dateFrom: today.toISOString(),
    });

    const stats = {
      total: totalEmails.total || 0,
      unread: unreadEmails.total || 0,
      today: todayEmails.total || 0,
      read: (totalEmails.total || 0) - (unreadEmails.total || 0),
    };

    console.log("📊 Inbox Statistics:");
    console.log(`   Total emails: ${stats.total}`);
    console.log(`   Unread emails: ${stats.unread}`);
    console.log(`   Read emails: ${stats.read}`);
    console.log(`   Today's emails: ${stats.today}`);
  } catch (error) {
    console.log("❌ Inbox stats error:", error.message);
  }
  console.log("");
}

// Main test function
async function runTests() {
  console.log("🚀 Starting Inbox Email Tests...\n");

  await testImapConnection();
  await testFetchInboxEmails();
  await testSearchEmails();
  await testGetSpecificEmail();
  await testMarkEmailAsRead();
  await testInboxStats();

  console.log("✨ All inbox tests completed!");
}

// Run tests
runTests().catch(console.error);
