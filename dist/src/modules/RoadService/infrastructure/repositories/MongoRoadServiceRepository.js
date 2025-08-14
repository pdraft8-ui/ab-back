import { IRoadServiceRepository } from "../../domain/interfaces/IRoadServiceRepository.js";
import { RoadService } from "../../domain/entities/RoadService.entity.js";
import { RoadServiceModel } from "../../../../../DB/models/RoadService.model.js";
export class MongoRoadServiceRepository extends IRoadServiceRepository {
    async create(roadServiceData) {
        try {
            const roadService = new RoadServiceModel(roadServiceData);
            const savedService = await roadService.save();
            return this.mapToRoadServiceEntity(savedService);
        }
        catch (error) {
            console.error("MongoRoadServiceRepository create error:", error);
            throw error;
        }
    }
    async findById(id) {
        try {
            const roadService = await RoadServiceModel.findById(id);
            return roadService ? this.mapToRoadServiceEntity(roadService) : null;
        }
        catch (error) {
            console.error("MongoRoadServiceRepository findById error:", error);
            throw error;
        }
    }
    async findByName(companyName) {
        try {
            const roadService = await RoadServiceModel.findOne({ companyName });
            return roadService ? this.mapToRoadServiceEntity(roadService) : null;
        }
        catch (error) {
            console.error("MongoRoadServiceRepository findByName error:", error);
            throw error;
        }
    }
    async findAll() {
        try {
            const roadServices = await RoadServiceModel.find().sort({
                createdAt: -1,
            });
            return roadServices.map((service) => this.mapToRoadServiceEntity(service));
        }
        catch (error) {
            console.error("MongoRoadServiceRepository findAll error:", error);
            throw error;
        }
    }
    async update(id, roadServiceData) {
        try {
            const updatedService = await RoadServiceModel.findByIdAndUpdate(id, roadServiceData, { new: true });
            return updatedService
                ? this.mapToRoadServiceEntity(updatedService)
                : null;
        }
        catch (error) {
            console.error("MongoRoadServiceRepository update error:", error);
            throw error;
        }
    }
    async delete(id) {
        try {
            const deletedService = await RoadServiceModel.findByIdAndDelete(id);
            return deletedService
                ? this.mapToRoadServiceEntity(deletedService)
                : null;
        }
        catch (error) {
            console.error("MongoRoadServiceRepository delete error:", error);
            throw error;
        }
    }
    async getStats() {
        try {
            const totalServices = await RoadServiceModel.countDocuments();
            const servicesUnder2007 = await RoadServiceModel.countDocuments({
                amountUnder2007: { $lt: 2007 },
            });
            const servicesOver2007 = await RoadServiceModel.countDocuments({
                amountUnder2007: { $gte: 2007 },
            });
            const avgAmount = await RoadServiceModel.aggregate([
                { $group: { _id: null, avgAmount: { $avg: "$amount" } } },
            ]);
            const avgAmountUnder2007 = await RoadServiceModel.aggregate([
                {
                    $group: {
                        _id: null,
                        avgAmountUnder2007: { $avg: "$amountUnder2007" },
                    },
                },
            ]);
            return {
                totalServices,
                servicesUnder2007,
                servicesOver2007,
                averageAmount: avgAmount[0]?.avgAmount || 0,
                averageAmountUnder2007: avgAmountUnder2007[0]?.avgAmountUnder2007 || 0,
            };
        }
        catch (error) {
            console.error("MongoRoadServiceRepository getStats error:", error);
            throw error;
        }
    }
    async countServices() {
        try {
            return await RoadServiceModel.countDocuments();
        }
        catch (error) {
            console.error("MongoRoadServiceRepository countServices error:", error);
            throw error;
        }
    }
    mapToRoadServiceEntity(roadServiceDoc) {
        return new RoadService({
            id: roadServiceDoc._id,
            companyName: roadServiceDoc.companyName,
            serviceType: roadServiceDoc.serviceType,
            amount: roadServiceDoc.amount,
            amountUnder2007: roadServiceDoc.amountUnder2007,
            createdAt: roadServiceDoc.createdAt,
            updatedAt: roadServiceDoc.updatedAt,
        });
    }
}
//# sourceMappingURL=MongoRoadServiceRepository.js.map