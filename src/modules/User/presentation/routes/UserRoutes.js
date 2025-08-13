import { Router } from "express";
import { auth } from "../../../../../src/midlleWare/auth.js";
import { endPoints } from "../../user.endpoints.js";
import { validation } from "../../../../../src/midlleWare/validation.js";
import * as userValid from "../../user.validation.js";

export class UserRoutes {
  constructor(userController) {
    this.userController = userController;
    this.router = Router();
    this.setupRoutes();
  }

  setupRoutes() {
    // Profile and authentication routes
    this.router.put(
      "/changepassword",
      auth(endPoints.prof),
      this.userController.changePassword.bind(this.userController)
    );

    this.router.put(
      "/change",
      auth(endPoints.prof),
      this.userController.updateUserInfo.bind(this.userController)
    );

    this.router.get(
      "/profile",
      auth(endPoints.prof),
      this.userController.getProfile.bind(this.userController)
    );

    this.router.post(
      "/add",
      this.userController.createAdmin.bind(this.userController)
    );

    this.router.post(
      "/signin",
      validation(userValid.signin),
      this.userController.signin.bind(this.userController)
    );

    this.router.patch(
      "/sendcode",
      validation(userValid.sendCode),
      this.userController.sendCode.bind(this.userController)
    );

    this.router.patch(
      "/forgetpassword",
      validation(userValid.forgetPassword),
      this.userController.forgetPassword.bind(this.userController)
    );

    // Department management routes
    this.router.post(
      "/addHeadOfDepartmentToDepartment/:id",
      auth(endPoints.addHeadOfDepartmentToDepartmen),
      validation(userValid.addHeadOfDepartmentToDepartment),
      this.userController.addHeadOfDepartmentToDepartment.bind(
        this.userController
      )
    );

    this.router.delete(
      "/deleteHeadOfDepartmentFromDepartment/:depId/:userId",
      auth(endPoints.deleteHeadOfDepartmentToDepartmen),
      this.userController.removeHeadOfDepartmentFromDepartment.bind(
        this.userController
      )
    );

    this.router.get(
      "/getHeadOfDepartment/:id",
      auth(endPoints.getHeadOfDepartment),
      this.userController.getHeadOfDepartment.bind(this.userController)
    );

    // Employee management routes
    this.router.post(
      "/addEmployee/:id",
      auth(endPoints.addEmployee),
      validation(userValid.AddEmployee),
      this.userController.addEmployee.bind(this.userController)
    );

    this.router.delete(
      "/deleteEmployee/:depId/:employeeId",
      auth(endPoints.deleteEmployee),
      this.userController.removeEmployee.bind(this.userController)
    );

    this.router.get(
      "/allEmployee/:depId",
      auth(endPoints.allEmployee),
      this.userController.getAllEmployees.bind(this.userController)
    );

    this.router.put(
      "/updateEmployee/:employeeId",
      auth(endPoints.updateEmployee),
      validation(userValid.updateEmployee),
      this.userController.updateEmployee.bind(this.userController)
    );

    this.router.patch(
      "/resetEmployeePassword/:employeeId",
      auth(endPoints.resetEmployeePassword),
      validation(userValid.resetEmployeePassword),
      this.userController.resetEmployeePassword.bind(this.userController)
    );

    this.router.patch(
      "/toggleEmployeeStatus/:employeeId",
      auth(endPoints.toggleEmployeeStatus),
      validation(userValid.toggleEmployeeStatus),
      this.userController.toggleEmployeeStatus.bind(this.userController)
    );

    // Email configuration routes
    this.router.post(
      "/test-email-configuration",
      auth(["admin"]),
      this.userController.testEmailConfiguration.bind(this.userController)
    );

    this.router.post(
      "/send-email",
      auth(["admin", "manager", "headOfDepartment"]),
      validation(userValid.sendCustomEmail),
      this.userController.sendCustomEmail.bind(this.userController)
    );

    this.router.post(
      "/send-bulk-emails",
      auth(["admin", "manager"]),
      validation(userValid.sendBulkEmails),
      this.userController.sendBulkEmails.bind(this.userController)
    );

    // IMAP and inbox routes
    this.router.post(
      "/test-imap-configuration",
      auth(endPoints.testImapConfiguration),
      this.userController.testImapConfiguration.bind(this.userController)
    );

    this.router.get(
      "/inbox",
      auth(endPoints.getInboxEmails),
      validation(userValid.getInboxEmails),
      this.userController.getInboxEmails.bind(this.userController)
    );

    this.router.get(
      "/inbox/:uid",
      auth(endPoints.getEmailById),
      validation(userValid.getEmailById),
      this.userController.getEmailById.bind(this.userController)
    );

    this.router.patch(
      "/inbox/:uid/read-status",
      auth(endPoints.markEmailReadStatus),
      validation(userValid.markEmailReadStatus),
      this.userController.markEmailReadStatus.bind(this.userController)
    );

    this.router.delete(
      "/inbox/:uid",
      auth(endPoints.deleteInboxEmail),
      validation(userValid.deleteInboxEmail),
      this.userController.deleteEmail.bind(this.userController)
    );

    this.router.get(
      "/inbox-stats",
      auth(endPoints.getInboxStats),
      this.userController.getInboxStats.bind(this.userController)
    );

    // Statistics route
    this.router.get(
      "/stats",
      auth(["admin"]),
      this.userController.getUserStats.bind(this.userController)
    );
  }

  getRouter() {
    return this.router;
  }
}
