import { Router } from "express";
import * as TrustAccidentReportRoute from "./controller/TrustAccidentReport.controller.js";
import { endPoints } from "./TrustAccidentReport.endpoint.js";
import { auth } from "../../midlleWare/auth.js";
import { checkDepartmentPermission } from "../../midlleWare/checkDepartmentPermission.js";

const TrustAccidentReportRouter = Router();

TrustAccidentReportRouter.post(
  "/addTrustAccidentReport",
  auth(endPoints.addTrustAccidentReport),
  TrustAccidentReportRoute.addAccedentReport
);

TrustAccidentReportRouter.delete(
  "/deleteTrustAccidentReport/:id",
  auth(endPoints.deleteTrustAccidentReport),
  TrustAccidentReportRoute.deleteAccidentReport
);

TrustAccidentReportRouter.get(
  "/showTrustAccidentReport",
  auth(endPoints.showTrustAccidentReport),
  TrustAccidentReportRoute.getAllAccidentReports
);

export default TrustAccidentReportRouter;
