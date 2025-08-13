import { Router } from "express";
import * as HolyLandsReportRoute from "./controller/HolyLandsReport.controller.js";
import { endPoints } from "./HolyLandsReport.endpoint.js";
import { auth } from "../../midlleWare/auth.js";
import { checkDepartmentPermission } from "../../midlleWare/checkDepartmentPermission.js";

const HolyLandsReportRouter = Router();

HolyLandsReportRouter.post(
  "/add/:plateNumber",
  auth(endPoints.addHoliAccidentReport),
  HolyLandsReportRoute.addNewAccedentReport
);

HolyLandsReportRouter.delete(
  "/delete/:id",
  auth(endPoints.deleteHoliAccidentReport),
  HolyLandsReportRoute.deleteAccidentReport
);

HolyLandsReportRouter.get(
  "/all",
  auth(endPoints.showHoliAccidentReport),
  HolyLandsReportRoute.getAllReports
);

HolyLandsReportRouter.get(
  "/allById/:id",
  auth(endPoints.showHoliAccidentReport),
  HolyLandsReportRoute.findById
);

export default HolyLandsReportRouter;
