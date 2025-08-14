import { roles } from "../../Servicess/roles.js";
export const endPoints = {
    addAl_MashreqAccidentReport: [
        roles.Admin,
        roles.Employee,
        roles.headOfDepartment,
    ],
    deleteAl_MashreqAccidentReport: [
        roles.Admin,
        roles.Employee,
        roles.headOfDepartment,
    ],
    showAl_MashreqAccidentReport: [
        roles.Admin,
        roles.Employee,
        roles.headOfDepartment,
    ],
};
//# sourceMappingURL=Al-MashreqAccidentReport.endpoint.js.map