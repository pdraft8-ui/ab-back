export class DepartmentController {
    constructor(createDepartmentUseCase, getAllDepartmentsUseCase, getDepartmentByIdUseCase, updateDepartmentUseCase, deleteDepartmentUseCase, getDepartmentStatsUseCase) {
        this.createDepartmentUseCase = createDepartmentUseCase;
        this.getAllDepartmentsUseCase = getAllDepartmentsUseCase;
        this.getDepartmentByIdUseCase = getDepartmentByIdUseCase;
        this.updateDepartmentUseCase = updateDepartmentUseCase;
        this.deleteDepartmentUseCase = deleteDepartmentUseCase;
        this.getDepartmentStatsUseCase = getDepartmentStatsUseCase;
    }
    async addDepartment(req, res, next) {
        try {
            const { name, permissions, description } = req.body;
            const result = await this.createDepartmentUseCase.execute({
                name,
                permissions,
                description,
            });
            if (result.success) {
                return res.status(200).json({
                    message: result.message,
                    department: result.department,
                });
            }
            else {
                return res.status(400).json({
                    message: result.message,
                });
            }
        }
        catch (error) {
            next(error);
        }
    }
    async getAllDepartments(req, res, next) {
        try {
            const result = await this.getAllDepartmentsUseCase.execute();
            if (result.success) {
                return res.status(200).json({
                    success: true,
                    message: result.message,
                    data: result.data,
                });
            }
            else {
                return res.status(400).json({
                    message: result.message,
                });
            }
        }
        catch (error) {
            next(error);
        }
    }
    async getDepartmentById(req, res, next) {
        try {
            const { id } = req.params;
            const result = await this.getDepartmentByIdUseCase.execute(id);
            if (result.success) {
                return res.status(200).json({
                    message: result.message,
                    department: result.department,
                });
            }
            else {
                return res.status(404).json({
                    message: result.message,
                });
            }
        }
        catch (error) {
            next(error);
        }
    }
    async updateDepartment(req, res, next) {
        try {
            const { id } = req.params;
            const { name, description } = req.body;
            const result = await this.updateDepartmentUseCase.execute(id, {
                name,
                description,
            });
            if (result.success) {
                return res.status(200).json({
                    message: result.message,
                    department: result.department,
                });
            }
            else {
                return res.status(400).json({
                    message: result.message,
                });
            }
        }
        catch (error) {
            next(error);
        }
    }
    async deleteDepartment(req, res, next) {
        try {
            const { id } = req.params;
            const result = await this.deleteDepartmentUseCase.execute(id);
            if (result.success) {
                return res.status(200).json({
                    message: result.message,
                });
            }
            else {
                return res.status(400).json({
                    message: result.message,
                });
            }
        }
        catch (error) {
            next(error);
        }
    }
    async getDepartmentStats(req, res, next) {
        try {
            const result = await this.getDepartmentStatsUseCase.execute();
            if (result.success) {
                return res.status(200).json({
                    success: true,
                    message: result.message,
                    stats: result.stats,
                });
            }
            else {
                return res.status(400).json({
                    message: result.message,
                });
            }
        }
        catch (error) {
            next(error);
        }
    }
}
//# sourceMappingURL=DepartmentController.js.map