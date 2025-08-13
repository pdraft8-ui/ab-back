import { roles } from "../../Servicess/roles.js";

export const endPoints = {
  addHolyAccidentReport: [roles.Admin, roles.Employee, roles.headOfDepartment],
  deleteHoliAccidentReport: [
    roles.Admin,
    roles.Employee,
    roles.headOfDepartment,
  ],
  showHoliAccidentReport: [roles.Admin, roles.Employee, roles.headOfDepartment],
};
