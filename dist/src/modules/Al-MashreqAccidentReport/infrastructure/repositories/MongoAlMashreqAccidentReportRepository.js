import { IAlMashreqAccidentReportRepository } from "../../domain/interfaces/IAlMashreqAccidentReportRepository.js";
import { AlMashreqAccidentReport } from "../../domain/entities/AlMashreqAccidentReport.entity.js";
import AlMashreqAccidentReportModel from "../../../../../DB/models/Al-MashreqAccidentReport.model.js";
export class MongoAlMashreqAccidentReportRepository extends IAlMashreqAccidentReportRepository {
    mapToAlMashreqAccidentReportEntity(mongooseDoc) {
        if (!mongooseDoc)
            return null;
        return new AlMashreqAccidentReport({
            id: mongooseDoc._id.toString(),
            customerId: mongooseDoc.customerId?.toString(),
            branchOffice: mongooseDoc.branchOffice || "",
            insurancePolicy: mongooseDoc.insurancePolicy || {},
            customerPerson: mongooseDoc.customerPerson || {},
            vehicle: mongooseDoc.vehicle || {},
            driver: mongooseDoc.driver || {},
            accident: mongooseDoc.accident || {},
            otherVehicles: mongooseDoc.otherVehicles || [],
            vehicleDamages: mongooseDoc.vehicleDamages || "",
            personalInjuries: mongooseDoc.personalInjuries || [],
            thirdPartyInjuredNames: mongooseDoc.thirdPartyInjuredNames || [],
            vehiclePassengers: mongooseDoc.vehiclePassengers || [],
            externalWitnesses: mongooseDoc.externalWitnesses || [],
            driverSignature: mongooseDoc.driverSignature || {},
            claimant: mongooseDoc.claimant || {},
            receiver: mongooseDoc.receiver || {},
            generalNotes: mongooseDoc.generalNotes || "",
            createdAt: mongooseDoc.createdAt,
            updatedAt: mongooseDoc.updatedAt,
        });
    }
    async create(alMashreqAccidentReport) {
        try {
            const accidentData = alMashreqAccidentReport.toJSON();
            delete accidentData.id; // Remove id as MongoDB will generate it
            const mongooseDoc = await AlMashreqAccidentReportModel.create(accidentData);
            return this.mapToAlMashreqAccidentReportEntity(mongooseDoc);
        }
        catch (error) {
            throw new Error(`Failed to create AlMashreqAccidentReport: ${error.message}`);
        }
    }
    async findById(id) {
        try {
            const mongooseDoc = await AlMashreqAccidentReportModel.findById(id);
            return this.mapToAlMashreqAccidentReportEntity(mongooseDoc);
        }
        catch (error) {
            throw new Error(`Failed to find AlMashreqAccidentReport by ID: ${error.message}`);
        }
    }
    async findByCustomerId(customerId) {
        try {
            const mongooseDocs = await AlMashreqAccidentReportModel.find({
                customerId,
            });
            return mongooseDocs.map((doc) => this.mapToAlMashreqAccidentReportEntity(doc));
        }
        catch (error) {
            throw new Error(`Failed to find AlMashreqAccidentReport by customer ID: ${error.message}`);
        }
    }
    async findByPlateNumber(plateNumber) {
        try {
            const mongooseDocs = await AlMashreqAccidentReportModel.find({
                "vehicle.registrationNumber": plateNumber,
            });
            return mongooseDocs.map((doc) => this.mapToAlMashreqAccidentReportEntity(doc));
        }
        catch (error) {
            throw new Error(`Failed to find AlMashreqAccidentReport by plate number: ${error.message}`);
        }
    }
    async findAll() {
        try {
            const mongooseDocs = await AlMashreqAccidentReportModel.find({});
            return mongooseDocs.map((doc) => this.mapToAlMashreqAccidentReportEntity(doc));
        }
        catch (error) {
            throw new Error(`Failed to find all AlMashreqAccidentReports: ${error.message}`);
        }
    }
    async update(id, alMashreqAccidentReport) {
        try {
            const accidentData = alMashreqAccidentReport.toJSON();
            delete accidentData.id; // Remove id as we're updating by ID
            accidentData.updatedAt = new Date();
            const mongooseDoc = await AlMashreqAccidentReportModel.findByIdAndUpdate(id, accidentData, { new: true });
            return this.mapToAlMashreqAccidentReportEntity(mongooseDoc);
        }
        catch (error) {
            throw new Error(`Failed to update AlMashreqAccidentReport: ${error.message}`);
        }
    }
    async delete(id) {
        try {
            const mongooseDoc = await AlMashreqAccidentReportModel.findByIdAndDelete(id);
            return this.mapToAlMashreqAccidentReportEntity(mongooseDoc);
        }
        catch (error) {
            throw new Error(`Failed to delete AlMashreqAccidentReport: ${error.message}`);
        }
    }
    async getStats() {
        try {
            const totalReports = await AlMashreqAccidentReportModel.countDocuments();
            const reportsThisMonth = await AlMashreqAccidentReportModel.countDocuments({
                createdAt: {
                    $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                },
            });
            const reportsThisYear = await AlMashreqAccidentReportModel.countDocuments({
                createdAt: {
                    $gte: new Date(new Date().getFullYear(), 0, 1),
                },
            });
            // Get accident type distribution
            const accidentTypeStats = await AlMashreqAccidentReportModel.aggregate([
                {
                    $group: {
                        _id: "$accident.accidentType",
                        count: { $sum: 1 },
                    },
                },
            ]);
            // Get average number of other vehicles per accident
            const avgOtherVehicles = await AlMashreqAccidentReportModel.aggregate([
                {
                    $group: {
                        _id: null,
                        average: { $avg: { $size: "$otherVehicles" } },
                    },
                },
            ]);
            // Get average number of personal injuries per accident
            const avgPersonalInjuries = await AlMashreqAccidentReportModel.aggregate([
                {
                    $group: {
                        _id: null,
                        average: { $avg: { $size: "$personalInjuries" } },
                    },
                },
            ]);
            // Get average number of external witnesses per accident
            const avgExternalWitnesses = await AlMashreqAccidentReportModel.aggregate([
                {
                    $group: {
                        _id: null,
                        average: { $avg: { $size: "$externalWitnesses" } },
                    },
                },
            ]);
            return {
                totalReports,
                reportsThisMonth,
                reportsThisYear,
                accidentTypeDistribution: accidentTypeStats,
                averageOtherVehicles: avgOtherVehicles[0]?.average || 0,
                averagePersonalInjuries: avgPersonalInjuries[0]?.average || 0,
                averageExternalWitnesses: avgExternalWitnesses[0]?.average || 0,
            };
        }
        catch (error) {
            throw new Error(`Failed to get AlMashreqAccidentReport stats: ${error.message}`);
        }
    }
    async countAccidentReports() {
        try {
            return await AlMashreqAccidentReportModel.countDocuments();
        }
        catch (error) {
            throw new Error(`Failed to count AlMashreqAccidentReport reports: ${error.message}`);
        }
    }
    async findByDateRange(startDate, endDate) {
        try {
            const mongooseDocs = await AlMashreqAccidentReportModel.find({
                "accident.date": {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate),
                },
            });
            return mongooseDocs.map((doc) => this.mapToAlMashreqAccidentReportEntity(doc));
        }
        catch (error) {
            throw new Error(`Failed to find AlMashreqAccidentReport by date range: ${error.message}`);
        }
    }
    async findByAccidentType(accidentType) {
        try {
            const mongooseDocs = await AlMashreqAccidentReportModel.find({
                "accident.accidentType": accidentType,
            });
            return mongooseDocs.map((doc) => this.mapToAlMashreqAccidentReportEntity(doc));
        }
        catch (error) {
            throw new Error(`Failed to find AlMashreqAccidentReport by accident type: ${error.message}`);
        }
    }
}
//# sourceMappingURL=MongoAlMashreqAccidentReportRepository.js.map