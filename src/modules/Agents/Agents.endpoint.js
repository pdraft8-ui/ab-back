import { roles } from "../../Servicess/roles.js";
export const endPoints = {
  addAgents: [roles.Admin, roles.Employee, roles.headOfDepartment],
  deleteAgents: [roles.Admin, roles.Employee, roles.headOfDepartment],
  updateAgents: [roles.Admin, roles.Employee, roles.headOfDepartment],
  allAgents: [roles.Admin, roles.Employee, roles.headOfDepartment],
};
