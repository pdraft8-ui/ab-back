import chequeModel from "../../../../DB/models/Cheque.model.js";
import Customer from "../../../../DB/models/Customer.model.js";
import UserModel from "../../../../DB/models/user.model.js";
import localStorageService from "../../../Servicess/localStorage.js";
import { sendNotificationLogic } from "../../notification/controller/notification.controller.js";
import AuditLogModel from "../../../../DB/models/AuditLog.model.js";

const logAudit = async ({
  userId,
  action,
  entity,
  entityId,
  userName,
  oldValue = null,
  newValue = null,
}) => {
  try {
    await AuditLogModel.create({
      user: userId,
      action,
      entity,
      entityId,
      userName,
      oldValue,
      newValue,
    });
  } catch (error) {
    console.error("Error logging audit:", error);
  }
};

// Create a new cheque
export const createCheque = async (req, res, next) => {
  try {
    const {
      customer,
      chequeNumber,
      chequeDate,
      chequeAmount,
      chequeStatus = "pending",
      bankName,
      accountNumber,
      notes,
      clearedDate,
    } = req.body;

    // Check if customer exists
    const customerExists = await Customer.findById(customer);
    if (!customerExists) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Check if cheque number already exists
    const existingCheque = await chequeModel.findOne({ chequeNumber });
    if (existingCheque) {
      return res.status(400).json({
        message: "Cheque number already exists",
        field: "chequeNumber",
      });
    }

    // Handle file upload if present
    let chequeImageUrl = null;
    if (req.file) {
      const result = await localStorageService.upload(req.file, "cheques");
      chequeImageUrl = result.url;
    }

    // Create new cheque
    const newCheque = new chequeModel({
      customer,
      customerName: `${customerExists.first_name} ${customerExists.last_name}`,
      customerPhone: customerExists.phone_number,
      chequeNumber,
      chequeDate,
      chequeAmount,
      chequeStatus,
      bankName,
      accountNumber,
      notes,
      chequeImage: chequeImageUrl,
      clearedDate:
        chequeStatus === "cleared" ? clearedDate || new Date() : null,
      createdBy: req.user._id,
    });

    const savedCheque = await newCheque.save();
    await savedCheque.populate([
      { path: "customer", select: "name phone email" },
      { path: "createdBy", select: "name" },
    ]);

    // Log audit
    const findUser = await UserModel.findById(req.user._id);
    await logAudit({
      userId: req.user._id,
      userName: findUser.name,
      action: `Create cheque`,
      entity: "Cheque",
      entityId: savedCheque._id,
      oldValue: null,
      newValue: savedCheque,
    });

    // Send notification
    const message = `${findUser.name} created a new cheque #${chequeNumber} for ${customerExists.first_name} ${customerExists.last_name}`;
    await sendNotificationLogic({
      senderId: req.user._id,
      message,
    });

    res.status(201).json({
      message: "Cheque created successfully",
      cheque: savedCheque,
    });
  } catch (error) {
    console.error("Error creating cheque:", error);
    next(error);
  }
};

// Get all cheques with advanced filtering
export const getAllCheques = async (req, res, next) => {
  try {
    const {
      customer,
      customerName,
      customerPhone,
      chequeStatus,
      startDate,
      endDate,
      minAmount,
      maxAmount,
      bankName,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // Validate and limit the page size to prevent performance issues
    const validatedLimit = Math.min(parseInt(limit), 100);
    const validatedPage = Math.max(parseInt(page), 1);

    // Build filter object
    const filter = {};

    if (customer) {
      filter.customer = customer;
    }

    if (customerName) {
      filter.customerName = { $regex: customerName, $options: "i" };
    }

    if (customerPhone) {
      filter.customerPhone = { $regex: customerPhone, $options: "i" };
    }

    if (chequeStatus) {
      filter.chequeStatus = chequeStatus;
    }

    if (startDate || endDate) {
      filter.chequeDate = {};
      if (startDate) {
        filter.chequeDate.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.chequeDate.$lte = new Date(endDate);
      }
    }

    if (minAmount || maxAmount) {
      filter.chequeAmount = {};
      if (minAmount) {
        filter.chequeAmount.$gte = parseFloat(minAmount);
      }
      if (maxAmount) {
        filter.chequeAmount.$lte = parseFloat(maxAmount);
      }
    }

    if (bankName) {
      filter.bankName = { $regex: bankName, $options: "i" };
    }

    // Calculate pagination
    const skip = (validatedPage - 1) * validatedLimit;
    const sortObj = {};
    sortObj[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Set query timeout to prevent hanging
    const queryOptions = {
      maxTimeMS: 30000, // 30 second timeout
    };

    // Execute queries in parallel for better performance
    const [cheques, totalCount, summary] = await Promise.all([
      // Get cheques with population
      chequeModel
        .find(filter, null, queryOptions)
        .populate("customer", "name phone email")
        .populate("createdBy", "name")
        .populate("updatedBy", "name")
        .sort(sortObj)
        .skip(skip)
        .limit(validatedLimit)
        .lean(),

      // Get total count for pagination
      chequeModel.countDocuments(filter, queryOptions),

      // Calculate summary statistics
      chequeModel.aggregate(
        [
          { $match: filter },
          {
            $group: {
              _id: null,
              totalAmount: { $sum: "$chequeAmount" },
              pendingCount: {
                $sum: { $cond: [{ $eq: ["$chequeStatus", "pending"] }, 1, 0] },
              },
              clearedCount: {
                $sum: { $cond: [{ $eq: ["$chequeStatus", "cleared"] }, 1, 0] },
              },
              bouncedCount: {
                $sum: { $cond: [{ $eq: ["$chequeStatus", "bounced"] }, 1, 0] },
              },
              cancelledCount: {
                $sum: {
                  $cond: [{ $eq: ["$chequeStatus", "cancelled"] }, 1, 0],
                },
              },
              onHoldCount: {
                $sum: { $cond: [{ $eq: ["$chequeStatus", "on_hold"] }, 1, 0] },
              },
            },
          },
        ],
        queryOptions
      ),
    ]);

    // Convert cheque images to full URLs
    const chequesWithImages = cheques.map((cheque) => ({
      ...cheque,
      chequeImage: cheque.chequeImage
        ? localStorageService.getFullUrl(cheque.chequeImage)
        : null,
    }));

    const totalPages = Math.ceil(totalCount / validatedLimit);

    res.status(200).json({
      message: "Cheques retrieved successfully",
      cheques: chequesWithImages,
      pagination: {
        currentPage: validatedPage,
        totalPages,
        totalCount,
        limit: validatedLimit,
        hasNext: validatedPage < totalPages,
        hasPrev: validatedPage > 1,
      },
      summary: summary[0] || {
        totalAmount: 0,
        pendingCount: 0,
        clearedCount: 0,
        bouncedCount: 0,
        cancelledCount: 0,
        onHoldCount: 0,
      },
      filters: {
        customer,
        chequeStatus,
        startDate,
        endDate,
        minAmount,
        maxAmount,
        bankName,
        sortBy,
        sortOrder,
      },
    });
  } catch (error) {
    console.error("Error getting cheques:", error);

    // Handle specific timeout errors
    if (error.name === "MongooseError" && error.message.includes("timeout")) {
      return res.status(408).json({
        message:
          "Request timeout - please try with fewer results or different filters",
        error: "TIMEOUT",
      });
    }

    // Handle schema validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Data validation error",
        error: error.message,
      });
    }

    // Handle MongoDB connection errors
    if (
      error.name === "MongoNetworkError" ||
      error.name === "MongoServerSelectionError"
    ) {
      return res.status(503).json({
        message: "Database connection error - please try again later",
        error: "DB_CONNECTION_ERROR",
      });
    }

    next(error);
  }
};

// Get cheque by ID
export const getChequeById = async (req, res, next) => {
  try {
    const { chequeId } = req.params;

    const cheque = await chequeModel
      .findById(chequeId)
      .populate("customer", "name phone email address")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email")
      .lean();

    if (!cheque) {
      return res.status(404).json({ message: "Cheque not found" });
    }

    // Convert cheque image to full URL
    if (cheque.chequeImage) {
      cheque.chequeImage = localStorageService.getFullUrl(cheque.chequeImage);
    }

    res.status(200).json({
      message: "Cheque retrieved successfully",
      cheque,
    });
  } catch (error) {
    console.error("Error getting cheque:", error);
    next(error);
  }
};

// Update cheque
export const updateCheque = async (req, res, next) => {
  try {
    const { chequeId } = req.params;
    const updateData = { ...req.body };

    // Find existing cheque
    const existingCheque = await chequeModel.findById(chequeId);
    if (!existingCheque) {
      return res.status(404).json({ message: "Cheque not found" });
    }

    // Store old values for audit
    const oldValue = existingCheque.toObject();

    // Check if cheque number is being changed and if it already exists
    if (
      updateData.chequeNumber &&
      updateData.chequeNumber !== existingCheque.chequeNumber
    ) {
      const existingChequeNumber = await chequeModel.findOne({
        chequeNumber: updateData.chequeNumber,
        _id: { $ne: chequeId },
      });
      if (existingChequeNumber) {
        return res.status(400).json({
          message: "Cheque number already exists",
          field: "chequeNumber",
        });
      }
    }

    // If customer is being changed, update customer name and phone
    if (
      updateData.customer &&
      updateData.customer !== existingCheque.customer.toString()
    ) {
      const newCustomer = await Customer.findById(updateData.customer);
      if (!newCustomer) {
        return res.status(404).json({ message: "New customer not found" });
      }
      updateData.customerName = `${newCustomer.first_name} ${newCustomer.last_name}`;
      updateData.customerPhone = newCustomer.phone_number;
    }

    // Handle file upload if present
    if (req.file) {
      const result = await localStorageService.upload(req.file, "cheques");
      updateData.chequeImage = result.url;
    }

    // Set updatedBy
    updateData.updatedBy = req.user._id;

    // Update cheque
    const updatedCheque = await chequeModel
      .findByIdAndUpdate(chequeId, updateData, { new: true })
      .populate("customer", "name phone email")
      .populate("createdBy", "name")
      .populate("updatedBy", "name");

    // Log audit
    const findUser = await UserModel.findById(req.user._id);
    await logAudit({
      userId: req.user._id,
      userName: findUser.name,
      action: `Update cheque`,
      entity: "Cheque",
      entityId: updatedCheque._id,
      oldValue,
      newValue: updatedCheque,
    });

    // Send notification
    const message = `${findUser.name} updated cheque #${updatedCheque.chequeNumber}`;
    await sendNotificationLogic({
      senderId: req.user._id,
      message,
    });

    res.status(200).json({
      message: "Cheque updated successfully",
      cheque: updatedCheque,
    });
  } catch (error) {
    console.error("Error updating cheque:", error);
    next(error);
  }
};

// Delete cheque
export const deleteCheque = async (req, res, next) => {
  try {
    const { chequeId } = req.params;

    const cheque = await chequeModel.findById(chequeId);
    if (!cheque) {
      return res.status(404).json({ message: "Cheque not found" });
    }

    // Store for audit log
    const oldValue = cheque.toObject();

    // Delete cheque
    await chequeModel.findByIdAndDelete(chequeId);

    // Log audit
    const findUser = await UserModel.findById(req.user._id);
    await logAudit({
      userId: req.user._id,
      userName: findUser.name,
      action: `Delete cheque`,
      entity: "Cheque",
      entityId: chequeId,
      oldValue,
      newValue: null,
    });

    // Send notification
    const message = `${findUser.name} deleted cheque #${cheque.chequeNumber}`;
    await sendNotificationLogic({
      senderId: req.user._id,
      message,
    });

    res.status(200).json({
      message: "Cheque deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting cheque:", error);
    next(error);
  }
};

// Bulk update cheque status
export const bulkUpdateChequeStatus = async (req, res, next) => {
  try {
    const { chequeIds, chequeStatus } = req.body;

    // Find existing cheques
    const existingCheques = await chequeModel.find({ _id: { $in: chequeIds } });
    if (existingCheques.length !== chequeIds.length) {
      return res.status(404).json({ message: "Some cheques not found" });
    }

    // Store old values for audit
    const oldValues = existingCheques.map((cheque) => cheque.toObject());

    // Update cheques
    const updateData = {
      chequeStatus,
      updatedBy: req.user._id,
    };

    // If status is cleared, set clearedDate
    if (chequeStatus === "cleared") {
      updateData.clearedDate = new Date();
    }

    const result = await chequeModel.updateMany(
      { _id: { $in: chequeIds } },
      updateData
    );

    // Get updated cheques
    const updatedCheques = await chequeModel
      .find({ _id: { $in: chequeIds } })
      .populate("customer", "name")
      .populate("updatedBy", "name");

    // Log audit for each cheque
    const findUser = await UserModel.findById(req.user._id);
    for (let i = 0; i < updatedCheques.length; i++) {
      await logAudit({
        userId: req.user._id,
        userName: findUser.name,
        action: `Bulk update cheque status to ${chequeStatus}`,
        entity: "Cheque",
        entityId: updatedCheques[i]._id,
        oldValue: oldValues[i],
        newValue: updatedCheques[i],
      });
    }

    // Send notification
    const message = `${findUser.name} bulk updated ${result.modifiedCount} cheques to ${chequeStatus} status`;
    await sendNotificationLogic({
      senderId: req.user._id,
      message,
    });

    res.status(200).json({
      message: `${result.modifiedCount} cheques updated successfully`,
      updatedCount: result.modifiedCount,
      cheques: updatedCheques,
    });
  } catch (error) {
    console.error("Error bulk updating cheques:", error);
    next(error);
  }
};

// Get cheque statistics
export const getChequeStatistics = async (req, res, next) => {
  try {
    const { startDate, endDate, customer } = req.query;

    // Build filter
    const filter = {};
    if (startDate || endDate) {
      filter.chequeDate = {};
      if (startDate) filter.chequeDate.$gte = new Date(startDate);
      if (endDate) filter.chequeDate.$lte = new Date(endDate);
    }
    if (customer) filter.customer = customer;

    // Get statistics
    const stats = await chequeModel.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalCheques: { $sum: 1 },
          totalAmount: { $sum: "$chequeAmount" },
          averageAmount: { $avg: "$chequeAmount" },
          pendingCount: {
            $sum: { $cond: [{ $eq: ["$chequeStatus", "pending"] }, 1, 0] },
          },
          pendingAmount: {
            $sum: {
              $cond: [
                { $eq: ["$chequeStatus", "pending"] },
                "$chequeAmount",
                0,
              ],
            },
          },
          clearedCount: {
            $sum: { $cond: [{ $eq: ["$chequeStatus", "cleared"] }, 1, 0] },
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
          bouncedCount: {
            $sum: { $cond: [{ $eq: ["$chequeStatus", "bounced"] }, 1, 0] },
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
          cancelledCount: {
            $sum: { $cond: [{ $eq: ["$chequeStatus", "cancelled"] }, 1, 0] },
          },
          cancelledAmount: {
            $sum: {
              $cond: [
                { $eq: ["$chequeStatus", "cancelled"] },
                "$chequeAmount",
                0,
              ],
            },
          },
          onHoldCount: {
            $sum: { $cond: [{ $eq: ["$chequeStatus", "on_hold"] }, 1, 0] },
          },
          onHoldAmount: {
            $sum: {
              $cond: [
                { $eq: ["$chequeStatus", "on_hold"] },
                "$chequeAmount",
                0,
              ],
            },
          },
        },
      },
    ]);

    // Get monthly breakdown
    const monthlyStats = await chequeModel.aggregate([
      { $match: filter },
      {
        $group: {
          _id: {
            year: { $year: "$chequeDate" },
            month: { $month: "$chequeDate" },
          },
          count: { $sum: 1 },
          amount: { $sum: "$chequeAmount" },
          pending: {
            $sum: { $cond: [{ $eq: ["$chequeStatus", "pending"] }, 1, 0] },
          },
          cleared: {
            $sum: { $cond: [{ $eq: ["$chequeStatus", "cleared"] }, 1, 0] },
          },
          bounced: {
            $sum: { $cond: [{ $eq: ["$chequeStatus", "bounced"] }, 1, 0] },
          },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.status(200).json({
      message: "Cheque statistics retrieved successfully",
      statistics: stats[0] || {
        totalCheques: 0,
        totalAmount: 0,
        averageAmount: 0,
        pendingCount: 0,
        pendingAmount: 0,
        clearedCount: 0,
        clearedAmount: 0,
        bouncedCount: 0,
        bouncedAmount: 0,
        cancelledCount: 0,
        cancelledAmount: 0,
        onHoldCount: 0,
        onHoldAmount: 0,
      },
      monthlyBreakdown: monthlyStats,
      filters: { startDate, endDate, customer },
    });
  } catch (error) {
    console.error("Error getting cheque statistics:", error);
    next(error);
  }
};

// Get cheques for specific customer
export const getCustomerCheques = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const {
      chequeStatus,
      startDate,
      endDate,
      minAmount,
      maxAmount,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // Verify customer exists
    const customerExists = await Customer.findById(customerId);
    if (!customerExists) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Build filter object
    const filter = { customer: customerId };

    if (chequeStatus) {
      filter.chequeStatus = chequeStatus;
    }

    if (startDate || endDate) {
      filter.chequeDate = {};
      if (startDate) {
        filter.chequeDate.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.chequeDate.$lte = new Date(endDate);
      }
    }

    if (minAmount || maxAmount) {
      filter.chequeAmount = {};
      if (minAmount) {
        filter.chequeAmount.$gte = parseFloat(minAmount);
      }
      if (maxAmount) {
        filter.chequeAmount.$lte = parseFloat(maxAmount);
      }
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortObj = {};
    sortObj[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Get customer's cheques with population
    const cheques = await chequeModel
      .find(filter)
      .populate("createdBy", "name")
      .populate("updatedBy", "name")
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Convert cheque images to full URLs
    const chequesWithImages = cheques.map((cheque) => ({
      ...cheque,
      chequeImage: cheque.chequeImage
        ? localStorageService.getFullUrl(cheque.chequeImage)
        : null,
    }));

    // Get total count for pagination
    const totalCount = await chequeModel.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / parseInt(limit));

    // Get customer's cheque statistics
    const statistics = await chequeModel.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$chequeAmount" },
          averageAmount: { $avg: "$chequeAmount" },
          totalCheques: { $sum: 1 },
          pendingAmount: {
            $sum: {
              $cond: [
                { $eq: ["$chequeStatus", "pending"] },
                "$chequeAmount",
                0,
              ],
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
          bouncedAmount: {
            $sum: {
              $cond: [
                { $eq: ["$chequeStatus", "bounced"] },
                "$chequeAmount",
                0,
              ],
            },
          },
          pendingCount: {
            $sum: { $cond: [{ $eq: ["$chequeStatus", "pending"] }, 1, 0] },
          },
          clearedCount: {
            $sum: { $cond: [{ $eq: ["$chequeStatus", "cleared"] }, 1, 0] },
          },
          bouncedCount: {
            $sum: { $cond: [{ $eq: ["$chequeStatus", "bounced"] }, 1, 0] },
          },
          onHoldCount: {
            $sum: { $cond: [{ $eq: ["$chequeStatus", "on_hold"] }, 1, 0] },
          },
          cancelledCount: {
            $sum: { $cond: [{ $eq: ["$chequeStatus", "cancelled"] }, 1, 0] },
          },
        },
      },
    ]);

    // Get monthly breakdown for the customer
    const monthlyBreakdown = await chequeModel.aggregate([
      { $match: filter },
      {
        $group: {
          _id: {
            year: { $year: "$chequeDate" },
            month: { $month: "$chequeDate" },
          },
          count: { $sum: 1 },
          totalAmount: { $sum: "$chequeAmount" },
          pendingAmount: {
            $sum: {
              $cond: [
                { $eq: ["$chequeStatus", "pending"] },
                "$chequeAmount",
                0,
              ],
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
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.status(200).json({
      message: "Customer cheques retrieved successfully",
      customerInfo: {
        name: customerExists.name,
        phone: customerExists.phone,
        email: customerExists.email,
      },
      cheques: chequesWithImages,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalCount,
        limit: parseInt(limit),
        hasNext: parseInt(page) < totalPages,
        hasPrev: parseInt(page) > 1,
      },
      statistics: statistics[0] || {
        totalAmount: 0,
        averageAmount: 0,
        totalCheques: 0,
        pendingAmount: 0,
        clearedAmount: 0,
        bouncedAmount: 0,
        pendingCount: 0,
        clearedCount: 0,
        bouncedCount: 0,
        onHoldCount: 0,
        cancelledCount: 0,
      },
      monthlyBreakdown,
      filters: {
        chequeStatus,
        startDate,
        endDate,
        minAmount,
        maxAmount,
        sortBy,
        sortOrder,
      },
    });
  } catch (error) {
    console.error("Error getting customer cheques:", error);
    next(error);
  }
};
