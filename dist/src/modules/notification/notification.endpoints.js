import { roles } from "../../Servicess/roles.js";
export const endPoints = {
    createNotification: [roles.Admin, roles.Employee, roles.headOfDepartment],
    getNotifications: [roles.Admin, roles.headOfDepartment],
    markAsRead: [roles.Admin, roles.headOfDepartment],
};
//# sourceMappingURL=notification.endpoints.js.map