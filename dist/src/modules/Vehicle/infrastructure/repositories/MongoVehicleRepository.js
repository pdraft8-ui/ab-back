import { IVehicleRepository } from "../../domain/interfaces/IVehicleRepository.js";
import { Vehicle } from "../../domain/entities/Vehicle.entity.js";
import VehicleModel from "../../../../../DB/models/Vehicle.model.js";
import CustomerModel from "../../../../../DB/models/Customer.model.js";
export class MongoVehicleRepository extends IVehicleRepository {
    mapToVehicleEntity(vehicleDoc) {
        if (!vehicleDoc)
            return null;
        return new Vehicle({
            id: vehicleDoc._id.toString(),
            customerId: vehicleDoc.customerId?.toString(),
            plateNumber: vehicleDoc.plateNumber,
            model: vehicleDoc.model,
            type: vehicleDoc.type,
            ownership: vehicleDoc.ownership,
            modelNumber: vehicleDoc.modelNumber,
            licenseExpiry: vehicleDoc.licenseExpiry,
            lastTest: vehicleDoc.lastTest,
            color: vehicleDoc.color,
            price: vehicleDoc.price,
            image: vehicleDoc.image,
            insurance: vehicleDoc.insurance,
            createdAt: vehicleDoc.createdAt,
            updatedAt: vehicleDoc.updatedAt,
        });
    }
    async create(vehicleData) {
        try {
            const vehicle = await VehicleModel.create(vehicleData);
            return this.mapToVehicleEntity(vehicle);
        }
        catch (error) {
            console.error("Failed to create vehicle:", error);
            throw error;
        }
    }
    async findById(id) {
        try {
            const vehicle = await VehicleModel.findById(id).populate("customerId");
            return this.mapToVehicleEntity(vehicle);
        }
        catch (error) {
            console.error("Failed to find vehicle by ID:", error);
            throw error;
        }
    }
    async findByPlateNumber(plateNumber) {
        try {
            const vehicle = await VehicleModel.findOne({ plateNumber }).populate("customerId");
            return this.mapToVehicleEntity(vehicle);
        }
        catch (error) {
            console.error("Failed to find vehicle by plate number:", error);
            throw error;
        }
    }
    async findAll() {
        try {
            const vehicles = await VehicleModel.find().populate("customerId");
            return vehicles.map((vehicle) => this.mapToVehicleEntity(vehicle));
        }
        catch (error) {
            console.error("Failed to find all vehicles:", error);
            throw error;
        }
    }
    async findByCustomerId(customerId) {
        try {
            const vehicles = await VehicleModel.find({ customerId }).populate("customerId");
            return vehicles.map((vehicle) => this.mapToVehicleEntity(vehicle));
        }
        catch (error) {
            console.error("Failed to find vehicles by customer ID:", error);
            throw error;
        }
    }
    async update(id, vehicleData) {
        try {
            const vehicle = await VehicleModel.findByIdAndUpdate(id, vehicleData, {
                new: true,
            }).populate("customerId");
            return this.mapToVehicleEntity(vehicle);
        }
        catch (error) {
            console.error("Failed to update vehicle:", error);
            throw error;
        }
    }
    async delete(id) {
        try {
            const vehicle = await VehicleModel.findByIdAndDelete(id);
            return this.mapToVehicleEntity(vehicle);
        }
        catch (error) {
            console.error("Failed to delete vehicle:", error);
            throw error;
        }
    }
    async addInsuranceToVehicle(vehicleId, insuranceData) {
        try {
            const vehicle = await VehicleModel.findByIdAndUpdate(vehicleId, { $push: { insurance: insuranceData } }, { new: true }).populate("customerId");
            return this.mapToVehicleEntity(vehicle);
        }
        catch (error) {
            console.error("Failed to add insurance to vehicle:", error);
            throw error;
        }
    }
    async removeInsuranceFromVehicle(vehicleId, insuranceId) {
        try {
            const vehicle = await VehicleModel.findByIdAndUpdate(vehicleId, { $pull: { insurance: { _id: insuranceId } } }, { new: true }).populate("customerId");
            return this.mapToVehicleEntity(vehicle);
        }
        catch (error) {
            console.error("Failed to remove insurance from vehicle:", error);
            throw error;
        }
    }
    async updateInsurance(vehicleId, insuranceId, insuranceData) {
        try {
            const vehicle = await VehicleModel.findOneAndUpdate({ _id: vehicleId, "insurance._id": insuranceId }, { $set: { "insurance.$": insuranceData } }, { new: true }).populate("customerId");
            return this.mapToVehicleEntity(vehicle);
        }
        catch (error) {
            console.error("Failed to update insurance:", error);
            throw error;
        }
    }
    async getInsurancesForVehicle(vehicleId) {
        try {
            const vehicle = await VehicleModel.findById(vehicleId).populate("customerId");
            if (!vehicle)
                return null;
            return this.mapToVehicleEntity(vehicle);
        }
        catch (error) {
            console.error("Failed to get insurances for vehicle:", error);
            throw error;
        }
    }
    async addCheckToInsurance(vehicleId, insuranceId, checkData) {
        try {
            const vehicle = await VehicleModel.findOneAndUpdate({ _id: vehicleId, "insurance._id": insuranceId }, { $push: { "insurance.$.checkDetails": checkData } }, { new: true }).populate("customerId");
            return this.mapToVehicleEntity(vehicle);
        }
        catch (error) {
            console.error("Failed to add check to insurance:", error);
            throw error;
        }
    }
    async removeCheckFromInsurance(vehicleId, insuranceId, checkId) {
        try {
            const vehicle = await VehicleModel.findOneAndUpdate({ _id: vehicleId, "insurance._id": insuranceId }, { $pull: { "insurance.$.checkDetails": { _id: checkId } } }, { new: true }).populate("customerId");
            return this.mapToVehicleEntity(vehicle);
        }
        catch (error) {
            console.error("Failed to remove check from insurance:", error);
            throw error;
        }
    }
    async getChecksForInsurance(vehicleId, insuranceId) {
        try {
            const vehicle = await VehicleModel.findById(vehicleId).populate("customerId");
            if (!vehicle)
                return null;
            const vehicleEntity = this.mapToVehicleEntity(vehicle);
            const insurance = vehicleEntity.getInsuranceById(insuranceId);
            return insurance ? insurance.checkDetails : [];
        }
        catch (error) {
            console.error("Failed to get checks for insurance:", error);
            throw error;
        }
    }
    async getAllChecksForVehicle(vehicleId) {
        try {
            const vehicle = await VehicleModel.findById(vehicleId).populate("customerId");
            if (!vehicle)
                return null;
            const vehicleEntity = this.mapToVehicleEntity(vehicle);
            const allChecks = [];
            vehicleEntity.insurance.forEach((insurance) => {
                if (insurance.checkDetails) {
                    allChecks.push(...insurance.checkDetails.map((check) => ({
                        ...check,
                        insuranceId: insurance.id,
                        insuranceType: insurance.insuranceType,
                    })));
                }
            });
            return allChecks;
        }
        catch (error) {
            console.error("Failed to get all checks for vehicle:", error);
            throw error;
        }
    }
    async getStats() {
        try {
            const totalVehicles = await VehicleModel.countDocuments();
            const vehiclesWithInsurance = await VehicleModel.countDocuments({
                "insurance.0": { $exists: true },
            });
            const vehiclesWithExpiredLicense = await VehicleModel.countDocuments({
                licenseExpiry: { $lt: new Date() },
            });
            const vehiclesWithExpiredTest = await VehicleModel.countDocuments({
                lastTest: { $lt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) },
            });
            return {
                totalVehicles,
                vehiclesWithInsurance,
                vehiclesWithExpiredLicense,
                vehiclesWithExpiredTest,
                vehiclesWithoutInsurance: totalVehicles - vehiclesWithInsurance,
            };
        }
        catch (error) {
            console.error("Failed to get vehicle stats:", error);
            throw error;
        }
    }
    async countVehicles() {
        try {
            return await VehicleModel.countDocuments();
        }
        catch (error) {
            console.error("Failed to count vehicles:", error);
            throw error;
        }
    }
    async findVehiclesWithExpiredInsurance() {
        try {
            const vehicles = await VehicleModel.find({
                "insurance.insuranceEndDate": { $lt: new Date() },
            }).populate("customerId");
            return vehicles.map((vehicle) => this.mapToVehicleEntity(vehicle));
        }
        catch (error) {
            console.error("Failed to find vehicles with expired insurance:", error);
            throw error;
        }
    }
    async findVehiclesWithExpiredLicense() {
        try {
            const vehicles = await VehicleModel.find({
                licenseExpiry: { $lt: new Date() },
            }).populate("customerId");
            return vehicles.map((vehicle) => this.mapToVehicleEntity(vehicle));
        }
        catch (error) {
            console.error("Failed to find vehicles with expired license:", error);
            throw error;
        }
    }
    async findVehiclesWithExpiredTest() {
        try {
            const vehicles = await VehicleModel.find({
                lastTest: { $lt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) },
            }).populate("customerId");
            return vehicles.map((vehicle) => this.mapToVehicleEntity(vehicle));
        }
        catch (error) {
            console.error("Failed to find vehicles with expired test:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=MongoVehicleRepository.js.map