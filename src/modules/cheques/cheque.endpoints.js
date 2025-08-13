import { roles } from "../../Servicess/roles.js";

export const endPoints = {
  // CRUD operations
  createCheque: [roles.Admin, roles.Employee, roles.headOfDepartment],
  getAllCheques: [roles.Admin, roles.Employee, roles.headOfDepartment],
  getChequeById: [roles.Admin, roles.Employee, roles.headOfDepartment],
  updateCheque: [roles.Admin, roles.headOfDepartment],
  deleteCheque: [roles.Admin, roles.headOfDepartment],

  // Advanced operations
  bulkUpdateChequeStatus: [roles.Admin, roles.headOfDepartment],
  getChequeStatistics: [roles.Admin, roles.headOfDepartment],

  // Customer specific operations
  getCustomerCheques: [roles.Admin, roles.Employee, roles.headOfDepartment],
};
