import { roles } from "../../Servicess/roles.js";

export const endPoints = {
  addPalestineAccidentReport: [
    roles.Admin,
    roles.Employee,
    roles.headOfDepartment,
  ],
  deletePalestineAccidentReport: [
    roles.Admin,
    roles.Employee,
    roles.headOfDepartment,
  ],
  showPalestineAccidentReport: [
    roles.Admin,
    roles.Employee,
    roles.headOfDepartment,
  ],
};
