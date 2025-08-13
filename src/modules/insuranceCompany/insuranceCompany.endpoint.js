import { roles } from "../../Servicess/roles.js";

export const endPoints = {
  addCompany: [roles.Admin, roles.Employee, roles.headOfDepartment],
  deleteCompany: [roles.Admin, roles.headOfDepartment, roles.Employee],
  upateCompany: [roles.Admin, roles.headOfDepartment, roles.Employee],
  allCompany: [roles.Admin, roles.headOfDepartment, roles.Employee],
};
