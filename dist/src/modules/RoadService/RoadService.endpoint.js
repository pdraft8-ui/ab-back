import { roles } from "../../Servicess/roles.js";
export const endPoints = {
    addRoad: [roles.Admin, roles.Employee, roles.headOfDepartment],
    deleteRoad: [roles.Admin, roles.Employee, roles.headOfDepartment],
    updateRoad: [roles.Admin, roles.Employee, roles.headOfDepartment],
    allRoad: [roles.Admin, roles.Employee, roles.headOfDepartment],
};
//# sourceMappingURL=RoadService.endpoint.js.map