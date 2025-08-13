import { Router } from "express";
import * as Al_MashreqAccidentReportRoute from "./controller/Al-MashreqAccidentReportAl-MashreqAccidentReport.conroller.js";
import { endPoints } from "./Al-MashreqAccidentReport.endpoint.js";
import { auth } from "../../midlleWare/auth.js";
import { checkDepartmentPermission } from "../../midlleWare/checkDepartmentPermission.js";

const Al_MashreqAccidentReportRouter = Router();

Al_MashreqAccidentReportRouter.post(
  "/addAl_MashreqAccidentReport",
  auth(endPoints.addAl_MashreqAccidentReport),
  Al_MashreqAccidentReportRoute.addNewAccedentReport
);

Al_MashreqAccidentReportRouter.delete(
  "/deleteAl_MashreqAccidentReport/:id",
  auth(endPoints.deleteAl_MashreqAccidentReport),
  Al_MashreqAccidentReportRoute.deleteAccidentReport
);

Al_MashreqAccidentReportRouter.get(
  "/showAl_MashreqAccidentReport",
  auth(endPoints.showAl_MashreqAccidentReport),
  Al_MashreqAccidentReportRoute.getAllAccidentReports
);

export default Al_MashreqAccidentReportRouter;
