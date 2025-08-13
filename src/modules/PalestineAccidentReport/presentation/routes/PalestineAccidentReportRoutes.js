import express from "express";
import { auth } from "../../../../midlleWare/auth.js";
import { checkDepartmentPermission } from "../../../../midlleWare/checkDepartmentPermission.js";
import { endPoints } from "../../../PalestineAccidentReport/PalestineAccidentReport.endpoints.js";

export class PalestineAccidentReportRoutes {
  constructor({ palestineAccidentReportController }) {
    this.palestineAccidentReportController = palestineAccidentReportController;
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Create accident report
    this.router.post(
      "/:plateNumber",
      auth,
      checkDepartmentPermission(endPoints.addPalestineAccidentReport),
      this.palestineAccidentReportController.addAccidentReport.bind(
        this.palestineAccidentReportController
      )
    );

    // Get all accident reports
    this.router.get(
      "/",
      auth,
      checkDepartmentPermission(endPoints.showPalestineAccidentReport),
      this.palestineAccidentReportController.getAllAccidentReports.bind(
        this.palestineAccidentReportController
      )
    );

    // Get accident report by ID
    this.router.get(
      "/:id",
      auth,
      checkDepartmentPermission(endPoints.showPalestineAccidentReport),
      this.palestineAccidentReportController.findById.bind(
        this.palestineAccidentReportController
      )
    );

    // Delete accident report
    this.router.delete(
      "/:id",
      auth,
      checkDepartmentPermission(endPoints.deletePalestineAccidentReport),
      this.palestineAccidentReportController.deleteAccidentReport.bind(
        this.palestineAccidentReportController
      )
    );

    // Get accident report statistics
    this.router.get(
      "/stats/overview",
      auth,
      checkDepartmentPermission(endPoints.showPalestineAccidentReport),
      this.palestineAccidentReportController.getAccidentReportStats.bind(
        this.palestineAccidentReportController
      )
    );
  }

  getRouter() {
    return this.router;
  }
}
