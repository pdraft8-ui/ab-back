import { Router } from "express";
import * as Al_AhliaAccidentRoute from "./controller/Al-AhliaAccident.controller.js";
import { endPoints } from "./Al-AhliaAccident.endpoint.js";
import { auth } from "../../midlleWare/auth.js";
import { checkDepartmentPermission } from "../../midlleWare/checkDepartmentPermission.js";

const Al_AhliaAccidentRouter = Router();

Al_AhliaAccidentRouter.post(
  "/addAhliaAccidentReport",
  auth(endPoints.addAhliaAccidentReport),
  Al_AhliaAccidentRoute.addNewAccedentReport
);

Al_AhliaAccidentRouter.delete(
  "/deleteAhliaAccidentReport/:id",
  auth(endPoints.deleteAhliaAccidentReport),
  Al_AhliaAccidentRoute.deleteAccidentReport
);

Al_AhliaAccidentRouter.get(
  "/showAhliaAccidentReport",
  auth(endPoints.showAhliaAccidentReport),
  Al_AhliaAccidentRoute.getAllAccidentReports
);

export default Al_AhliaAccidentRouter;
