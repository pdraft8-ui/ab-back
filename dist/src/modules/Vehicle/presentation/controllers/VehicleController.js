import localStorageService from "../../../../Servicess/localStorage.js";
export class VehicleController {
    constructor(createVehicleUseCase, getAllVehiclesUseCase, getVehicleByIdUseCase, updateVehicleUseCase, deleteVehicleUseCase, getVehiclesByCustomerUseCase, addInsuranceToVehicleUseCase, getVehicleStatsUseCase) {
        this.createVehicleUseCase = createVehicleUseCase;
        this.getAllVehiclesUseCase = getAllVehiclesUseCase;
        this.getVehicleByIdUseCase = getVehicleByIdUseCase;
        this.updateVehicleUseCase = updateVehicleUseCase;
        this.deleteVehicleUseCase = deleteVehicleUseCase;
        this.getVehiclesByCustomerUseCase = getVehiclesByCustomerUseCase;
        this.addInsuranceToVehicleUseCase = addInsuranceToVehicleUseCase;
        this.getVehicleStatsUseCase = getVehicleStatsUseCase;
    }
    // Helper function to convert vehicle data to include full URLs
    convertVehicleToFullUrls(vehicle) {
        const vehicleObj = vehicle.toObject ? vehicle.toObject() : vehicle;
        // Convert vehicle image to full URL
        if (vehicleObj.image) {
            vehicleObj.image = localStorageService.getFullUrl(vehicleObj.image);
        }
        // Convert insurance files to full URLs
        if (vehicleObj.insurance && Array.isArray(vehicleObj.insurance)) {
            vehicleObj.insurance = vehicleObj.insurance.map((insurance) => {
                const insuranceObj = insurance.toObject
                    ? insurance.toObject()
                    : insurance;
                // Convert insurance files
                if (insuranceObj.insuranceFiles &&
                    Array.isArray(insuranceObj.insuranceFiles)) {
                    insuranceObj.insuranceFiles = localStorageService.getFullUrls(insuranceObj.insuranceFiles);
                }
                // Convert check images
                if (insuranceObj.checkDetails &&
                    Array.isArray(insuranceObj.checkDetails)) {
                    insuranceObj.checkDetails = insuranceObj.checkDetails.map((check) => {
                        const checkObj = check.toObject ? check.toObject() : check;
                        if (checkObj.checkImage) {
                            checkObj.checkImage = localStorageService.getFullUrl(checkObj.checkImage);
                        }
                        return checkObj;
                    });
                }
                return insuranceObj;
            });
        }
        return vehicleObj;
    }
    async addVehicle(req, res, next) {
        try {
            const vehicleData = {
                ...req.body,
                customerId: req.body.customerId || req.params.customerId,
            };
            if (req.file) {
                vehicleData.image = req.file.path;
            }
            const userId = req.user?.id;
            const userName = req.user?.name || "Unknown User";
            const vehicle = await this.createVehicleUseCase.execute(vehicleData, userId, userName);
            const vehicleWithUrls = this.convertVehicleToFullUrls(vehicle);
            res.status(201).json({
                success: true,
                message: "Vehicle created successfully",
                data: vehicleWithUrls,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getAllVehicles(req, res, next) {
        try {
            const vehicles = await this.getAllVehiclesUseCase.execute();
            const vehiclesWithUrls = vehicles.map((vehicle) => this.convertVehicleToFullUrls(vehicle));
            res.status(200).json({
                success: true,
                message: "Vehicles retrieved successfully",
                data: vehiclesWithUrls,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getVehicleById(req, res, next) {
        try {
            const { id } = req.params;
            const vehicle = await this.getVehicleByIdUseCase.execute(id);
            const vehicleWithUrls = this.convertVehicleToFullUrls(vehicle);
            res.status(200).json({
                success: true,
                message: "Vehicle retrieved successfully",
                data: vehicleWithUrls,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async updateVehicle(req, res, next) {
        try {
            const { id } = req.params;
            const vehicleData = req.body;
            if (req.file) {
                vehicleData.image = req.file.path;
            }
            const userId = req.user?.id;
            const userName = req.user?.name || "Unknown User";
            const vehicle = await this.updateVehicleUseCase.execute(id, vehicleData, userId, userName);
            const vehicleWithUrls = this.convertVehicleToFullUrls(vehicle);
            res.status(200).json({
                success: true,
                message: "Vehicle updated successfully",
                data: vehicleWithUrls,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteVehicle(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.user?.id;
            const userName = req.user?.name || "Unknown User";
            await this.deleteVehicleUseCase.execute(id, userId, userName);
            res.status(200).json({
                success: true,
                message: "Vehicle deleted successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getVehiclesByCustomer(req, res, next) {
        try {
            const { customerId } = req.params;
            const vehicles = await this.getVehiclesByCustomerUseCase.execute(customerId);
            const vehiclesWithUrls = vehicles.map((vehicle) => this.convertVehicleToFullUrls(vehicle));
            res.status(200).json({
                success: true,
                message: "Customer vehicles retrieved successfully",
                data: vehiclesWithUrls,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async addInsuranceToVehicle(req, res, next) {
        try {
            const { vehicleId } = req.params;
            const insuranceData = req.body;
            if (req.files && req.files.length > 0) {
                insuranceData.insuranceFiles = req.files.map((file) => file.path);
            }
            const userId = req.user?.id;
            const userName = req.user?.name || "Unknown User";
            const vehicle = await this.addInsuranceToVehicleUseCase.execute(vehicleId, insuranceData, userId, userName);
            const vehicleWithUrls = this.convertVehicleToFullUrls(vehicle);
            res.status(200).json({
                success: true,
                message: "Insurance added to vehicle successfully",
                data: vehicleWithUrls,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getVehicleStats(req, res, next) {
        try {
            const stats = await this.getVehicleStatsUseCase.execute();
            res.status(200).json({
                success: true,
                message: "Vehicle statistics retrieved successfully",
                data: stats,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
//# sourceMappingURL=VehicleController.js.map