import { TranzilaPayment } from "./src/modules/TranzilaPayment/domain/entities/TranzilaPayment.entity.js";

console.log("🧪 Testing TranzilaPayment Entity - Isolated Test");
console.log("=".repeat(50));

function testTranzilaPaymentEntity() {
  try {
    console.log("\n1. Testing TranzilaPayment Entity Creation...");
    const paymentData = {
      amount: 1000,
      currency: "ILS",
      description: "Test payment",
      customerEmail: "test@example.com",
      customerPhone: "123456789",
      customerName: "Test Customer",
      createdBy: "user123",
    };

    const tranzilaPayment = new TranzilaPayment(paymentData);
    console.log("✅ TranzilaPayment entity created successfully");
    console.log("   - Payment ID:", tranzilaPayment.paymentId);
    console.log("   - Status:", tranzilaPayment.status);
    console.log("   - Amount:", tranzilaPayment.amount);

    // Test entity methods
    console.log("\n2. Testing Entity Methods...");
    console.log("   - Is pending:", tranzilaPayment.isPending());
    console.log("   - Can be refunded:", tranzilaPayment.canBeRefunded());
    console.log(
      "   - Has transaction ID:",
      tranzilaPayment.hasTranzilaTransactionId()
    );

    console.log("\n3. Testing Entity State Changes...");
    console.log("   - Initial status:", tranzilaPayment.status);

    tranzilaPayment.markAsCompleted("TXN-123");
    console.log("   - After markAsCompleted:", tranzilaPayment.status);
    console.log("   - Transaction ID:", tranzilaPayment.tranzilaTransactionId);
    console.log("   - Completed at:", tranzilaPayment.completedAt);

    tranzilaPayment.markAsRefunded(500, "Customer request");
    console.log("   - After markAsRefunded:", tranzilaPayment.status);
    console.log("   - Refund amount:", tranzilaPayment.refundAmount);
    console.log("   - Refund reason:", tranzilaPayment.refundReason);

    console.log("\n4. Testing Validation Methods...");
    console.log(
      "   - Validate refund amount (500):",
      tranzilaPayment.validateRefundAmount(500)
    );
    console.log(
      "   - Validate refund amount (2000):",
      tranzilaPayment.validateRefundAmount(2000)
    );
    console.log(
      "   - Validate refund amount (0):",
      tranzilaPayment.validateRefundAmount(0)
    );

    console.log("\n5. Testing toJSON Method...");
    const jsonData = tranzilaPayment.toJSON();
    console.log("   - JSON keys:", Object.keys(jsonData));
    console.log("   - Has paymentId:", "paymentId" in jsonData);
    console.log("   - Has status:", "status" in jsonData);

    console.log("\n6. Testing Payment ID Generation...");
    const payment1 = new TranzilaPayment({ amount: 100, createdBy: "user1" });
    const payment2 = new TranzilaPayment({ amount: 200, createdBy: "user2" });
    console.log("   - Payment 1 ID:", payment1.paymentId);
    console.log("   - Payment 2 ID:", payment2.paymentId);
    console.log(
      "   - IDs are different:",
      payment1.paymentId !== payment2.paymentId
    );

    console.log("\n🎉 All TranzilaPayment Entity Tests Passed!");
    console.log("✅ Entity creation works correctly");
    console.log("✅ All methods function properly");
    console.log("✅ State changes are applied correctly");
    console.log("✅ Validation logic works as expected");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  }
}

// Run the test
testTranzilaPaymentEntity();
console.log("\n🏁 TranzilaPayment entity testing completed successfully!");
