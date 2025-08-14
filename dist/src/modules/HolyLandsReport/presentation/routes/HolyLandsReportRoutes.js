import express from "express";
import { auth } from "../../../../midlleWare/auth.js";
import { checkDepartmentPermission } from "../../../../midlleWare/checkDepartmentPermission.js";
import { endPoints } from "../../../HolyLandsReport/HolyLandsReport.endpoint.js";
export class HolyLandsReportRoutes {
    constructor({ holyLandsReportController }) {
        this.holyLandsReportController = holyLandsReportController;
        this.router = express.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // Create accident report
        this.router.post("/:plateNumber", auth, checkDepartmentPermission(endPoints.addHolyAccidentReport), this.holyLandsReportController.addAccidentReport.bind(this.holyLandsReportController));
        // Get all accident reports
        this.router.get("/", auth, checkDepartmentPermission(endPoints.showHoliAccidentReport), this.holyLandsReportController.getAllAccidentReports.bind(this.holyLandsReportController));
        // Get accident report by ID
        this.router.get("/:id", auth, checkDepartmentPermission(endPoints.showHoliAccidentReport), this.holyLandsReportController.findById.bind(this.holyLandsReportController));
        // Delete accident report
        this.router.delete("/:id", auth, checkDepartmentPermission(endPoints.deleteHoliAccidentReport), this.holyLandsReportController.deleteAccidentReport.bind(this.holyLandsReportController));
        // Get accident report statistics
        this.router.get("/stats/overview", auth, checkDepartmentPermission(endPoints.showHoliAccidentReport), this.holyLandsReportController.getAccidentReportStats.bind(this.holyLandsReportController));
    }
    getRouter() {
        return this.router;
    }
}
//# sourceMappingURL=HolyLandsReportRoutes.js.map