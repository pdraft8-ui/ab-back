/**
 * Cheque Routes
 * Defines the API routes for cheque operations
 */
import express from "express";
import { auth } from "../../../../midlleWare/auth.js";
export class ChequeRoutes {
    constructor(chequeController) {
        this.chequeController = chequeController;
        this.router = express.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // Create cheque
        this.router.post("/", auth(["admin", "manager", "agent"]), this.chequeController.createCheque.bind(this.chequeController));
        // Get all cheques with filters
        this.router.get("/", auth(["admin", "manager", "agent"]), this.chequeController.getAllCheques.bind(this.chequeController));
        // Get cheque by ID
        this.router.get("/:id", auth(["admin", "manager", "agent"]), this.chequeController.getChequeById.bind(this.chequeController));
        // Update cheque status
        this.router.patch("/:id/status", auth(["admin", "manager"]), this.chequeController.updateChequeStatus.bind(this.chequeController));
        // Delete cheque
        this.router.delete("/:id", auth(["admin"]), this.chequeController.deleteCheque.bind(this.chequeController));
        // Get cheque statistics
        this.router.get("/stats/overview", auth(["admin", "manager"]), this.chequeController.getChequeStats.bind(this.chequeController));
    }
    /**
     * Get the Express router
     * @returns {express.Router} The router instance
     */
    getRouter() {
        return this.router;
    }
}
//# sourceMappingURL=ChequeRoutes.js.map