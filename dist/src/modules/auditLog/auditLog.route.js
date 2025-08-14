import { Router } from "express";
import * as auditsRoute from "./controller/auditLog.controller.js";
const auditsRouter = Router();
auditsRouter.get("/all", auditsRoute.getAllAuditLogs);
export default auditsRouter;
//# sourceMappingURL=auditLog.route.js.map