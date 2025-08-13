import { IInvoiceRepository } from "../../core/interfaces/IInvoiceRepository.js";
import Invoice from "../../../DB/models/Invoice.model.js";
import { Invoice as InvoiceEntity } from "../../core/entities/Invoice.entity.js";

export class MongoInvoiceRepository extends IInvoiceRepository {
  async createInvoice(invoiceData) {
    try {
      const invoiceDoc = new Invoice({
        customer: invoiceData.customer,
        insurancePolicy: invoiceData.insurancePolicy,
        vehicle: invoiceData.vehicle,
        totalAmount: invoiceData.totalAmount,
        balanceDue: invoiceData.balanceDue,
        description: invoiceData.description,
        notes: invoiceData.notes,
        dueDate: invoiceData.dueDate,
        createdBy: invoiceData.createdBy,
      });

      const savedInvoice = await invoiceDoc.save();
      return this.mapToEntity(savedInvoice);
    } catch (error) {
      throw error;
    }
  }

  async getInvoiceById(id) {
    try {
      const invoice = await Invoice.findById(id)
        .populate("customer", "firstName lastName email")
        .populate("vehicle", "plateNumber model make")
        .populate("createdBy", "firstName lastName")
        .populate("updatedBy", "firstName lastName");

      return invoice ? this.mapToEntity(invoice) : null;
    } catch (error) {
      throw error;
    }
  }

  async getAllInvoices(filters = {}) {
    try {
      const {
        page = 1,
        limit = 10,
        status,
        customerId,
        startDate,
        endDate,
        search,
        sortBy = "createdAt",
        sortOrder = "desc",
      } = filters;

      // Build query
      const query = {};

      if (status) {
        query.status = status;
      }

      if (customerId) {
        query.customer = customerId;
      }

      if (startDate && endDate) {
        query.invoiceDate = {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        };
      }

      if (search) {
        query.$or = [
          { invoiceNumber: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ];
      }

      // Build sort object
      const sort = {};
      sort[sortBy] = sortOrder === "desc" ? -1 : 1;

      // Execute query with pagination
      const skip = (page - 1) * limit;

      const invoices = await Invoice.find(query)
        .populate("customer", "firstName lastName email")
        .populate("vehicle", "plateNumber model make")
        .populate("createdBy", "firstName lastName")
        .sort(sort)
        .skip(skip)
        .limit(limit);

      const total = await Invoice.countDocuments(query);

      return {
        invoices: invoices.map((invoice) => this.mapToEntity(invoice)),
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

  async updateInvoice(id, updateData) {
    try {
      const updatedInvoice = await Invoice.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      })
        .populate("customer", "firstName lastName email")
        .populate("vehicle", "plateNumber model make")
        .populate("createdBy", "firstName lastName")
        .populate("updatedBy", "firstName lastName");

      return updatedInvoice ? this.mapToEntity(updatedInvoice) : null;
    } catch (error) {
      throw error;
    }
  }

  async deleteInvoice(id) {
    try {
      const invoice = await Invoice.findByIdAndDelete(id);
      return invoice ? this.mapToEntity(invoice) : null;
    } catch (error) {
      throw error;
    }
  }

  async getInvoicesByCustomer(customerId, filters = {}) {
    try {
      const query = { customer: customerId };

      if (filters.status) {
        query.status = filters.status;
      }

      const invoices = await Invoice.find(query)
        .populate("customer", "firstName lastName email")
        .populate("vehicle", "plateNumber model make")
        .sort({ createdAt: -1 });

      return invoices.map((invoice) => this.mapToEntity(invoice));
    } catch (error) {
      throw error;
    }
  }

  async getInvoiceStats(filters = {}) {
    try {
      const { startDate, endDate } = filters;
      const query = {};

      if (startDate && endDate) {
        query.invoiceDate = {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        };
      }

      const stats = await Invoice.aggregate([
        { $match: query },
        {
          $group: {
            _id: null,
            totalInvoices: { $sum: 1 },
            totalAmount: { $sum: "$totalAmount" },
            totalBalanceDue: { $sum: "$balanceDue" },
            pendingInvoices: {
              $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] },
            },
            paidInvoices: {
              $sum: { $cond: [{ $eq: ["$status", "Paid"] }, 1, 0] },
            },
            partiallyPaidInvoices: {
              $sum: { $cond: [{ $eq: ["$status", "Partially Paid"] }, 1, 0] },
            },
            overdueInvoices: {
              $sum: { $cond: [{ $eq: ["$status", "Overdue"] }, 1, 0] },
            },
          },
        },
      ]);

      return (
        stats[0] || {
          totalInvoices: 0,
          totalAmount: 0,
          totalBalanceDue: 0,
          pendingInvoices: 0,
          paidInvoices: 0,
          partiallyPaidInvoices: 0,
          overdueInvoices: 0,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async markOverdueInvoices() {
    try {
      const overdueInvoices = await Invoice.find({
        dueDate: { $lt: new Date() },
        balanceDue: { $gt: 0 },
        status: { $ne: "Overdue" },
      });

      const updatedInvoices = [];
      for (const invoice of overdueInvoices) {
        invoice.status = "Overdue";
        invoice.updatedAt = new Date();
        await invoice.save();
        updatedInvoices.push(this.mapToEntity(invoice));
      }

      return updatedInvoices;
    } catch (error) {
      throw error;
    }
  }

  async getInvoiceByInsurancePolicy(insurancePolicyId) {
    try {
      const invoice = await Invoice.findOne({
        insurancePolicy: insurancePolicyId,
      }).populate("customer", "firstName lastName email");

      return invoice ? this.mapToEntity(invoice) : null;
    } catch (error) {
      throw error;
    }
  }

  async updateInvoiceBalance(id, newBalance) {
    try {
      const invoice = await Invoice.findById(id);
      if (!invoice) {
        throw new Error("Invoice not found");
      }

      invoice.balanceDue = Math.max(0, newBalance);
      invoice.updateStatus();
      await invoice.save();

      return this.mapToEntity(invoice);
    } catch (error) {
      throw error;
    }
  }

  async getInvoiceCount() {
    try {
      return await Invoice.countDocuments();
    } catch (error) {
      throw error;
    }
  }

  async getInvoicesByStatus(status, filters = {}) {
    try {
      const query = { status };

      if (filters.startDate && filters.endDate) {
        query.invoiceDate = {
          $gte: new Date(filters.startDate),
          $lte: new Date(filters.endDate),
        };
      }

      const invoices = await Invoice.find(query)
        .populate("customer", "firstName lastName email")
        .populate("vehicle", "plateNumber model make")
        .sort({ createdAt: -1 });

      return invoices.map((invoice) => this.mapToEntity(invoice));
    } catch (error) {
      throw error;
    }
  }

  async getOverdueInvoices() {
    try {
      const overdueInvoices = await Invoice.find({
        dueDate: { $lt: new Date() },
        balanceDue: { $gt: 0 },
      })
        .populate("customer", "firstName lastName email")
        .populate("vehicle", "plateNumber model make")
        .sort({ dueDate: 1 });

      return overdueInvoices.map((invoice) => this.mapToEntity(invoice));
    } catch (error) {
      throw error;
    }
  }

  async getInvoicesByDateRange(startDate, endDate, filters = {}) {
    try {
      const query = {
        invoiceDate: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      };

      if (filters.status) {
        query.status = filters.status;
      }

      if (filters.customerId) {
        query.customer = filters.customerId;
      }

      const invoices = await Invoice.find(query)
        .populate("customer", "firstName lastName email")
        .populate("vehicle", "plateNumber model make")
        .sort({ invoiceDate: -1 });

      return invoices.map((invoice) => this.mapToEntity(invoice));
    } catch (error) {
      throw error;
    }
  }

  mapToEntity(invoiceDoc) {
    return new InvoiceEntity({
      id: invoiceDoc._id,
      invoiceNumber: invoiceDoc.invoiceNumber,
      customer: invoiceDoc.customer,
      insurancePolicy: invoiceDoc.insurancePolicy,
      vehicle: invoiceDoc.vehicle,
      invoiceDate: invoiceDoc.invoiceDate,
      dueDate: invoiceDoc.dueDate,
      status: invoiceDoc.status,
      totalAmount: invoiceDoc.totalAmount,
      balanceDue: invoiceDoc.balanceDue,
      description: invoiceDoc.description,
      notes: invoiceDoc.notes,
      createdBy: invoiceDoc.createdBy,
      updatedBy: invoiceDoc.updatedBy,
      createdAt: invoiceDoc.createdAt,
      updatedAt: invoiceDoc.updatedAt,
    });
  }
}
