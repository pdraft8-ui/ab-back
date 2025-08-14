import TrustAccidentReportModel from "../../../../../DB/models/TrustAccidentReport.model.js";
import { TrustAccidentReport } from "../../domain/entities/TrustAccidentReport.entity.js";
export class MongoTrustAccidentReportRepository {
    mapToTrustAccidentReportEntity(mongooseDoc) {
        if (!mongooseDoc)
            return null;
        const doc = mongooseDoc.toObject ? mongooseDoc.toObject() : mongooseDoc;
        return new TrustAccidentReport({
            id: doc._id?.toString(),
            customerId: doc.customerId?.toString(),
            accidentDetails: doc.accidentDetails,
            customerVehicle: doc.customerVehicle,
            driverDetails: doc.driverDetails,
            damages: doc.damages,
            otherVehicle: doc.otherVehicle,
            witnesses: doc.witnesses,
            policeReport: doc.policeReport,
            narration: doc.narration,
            signature: doc.signature,
            declaration: doc.declaration,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        });
    }
    async create(trustAccidentReport) {
        try {
            const reportData = trustAccidentReport.toJSON();
            delete reportData.id; // Remove id as MongoDB will generate it
            const newReport = new TrustAccidentReportModel(reportData);
            const savedReport = await newReport.save();
            return this.mapToTrustAccidentReportEntity(savedReport);
        }
        catch (error) {
            throw new Error(`Failed to create trust accident report: ${error.message}`);
        }
    }
    async findById(id) {
        try {
            const report = await TrustAccidentReportModel.findById(id);
            return this.mapToTrustAccidentReportEntity(report);
        }
        catch (error) {
            throw new Error(`Failed to find trust accident report by ID: ${error.message}`);
        }
    }
    async findByCustomerId(customerId) {
        try {
            const reports = await TrustAccidentReportModel.find({ customerId });
            return reports.map((report) => this.mapToTrustAccidentReportEntity(report));
        }
        catch (error) {
            throw new Error(`Failed to find trust accident reports by customer ID: ${error.message}`);
        }
    }
    async findByPlateNumber(plateNumber) {
        try {
            const reports = await TrustAccidentReportModel.find({
                "customerVehicle.plateNumber": plateNumber,
            });
            return reports.map((report) => this.mapToTrustAccidentReportEntity(report));
        }
        catch (error) {
            throw new Error(`Failed to find trust accident reports by plate number: ${error.message}`);
        }
    }
    async findAll() {
        try {
            const reports = await TrustAccidentReportModel.find().sort({
                createdAt: -1,
            });
            return reports.map((report) => this.mapToTrustAccidentReportEntity(report));
        }
        catch (error) {
            throw new Error(`Failed to find all trust accident reports: ${error.message}`);
        }
    }
    async update(id, trustAccidentReport) {
        try {
            const reportData = trustAccidentReport.toJSON();
            delete reportData.id;
            delete reportData.createdAt;
            const updatedReport = await TrustAccidentReportModel.findByIdAndUpdate(id, { ...reportData, updatedAt: new Date() }, { new: true });
            return this.mapToTrustAccidentReportEntity(updatedReport);
        }
        catch (error) {
            throw new Error(`Failed to update trust accident report: ${error.message}`);
        }
    }
    async delete(id) {
        try {
            const deletedReport = await TrustAccidentReportModel.findByIdAndDelete(id);
            return deletedReport
                ? this.mapToTrustAccidentReportEntity(deletedReport)
                : null;
        }
        catch (error) {
            throw new Error(`Failed to delete trust accident report: ${error.message}`);
        }
    }
    async getStats() {
        try {
            const totalReports = await TrustAccidentReportModel.countDocuments();
            const currentMonth = new Date();
            currentMonth.setDate(1);
            currentMonth.setHours(0, 0, 0, 0);
            const reportsThisMonth = await TrustAccidentReportModel.countDocuments({
                createdAt: { $gte: currentMonth },
            });
            const accidentTypes = await TrustAccidentReportModel.aggregate([
                {
                    $group: {
                        _id: "$accidentDetails.accidentType",
                        count: { $sum: 1 },
                    },
                },
                { $sort: { count: -1 } },
            ]);
            const monthlyStats = await TrustAccidentReportModel.aggregate([
                {
                    $group: {
                        _id: {
                            year: { $year: "$createdAt" },
                            month: { $month: "$createdAt" },
                        },
                        count: { $sum: 1 },
                    },
                },
                { $sort: { "_id.year": -1, "_id.month": -1 } },
                { $limit: 12 },
            ]);
            return {
                totalReports,
                reportsThisMonth,
                accidentTypes,
                monthlyStats,
                averageReportsPerMonth: totalReports > 0
                    ? (totalReports / Math.max(1, monthlyStats.length)).toFixed(2)
                    : 0,
            };
        }
        catch (error) {
            throw new Error(`Failed to get trust accident report stats: ${error.message}`);
        }
    }
    async countAccidentReports() {
        try {
            return await TrustAccidentReportModel.countDocuments();
        }
        catch (error) {
            throw new Error(`Failed to count trust accident reports: ${error.message}`);
        }
    }
    async findByDateRange(startDate, endDate) {
        try {
            const reports = await TrustAccidentReportModel.find({
                createdAt: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate),
                },
            }).sort({ createdAt: -1 });
            return reports.map((report) => this.mapToTrustAccidentReportEntity(report));
        }
        catch (error) {
            throw new Error(`Failed to find trust accident reports by date range: ${error.message}`);
        }
    }
    async findByAccidentType(accidentType) {
        try {
            const reports = await TrustAccidentReportModel.find({
                "accidentDetails.accidentType": accidentType,
            }).sort({ createdAt: -1 });
            return reports.map((report) => this.mapToTrustAccidentReportEntity(report));
        }
        catch (error) {
            throw new Error(`Failed to find trust accident reports by accident type: ${error.message}`);
        }
    }
}
//# sourceMappingURL=MongoTrustAccidentReportRepository.js.map