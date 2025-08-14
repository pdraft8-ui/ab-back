import { Router } from "express";
import * as callRoute from "./controller/call.controller.js";
const callRouter = Router();
callRouter.post("/calls/:customerId", callRoute.getCallRecording);
export default callRouter;
//# sourceMappingURL=call.route.js.map