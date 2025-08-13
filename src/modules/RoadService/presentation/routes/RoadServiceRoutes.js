import { Router } from "express";
import { auth } from "../../../../midlleWare/auth.js";
import { checkDepartmentPermission } from "../../../../midlleWare/checkDepartmentPermission.js";
import { endPoints } from "../../../RoadService/RoadService.endpoint.js";

export class RoadServiceRoutes {
  constructor(roadServiceController) {
    this.roadServiceController = roadServiceController;
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Create road service
    this.router.post(
      "/addRoad",
      auth(endPoints.addRoad),
      checkDepartmentPermission("addRoad"),
      this.roadServiceController.addRoadService.bind(this.roadServiceController)
    );

    // Get all road services
    this.router.get(
      "/allRoad",
      auth(endPoints.allRoad),
      checkDepartmentPermission("allRoad"),
      this.roadServiceController.getAllRoadServices.bind(
        this.roadServiceController
      )
    );

    // Get road service by ID
    this.router.get(
      "/road/:id",
      auth(endPoints.allRoad),
      checkDepartmentPermission("allRoad"),
      this.roadServiceController.getRoadServiceById.bind(
        this.roadServiceController
      )
    );

    // Update road service
    this.router.patch(
      "/updateRoad/:id",
      auth(endPoints.updateRoad),
      checkDepartmentPermission("updateRoad"),
      this.roadServiceController.updateRoadService.bind(
        this.roadServiceController
      )
    );

    // Delete road service
    this.router.delete(
      "/deleteRoad/:id",
      auth(endPoints.deleteRoad),
      checkDepartmentPermission("deleteRoad"),
      this.roadServiceController.deleteRoadService.bind(
        this.roadServiceController
      )
    );

    // Get road service statistics
    this.router.get(
      "/stats",
      auth(endPoints.allRoad),
      checkDepartmentPermission("allRoad"),
      this.roadServiceController.getRoadServiceStats.bind(
        this.roadServiceController
      )
    );
  }

  getRouter() {
    return this.router;
  }
}
