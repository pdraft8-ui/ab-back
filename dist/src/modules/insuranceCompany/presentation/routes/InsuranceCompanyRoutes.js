import { Router } from "express";
import { auth } from "../../../../midlleWare/auth.js";
import { endPoints } from "../../../insuranceCompany/insuranceCompany.endpoint.js";
export class InsuranceCompanyRoutes {
    constructor(insuranceCompanyController) {
        this.insuranceCompanyController = insuranceCompanyController;
        this.router = Router();
        this.setupRoutes();
    }
    setupRoutes() {
        // Add insurance company
        this.router.post("/addInsuranceCompany", auth(endPoints.addCompany), this.insuranceCompanyController.addInsuranceCompany.bind(this.insuranceCompanyController));
        // Get all insurance companies
        this.router.get("/all", auth(endPoints.allCompany), this.insuranceCompanyController.getAllInsuranceCompanies.bind(this.insuranceCompanyController));
        // Get insurance company by ID
        this.router.get("/:id", auth(endPoints.allCompany), this.insuranceCompanyController.getInsuranceCompanyById.bind(this.insuranceCompanyController));
        // Update insurance company
        this.router.patch("/updateInsuranceCompany/:id", auth(endPoints.upateCompany), this.insuranceCompanyController.updateInsuranceCompany.bind(this.insuranceCompanyController));
        // Delete insurance company
        this.router.delete("/delete/:id", auth(endPoints.deleteCompany), this.insuranceCompanyController.deleteInsuranceCompany.bind(this.insuranceCompanyController));
        // Get insurance company statistics
        this.router.get("/stats/overview", auth(endPoints.allCompany), this.insuranceCompanyController.getInsuranceCompanyStats.bind(this.insuranceCompanyController));
    }
    getRouter() {
        return this.router;
    }
}
//# sourceMappingURL=InsuranceCompanyRoutes.js.map