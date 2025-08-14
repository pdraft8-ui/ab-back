import { roles } from "../../Servicess/roles.js";
export const endPoints = {
    createInvoice: [roles.Admin, roles.Employee, roles.headOfDepartment],
    getAllInvoices: [roles.Admin, roles.Employee, roles.headOfDepartment],
    getInvoiceById: [roles.Admin, roles.Employee, roles.headOfDepartment],
    updateInvoice: [roles.Admin, roles.headOfDepartment],
    deleteInvoice: [roles.Admin, roles.headOfDepartment],
    getInvoicesByCustomer: [roles.Admin, roles.Employee, roles.headOfDepartment],
    getInvoiceStats: [roles.Admin, roles.headOfDepartment],
    markOverdueInvoices: [roles.Admin, roles.headOfDepartment],
};
//# sourceMappingURL=Invoice.endpoints.js.map