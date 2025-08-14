import { IPalestineAccidentReportRepository } from "../../domain/interfaces/IPalestineAccidentReportRepository.js";
import { PalestineAccidentReport } from "../../domain/entities/PalestineAccidentReport.entity.js";
import PalestineAccidentReportModel from "../../../../../DB/models/PalestineAccidentReport.model.js";
export class MongoPalestineAccidentReportRepository extends IPalestineAccidentReportRepository {
    mapToPalestineAccidentReportEntity(mongooseDoc) {
        if (!mongooseDoc)
            return null;
        return new PalestineAccidentReport({
            id: mongooseDoc._id.toString(),
            customerId: mongooseDoc.customerId?.toString(),
            agentInfo: mongooseDoc.agentInfo || {},
            vehicleInfo: mongooseDoc.vehicleInfo || {},
            driverInfo: mongooseDoc.driverInfo || {},
            accidentDetails: mongooseDoc.accidentDetails || {},
            thirdParty: mongooseDoc.thirdParty || {},
            injuries: mongooseDoc.injuries || [],
            witnesses: mongooseDoc.witnesses || [],
            passengers: mongooseDoc.passengers || [],
            additionalDetails: mongooseDoc.additionalDetails || {},
            createdAt: mongooseDoc.createdAt,
            updatedAt: mongooseDoc.updatedAt,
        });
    }
    async create(palestineAccidentReport) {
        try {
            const accidentData = palestineAccidentReport.toJSON();
            delete accidentData.id; // Remove id as MongoDB will generate it
            const mongooseDoc = await PalestineAccidentReportModel.create(accidentData);
            return this.mapToPalestineAccidentReportEntity(mongooseDoc);
        }
        catch (error) {
            throw new Error(`Failed to create PalestineAccidentReport: ${error.message}`);
        }
    }
    async findById(id) {
        try {
            const mongooseDoc = await PalestineAccidentReportModel.findById(id);
            return this.mapToPalestineAccidentReportEntity(mongooseDoc);
        }
        catch (error) {
            throw new Error(`Failed to find PalestineAccidentReport by ID: ${error.message}`);
        }
    }
    async findByCustomerId(customerId) {
        try {
            const mongooseDocs = await PalestineAccidentReportModel.find({
                customerId,
            });
            return mongooseDocs.map((doc) => this.mapToPalestineAccidentReportEntity(doc));
        }
        catch (error) {
            throw new Error(`Failed to find PalestineAccidentReport by customer ID: ${error.message}`);
        }
    }
    async findByPlateNumber(plateNumber) {
        try {
            const mongooseDocs = await PalestineAccidentReportModel.find({
                "vehicleInfo.vehicleNumber": plateNumber,
            });
            return mongooseDocs.map((doc) => this.mapToPalestineAccidentReportEntity(doc));
        }
        catch (error) {
            throw new Error(`Failed to find PalestineAccidentReport by plate number: ${error.message}`);
        }
    }
    async findAll() {
        try {
            const mongooseDocs = await PalestineAccidentReportModel.find({});
            return mongooseDocs.map((doc) => this.mapToPalestineAccidentReportEntity(doc));
        }
        catch (error) {
            throw new Error(`Failed to find all PalestineAccidentReports: ${error.message}`);
        }
    }
    async update(id, palestineAccidentReport) {
        try {
            const accidentData = palestineAccidentReport.toJSON();
            delete accidentData.id; // Remove id as we're updating by ID
            accidentData.updatedAt = new Date();
            const mongooseDoc = await PalestineAccidentReportModel.findByIdAndUpdate(id, accidentData, { new: true });
            return this.mapToPalestineAccidentReportEntity(mongooseDoc);
        }
        catch (error) {
            throw new Error(`Failed to update PalestineAccidentReport: ${error.message}`);
        }
    }
    async delete(id) {
        try {
            const mongooseDoc = await PalestineAccidentReportModel.findByIdAndDelete(id);
            return this.mapToPalestineAccidentReportEntity(mongooseDoc);
        }
        catch (error) {
            throw new Error(`Failed to delete PalestineAccidentReport: ${error.message}`);
        }
    }
    async getStats() {
        try {
            const totalReports = await PalestineAccidentReportModel.countDocuments();
            const reportsThisMonth = await PalestineAccidentReportModel.countDocuments({
                createdAt: {
                    $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                },
            });
            const reportsThisYear = await PalestineAccidentReportModel.countDocuments({
                createdAt: {
                    $gte: new Date(new Date().getFullYear(), 0, 1),
                },
            });
            // Get accident type distribution
            const accidentTypeStats = await PalestineAccidentReportModel.aggregate([
                {
                    $group: {
                        _id: "$accidentDetails.accidentType",
                        count: { $sum: 1 },
                    },
                },
            ]);
            // Get average number of injuries per accident
            const avgInjuries = await PalestineAccidentReportModel.aggregate([
                {
                    $group: {
                        _id: null,
                        average: { $avg: { $size: "$injuries" } },
                    },
                },
            ]);
            // Get average number of witnesses per accident
            const avgWitnesses = await PalestineAccidentReportModel.aggregate([
                {
                    $group: {
                        _id: null,
                        average: { $avg: { $size: "$witnesses" } },
                    },
                },
            ]);
            // Get average number of passengers per accident
            const avgPassengers = await PalestineAccidentReportModel.aggregate([
                {
                    $group: {
                        _id: null,
                        average: { $avg: { $size: "$passengers" } },
                    },
                },
            ]);
            return {
                totalReports,
                reportsThisMonth,
                reportsThisYear,
                accidentTypeDistribution: accidentTypeStats,
                averageInjuries: avgInjuries[0]?.average || 0,
                averageWitnesses: avgWitnesses[0]?.average || 0,
                averagePassengers: avgPassengers[0]?.average || 0,
            };
        }
        catch (error) {
            throw new Error(`Failed to get PalestineAccidentReport stats: ${error.message}`);
        }
    }
    async countAccidentReports() {
        try {
            return await PalestineAccidentReportModel.countDocuments();
        }
        catch (error) {
            throw new Error(`Failed to count PalestineAccidentReport reports: ${error.message}`);
        }
    }
    async findByDateRange(startDate, endDate) {
        try {
            const mongooseDocs = await PalestineAccidentReportModel.find({
                "accidentDetails.accidentDate": {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate),
                },
            });
            return mongooseDocs.map((doc) => this.mapToPalestineAccidentReportEntity(doc));
        }
        catch (error) {
            throw new Error(`Failed to find PalestineAccidentReport by date range: ${error.message}`);
        }
    }
    async findByAccidentType(accidentType) {
        try {
            const mongooseDocs = await PalestineAccidentReportModel.find({
                "accidentDetails.accidentType": accidentType,
            });
            return mongooseDocs.map((doc) => this.mapToPalestineAccidentReportEntity(doc));
        }
        catch (error) {
            throw new Error(`Failed to find PalestineAccidentReport by accident type: ${error.message}`);
        }
    }
}
//# sourceMappingURL=MongoPalestineAccidentReportRepository.js.map