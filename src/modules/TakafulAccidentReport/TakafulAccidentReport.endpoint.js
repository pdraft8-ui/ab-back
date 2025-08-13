import { roles } from "../../Servicess/roles.js";

export const endPoints = {
  addTakafulAccidentReport: [
    roles.Admin,
    roles.Employee,
    roles.headOfDepartment,
  ],
  deleteTakafulAccidentReport: [
    roles.Admin,
    roles.Employee,
    roles.headOfDepartment,
  ],

  showTakafulAccidentReport: [
    roles.Admin,
    roles.Employee,
    roles.headOfDepartment,
  ],
};
