import { Router } from "express";
import { auth } from "../../midlleWare/auth.js";
import * as ReportsController from "./Reports.controller.js";
const reportsRouter = Router();
// 1. Cheque reports
reportsRouter.get("/cheques", auth(["admin", "manager", "headOfDepartment"]), ReportsController.getChequeReport);
// 2. Due amounts reports
reportsRouter.get("/due-amounts", auth(["admin", "manager", "headOfDepartment"]), ReportsController.getDueAmountsReport);
// 3. Agent customers reports
reportsRouter.get("/agent-customers", auth(["admin", "manager", "headOfDepartment"]), ReportsController.getAgentCustomersReport);
// 4. Agent insurances reports
reportsRouter.get("/agent-insurances", auth(["admin", "manager", "headOfDepartment"]), ReportsController.getAgentInsurancesReport);
// 5. Expired insurance reports
reportsRouter.get("/expired-insurances", auth(["admin", "manager", "headOfDepartment"]), ReportsController.getExpiredInsuranceReport);
// Cache management
reportsRouter.post("/clear-cache", auth(["admin"]), ReportsController.clearReportsCache);
export default reportsRouter;
//# sourceMappingURL=Reports.route.js.map