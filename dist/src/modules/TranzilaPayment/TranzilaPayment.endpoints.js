import { roles } from "../../Servicess/roles.js";
export const endPoints = {
    createDirectPayment: [roles.Admin, roles.Employee, roles.headOfDepartment],
    getPaymentStatus: [roles.Admin, roles.Employee, roles.headOfDepartment],
    refundDirectPayment: [roles.Admin, roles.headOfDepartment],
    getPaymentHistory: [roles.Admin, roles.Employee, roles.headOfDepartment],
};
//# sourceMappingURL=TranzilaPayment.endpoints.js.map