import { Router } from "express";
import { auth } from "../../../../midlleWare/auth.js";
import { validation } from "../../../../midlleWare/validation.js";
import { CustomerController } from "../controllers/CustomerController.js";
export class CustomerRoutes {
    constructor(customerController) {
        this.customerController = customerController;
        this.router = Router();
        this.setupRoutes();
    }
    setupRoutes() {
        // Create customer
        this.router.post("/create", auth(["admin", "agent"]), this.customerController.createCustomer.bind(this.customerController));
        // Get all customers
        this.router.get("/all", auth(["admin", "agent"]), this.customerController.getAllCustomers.bind(this.customerController));
        // Get customer by ID
        this.router.get("/:id", auth(["admin", "agent"]), this.customerController.getCustomerById.bind(this.customerController));
        // Update customer
        this.router.patch("/:id", auth(["admin", "agent"]), this.customerController.updateCustomer.bind(this.customerController));
        // Delete customer
        this.router.delete("/:id", auth(["admin"]), this.customerController.deleteCustomer.bind(this.customerController));
        // Add vehicle to customer
        this.router.post("/:customerId/vehicles", auth(["admin", "agent"]), this.customerController.addVehicleToCustomer.bind(this.customerController));
        // Get customer statistics
        this.router.get("/stats/overview", auth(["admin", "agent"]), this.customerController.getCustomerStats.bind(this.customerController));
    }
    getRouter() {
        return this.router;
    }
}
//# sourceMappingURL=CustomerRoutes.js.map