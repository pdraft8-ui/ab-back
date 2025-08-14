import express from "express";
import { auth } from "../../../../midlleWare/auth.js";
import { checkDepartmentPermission } from "../../../../midlleWare/checkDepartmentPermission.js";
import { endPoints } from "../../../Al-MashreqAccidentReport/Al-MashreqAccidentReport.endpoint.js";
export class AlMashreqAccidentReportRoutes {
    constructor({ alMashreqAccidentReportController }) {
        this.alMashreqAccidentReportController = alMashreqAccidentReportController;
        this.router = express.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // Create accident report
        this.router.post("/:plateNumber", auth, checkDepartmentPermission(endPoints.addAlMashreqAccidentReport), this.alMashreqAccidentReportController.addAccidentReport.bind(this.alMashreqAccidentReportController));
        // Get all accident reports
        this.router.get("/", auth, checkDepartmentPermission(endPoints.showAlMashreqAccidentReport), this.alMashreqAccidentReportController.getAllAccidentReports.bind(this.alMashreqAccidentReportController));
        // Get accident report by ID
        this.router.get("/:id", auth, checkDepartmentPermission(endPoints.showAlMashreqAccidentReport), this.alMashreqAccidentReportController.findById.bind(this.alMashreqAccidentReportController));
        // Delete accident report
        this.router.delete("/:id", auth, checkDepartmentPermission(endPoints.deleteAlMashreqAccidentReport), this.alMashreqAccidentReportController.deleteAccidentReport.bind(this.alMashreqAccidentReportController));
        // Get accident report statistics
        this.router.get("/stats/overview", auth, checkDepartmentPermission(endPoints.showAlMashreqAccidentReport), this.alMashreqAccidentReportController.getAccidentReportStats.bind(this.alMashreqAccidentReportController));
    }
    getRouter() {
        return this.router;
    }
}
//# sourceMappingURL=AlMashreqAccidentReportRoutes.js.map