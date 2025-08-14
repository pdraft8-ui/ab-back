import { roles } from "../../Servicess/roles.js";
export const endPoints = {
    createPayment: [roles.Admin, roles.Employee, roles.headOfDepartment],
    getAllPayments: [roles.Admin, roles.Employee, roles.headOfDepartment],
    getPaymentById: [roles.Admin, roles.Employee, roles.headOfDepartment],
    updatePayment: [roles.Admin, roles.Employee, roles.headOfDepartment],
    deletePayment: [roles.Admin, roles.headOfDepartment],
    getPaymentsByCustomer: [roles.Admin, roles.Employee, roles.headOfDepartment],
    getPaymentsByInvoice: [roles.Admin, roles.Employee, roles.headOfDepartment],
    getPaymentStats: [roles.Admin, roles.Employee, roles.headOfDepartment],
    refundPayment: [roles.Admin, roles.Employee, roles.headOfDepartment],
};
//# sourceMappingURL=Payment.endpoints.js.map