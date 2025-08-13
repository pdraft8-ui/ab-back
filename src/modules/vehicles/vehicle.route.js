import { Router } from "express";
import { auth } from "../../midlleWare/auth.js";
import { endPoints } from "./vehicle.endpoints.js";
import * as vehicleRoute from "./controller/vehicle.controller.js";
import {
  fileValidation,
  myMulter,
  myMulterAllFiles,
} from "../../Servicess/multer.js";

const vehicleRouter = Router();

// Basic CRUD operations
vehicleRouter.post(
  "/addVehicle",
  auth(endPoints.addVehicle),
  myMulterAllFiles("vehicles/images").single("image"),
  vehicleRoute.addVehicle
);

vehicleRouter.post(
  "/addVehicle/:customerId",
  auth(endPoints.addVehicle),
  myMulterAllFiles("vehicles/images").single("image"),
  vehicleRoute.addVehicle
);

vehicleRouter.delete(
  "/deleteVehicle/:id",
  auth(endPoints.deleteVehicle),
  vehicleRoute.deleteVehicle
);

vehicleRouter.get(
  "/allVehicles",
  auth(endPoints.allVehicles),
  vehicleRoute.allVehicles
);

vehicleRouter.get(
  "/findVehicle/:id",
  auth(endPoints.findVehicleById),
  vehicleRoute.findVehicleById
);

vehicleRouter.get(
  "/findVehicleUnified/:id",
  auth(endPoints.findVehicleById),
  vehicleRoute.findVehicleByIdUnified
);

vehicleRouter.get(
  "/findByPlate/:plateNumber",
  auth(endPoints.findByPlate),
  vehicleRoute.findByPlate
);

vehicleRouter.get(
  "/getVehiclesByCustomer/:customerId",
  auth(endPoints.getVehiclesByCustomer),
  vehicleRoute.getVehiclesByCustomer
);

vehicleRouter.patch(
  "/updateVehicle/:id",
  auth(endPoints.updateVehicle),
  myMulterAllFiles("vehicles/images").single("image"),
  vehicleRoute.updateVehicle
);

// Insurance operations
vehicleRouter.post(
  "/addInsurance/:vehicleId",
  auth(endPoints.addInsuranceToVehicle),
  myMulterAllFiles("vehicles/insurance-files").array("insuranceFiles", 10),
  vehicleRoute.addInsuranceToVehicle
);

vehicleRouter.post(
  "/addInsuranceUnified/:vehicleId",
  auth(endPoints.addInsuranceToVehicle),
  myMulterAllFiles("vehicles/insurance-files").array("insuranceFiles", 10),
  vehicleRoute.addInsuranceToVehicleUnified
);

vehicleRouter.delete(
  "/removeInsurance/:vehicleId/:insuranceId",
  auth(endPoints.removeInsuranceFromVehicle),
  vehicleRoute.removeInsuranceFromVehicle
);

vehicleRouter.get(
  "/getInsurances/:vehicleId",
  auth(endPoints.getInsurancesForVehicle),
  vehicleRoute.getInsurancesForVehicle
);

// Check operations
vehicleRouter.post(
  "/addCheck/:vehicleId/:insuranceId",
  auth(endPoints.addCheckToInsurance),
  myMulterAllFiles("vehicles/checks").single("checkImage"),
  vehicleRoute.addCheckToInsurance
);

vehicleRouter.get(
  "/getChecks/:vehicleId/:insuranceId",
  auth(endPoints.getInsuranceChecks),
  vehicleRoute.getInsuranceChecks
);

vehicleRouter.get(
  "/getAllChecks/:vehicleId",
  auth(endPoints.getAllChecksForVehicle),
  vehicleRoute.getAllChecksForVehicle
);

vehicleRouter.delete(
  "/deleteCheck/:vehicleId/:insuranceId/:checkId",
  auth(endPoints.deleteCheckFromInsurance),
  vehicleRoute.deleteCheckFromInsurance
);

export default vehicleRouter;
