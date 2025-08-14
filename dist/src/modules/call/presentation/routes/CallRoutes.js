import { Router } from "express";
import { auth } from "../../../../midlleWare/auth.js";
export class CallRoutes {
    constructor(callController) {
        this.callController = callController;
        this.router = Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // Get call recording
        this.router.post("/calls/:customerId", auth(["admin", "employee", "headOfDepartment"]), this.callController.getCallRecording.bind(this.callController));
        // Get all calls
        this.router.get("/calls", auth(["admin", "employee", "headOfDepartment"]), this.callController.getAllCalls.bind(this.callController));
        // Get calls by customer
        this.router.get("/calls/customer/:customerId", auth(["admin", "employee", "headOfDepartment"]), this.callController.getCallsByCustomer.bind(this.callController));
        // Get call statistics
        this.router.get("/calls/stats", auth(["admin", "headOfDepartment"]), this.callController.getCallStats.bind(this.callController));
    }
    getRouter() {
        return this.router;
    }
}
//# sourceMappingURL=CallRoutes.js.map