import { roles } from "../../Servicess/roles.js";

export const endPoints = {
  prof: [roles.Admin, roles.Customer, roles.Agents, roles.headOfDepartment],
  addEmployee: [roles.Admin, roles.headOfDepartment],
  deleteEmployee: [roles.Admin, roles.headOfDepartment],
  updateEmployee: [roles.Admin, roles.headOfDepartment],
  allEmployee: [roles.Admin, roles.headOfDepartment],
  resetEmployeePassword: [roles.Admin],
  toggleEmployeeStatus: [roles.Admin, roles.headOfDepartment],
  addHeadOfDepartmentToDepartmen: [roles.Admin],
  deleteHeadOfDepartmentToDepartmen: [roles.Admin],
  getHeadOfDepartment: [roles.Admin, roles.headOfDepartment],
  // Inbox email endpoints
  testImapConfiguration: [roles.Admin],
  getInboxEmails: [roles.Admin, roles.headOfDepartment],
  getEmailById: [roles.Admin, roles.headOfDepartment],
  markEmailReadStatus: [roles.Admin, roles.headOfDepartment],
  deleteInboxEmail: [roles.Admin, roles.headOfDepartment],
  getInboxStats: [roles.Admin, roles.headOfDepartment],
};
