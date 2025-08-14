import { Router } from "express";
import * as RoadServiceRoute from "./controller/RoadService.controller.js";
import { endPoints } from "./RoadService.endpoint.js";
import { auth } from "../../midlleWare/auth.js";
import { checkDepartmentPermission } from "../../midlleWare/checkDepartmentPermission.js";
const RoadServiceRouter = Router();
RoadServiceRouter.post("/addRoad", auth(endPoints.addRoad), checkDepartmentPermission("addRoad"), RoadServiceRoute.addRoad);
RoadServiceRouter.patch("/updateRoad/:id", auth(endPoints.updateRoad), checkDepartmentPermission("updateRoad"), RoadServiceRoute.updateRoad);
RoadServiceRouter.delete("/deleteRoad/:id", auth(endPoints.deleteRoad), checkDepartmentPermission("deleteRoad"), RoadServiceRoute.deleteRoad);
RoadServiceRouter.get("/allRoad", auth(endPoints.allRoad), checkDepartmentPermission("allRoad"), RoadServiceRoute.getAllServices);
export default RoadServiceRouter;
//# sourceMappingURL=RoadService.route.js.map