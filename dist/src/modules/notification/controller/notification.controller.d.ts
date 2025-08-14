export function sendNotificationLogic({ senderId, message }: {
    senderId: any;
    message: any;
}): Promise<(mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    message: string;
    recipient: mongoose.Types.ObjectId;
    sender: mongoose.Types.ObjectId;
    isRead: boolean;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    message: string;
    recipient: mongoose.Types.ObjectId;
    sender: mongoose.Types.ObjectId;
    isRead: boolean;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
})[]>;
export function createNotification(req: any, res: any): Promise<any>;
export function getNotifications(req: any, res: any): Promise<any>;
export function markAsRead(req: any, res: any): Promise<any>;
export function markAllAsRead(req: any, res: any): Promise<any>;
import mongoose from "mongoose";
//# sourceMappingURL=notification.controller.d.ts.map