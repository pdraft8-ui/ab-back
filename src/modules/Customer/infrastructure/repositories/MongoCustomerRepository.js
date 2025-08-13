import { ICustomerRepository } from "../../domain/interfaces/ICustomerRepository.js";
import Customer from "../../../../../DB/models/Customer.model.js";
import { Customer as CustomerEntity } from "../../domain/entities/Customer.entity.js";

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

  async addVehicleToCustomer(customerId, vehicleData) {
    try {
      const customer = await Customer.findByIdAndUpdate(
        customerId,
        { $push: { vehicles: vehicleData } },
        { new: true }
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
      });
      if (!customer) return null;

      const vehicle = customer.vehicles.find(
        (v) => v.plateNumber === plateNumber
      );
      return vehicle || null;
    } catch (error) {
      throw error;
    }
  }

  async getCustomerStats(filters = {}) {
    try {
      const query = {};

      if (filters.city) {
        query.city = { $regex: filters.city, $options: "i" };
      }

      if (filters.agentId) {
        query.agentsId = filters.agentId;
      }

      const stats = await Customer.aggregate([
        { $match: query },
        {
          $group: {
            _id: null,
            totalCustomers: { $sum: 1 },
            customersWithVehicles: {
              $sum: { $cond: [{ $gt: [{ $size: "$vehicles" }, 0] }, 1, 0] },
            },
            customersWithInsurances: {
              $sum: { $cond: [{ $gt: [{ $size: "$insurances" }, 0] }, 1, 0] },
            },
          },
        },
      ]);

      return (
        stats[0] || {
          totalCustomers: 0,
          customersWithVehicles: 0,
          customersWithInsurances: 0,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  // Placeholder methods for interface compliance
  async getCustomerByInvoiceId(invoiceId) {
    throw new Error("Method not implemented");
  }

  async getCustomersByMonth() {
    throw new Error("Method not implemented");
  }

  async getCustomersByDateRange(startDate, endDate) {
    throw new Error("Method not implemented");
  }

  async updateVehicle(customerId, vehicleId, updateData) {
    throw new Error("Method not implemented");
  }

  async addInsuranceToVehicle(customerId, vehicleId, insuranceData) {
    throw new Error("Method not implemented");
  }

  async removeInsuranceFromVehicle(customerId, vehicleId, insuranceId) {
    throw new Error("Method not implemented");
  }

  async updateVehicleInsurance(customerId, vehicleId, insuranceId, updateData) {
    throw new Error("Method not implemented");
  }

  async getVehicleInsurances(customerId, vehicleId) {
    throw new Error("Method not implemented");
  }

  async getAllVehicleInsurances() {
    throw new Error("Method not implemented");
  }

  async getAllInsurancesData() {
    throw new Error("Method not implemented");
  }

  async addCustomerInsurance(customerId, insuranceData) {
    throw new Error("Method not implemented");
  }

  async removeCustomerInsurance(customerId, insuranceId) {
    throw new Error("Method not implemented");
  }

  async updateCustomerInsurance(customerId, insuranceId, updateData) {
    throw new Error("Method not implemented");
  }

  async getCustomerInsurances(customerId) {
    throw new Error("Method not implemented");
  }

  async getAllCustomerInsurances(customerId) {
    throw new Error("Method not implemented");
  }

  async getInsuranceById(insuranceId) {
    throw new Error("Method not implemented");
  }

  async deleteInsuranceById(insuranceId) {
    throw new Error("Method not implemented");
  }

  async addCheckToInsurance(customerId, vehicleId, insuranceId, checkData) {
    throw new Error("Method not implemented");
  }

  async removeCheckFromInsurance(customerId, vehicleId, checkId) {
    throw new Error("Method not implemented");
  }

  async getInsuranceChecks(customerId, vehicleId, insuranceId) {
    throw new Error("Method not implemented");
  }

  async getAllChecksForVehicle(customerId, vehicleId) {
    throw new Error("Method not implemented");
  }

  async getVehicleStats() {
    throw new Error("Method not implemented");
  }

  async getInsuranceStats() {
    throw new Error("Method not implemented");
  }

  mapToEntity(customerDoc) {
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
