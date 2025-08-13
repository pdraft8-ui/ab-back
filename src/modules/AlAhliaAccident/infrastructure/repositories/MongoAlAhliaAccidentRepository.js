import { IAlAhliaAccidentRepository } from "../../domain/interfaces/IAlAhliaAccidentRepository.js";
import { AlAhliaAccident } from "../../domain/entities/AlAhliaAccident.entity.js";
import AhliAccidentReportModel from "../../../../../DB/models/Al-AhliaAccident.model.js";

export class MongoAlAhliaAccidentRepository extends IAlAhliaAccidentRepository {
  mapToAlAhliaAccidentEntity(mongooseDoc) {
    if (!mongooseDoc) return null;

    return new AlAhliaAccident({
      id: mongooseDoc._id.toString(),
      customerId: mongooseDoc.customerId?.toString(),
      reportNumber: mongooseDoc.reportNumber,
      accidentDate: mongooseDoc.accidentDate,
      accidentTime: mongooseDoc.accidentTime,
      policeNumber: mongooseDoc.policeNumber,
      agentNumber: mongooseDoc.agentNumber,
      policyInfo: mongooseDoc.policyInfo || {},
      customerPerson: mongooseDoc.customerPerson || {},
      driverInfo: mongooseDoc.driverInfo || {},
      vehicleInfo: mongooseDoc.vehicleInfo || {},
      accidentDetails: mongooseDoc.accidentDetails || {},
      thirdPartyVehicles: mongooseDoc.thirdPartyVehicles || [],
      thirdPartyInjuries: mongooseDoc.thirdPartyInjuries || [],
      thirdPartyPassengers: mongooseDoc.thirdPartyPassengers || [],
      externalWitnesses: mongooseDoc.externalWitnesses || [],
      declaration: mongooseDoc.declaration || {},
      createdAt: mongooseDoc.createdAt,
      updatedAt: mongooseDoc.updatedAt,
    });
  }

  async create(alAhliaAccident) {
    try {
      const accidentData = alAhliaAccident.toJSON();
      delete accidentData.id; // Remove id as MongoDB will generate it

      const mongooseDoc = await AhliAccidentReportModel.create(accidentData);
      return this.mapToAlAhliaAccidentEntity(mongooseDoc);
    } catch (error) {
      throw new Error(`Failed to create AlAhliaAccident: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const mongooseDoc = await AhliAccidentReportModel.findById(id);
      return this.mapToAlAhliaAccidentEntity(mongooseDoc);
    } catch (error) {
      throw new Error(`Failed to find AlAhliaAccident by ID: ${error.message}`);
    }
  }

  async findByCustomerId(customerId) {
    try {
      const mongooseDocs = await AhliAccidentReportModel.find({ customerId });
      return mongooseDocs.map((doc) => this.mapToAlAhliaAccidentEntity(doc));
    } catch (error) {
      throw new Error(
        `Failed to find AlAhliaAccident by customer ID: ${error.message}`
      );
    }
  }

  async findByPlateNumber(plateNumber) {
    try {
      const mongooseDocs = await AhliAccidentReportModel.find({
        "vehicleInfo.registrationNumber": plateNumber,
      });
      return mongooseDocs.map((doc) => this.mapToAlAhliaAccidentEntity(doc));
    } catch (error) {
      throw new Error(
        `Failed to find AlAhliaAccident by plate number: ${error.message}`
      );
    }
  }

  async findAll() {
    try {
      const mongooseDocs = await AhliAccidentReportModel.find({});
      return mongooseDocs.map((doc) => this.mapToAlAhliaAccidentEntity(doc));
    } catch (error) {
      throw new Error(`Failed to find all AlAhliaAccidents: ${error.message}`);
    }
  }

  async update(id, alAhliaAccident) {
    try {
      const accidentData = alAhliaAccident.toJSON();
      delete accidentData.id; // Remove id as we're updating by ID
      accidentData.updatedAt = new Date();

      const mongooseDoc = await AhliAccidentReportModel.findByIdAndUpdate(
        id,
        accidentData,
        { new: true }
      );
      return this.mapToAlAhliaAccidentEntity(mongooseDoc);
    } catch (error) {
      throw new Error(`Failed to update AlAhliaAccident: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const mongooseDoc = await AhliAccidentReportModel.findByIdAndDelete(id);
      return this.mapToAlAhliaAccidentEntity(mongooseDoc);
    } catch (error) {
      throw new Error(`Failed to delete AlAhliaAccident: ${error.message}`);
    }
  }

  async getStats() {
    try {
      const totalReports = await AhliAccidentReportModel.countDocuments();
      const reportsThisMonth = await AhliAccidentReportModel.countDocuments({
        createdAt: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      });
      const reportsThisYear = await AhliAccidentReportModel.countDocuments({
        createdAt: {
          $gte: new Date(new Date().getFullYear(), 0, 1),
        },
      });

      // Get accident type distribution
      const accidentTypeStats = await AhliAccidentReportModel.aggregate([
        {
          $group: {
            _id: "$accidentDetails.accidentType",
            count: { $sum: 1 },
          },
        },
      ]);

      // Get average number of third party vehicles per accident
      const avgThirdPartyVehicles = await AhliAccidentReportModel.aggregate([
        {
          $group: {
            _id: null,
            average: { $avg: { $size: "$thirdPartyVehicles" } },
          },
        },
      ]);

      // Get average number of third party injuries per accident
      const avgThirdPartyInjuries = await AhliAccidentReportModel.aggregate([
        {
          $group: {
            _id: null,
            average: { $avg: { $size: "$thirdPartyInjuries" } },
          },
        },
      ]);

      return {
        totalReports,
        reportsThisMonth,
        reportsThisYear,
        accidentTypeDistribution: accidentTypeStats,
        averageThirdPartyVehicles: avgThirdPartyVehicles[0]?.average || 0,
        averageThirdPartyInjuries: avgThirdPartyInjuries[0]?.average || 0,
      };
    } catch (error) {
      throw new Error(`Failed to get AlAhliaAccident stats: ${error.message}`);
    }
  }

  async countAccidentReports() {
    try {
      return await AhliAccidentReportModel.countDocuments();
    } catch (error) {
      throw new Error(
        `Failed to count AlAhliaAccident reports: ${error.message}`
      );
    }
  }

  async findByDateRange(startDate, endDate) {
    try {
      const mongooseDocs = await AhliAccidentReportModel.find({
        accidentDate: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      });
      return mongooseDocs.map((doc) => this.mapToAlAhliaAccidentEntity(doc));
    } catch (error) {
      throw new Error(
        `Failed to find AlAhliaAccident by date range: ${error.message}`
      );
    }
  }

  async findByAccidentType(accidentType) {
    try {
      const mongooseDocs = await AhliAccidentReportModel.find({
        "accidentDetails.accidentType": accidentType,
      });
      return mongooseDocs.map((doc) => this.mapToAlAhliaAccidentEntity(doc));
    } catch (error) {
      throw new Error(
        `Failed to find AlAhliaAccident by accident type: ${error.message}`
      );
    }
  }
}
