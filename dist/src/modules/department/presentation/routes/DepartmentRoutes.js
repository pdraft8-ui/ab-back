import { Router } from "express";
import { auth } from "../../../../../src/midlleWare/auth.js";
import { endPoints } from "../../../department/department.endpoints.js";
export class DepartmentRoutes {
    constructor(departmentController) {
        this.departmentController = departmentController;
        this.router = Router();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.post("/add", auth(endPoints.addDepartment), this.departmentController.addDepartment.bind(this.departmentController));
        this.router.get("/all", auth(endPoints.all), this.departmentController.getAllDepartments.bind(this.departmentController));
        this.router.get("/dep/:id", auth(endPoints.DepartmentById), this.departmentController.getDepartmentById.bind(this.departmentController));
        this.router.patch("/update/:id", auth(endPoints.updateDepartment), this.departmentController.updateDepartment.bind(this.departmentController));
        this.router.delete("/delete/:id", auth(endPoints.deleteDepartment), this.departmentController.deleteDepartment.bind(this.departmentController));
        this.router.get("/stats", auth(endPoints.all), this.departmentController.getDepartmentStats.bind(this.departmentController));
    }
    getRouter() {
        return this.router;
    }
}
//# sourceMappingURL=DepartmentRoutes.js.map