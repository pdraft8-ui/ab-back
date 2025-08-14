import { Router } from "express";
import { auth } from "../../midlleWare/auth.js";
import * as StatisticsController from "./Statistics.controller.js";
const statisticsRouter = Router();
// Dashboard statistics endpoints
statisticsRouter.get("/dashboard", auth(["admin", "manager", "headOfDepartment"]), StatisticsController.getDashboardStats);
// Individual statistics endpoints
statisticsRouter.get("/customers", auth(["admin", "manager", "headOfDepartment"]), StatisticsController.getTotalCustomers);
statisticsRouter.get("/income", auth(["admin", "manager", "headOfDepartment"]), StatisticsController.getTotalIncome);
statisticsRouter.get("/expenses", auth(["admin", "manager", "headOfDepartment"]), StatisticsController.getTotalExpenses);
statisticsRouter.get("/due-amount", auth(["admin", "manager", "headOfDepartment"]), StatisticsController.getDueAmount);
statisticsRouter.get("/payment-methods", auth(["admin", "manager", "headOfDepartment"]), StatisticsController.getPaymentMethodStats);
statisticsRouter.get("/profit", auth(["admin", "manager", "headOfDepartment"]), StatisticsController.getTotalProfit);
// Cache management
statisticsRouter.post("/clear-cache", auth(["admin"]), StatisticsController.clearStatsCache);
// Payment overview
statisticsRouter.get("/payment-overview", auth(["admin", "manager", "headOfDepartment"]), StatisticsController.getPaymentOverview);
export default statisticsRouter;
//# sourceMappingURL=Statistics.route.js.map