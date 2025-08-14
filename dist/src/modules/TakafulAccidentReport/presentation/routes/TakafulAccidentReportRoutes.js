import { Router } from "express";
import { auth } from "../../../../midlleWare/auth.js";
import { endPoints } from "../../../TakafulAccidentReport/TakafulAccidentReport.endpoint.js";
export class TakafulAccidentReportRoutes {
    constructor(takafulAccidentReportController) {
        this.takafulAccidentReportController = takafulAccidentReportController;
        this.router = Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // Add accident report
        this.router.post("/add/:plateNumber", auth(endPoints.addTakafulAccidentReport), this.takafulAccidentReportController.addAccidentReport.bind(this.takafulAccidentReportController));
        // Get all accident reports
        this.router.get("/all", auth(endPoints.showTakafulAccidentReport), this.takafulAccidentReportController.getAllAccidentReports.bind(this.takafulAccidentReportController));
        // Get accident report by ID
        this.router.get("/allById/:id", auth(endPoints.showTakafulAccidentReport), this.takafulAccidentReportController.findById.bind(this.takafulAccidentReportController));
        // Delete accident report
        this.router.delete("/delete/:id", auth(endPoints.deleteTakafulAccidentReport), this.takafulAccidentReportController.deleteAccidentReport.bind(this.takafulAccidentReportController));
        // Get accident report statistics
        this.router.get("/stats", auth(endPoints.showTakafulAccidentReport), this.takafulAccidentReportController.getAccidentReportStats.bind(this.takafulAccidentReportController));
    }
    getRouter() {
        return this.router;
    }
}
//# sourceMappingURL=TakafulAccidentReportRoutes.js.map