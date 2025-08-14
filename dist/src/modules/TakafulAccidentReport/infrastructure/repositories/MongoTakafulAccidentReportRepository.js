import { ITakafulAccidentReportRepository } from "../../domain/interfaces/ITakafulAccidentReportRepository.js";
import { TakafulAccidentReport } from "../../domain/entities/TakafulAccidentReport.entity.js";
import TakafulAccidentReportModel from "../../../../../DB/models/TakafulAccidentReport.model.js";
export class MongoTakafulAccidentReportRepository extends ITakafulAccidentReportRepository {
    async create(accidentReportData) {
        try {
            const accidentReport = new TakafulAccidentReportModel(accidentReportData);
            const savedAccidentReport = await accidentReport.save();
            return this.mapToTakafulAccidentReportEntity(savedAccidentReport);
        }
        catch (error) {
            console.error("MongoTakafulAccidentReportRepository create error:", error);
            throw error;
        }
    }
    async findById(id) {
        try {
            const accidentReport = await TakafulAccidentReportModel.findById(id);
            return accidentReport
                ? this.mapToTakafulAccidentReportEntity(accidentReport)
                : null;
        }
        catch (error) {
            console.error("MongoTakafulAccidentReportRepository findById error:", error);
            throw error;
        }
    }
    async findByCustomerId(customerId) {
        try {
            const accidentReports = await TakafulAccidentReportModel.find({
                customerId,
            }).sort({ createdAt: -1 });
            return accidentReports.map((report) => this.mapToTakafulAccidentReportEntity(report));
        }
        catch (error) {
            console.error("MongoTakafulAccidentReportRepository findByCustomerId error:", error);
            throw error;
        }
    }
    async findByPlateNumber(plateNumber) {
        try {
            const accidentReports = await TakafulAccidentReportModel.find({
                "customerVehicle.plateNumber": plateNumber,
            }).sort({ createdAt: -1 });
            return accidentReports.map((report) => this.mapToTakafulAccidentReportEntity(report));
        }
        catch (error) {
            console.error("MongoTakafulAccidentReportRepository findByPlateNumber error:", error);
            throw error;
        }
    }
    async findAll() {
        try {
            const accidentReports = await TakafulAccidentReportModel.find().sort({
                createdAt: -1,
            });
            return accidentReports.map((report) => this.mapToTakafulAccidentReportEntity(report));
        }
        catch (error) {
            console.error("MongoTakafulAccidentReportRepository findAll error:", error);
            throw error;
        }
    }
    async update(id, accidentReportData) {
        try {
            const updatedAccidentReport = await TakafulAccidentReportModel.findByIdAndUpdate(id, accidentReportData, { new: true });
            return updatedAccidentReport
                ? this.mapToTakafulAccidentReportEntity(updatedAccidentReport)
                : null;
        }
        catch (error) {
            console.error("MongoTakafulAccidentReportRepository update error:", error);
            throw error;
        }
    }
    async delete(id) {
        try {
            const deletedAccidentReport = await TakafulAccidentReportModel.findByIdAndDelete(id);
            return deletedAccidentReport
                ? this.mapToTakafulAccidentReportEntity(deletedAccidentReport)
                : null;
        }
        catch (error) {
            console.error("MongoTakafulAccidentReportRepository delete error:", error);
            throw error;
        }
    }
    async getStats() {
        try {
            const totalReports = await TakafulAccidentReportModel.countDocuments();
            const todayReports = await TakafulAccidentReportModel.countDocuments({
                "accidentInfo.accidentDate": { $gte: new Date().setHours(0, 0, 0, 0) },
            });
            const weeklyReports = await TakafulAccidentReportModel.countDocuments({
                "accidentInfo.accidentDate": {
                    $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                },
            });
            const monthlyReports = await TakafulAccidentReportModel.countDocuments({
                "accidentInfo.accidentDate": {
                    $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                },
            });
            const reportsWithWitnesses = await TakafulAccidentReportModel.countDocuments({
                "policeAndWitnesses.witnesses.0": { $exists: true },
            });
            const reportsWithPassengers = await TakafulAccidentReportModel.countDocuments({
                "passengers.0": { $exists: true },
            });
            const policeReported = await TakafulAccidentReportModel.countDocuments({
                "policeAndWitnesses.policeCame": true,
            });
            return {
                totalReports,
                todayReports,
                weeklyReports,
                monthlyReports,
                reportsWithWitnesses,
                reportsWithPassengers,
                policeReported,
                averageReportsPerDay: totalReports > 0 ? Math.round(totalReports / 365) : 0,
            };
        }
        catch (error) {
            console.error("MongoTakafulAccidentReportRepository getStats error:", error);
            throw error;
        }
    }
    async countAccidentReports() {
        try {
            return await TakafulAccidentReportModel.countDocuments();
        }
        catch (error) {
            console.error("MongoTakafulAccidentReportRepository countAccidentReports error:", error);
            throw error;
        }
    }
    async findByDateRange(startDate, endDate) {
        try {
            const accidentReports = await TakafulAccidentReportModel.find({
                "accidentInfo.accidentDate": { $gte: startDate, $lte: endDate },
            }).sort({ "accidentInfo.accidentDate": -1 });
            return accidentReports.map((report) => this.mapToTakafulAccidentReportEntity(report));
        }
        catch (error) {
            console.error("MongoTakafulAccidentReportRepository findByDateRange error:", error);
            throw error;
        }
    }
    async findByAccidentType(accidentType) {
        try {
            const accidentReports = await TakafulAccidentReportModel.find({
                "accidentInfo.accidentType": accidentType,
            }).sort({ createdAt: -1 });
            return accidentReports.map((report) => this.mapToTakafulAccidentReportEntity(report));
        }
        catch (error) {
            console.error("MongoTakafulAccidentReportRepository findByAccidentType error:", error);
            throw error;
        }
    }
    mapToTakafulAccidentReportEntity(accidentReportDoc) {
        return new TakafulAccidentReport({
            id: accidentReportDoc._id,
            customerId: accidentReportDoc.customerId,
            accidentInfo: accidentReportDoc.accidentInfo,
            policyInfo: accidentReportDoc.policyInfo,
            customerPerson: accidentReportDoc.customerPerson,
            driverInfo: accidentReportDoc.driverInfo,
            licenseInfo: accidentReportDoc.licenseInfo,
            customerVehicle: accidentReportDoc.customerVehicle,
            otherVehicles: accidentReportDoc.otherVehicles,
            policeAndWitnesses: accidentReportDoc.policeAndWitnesses,
            passengers: accidentReportDoc.passengers,
            accidentNarration: accidentReportDoc.accidentNarration,
            notifierSignature: accidentReportDoc.notifierSignature,
            receiverName: accidentReportDoc.receiverName,
            receiverNotes: accidentReportDoc.receiverNotes,
            declaration: accidentReportDoc.declaration,
            createdAt: accidentReportDoc.createdAt,
            updatedAt: accidentReportDoc.updatedAt,
        });
    }
}
//# sourceMappingURL=MongoTakafulAccidentReportRepository.js.map