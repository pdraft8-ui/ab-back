import { Router } from "express";
import { auth } from "../../../../midlleWare/auth.js";
import { checkDepartmentPermission } from "../../../../midlleWare/checkDepartmentPermission.js";
import { endPoints } from "../../../Al-AhliaAccident/Al-AhliaAccident.endpoint.js";

export class AlAhliaAccidentRoutes {
  constructor(alAhliaAccidentController) {
    this.alAhliaAccidentController = alAhliaAccidentController;
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Create accident report
    this.router.post(
      "/addAccidentReport/:plateNumber",
      auth(endPoints.addAhliaAccidentReport),
      checkDepartmentPermission,
      this.alAhliaAccidentController.addAccidentReport.bind(
        this.alAhliaAccidentController
      )
    );

    // Get all accident reports
    this.router.get(
      "/getAllAccidentReports",
      auth(endPoints.showAhliaAccidentReport),
      this.alAhliaAccidentController.getAllAccidentReports.bind(
        this.alAhliaAccidentController
      )
    );

    // Get accident report by ID
    this.router.get(
      "/getAccidentReport/:id",
      auth(endPoints.showAhliaAccidentReport),
      this.alAhliaAccidentController.findById.bind(
        this.alAhliaAccidentController
      )
    );

    // Delete accident report
    this.router.delete(
      "/deleteAccidentReport/:id",
      auth(endPoints.deleteAhliaAccidentReport),
      checkDepartmentPermission,
      this.alAhliaAccidentController.deleteAccidentReport.bind(
        this.alAhliaAccidentController
      )
    );

    // Get accident report statistics
    this.router.get(
      "/getAccidentReportStats",
      auth(endPoints.showAhliaAccidentReport),
      this.alAhliaAccidentController.getAccidentReportStats.bind(
        this.alAhliaAccidentController
      )
    );
  }

  getRouter() {
    return this.router;
  }
}
