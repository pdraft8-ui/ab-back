import { Router } from "express";
import { auth } from "../../midlleWare/auth.js";
import { validation } from "../../midlleWare/validation.js";
import { endPoints } from "../../modules/customers/customer.endpoints.js";
import container from "../../infrastructure/config/container.js";
const router = Router();
const customerController = container.getCustomerController();
// Customer CRUD operations
router.post("/create", auth(endPoints.addCustomer), customerController.createCustomer.bind(customerController));
router.get("/all", auth(endPoints.allCustomer), customerController.getAllCustomers.bind(customerController));
router.get("/:id", auth(endPoints.findbyidCustomer), customerController.getCustomerById.bind(customerController));
router.patch("/:id", auth(endPoints.updateCustomer), customerController.updateCustomer.bind(customerController));
router.delete("/:id", auth(endPoints.deleteCustomer), customerController.deleteCustomer.bind(customerController));
// Vehicle operations
router.post("/:customerId/vehicles", auth(endPoints.addcar), customerController.addVehicleToCustomer.bind(customerController));
router.delete("/:customerId/vehicles/:vehicleId", auth(endPoints.removeCar), customerController.removeVehicleFromCustomer.bind(customerController));
router.patch("/:customerId/vehicles/:vehicleId", auth(endPoints.updateCar), customerController.updateVehicle.bind(customerController));
router.get("/:id/vehicles", auth(endPoints.getCustomerVehicles), customerController.getCustomerVehicles.bind(customerController));
// Vehicle insurance operations
router.post("/:customerId/vehicles/:vehicleId/insurances", auth(endPoints.addcar), customerController.addInsuranceToVehicle.bind(customerController));
router.delete("/:customerId/vehicles/:vehicleId/insurances/:insuranceId", auth(endPoints.deleteCustomer), customerController.removeInsuranceFromVehicle.bind(customerController));
router.get("/:customerId/vehicles/:vehicleId/insurances", auth(endPoints.showVehicles), customerController.getVehicleInsurances.bind(customerController));
// Customer insurance operations
router.post("/:customerId/insurances", auth(endPoints.addCustomerInsurance), customerController.addCustomerInsurance.bind(customerController));
router.get("/:customerId/insurances", auth(endPoints.getCustomerInsurances), customerController.getCustomerInsurances.bind(customerController));
router.get("/:customerId/insurances/all", auth(endPoints.getCustomerInsurances), customerController.getAllCustomerInsurances.bind(customerController));
// Insurance operations
router.get("/insurances/all", auth(endPoints.allCustomer), customerController.getAllVehicleInsurances.bind(customerController));
router.get("/insurances/data", auth(endPoints.allCustomer), customerController.getAllInsurancesData.bind(customerController));
router.get("/insurances/:insuranceId", auth(endPoints.getCustomerInsurances), customerController.getInsuranceById.bind(customerController));
router.patch("/insurances/:insuranceId", auth(endPoints.addCustomerInsurance), customerController.updateInsuranceById.bind(customerController));
router.delete("/insurances/:insuranceId", auth(endPoints.deleteCustomer), customerController.deleteInsuranceById.bind(customerController));
// Check operations
router.post("/:customerId/vehicles/:vehicleId/insurances/:insuranceId/checks", auth(endPoints.addcar), customerController.addCheckToInsurance.bind(customerController));
router.delete("/:customerId/vehicles/:vehicleId/checks/:checkId", auth(endPoints.removeCar), customerController.removeCheckFromInsurance.bind(customerController));
router.get("/:customerId/vehicles/:vehicleId/insurances/:insuranceId/checks", auth(endPoints.showVehicles), customerController.getInsuranceChecks.bind(customerController));
router.get("/:customerId/vehicles/:vehicleId/checks", auth(endPoints.showVehicles), customerController.getAllChecksForVehicle.bind(customerController));
// Statistics and analytics
router.get("/count/total", customerController.getCustomerCount.bind(customerController));
router.get("/stats/by-month", customerController.getCustomerByMonth.bind(customerController));
router.get("/stats/overview", auth(endPoints.allCustomer), customerController.getCustomerStats.bind(customerController));
export default router;
//# sourceMappingURL=CustomerRoutes.js.map