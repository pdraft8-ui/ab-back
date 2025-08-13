import { Router } from "express";
import { endPoints } from "../../TrustAccidentReport.endpoint.js";
import { auth } from "../../../../midlleWare/auth.js";
import { checkDepartmentPermission } from "../../../../midlleWare/checkDepartmentPermission.js";

export class TrustAccidentReportRoutes {
  constructor(trustAccidentReportController) {
    this.trustAccidentReportController = trustAccidentReportController;
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Add accident report
    this.router.post(
      "/addTrustAccidentReport/:plateNumber",
      auth(endPoints.addTrustAccidentReport),
      checkDepartmentPermission,
      this.trustAccidentReportController.addAccidentReport.bind(
        this.trustAccidentReportController
      )
    );

    // Get all accident reports
    this.router.get(
      "/showTrustAccidentReport",
      auth(endPoints.showTrustAccidentReport),
      checkDepartmentPermission,
      this.trustAccidentReportController.getAllAccidentReports.bind(
        this.trustAccidentReportController
      )
    );

    // Get accident report by ID
    this.router.get(
      "/findById/:id",
      auth(endPoints.showTrustAccidentReport),
      checkDepartmentPermission,
      this.trustAccidentReportController.findById.bind(
        this.trustAccidentReportController
      )
    );

    // Delete accident report
    this.router.delete(
      "/deleteTrustAccidentReport/:id",
      auth(endPoints.deleteTrustAccidentReport),
      checkDepartmentPermission,
      this.trustAccidentReportController.deleteAccidentReport.bind(
        this.trustAccidentReportController
      )
    );

    // Get accident report statistics
    this.router.get(
      "/stats",
      auth(endPoints.showTrustAccidentReport),
      checkDepartmentPermission,
      this.trustAccidentReportController.getAccidentReportStats.bind(
        this.trustAccidentReportController
      )
    );
  }

  getRouter() {
    return this.router;
  }
}
