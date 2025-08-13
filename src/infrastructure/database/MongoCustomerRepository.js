import { ICustomerRepository } from "../../core/interfaces/ICustomerRepository.js";
import Customer from "../../../DB/models/Customer.model.js";
import { Customer as CustomerEntity } from "../../core/entities/Customer.entity.js";

export class MongoCustomerRepository extends ICustomerRepository {
  async createCustomer(customerData) {
    try {
      const customer = new Customer(customerData);
      const savedCustomer = await customer.save();
      return this.mapToEntity(savedCustomer);
    } catch (error) {
      throw error;
    }
  }

  async getCustomerById(id) {
    try {
      const customer = await Customer.findById(id).populate(
        "agentsId",
        "first_name last_name"
      );
      return customer ? this.mapToEntity(customer) : null;
    } catch (error) {
      throw error;
    }
  }

  async getAllCustomers(filters = {}) {
    try {
      const {
        page = 1,
        limit = 10,
        search,
        city,
        agentId,
        sortBy = "createdAt",
        sortOrder = "desc",
      } = filters;

      let query = {};

      // Search functionality
      if (search) {
        query.$or = [
          { first_name: { $regex: search, $options: "i" } },
          { last_name: { $regex: search, $options: "i" } },
          { id_Number: { $regex: search, $options: "i" } },
          { phone_number: { $regex: search, $options: "i" } },
        ];
      }

      // Filter by city
      if (city) {
        query.city = { $regex: city, $options: "i" };
      }

      // Filter by agent
      if (agentId) {
        query.agentsId = agentId;
      }

      const skip = (page - 1) * limit;
      const sort = { [sortBy]: sortOrder === "desc" ? -1 : 1 };

      const customers = await Customer.find(query)
        .populate("agentsId", "first_name last_name")
        .sort(sort)
        .skip(skip)
        .limit(limit);

      const total = await Customer.countDocuments(query);

      return {
        customers: customers.map((customer) => this.mapToEntity(customer)),
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async updateCustomer(id, updateData) {
    try {
      const customer = await Customer.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      }).populate("agentsId", "first_name last_name");

      return customer ? this.mapToEntity(customer) : null;
    } catch (error) {
      throw error;
    }
  }

  async deleteCustomer(id) {
    try {
      const customer = await Customer.findByIdAndDelete(id);
      return customer ? this.mapToEntity(customer) : null;
    } catch (error) {
      throw error;
    }
  }

  async getCustomerByInvoiceId(invoiceId) {
    try {
      const customer = await Customer.findOne({
        "vehicles.insurance.invoiceId": invoiceId,
      }).populate("agentsId", "first_name last_name");
      return customer ? this.mapToEntity(customer) : null;
    } catch (error) {
      throw error;
    }
  }

  async getCustomerByIdNumber(idNumber) {
    try {
      const customer = await Customer.findOne({ id_Number: idNumber }).populate(
        "agentsId",
        "first_name last_name"
      );
      return customer ? this.mapToEntity(customer) : null;
    } catch (error) {
      throw error;
    }
  }

  async getCustomerByPhoneNumber(phoneNumber) {
    try {
      const customer = await Customer.findOne({
        phone_number: phoneNumber,
      }).populate("agentsId", "first_name last_name");
      return customer ? this.mapToEntity(customer) : null;
    } catch (error) {
      throw error;
    }
  }

  async getCustomersByAgent(agentId) {
    try {
      const customers = await Customer.find({ agentsId: agentId }).populate(
        "agentsId",
        "first_name last_name"
      );
      return customers.map((customer) => this.mapToEntity(customer));
    } catch (error) {
      throw error;
    }
  }

  async getCustomersByCity(city) {
    try {
      const customers = await Customer.find({
        city: { $regex: city, $options: "i" },
      }).populate("agentsId", "first_name last_name");
      return customers.map((customer) => this.mapToEntity(customer));
    } catch (error) {
      throw error;
    }
  }

  async getCustomerCount() {
    try {
      return await Customer.countDocuments();
    } catch (error) {
      throw error;
    }
  }

  async getCustomersByMonth() {
    try {
      const currentYear = new Date().getFullYear();
      const result = await Customer.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(currentYear, 0, 1),
              $lt: new Date(currentYear + 1, 0, 1),
            },
          },
        },
        {
          $group: {
            _id: { $month: "$createdAt" },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getCustomersByDateRange(startDate, endDate) {
    try {
      const customers = await Customer.find({
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      }).populate("agentsId", "first_name last_name");

      return customers.map((customer) => this.mapToEntity(customer));
    } catch (error) {
      throw error;
    }
  }

  async addVehicleToCustomer(customerId, vehicleData) {
    try {
      const customer = await Customer.findByIdAndUpdate(
        customerId,
        { $push: { vehicles: vehicleData } },
        { new: true, runValidators: true }
      ).populate("agentsId", "first_name last_name");

      return customer ? this.mapToEntity(customer) : null;
    } catch (error) {
      throw error;
    }
  }

  async removeVehicleFromCustomer(customerId, vehicleId) {
    try {
      const customer = await Customer.findByIdAndUpdate(
        customerId,
        { $pull: { vehicles: { _id: vehicleId } } },
        { new: true }
      ).populate("agentsId", "first_name last_name");

      return customer ? this.mapToEntity(customer) : null;
    } catch (error) {
      throw error;
    }
  }

  async updateVehicle(customerId, vehicleId, updateData) {
    try {
      const customer = await Customer.findOneAndUpdate(
        { _id: customerId, "vehicles._id": vehicleId },
        { $set: { "vehicles.$": { ...updateData, _id: vehicleId } } },
        { new: true, runValidators: true }
      ).populate("agentsId", "first_name last_name");

      return customer ? this.mapToEntity(customer) : null;
    } catch (error) {
      throw error;
    }
  }

  async getCustomerVehicles(customerId) {
    try {
      const customer = await Customer.findById(customerId).populate(
        "agentsId",
        "first_name last_name"
      );
      return customer ? customer.vehicles : [];
    } catch (error) {
      throw error;
    }
  }

  async getVehicleByPlateNumber(plateNumber) {
    try {
      const customer = await Customer.findOne({
        "vehicles.plateNumber": plateNumber,
      }).populate("agentsId", "first_name last_name");
      return customer ? this.mapToEntity(customer) : null;
    } catch (error) {
      throw error;
    }
  }

  async addInsuranceToVehicle(customerId, vehicleId, insuranceData) {
    try {
      const customer = await Customer.findOneAndUpdate(
        { _id: customerId, "vehicles._id": vehicleId },
        { $push: { "vehicles.$.insurance": insuranceData } },
        { new: true, runValidators: true }
      ).populate("agentsId", "first_name last_name");

      return customer ? this.mapToEntity(customer) : null;
    } catch (error) {
      throw error;
    }
  }

  async removeInsuranceFromVehicle(customerId, vehicleId, insuranceId) {
    try {
      const customer = await Customer.findOneAndUpdate(
        { _id: customerId, "vehicles._id": vehicleId },
        { $pull: { "vehicles.$.insurance": { _id: insuranceId } } },
        { new: true }
      ).populate("agentsId", "first_name last_name");

      return customer ? this.mapToEntity(customer) : null;
    } catch (error) {
      throw error;
    }
  }

  async updateVehicleInsurance(customerId, vehicleId, insuranceId, updateData) {
    try {
      const customer = await Customer.findOneAndUpdate(
        {
          _id: customerId,
          "vehicles._id": vehicleId,
          "vehicles.insurance._id": insuranceId,
        },
        {
          $set: {
            "vehicles.$.insurance.$": { ...updateData, _id: insuranceId },
          },
        },
        { new: true, runValidators: true }
      ).populate("agentsId", "first_name last_name");

      return customer ? this.mapToEntity(customer) : null;
    } catch (error) {
      throw error;
    }
  }

  async getVehicleInsurances(customerId, vehicleId) {
    try {
      const customer = await Customer.findById(customerId).populate(
        "agentsId",
        "first_name last_name"
      );
      if (!customer) return null;

      const vehicle = customer.vehicles.find(
        (v) => v._id.toString() === vehicleId
      );
      return vehicle ? vehicle.insurance : [];
    } catch (error) {
      throw error;
    }
  }

  async getAllVehicleInsurances() {
    try {
      const customers = await Customer.find({
        "vehicles.insurance": { $exists: true, $ne: [] },
      }).populate("agentsId", "first_name last_name");

      const allInsurances = [];
      customers.forEach((customer) => {
        customer.vehicles.forEach((vehicle) => {
          vehicle.insurance.forEach((insurance) => {
            allInsurances.push({
              customer: this.mapToEntity(customer),
              vehicle,
              insurance,
            });
          });
        });
      });

      return allInsurances;
    } catch (error) {
      throw error;
    }
  }

  async getAllInsurancesData() {
    try {
      const customers = await Customer.find({}).populate(
        "agentsId",
        "first_name last_name"
      );

      const allInsurancesData = [];
      customers.forEach((customer) => {
        customer.vehicles.forEach((vehicle) => {
          vehicle.insurance.forEach((insurance) => {
            allInsurancesData.push({
              customerId: customer._id,
              customerName: `${customer.first_name} ${customer.last_name}`,
              vehicleId: vehicle._id,
              plateNumber: vehicle.plateNumber,
              model: vehicle.model,
              insuranceId: insurance._id,
              insuranceType: insurance.insuranceType,
              insuranceCompany: insurance.insuranceCompany,
              insuranceAmount: insurance.insuranceAmount,
              paidAmount: insurance.paidAmount,
              remainingDebt: insurance.remainingDebt,
              insuranceStartDate: insurance.insuranceStartDate,
              insuranceEndDate: insurance.insuranceEndDate,
            });
          });
        });
      });

      return allInsurancesData;
    } catch (error) {
      throw error;
    }
  }

  async addCustomerInsurance(customerId, insuranceData) {
    try {
      const customer = await Customer.findByIdAndUpdate(
        customerId,
        { $push: { insurances: insuranceData } },
        { new: true, runValidators: true }
      ).populate("agentsId", "first_name last_name");

      return customer ? this.mapToEntity(customer) : null;
    } catch (error) {
      throw error;
    }
  }

  async removeCustomerInsurance(customerId, insuranceId) {
    try {
      const customer = await Customer.findByIdAndUpdate(
        customerId,
        { $pull: { insurances: { _id: insuranceId } } },
        { new: true }
      ).populate("agentsId", "first_name last_name");

      return customer ? this.mapToEntity(customer) : null;
    } catch (error) {
      throw error;
    }
  }

  async updateCustomerInsurance(customerId, insuranceId, updateData) {
    try {
      const customer = await Customer.findOneAndUpdate(
        { _id: customerId, "insurances._id": insuranceId },
        { $set: { "insurances.$": { ...updateData, _id: insuranceId } } },
        { new: true, runValidators: true }
      ).populate("agentsId", "first_name last_name");

      return customer ? this.mapToEntity(customer) : null;
    } catch (error) {
      throw error;
    }
  }

  async getCustomerInsurances(customerId) {
    try {
      const customer = await Customer.findById(customerId).populate(
        "agentsId",
        "first_name last_name"
      );
      return customer ? customer.insurances : [];
    } catch (error) {
      throw error;
    }
  }

  async getAllCustomerInsurances(customerId) {
    try {
      const customer = await Customer.findById(customerId).populate(
        "agentsId",
        "first_name last_name"
      );
      if (!customer) return null;

      return customer.insurances.map((insurance) => ({
        ...insurance.toObject(),
        customerName: `${customer.first_name} ${customer.last_name}`,
        customerId: customer._id,
      }));
    } catch (error) {
      throw error;
    }
  }

  async getInsuranceById(insuranceId) {
    try {
      const customer = await Customer.findOne({
        "insurances._id": insuranceId,
      }).populate("agentsId", "first_name last_name");

      if (!customer) return null;

      const insurance = customer.insurances.find(
        (i) => i._id.toString() === insuranceId
      );
      return insurance
        ? {
            ...insurance.toObject(),
            customerName: `${customer.first_name} ${customer.last_name}`,
            customerId: customer._id,
          }
        : null;
    } catch (error) {
      throw error;
    }
  }

  async deleteInsuranceById(insuranceId) {
    try {
      const customer = await Customer.findOneAndUpdate(
        { "insurances._id": insuranceId },
        { $pull: { insurances: { _id: insuranceId } } },
        { new: true }
      ).populate("agentsId", "first_name last_name");

      return customer ? this.mapToEntity(customer) : null;
    } catch (error) {
      throw error;
    }
  }

  async addCheckToInsurance(customerId, vehicleId, insuranceId, checkData) {
    try {
      const customer = await Customer.findOneAndUpdate(
        {
          _id: customerId,
          "vehicles._id": vehicleId,
          "vehicles.insurance._id": insuranceId,
        },
        { $push: { "vehicles.$.insurance.$.checkDetails": checkData } },
        { new: true, runValidators: true }
      ).populate("agentsId", "first_name last_name");

      return customer ? this.mapToEntity(customer) : null;
    } catch (error) {
      throw error;
    }
  }

  async removeCheckFromInsurance(customerId, vehicleId, checkId) {
    try {
      const customer = await Customer.findOneAndUpdate(
        { _id: customerId, "vehicles._id": vehicleId },
        { $pull: { "vehicles.$.insurance.$.checkDetails": { _id: checkId } } },
        { new: true }
      ).populate("agentsId", "first_name last_name");

      return customer ? this.mapToEntity(customer) : null;
    } catch (error) {
      throw error;
    }
  }

  async getInsuranceChecks(customerId, vehicleId, insuranceId) {
    try {
      const customer = await Customer.findById(customerId).populate(
        "agentsId",
        "first_name last_name"
      );
      if (!customer) return null;

      const vehicle = customer.vehicles.find(
        (v) => v._id.toString() === vehicleId
      );
      if (!vehicle) return null;

      const insurance = vehicle.insurance.find(
        (i) => i._id.toString() === insuranceId
      );
      return insurance ? insurance.checkDetails : [];
    } catch (error) {
      throw error;
    }
  }

  async getAllChecksForVehicle(customerId, vehicleId) {
    try {
      const customer = await Customer.findById(customerId).populate(
        "agentsId",
        "first_name last_name"
      );
      if (!customer) return null;

      const vehicle = customer.vehicles.find(
        (v) => v._id.toString() === vehicleId
      );
      if (!vehicle) return null;

      const allChecks = [];
      vehicle.insurance.forEach((insurance) => {
        insurance.checkDetails.forEach((check) => {
          allChecks.push({
            ...check.toObject(),
            insuranceId: insurance._id,
            insuranceType: insurance.insuranceType,
          });
        });
      });

      return allChecks;
    } catch (error) {
      throw error;
    }
  }

  async getCustomerStats(filters = {}) {
    try {
      const stats = await Customer.aggregate([
        {
          $facet: {
            totalCustomers: [{ $count: "count" }],
            customersByCity: [
              { $group: { _id: "$city", count: { $sum: 1 } } },
              { $sort: { count: -1 } },
            ],
            customersByMonth: [
              {
                $group: {
                  _id: { $month: "$createdAt" },
                  count: { $sum: 1 },
                },
              },
              { $sort: { _id: 1 } },
            ],
            customersWithVehicles: [
              { $match: { "vehicles.0": { $exists: true } } },
              { $count: "count" },
            ],
            customersWithInsurances: [
              { $match: { "insurances.0": { $exists: true } } },
              { $count: "count" },
            ],
          },
        },
      ]);

      return stats[0];
    } catch (error) {
      throw error;
    }
  }

  async getVehicleStats() {
    try {
      const stats = await Customer.aggregate([
        {
          $unwind: "$vehicles",
        },
        {
          $group: {
            _id: null,
            totalVehicles: { $sum: 1 },
            vehiclesByType: { $push: "$vehicles.type" },
            vehiclesByModel: { $push: "$vehicles.model" },
          },
        },
      ]);

      return (
        stats[0] || {
          totalVehicles: 0,
          vehiclesByType: [],
          vehiclesByModel: [],
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async getInsuranceStats() {
    try {
      const stats = await Customer.aggregate([
        {
          $unwind: "$insurances",
        },
        {
          $group: {
            _id: null,
            totalInsurances: { $sum: 1 },
            insurancesByType: { $push: "$insurances.insuranceType" },
            totalInsuranceAmount: { $sum: "$insurances.insuranceAmount" },
          },
        },
      ]);

      return (
        stats[0] || {
          totalInsurances: 0,
          insurancesByType: [],
          totalInsuranceAmount: 0,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  mapToEntity(customerDoc) {
    if (!customerDoc) return null;

    return new CustomerEntity({
      id: customerDoc._id,
      image: customerDoc.image,
      first_name: customerDoc.first_name,
      last_name: customerDoc.last_name,
      id_Number: customerDoc.id_Number,
      phone_number: customerDoc.phone_number,
      joining_date: customerDoc.joining_date,
      notes: customerDoc.notes,
      city: customerDoc.city,
      email: customerDoc.email,
      birth_date: customerDoc.birth_date,
      agentsId: customerDoc.agentsId,
      agentsName: customerDoc.agentsName,
      vehicles: customerDoc.vehicles,
      insurances: customerDoc.insurances,
      createdAt: customerDoc.createdAt,
      updatedAt: customerDoc.updatedAt,
    });
  }
}
