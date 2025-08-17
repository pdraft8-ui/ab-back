import { Router } from "express";
import { auth } from "../../midlleWare/auth.js";
import { endPoints } from "./user.endpoints.js";
import * as userRoute from "./controller/user.controller.js";
import { validation } from "../../midlleWare/validation.js";
import * as userValid from "../User/user.validation.js";
const userRouter = Router();
userRouter.put(
  "/changepassword",
  auth(endPoints.prof),
  userRoute.changepassword
);
userRouter.put("/change", auth(endPoints.prof), userRoute.changeInformation);
userRouter.get("/profile", auth(endPoints.prof), userRoute.profile);
userRouter.post("/add", validation(userValid.addAdmin), userRoute.addAdmin);
userRouter.post("/signin", validation(userValid.signin), userRoute.signin);

userRouter.patch(
  "/sendcode",
  validation(userValid.sendCode),
  userRoute.sendCode
);
userRouter.patch(
  "/forgetpassword",
  validation(userValid.forgetPassword),
  userRoute.forgetPassward
);
userRouter.post(
  "/addHeadOfDepartmentToDepartment/:id",
  auth(endPoints.addHeadOfDepartmentToDepartmen),
  validation(userValid.addHeadOfDepartmentToDepartment),
  userRoute.addHeadOfDepartmentToDepartment
);
userRouter.delete(
  "/deleteHeadOfDepartmentFromDepartment/:depId/:userId",
  auth(endPoints.deleteHeadOfDepartmentToDepartmen),
  userRoute.deleteHeadOfDepartmentFromDepartment
);
userRouter.get(
  "/getHeadOfDepartment/:id",
  auth(endPoints.getHeadOfDepartment),
  userRoute.getHeadOfDepartment
);
userRouter.post(
  "/addEmployee/:id",
  auth(endPoints.addEmployee),
  validation(userValid.AddEmployee),
  userRoute.addEmployee
);
userRouter.delete(
  "/deleteEmployee/:depId/:employeeId",
  auth(endPoints.deleteEmployee),
  userRoute.deleteEmployee
);
userRouter.get(
  "/allEmployee/:depId",
  auth(endPoints.allEmployee),
  userRoute.allEmployee
);

// Update employee data
userRouter.put(
  "/updateEmployee/:employeeId",
  auth(endPoints.updateEmployee),
  validation(userValid.updateEmployee),
  userRoute.updateEmployee
);

// Reset employee password (admin only)
userRouter.patch(
  "/resetEmployeePassword/:employeeId",
  auth(endPoints.resetEmployeePassword),
  validation(userValid.resetEmployeePassword),
  userRoute.resetEmployeePassword
);

// Toggle employee status (activate/deactivate)
userRouter.patch(
  "/toggleEmployeeStatus/:employeeId",
  auth(endPoints.toggleEmployeeStatus),
  validation(userValid.toggleEmployeeStatus),
  userRoute.toggleEmployeeStatus
);

// Test email configuration (admin only)
userRouter.post(
  "/test-email-configuration",
  auth(["admin"]),
  userRoute.testEmailConfiguration
);

// Send custom email with content from frontend
userRouter.post(
  "/send-email",
  auth(["admin", "manager", "headOfDepartment"]),
  validation(userValid.sendCustomEmail),
  userRoute.sendCustomEmail
);

// Send bulk emails
userRouter.post(
  "/send-bulk-emails",
  auth(["admin", "manager"]),
  validation(userValid.sendBulkEmails),
  userRoute.sendBulkEmails
);

// Test IMAP configuration (admin only)
userRouter.post(
  "/test-imap-configuration",
  auth(endPoints.testImapConfiguration),
  userRoute.testImapConfiguration
);

// Get inbox emails with filtering and pagination
userRouter.get(
  "/inbox",
  auth(endPoints.getInboxEmails),
  validation(userValid.getInboxEmails),
  userRoute.getInboxEmails
);

// Get specific email by UID
userRouter.get(
  "/inbox/:uid",
  auth(endPoints.getEmailById),
  validation(userValid.getEmailById),
  userRoute.getEmailById
);

// Mark email as read/unread
userRouter.patch(
  "/inbox/:uid/read-status",
  auth(endPoints.markEmailReadStatus),
  validation(userValid.markEmailReadStatus),
  userRoute.markEmailReadStatus
);

// Delete email
userRouter.delete(
  "/inbox/:uid",
  auth(endPoints.deleteInboxEmail),
  validation(userValid.deleteInboxEmail),
  userRoute.deleteInboxEmail
);

// Get inbox statistics
userRouter.get(
  "/inbox-stats",
  auth(endPoints.getInboxStats),
  userRoute.getInboxStats
);

// SMS Routes

// Test SMS configuration (admin only)
userRouter.post(
  "/test-sms-configuration",
  auth(["admin"]),
  userRoute.testSMSConfiguration
);

// Send single SMS
userRouter.post(
  "/send-sms",
  auth(["admin", "manager", "headOfDepartment"]),
  userRoute.sendSingleSMS
);

// Send bulk SMS
userRouter.post(
  "/send-bulk-sms",
  auth(["admin", "manager"]),
  userRoute.sendBulkSMS
);

// Get SMS service status
userRouter.get("/sms-status", auth(["admin"]), userRoute.getSMSStatus);

export default userRouter;
