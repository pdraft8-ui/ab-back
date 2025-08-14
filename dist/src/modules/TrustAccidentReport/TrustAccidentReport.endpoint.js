import { roles } from "../../Servicess/roles.js";
export const endPoints = {
    addTrustAccidentReport: [roles.Admin, roles.Employee, roles.headOfDepartment],
    deleteTrustAccidentReport: [
        roles.Admin,
        roles.Employee,
        roles.headOfDepartment,
    ],
    showTrustAccidentReport: [
        roles.Admin,
        roles.Employee,
        roles.headOfDepartment,
    ],
};
//# sourceMappingURL=TrustAccidentReport.endpoint.js.map