import Cheque from "../../../DB/models/Cheque.model.js";
import Customer from "../../../DB/models/Customer.model.js";
import Invoice from "../../../DB/models/Invoice.model.js";
import InsuranceCompany from "../../../DB/models/insuranceCompany.model.js";
import logger from "../../utils/logService.js";

class ReportsService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  // Get cached data or calculate fresh data
  async getCachedData(key, calculationFunction) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    const data = await calculationFunction();
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });

    return data;
  }

  // 1. Get all cheques with date and status filter
  async getChequeReport(filters = {}) {
    try {
      const {
        startDate,
        endDate,
        status,
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        sortOrder = "desc",
      } = filters;

      // Build match conditions
      const matchConditions = {};

      // Date filter
      if (startDate || endDate) {
        matchConditions.createdAt = {};
        if (startDate) {
          matchConditions.createdAt.$gte = new Date(startDate);
        }
        if (endDate) {
          matchConditions.createdAt.$lte = new Date(endDate);
        }
      }

      // Status filter
      if (status && status !== "all") {
        matchConditions.chequeStatus = status;
      }

      // Calculate skip for pagination
      const skip = (page - 1) * limit;

      // Build sort object
      const sortObject = {};
      sortObject[sortBy] = sortOrder === "desc" ? -1 : 1;

      // Get cheques with filters
      const cheques = await Cheque.find(matchConditions)
        .populate("customer", "first_name last_name phone_number")
        .sort(sortObject)
        .skip(skip)
        .limit(parseInt(limit))
        .lean();

      // Get total count for pagination
      const totalCount = await Cheque.countDocuments(matchConditions);

      // Calculate summary statistics
      const summary = await Cheque.aggregate([
        { $match: matchConditions },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$chequeAmount" },
            totalCount: { $sum: 1 },
            pendingAmount: {
              $sum: {
                $cond: [
                  { $eq: ["$chequeStatus", "pending"] },
                  "$chequeAmount",
                  0,
                ],
              },
            },
            pendingCount: {
              $sum: {
                $cond: [{ $eq: ["$chequeStatus", "pending"] }, 1, 0],
              },
            },
            clearedAmount: {
              $sum: {
                $cond: [
                  { $eq: ["$chequeStatus", "cleared"] },
                  "$chequeAmount",
                  0,
                ],
              },
            },
            clearedCount: {
              $sum: {
                $cond: [{ $eq: ["$chequeStatus", "cleared"] }, 1, 0],
              },
            },
            bouncedAmount: {
              $sum: {
                $cond: [
                  { $eq: ["$chequeStatus", "bounced"] },
                  "$chequeAmount",
                  0,
                ],
              },
            },
            bouncedCount: {
              $sum: {
                $cond: [{ $eq: ["$chequeStatus", "bounced"] }, 1, 0],
              },
            },
          },
        },
      ]);

      return {
        cheques,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
        },
        summary: summary[0] || {
          totalAmount: 0,
          totalCount: 0,
          pendingAmount: 0,
          pendingCount: 0,
          clearedAmount: 0,
          clearedCount: 0,
          bouncedAmount: 0,
          bouncedCount: 0,
        },
        filters: {
          startDate,
          endDate,
          status,
          sortBy,
          sortOrder,
        },
      };
    } catch (error) {
      logger.error("Error getting cheque report:", error);
      throw error;
    }
  }

  // 2. Get due amounts report
  async getDueAmountsReport(filters = {}) {
    try {
      const {
        startDate,
        endDate,
        status,
        page = 1,
        limit = 10,
        sortBy = "balanceDue",
        sortOrder = "desc",
      } = filters;

      // Build match conditions
      const matchConditions = {
        status: { $in: ["Pending", "Partially Paid", "Overdue"] },
      };

      // Date filter
      if (startDate || endDate) {
        matchConditions.createdAt = {};
        if (startDate) {
          matchConditions.createdAt.$gte = new Date(startDate);
        }
        if (endDate) {
          matchConditions.createdAt.$lte = new Date(endDate);
        }
      }

      // Status filter
      if (status && status !== "all") {
        matchConditions.status = status;
      }

      // Calculate skip for pagination
      const skip = (page - 1) * limit;

      // Build sort object
      const sortObject = {};
      sortObject[sortBy] = sortOrder === "desc" ? -1 : 1;

      // Get invoices with filters
      const invoices = await Invoice.find(matchConditions)
        .populate("customer", "first_name last_name phone_number")
        .populate("insurancePolicy", "policyNumber insuranceType")
        .sort(sortObject)
        .skip(skip)
        .limit(parseInt(limit))
        .lean();

      // Get total count for pagination
      const totalCount = await Invoice.countDocuments(matchConditions);

      // Calculate summary statistics
      const summary = await Invoice.aggregate([
        { $match: matchConditions },
        {
          $group: {
            _id: null,
            totalDueAmount: { $sum: "$balanceDue" },
            totalInvoices: { $sum: 1 },
            pendingAmount: {
              $sum: {
                $cond: [{ $eq: ["$status", "Pending"] }, "$balanceDue", 0],
              },
            },
            pendingCount: {
              $sum: {
                $cond: [{ $eq: ["$status", "Pending"] }, 1, 0],
              },
            },
            partiallyPaidAmount: {
              $sum: {
                $cond: [
                  { $eq: ["$status", "Partially Paid"] },
                  "$balanceDue",
                  0,
                ],
              },
            },
            partiallyPaidCount: {
              $sum: {
                $cond: [{ $eq: ["$status", "Partially Paid"] }, 1, 0],
              },
            },
            overdueAmount: {
              $sum: {
                $cond: [{ $eq: ["$status", "Overdue"] }, "$balanceDue", 0],
              },
            },
            overdueCount: {
              $sum: {
                $cond: [{ $eq: ["$status", "Overdue"] }, 1, 0],
              },
            },
          },
        },
      ]);

      return {
        invoices,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
        },
        summary: summary[0] || {
          totalDueAmount: 0,
          totalInvoices: 0,
          pendingAmount: 0,
          pendingCount: 0,
          partiallyPaidAmount: 0,
          partiallyPaidCount: 0,
          overdueAmount: 0,
          overdueCount: 0,
        },
        filters: {
          startDate,
          endDate,
          status,
          sortBy,
          sortOrder,
        },
      };
    } catch (error) {
      logger.error("Error getting due amounts report:", error);
      throw error;
    }
  }

  // 3. Get agent customers report
  async getAgentCustomersReport(filters = {}) {
    try {
      const {
        agentId,
        startDate,
        endDate,
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        sortOrder = "desc",
      } = filters;

      // Build match conditions - only customers with agents
      const matchConditions = {
        agentsId: { $exists: true, $ne: null },
      };

      // Agent filter
      if (agentId) {
        matchConditions.agentsId = agentId;
      }

      // Date filter
      if (startDate || endDate) {
        matchConditions.createdAt = {};
        if (startDate) {
          matchConditions.createdAt.$gte = new Date(startDate);
        }
        if (endDate) {
          matchConditions.createdAt.$lte = new Date(endDate);
        }
      }

      // Calculate skip for pagination
      const skip = (page - 1) * limit;

      // Build sort object
      const sortObject = {};
      sortObject[sortBy] = sortOrder === "desc" ? -1 : 1;

      // Get customers with filters
      const customers = await Customer.find(matchConditions)
        .populate("agentsId", "name email phone")
        .sort(sortObject)
        .skip(skip)
        .limit(parseInt(limit))
        .lean();

      // Get total count for pagination
      const totalCount = await Customer.countDocuments(matchConditions);

      // Calculate summary statistics
      const summary = await Customer.aggregate([
        { $match: matchConditions },
        {
          $group: {
            _id: "$agentsId",
            customerCount: { $sum: 1 },
            totalCustomers: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: null,
            totalCustomers: { $sum: "$customerCount" },
            uniqueAgents: { $sum: 1 },
          },
        },
      ]);

      return {
        customers,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
        },
        summary: summary[0] || {
          totalCustomers: 0,
          uniqueAgents: 0,
        },
        filters: {
          agentId,
          startDate,
          endDate,
          sortBy,
          sortOrder,
        },
      };
    } catch (error) {
      logger.error("Error getting agent customers report:", error);
      throw error;
    }
  }

  // 4. Get agent insurances report
  async getAgentInsurancesReport(filters = {}) {
    try {
      const {
        agentId,
        insuranceType,
        startDate,
        endDate,
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        sortOrder = "desc",
      } = filters;

      // Build match conditions - only customers with agents who have insurances
      const matchConditions = {
        agentsId: { $exists: true, $ne: null },
        "insurances.0": { $exists: true }, // Has at least one insurance
      };

      // Agent filter
      if (agentId) {
        matchConditions.agentsId = agentId;
      }

      // Insurance type filter
      if (insuranceType && insuranceType !== "all") {
        matchConditions["insurances.insuranceType"] = insuranceType;
      }

      // Date filter
      if (startDate || endDate) {
        matchConditions.createdAt = {};
        if (startDate) {
          matchConditions.createdAt.$gte = new Date(startDate);
        }
        if (endDate) {
          matchConditions.createdAt.$lte = new Date(endDate);
        }
      }

      // Calculate skip for pagination
      const skip = (page - 1) * limit;

      // Build sort object
      const sortObject = {};
      sortObject[sortBy] = sortOrder === "desc" ? -1 : 1;

      // Get customers with insurances
      const customers = await Customer.find(matchConditions)
        .populate("agentsId", "name email phone")
        .sort(sortObject)
        .skip(skip)
        .limit(parseInt(limit))
        .lean();

      // Get total count for pagination
      const totalCount = await Customer.countDocuments(matchConditions);

      // Calculate summary statistics
      const summary = await Customer.aggregate([
        { $match: matchConditions },
        { $unwind: "$insurances" },
        {
          $group: {
            _id: "$agentsId",
            insuranceCount: { $sum: 1 },
            totalInsurances: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: null,
            totalInsurances: { $sum: "$insuranceCount" },
            uniqueAgents: { $sum: 1 },
          },
        },
      ]);

      return {
        customers,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
        },
        summary: summary[0] || {
          totalInsurances: 0,
          uniqueAgents: 0,
        },
        filters: {
          agentId,
          insuranceType,
          startDate,
          endDate,
          sortBy,
          sortOrder,
        },
      };
    } catch (error) {
      logger.error("Error getting agent insurances report:", error);
      throw error;
    }
  }

  // 5. Get expired/soon to expire insurance report
  async getExpiredInsuranceReport(filters = {}) {
    try {
      const {
        daysThreshold = 3,
        includeExpired = true,
        page = 1,
        limit = 10,
        sortBy = "expirationDate",
        sortOrder = "asc",
      } = filters;

      const now = new Date();
      const thresholdDate = new Date();
      thresholdDate.setDate(now.getDate() + parseInt(daysThreshold));

      // Build match conditions for customers with insurances
      const matchConditions = {
        "insurances.0": { $exists: true }, // Has at least one insurance
      };

      if (includeExpired) {
        // Include expired and soon to expire
        matchConditions["insurances.expirationDate"] = { $lte: thresholdDate };
      } else {
        // Only soon to expire (not yet expired)
        matchConditions["insurances.expirationDate"] = {
          $gte: now,
          $lte: thresholdDate,
        };
      }

      // Calculate skip for pagination
      const skip = (page - 1) * limit;

      // Build sort object
      const sortObject = {};
      sortObject[sortBy] = sortOrder === "desc" ? -1 : 1;

      // Get customers with expiring insurances
      const customers = await Customer.find(matchConditions)
        .populate("agentsId", "name email phone")
        .sort(sortObject)
        .skip(skip)
        .limit(parseInt(limit))
        .lean();

      // Get total count for pagination
      const totalCount = await Customer.countDocuments(matchConditions);

      // Calculate summary statistics
      const summary = await Customer.aggregate([
        { $match: matchConditions },
        { $unwind: "$insurances" },
        {
          $addFields: {
            daysUntilExpiry: {
              $ceil: {
                $divide: [
                  { $subtract: ["$insurances.expirationDate", now] },
                  1000 * 60 * 60 * 24,
                ],
              },
            },
          },
        },
        {
          $group: {
            _id: null,
            totalInsurances: { $sum: 1 },
            expiredCount: {
              $sum: {
                $cond: [{ $lte: ["$insurances.expirationDate", now] }, 1, 0],
              },
            },
            expiringSoonCount: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $gt: ["$insurances.expirationDate", now] },
                      { $lte: ["$insurances.expirationDate", thresholdDate] },
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
            averageDaysUntilExpiry: { $avg: "$daysUntilExpiry" },
          },
        },
      ]);

      return {
        customers,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
        },
        summary: summary[0] || {
          totalInsurances: 0,
          expiredCount: 0,
          expiringSoonCount: 0,
          averageDaysUntilExpiry: 0,
        },
        filters: {
          daysThreshold,
          includeExpired,
          sortBy,
          sortOrder,
        },
      };
    } catch (error) {
      logger.error("Error getting expired insurance report:", error);
      throw error;
    }
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
    logger.info("Reports cache cleared");
  }
}

export default new ReportsService();
