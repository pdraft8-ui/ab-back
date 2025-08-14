import { Router } from "express";
import { auth } from "../../../../midlleWare/auth.js";
import { endPoints } from "../../../vehicles/vehicle.endpoints.js";
import { fileValidation, myMulter, myMulterAllFiles, } from "../../../../Servicess/multer.js";
export class VehicleRoutes {
    constructor(vehicleController) {
        this.vehicleController = vehicleController;
        this.router = Router();
        this.setupRoutes();
    }
    setupRoutes() {
        // Basic CRUD operations
        this.router.post("/addVehicle", auth(endPoints.addVehicle), myMulterAllFiles("vehicles/images").single("image"), this.vehicleController.addVehicle.bind(this.vehicleController));
        this.router.post("/addVehicle/:customerId", auth(endPoints.addVehicle), myMulterAllFiles("vehicles/images").single("image"), this.vehicleController.addVehicle.bind(this.vehicleController));
        this.router.delete("/deleteVehicle/:id", auth(endPoints.deleteVehicle), this.vehicleController.deleteVehicle.bind(this.vehicleController));
        this.router.get("/allVehicles", auth(endPoints.allVehicles), this.vehicleController.getAllVehicles.bind(this.vehicleController));
        this.router.get("/findVehicle/:id", auth(endPoints.findVehicleById), this.vehicleController.getVehicleById.bind(this.vehicleController));
        this.router.get("/getVehiclesByCustomer/:customerId", auth(endPoints.getVehiclesByCustomer), this.vehicleController.getVehiclesByCustomer.bind(this.vehicleController));
        this.router.patch("/updateVehicle/:id", auth(endPoints.updateVehicle), myMulterAllFiles("vehicles/images").single("image"), this.vehicleController.updateVehicle.bind(this.vehicleController));
        // Insurance operations
        this.router.post("/addInsurance/:vehicleId", auth(endPoints.addInsuranceToVehicle), myMulterAllFiles("vehicles/insurance-files").array("insuranceFiles", 10), this.vehicleController.addInsuranceToVehicle.bind(this.vehicleController));
        // Statistics
        this.router.get("/stats", auth(endPoints.allVehicles), this.vehicleController.getVehicleStats.bind(this.vehicleController));
    }
    getRouter() {
        return this.router;
    }
}
//# sourceMappingURL=VehicleRoutes.js.map