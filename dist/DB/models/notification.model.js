import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
}, { timestamps: true });
const notificationModel = mongoose.model("Notification", notificationSchema);
export default notificationModel;
//# sourceMappingURL=notification.model.js.map