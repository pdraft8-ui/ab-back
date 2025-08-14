import { Router } from "express";
import * as PalestineAccidentReportRoute from "./controller/PalestineAccidentReport.controller.js";
import { endPoints } from "./PalestineAccidentReport.endpoints.js";
import { auth } from "../../midlleWare/auth.js";
import { checkDepartmentPermission } from "../../midlleWare/checkDepartmentPermission.js";
const PalestineAccidentReportRouter = Router();
PalestineAccidentReportRouter.post("/addPalestineAccidentReport", auth(endPoints.addPalestineAccidentReport), PalestineAccidentReportRoute.addAccedentReport);
PalestineAccidentReportRouter.delete("/deletePalestineAccidentReport/:id", auth(endPoints.deletePalestineAccidentReport), PalestineAccidentReportRoute.deleteAccidentReport);
PalestineAccidentReportRouter.get("/showPalestineAccidentReport", auth(endPoints.showPalestineAccidentReport), PalestineAccidentReportRoute.getAllReports);
export default PalestineAccidentReportRouter;
//# sourceMappingURL=PalestineAccidentReport.route.js.map