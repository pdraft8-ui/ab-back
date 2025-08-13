import { Router } from "express";
import * as insuranceCompanyRoute from "./controller/insuranceCompany.controller.js";
import { auth } from "../../midlleWare/auth.js";
import { endPoints } from "./insuranceCompany.endpoint.js";
import { checkDepartmentPermission } from "../../midlleWare/checkDepartmentPermission.js";
const insuranceCompanyRouter = Router();
insuranceCompanyRouter.post(
  "/addInsuranceCompany",
  auth(endPoints.addCompany),
  insuranceCompanyRoute.addInsuranceCompany
);
insuranceCompanyRouter.patch(
  "/updateInsuranceCompany/:id",
  auth(endPoints.upateCompany),
  insuranceCompanyRoute.updateInsuranceCompany
);
insuranceCompanyRouter.delete(
  "/delete/:id",
  auth(endPoints.deleteCompany),
  insuranceCompanyRoute.deleteInsuranceCompany
);
insuranceCompanyRouter.get(
  "/all",
  auth(endPoints.allCompany),
  insuranceCompanyRoute.getAllInsuranceCompanies
);
export default insuranceCompanyRouter;
