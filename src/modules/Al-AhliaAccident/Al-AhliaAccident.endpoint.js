import { roles } from "../../Servicess/roles.js";

export const endPoints = {
  addAhliaAccidentReport: [roles.Admin, roles.Employee, roles.headOfDepartment],
  deleteAhliaAccidentReport: [
    roles.Admin,
    roles.Employee,
    roles.headOfDepartment,
  ],
  showAhliaAccidentReport: [
    roles.Admin,
    roles.Employee,
    roles.headOfDepartment,
  ],
};
