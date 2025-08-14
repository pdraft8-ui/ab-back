import { IHolyLandsReportRepository } from "../../domain/interfaces/IHolyLandsReportRepository.js";
import { HolyLandsReport } from "../../domain/entities/HolyLandsReport.entity.js";
import HoliAccidentReportModel from "../../../../../DB/models/HoleLands.model.js";
export class MongoHolyLandsReportRepository extends IHolyLandsReportRepository {
    mapToHolyLandsReportEntity(mongooseDoc) {
        if (!mongooseDoc)
            return null;
        return new HolyLandsReport({
            id: mongooseDoc._id.toString(),
            customerId: mongooseDoc.customerId?.toString(),
            insuranceDetails: mongooseDoc.insuranceDetails || {},
            vehicleDetails: mongooseDoc.vehicleDetails || {},
            ownerAndDriverDetails: mongooseDoc.ownerAndDriverDetails || {},
            accidentDetails: mongooseDoc.accidentDetails || {},
            otherVehicles: mongooseDoc.otherVehicles || [],
            involvementDetails: mongooseDoc.involvementDetails || {},
            injuries: mongooseDoc.injuries || [],
            injuredNamesAndAddresses: mongooseDoc.injuredNamesAndAddresses || "",
            passengerNamesAndAddresses: mongooseDoc.passengerNamesAndAddresses || "",
            additionalDetails: mongooseDoc.additionalDetails || "",
            signature: mongooseDoc.signature || "",
            signatureDate: mongooseDoc.signatureDate,
            employeeNotes: mongooseDoc.employeeNotes || "",
            employeeSignature: mongooseDoc.employeeSignature || "",
            employeeDate: mongooseDoc.employeeDate,
            createdAt: mongooseDoc.createdAt,
            updatedAt: mongooseDoc.updatedAt,
        });
    }
    async create(holyLandsReport) {
        try {
            const accidentData = holyLandsReport.toJSON();
            delete accidentData.id; // Remove id as MongoDB will generate it
            const mongooseDoc = await HoliAccidentReportModel.create(accidentData);
            return this.mapToHolyLandsReportEntity(mongooseDoc);
        }
        catch (error) {
            throw new Error(`Failed to create HolyLandsReport: ${error.message}`);
        }
    }
    async findById(id) {
        try {
            const mongooseDoc = await HoliAccidentReportModel.findById(id);
            return this.mapToHolyLandsReportEntity(mongooseDoc);
        }
        catch (error) {
            throw new Error(`Failed to find HolyLandsReport by ID: ${error.message}`);
        }
    }
    async findByCustomerId(customerId) {
        try {
            const mongooseDocs = await HoliAccidentReportModel.find({ customerId });
            return mongooseDocs.map((doc) => this.mapToHolyLandsReportEntity(doc));
        }
        catch (error) {
            throw new Error(`Failed to find HolyLandsReport by customer ID: ${error.message}`);
        }
    }
    async findByPlateNumber(plateNumber) {
        try {
            const mongooseDocs = await HoliAccidentReportModel.find({
                "vehicleDetails.plateNumber": plateNumber,
            });
            return mongooseDocs.map((doc) => this.mapToHolyLandsReportEntity(doc));
        }
        catch (error) {
            throw new Error(`Failed to find HolyLandsReport by plate number: ${error.message}`);
        }
    }
    async findAll() {
        try {
            const mongooseDocs = await HoliAccidentReportModel.find({});
            return mongooseDocs.map((doc) => this.mapToHolyLandsReportEntity(doc));
        }
        catch (error) {
            throw new Error(`Failed to find all HolyLandsReports: ${error.message}`);
        }
    }
    async update(id, holyLandsReport) {
        try {
            const accidentData = holyLandsReport.toJSON();
            delete accidentData.id; // Remove id as we're updating by ID
            accidentData.updatedAt = new Date();
            const mongooseDoc = await HoliAccidentReportModel.findByIdAndUpdate(id, accidentData, { new: true });
            return this.mapToHolyLandsReportEntity(mongooseDoc);
        }
        catch (error) {
            throw new Error(`Failed to update HolyLandsReport: ${error.message}`);
        }
    }
    async delete(id) {
        try {
            const mongooseDoc = await HoliAccidentReportModel.findByIdAndDelete(id);
            return this.mapToHolyLandsReportEntity(mongooseDoc);
        }
        catch (error) {
            throw new Error(`Failed to delete HolyLandsReport: ${error.message}`);
        }
    }
    async getStats() {
        try {
            const totalReports = await HoliAccidentReportModel.countDocuments();
            const reportsThisMonth = await HoliAccidentReportModel.countDocuments({
                createdAt: {
                    $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                },
            });
            const reportsThisYear = await HoliAccidentReportModel.countDocuments({
                createdAt: {
                    $gte: new Date(new Date().getFullYear(), 0, 1),
                },
            });
            // Get accident type distribution
            const accidentTypeStats = await HoliAccidentReportModel.aggregate([
                {
                    $group: {
                        _id: "$accidentDetails.accidentCause",
                        count: { $sum: 1 },
                    },
                },
            ]);
            // Get average number of other vehicles per accident
            const avgOtherVehicles = await HoliAccidentReportModel.aggregate([
                {
                    $group: {
                        _id: null,
                        average: { $avg: { $size: "$otherVehicles" } },
                    },
                },
            ]);
            // Get average number of injuries per accident
            const avgInjuries = await HoliAccidentReportModel.aggregate([
                {
                    $group: {
                        _id: null,
                        average: { $avg: { $size: "$injuries" } },
                    },
                },
            ]);
            return {
                totalReports,
                reportsThisMonth,
                reportsThisYear,
                accidentTypeDistribution: accidentTypeStats,
                averageOtherVehicles: avgOtherVehicles[0]?.average || 0,
                averageInjuries: avgInjuries[0]?.average || 0,
            };
        }
        catch (error) {
            throw new Error(`Failed to get HolyLandsReport stats: ${error.message}`);
        }
    }
    async countAccidentReports() {
        try {
            return await HoliAccidentReportModel.countDocuments();
        }
        catch (error) {
            throw new Error(`Failed to count HolyLandsReport reports: ${error.message}`);
        }
    }
    async findByDateRange(startDate, endDate) {
        try {
            const mongooseDocs = await HoliAccidentReportModel.find({
                "accidentDetails.accidentDate": {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate),
                },
            });
            return mongooseDocs.map((doc) => this.mapToHolyLandsReportEntity(doc));
        }
        catch (error) {
            throw new Error(`Failed to find HolyLandsReport by date range: ${error.message}`);
        }
    }
    async findByAccidentType(accidentType) {
        try {
            const mongooseDocs = await HoliAccidentReportModel.find({
                "accidentDetails.accidentCause": accidentType,
            });
            return mongooseDocs.map((doc) => this.mapToHolyLandsReportEntity(doc));
        }
        catch (error) {
            throw new Error(`Failed to find HolyLandsReport by accident type: ${error.message}`);
        }
    }
}
//# sourceMappingURL=MongoHolyLandsReportRepository.js.map