const mongoose = require("mongoose");

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/insurance_db"
    );
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

// Get test data from database
const getTestData = async () => {
  try {
    // Import models
    const Invoice = require("./DB/models/Invoice.model.js");
    const Customer = require("./DB/models/Customer.model.js");
    const Payment = require("./DB/models/Payment.model.js");
    const User = require("./DB/models/User.model.js");

    console.log("\n🔍 Fetching test data from database...\n");

    // Get invoices
    const invoices = await Invoice.find()
      .limit(3)
      .select("_id invoiceNumber totalAmount");
    console.log("📄 Invoices:");
    invoices.forEach((invoice) => {
      console.log(`  ID: ${invoice._id}`);
      console.log(`  Number: ${invoice.invoiceNumber}`);
      console.log(`  Amount: ${invoice.totalAmount}`);
      console.log("  ---");
    });

    // Get customers
    const customers = await Customer.find()
      .limit(3)
      .select("_id firstName lastName email");
    console.log("\n👥 Customers:");
    customers.forEach((customer) => {
      console.log(`  ID: ${customer._id}`);
      console.log(`  Name: ${customer.firstName} ${customer.lastName}`);
      console.log(`  Email: ${customer.email}`);
      console.log("  ---");
    });

    // Get payments
    const payments = await Payment.find()
      .limit(3)
      .select("_id paymentNumber paymentAmount status");
    console.log("\n💰 Payments:");
    payments.forEach((payment) => {
      console.log(`  ID: ${payment._id}`);
      console.log(`  Number: ${payment.paymentNumber}`);
      console.log(`  Amount: ${payment.paymentAmount}`);
      console.log(`  Status: ${payment.status}`);
      console.log("  ---");
    });

    // Get users
    const users = await User.find()
      .limit(3)
      .select("_id firstName lastName email role");
    console.log("\n👤 Users:");
    users.forEach((user) => {
      console.log(`  ID: ${user._id}`);
      console.log(`  Name: ${user.firstName} ${user.lastName}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Role: ${user.role}`);
      console.log("  ---");
    });

    // Generate test configuration
    if (invoices.length > 0 && customers.length > 0 && users.length > 0) {
      console.log("\n📝 Test Configuration for test-payment-endpoints.js:");
      console.log("==================================================");
      console.log("const TEST_DATA = {");
      console.log(`  invoiceId: '${invoices[0]._id}',`);
      console.log(`  customerId: '${customers[0]._id}',`);
      console.log(`  userId: '${users[0]._id}',`);
      console.log("  paymentData: {");
      console.log(`    invoiceId: '${invoices[0]._id}',`);
      console.log(`    customerId: '${customers[0]._id}',`);
      console.log('    paymentMethod: "Cash",');
      console.log(`    paymentAmount: ${invoices[0].totalAmount || 1000},`);
      console.log("    paymentDate: new Date().toISOString(),");
      console.log(
        '    notes: "Test payment for clean architecture migration",'
      );
      console.log('    referenceNumber: "REF-2024-001"');
      console.log("  },");
      console.log("  updateData: {");
      console.log('    paymentMethod: "Credit Card",');
      console.log(
        `    paymentAmount: ${(invoices[0].totalAmount || 1000) + 100},`
      );
      console.log('    notes: "Updated payment information"');
      console.log("  },");
      console.log("  refundData: {");
      console.log("    refundAmount: 500.00,");
      console.log('    refundReason: "Customer request",');
      console.log("    refundDate: new Date().toISOString()");
      console.log("  }");
      console.log("};");
      console.log("==================================================\n");

      console.log(
        "💡 Copy the above configuration to replace TEST_DATA in test-payment-endpoints.js"
      );
    } else {
      console.log("\n⚠️  Warning: Not enough data found in database");
      console.log(
        "   Please ensure you have at least one invoice, customer, and user in your database"
      );
    }

    // Get JWT token info
    console.log("\n🔑 Authentication Setup:");
    console.log("To get a JWT token:");
    console.log("1. Log in to your application");
    console.log("2. Open browser developer tools (F12)");
    console.log("3. Go to Network tab");
    console.log("4. Make any API request");
    console.log("5. Look for the Authorization header in the request");
    console.log('6. Copy the token value (without "Bearer ")');
    console.log("7. Update AUTH_TOKEN in test-payment-endpoints.js");
  } catch (error) {
    console.error("❌ Error fetching test data:", error);
  }
};

// Get database statistics
const getDatabaseStats = async () => {
  try {
    const Invoice = require("./DB/models/Invoice.model.js");
    const Customer = require("./DB/models/Customer.model.js");
    const Payment = require("./DB/models/Payment.model.js");
    const User = require("./DB/models/User.model.js");

    console.log("\n📊 Database Statistics:");
    console.log("=======================");

    const invoiceCount = await Invoice.countDocuments();
    const customerCount = await Customer.countDocuments();
    const paymentCount = await Payment.countDocuments();
    const userCount = await User.countDocuments();

    console.log(`Invoices: ${invoiceCount}`);
    console.log(`Customers: ${customerCount}`);
    console.log(`Payments: ${paymentCount}`);
    console.log(`Users: ${userCount}`);

    if (invoiceCount === 0) {
      console.log(
        "\n⚠️  No invoices found. You need invoices to test payments."
      );
    }
    if (customerCount === 0) {
      console.log(
        "\n⚠️  No customers found. You need customers to test payments."
      );
    }
    if (userCount === 0) {
      console.log("\n⚠️  No users found. You need users for authentication.");
    }
  } catch (error) {
    console.error("❌ Error getting database stats:", error);
  }
};

// Main function
const main = async () => {
  console.log("🔧 Payment Module Test Data Setup");
  console.log("==================================\n");

  await connectDB();
  await getDatabaseStats();
  await getTestData();

  console.log("\n✅ Test data setup complete!");
  console.log("\nNext steps:");
  console.log(
    "1. Update test-payment-endpoints.js with the provided configuration"
  );
  console.log("2. Get a valid JWT token and update AUTH_TOKEN");
  console.log("3. Run: node test-payment-endpoints.js");

  process.exit(0);
};

// Run if called directly
if (require.main === module) {
  main().catch((error) => {
    console.error("❌ Setup failed:", error);
    process.exit(1);
  });
}

module.exports = {
  getTestData,
  getDatabaseStats,
  connectDB,
};
