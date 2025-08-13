import { NotificationContainerMinimal } from "./src/modules/Notification/infrastructure/container/NotificationContainer.js";
import { Notification } from "./src/modules/Notification/domain/entities/Notification.entity.js";

console.log("🧪 Testing Notification Module - Modular Clean Architecture");
console.log("=".repeat(60));

async function testNotificationModule() {
  try {
    console.log("\n1. Testing Notification Entity...");
    const notificationData = {
      recipient: "user123",
      sender: "admin456",
      message: "Test notification message",
      isRead: false,
      readAt: null,
    };

    const notification = new Notification(notificationData);
    console.log("✅ Notification entity created successfully");
    console.log("   - Is Valid:", notification.isValid());
    console.log("   - Is Unread:", notification.isUnread());
    console.log("   - Time Since Created:", notification.getTimeSinceCreated());

    // Test marking as read
    notification.markAsRead();
    console.log(
      "   - After marking as read - Is Read:",
      !notification.isUnread()
    );

    console.log("\n2. Testing Notification Container (Minimal)...");
    const container = new NotificationContainerMinimal();
    console.log("✅ Notification container created successfully");

    console.log("\n3. Testing SendNotificationUseCase...");
    const sendNotificationUseCase = container.getSendNotificationUseCase();
    const sendResult = await sendNotificationUseCase.execute({
      senderId: "admin123",
      message: "Test notification",
      recipients: ["user1", "user2"],
      recipient: "user1", // Add required fields for validation
      sender: "admin123",
    });
    console.log("✅ SendNotificationUseCase executed successfully");
    console.log("   - Notifications sent:", sendResult.length);
    console.log("   - First notification ID:", sendResult[0].id);

    console.log("\n4. Testing GetNotificationsUseCase...");
    const getNotificationsUseCase = container.getGetNotificationsUseCase();
    const getResult = await getNotificationsUseCase.execute("user123", {
      page: 1,
      limit: 10,
    });
    console.log("✅ GetNotificationsUseCase executed successfully");
    console.log("   - Total notifications:", getResult.pagination.total);
    console.log("   - Notifications count:", getResult.notifications.length);

    console.log("\n5. Testing MarkAsReadUseCase...");
    const markAsReadUseCase = container.getMarkAsReadUseCase();
    const markResult = await markAsReadUseCase.execute(
      "notification123",
      "user123"
    );
    console.log("✅ MarkAsReadUseCase executed successfully");
    console.log("   - Notification ID:", markResult.id);
    console.log("   - Is Read:", markResult.isRead);

    console.log("\n6. Testing MarkAllAsReadUseCase...");
    const markAllAsReadUseCase = container.getMarkAllAsReadUseCase();
    const markAllResult = await markAllAsReadUseCase.execute("user123");
    console.log("✅ MarkAllAsReadUseCase executed successfully");
    console.log("   - Modified count:", markAllResult.modifiedCount);
    console.log("   - Message:", markAllResult.message);

    console.log("\n7. Testing GetNotificationStatsUseCase...");
    const getNotificationStatsUseCase =
      container.getGetNotificationStatsUseCase();
    const statsResult = await getNotificationStatsUseCase.execute("user123");
    console.log("✅ GetNotificationStatsUseCase executed successfully");
    console.log("   - Total notifications:", statsResult.totalNotifications);
    console.log("   - Unread notifications:", statsResult.unreadNotifications);
    console.log("   - Read percentage:", statsResult.readPercentage);

    console.log("\n8. Testing NotificationController...");
    const notificationController = container.getNotificationController();
    console.log("✅ NotificationController created successfully");
    console.log(
      "   - Controller methods available:",
      Object.getOwnPropertyNames(
        Object.getPrototypeOf(notificationController)
      ).filter((name) => name !== "constructor")
    );

    console.log("\n9. Testing NotificationRoutes...");
    const notificationRoutes = container.getNotificationRoutes();
    console.log("✅ NotificationRoutes created successfully");
    console.log(
      "   - Router stack length:",
      notificationRoutes.getRouter().stack.length
    );

    console.log("\n🎉 All Notification module tests passed successfully!");
    console.log("\n📋 Notification Module Structure:");
    console.log("   ✅ Domain Layer:");
    console.log("      - Notification.entity.js");
    console.log("      - INotificationService.js");
    console.log("   ✅ Application Layer:");
    console.log("      - SendNotificationUseCase.js");
    console.log("      - GetNotificationsUseCase.js");
    console.log("      - MarkAsReadUseCase.js");
    console.log("      - MarkAllAsReadUseCase.js");
    console.log("      - GetNotificationStatsUseCase.js");
    console.log("   ✅ Infrastructure Layer:");
    console.log("      - NotificationService.js");
    console.log("      - NotificationContainer.js");
    console.log("   ✅ Presentation Layer:");
    console.log("      - NotificationController.js");
    console.log("      - NotificationRoutes.js");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  }
}

testNotificationModule();
