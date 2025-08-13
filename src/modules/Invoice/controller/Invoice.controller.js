import Invoice from "../../../../DB/models/Invoice.model.js";
import Customer from "../../../../DB/models/Customer.model.js";
import Payment from "../../../../DB/models/Payment.model.js";
import AuditLogModel from "../../../../DB/models/AuditLog.model.js";
import {
  createNotification,
  sendNotificationLogic,
} from "../../notification/controller/notification.controller.js";

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
      oldValue,
      newValue,
      userName,
    });
  } catch (error) {
    console.error("Failed to create audit log:", error);
  }
};

// Create invoice automatically when insurance is added
export const createInvoice = async (req, res, next) => {
  try {
    const {
      customerId,
      insurancePolicyId,
      vehicleId,
      totalAmount,
      description,
      notes,
      dueDate,
    } = req.body;

    // Validate customer exists
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Check if invoice already exists for this insurance policy
    const existingInvoice = await Invoice.findOne({
      insurancePolicy: insurancePolicyId,
    });
    if (existingInvoice) {
      return res
        .status(409)
        .json({ message: "Invoice already exists for this insurance policy" });
    }

    const newInvoice = new Invoice({
      customer: customerId,
      insurancePolicy: insurancePolicyId,
      vehicle: vehicleId,
      totalAmount,
      balanceDue: totalAmount,
      description,
      notes,
      dueDate: dueDate ? new Date(dueDate) : null,
      createdBy: req.user._id,
    });

    const savedInvoice = await newInvoice.save();

    // Send notification
    const message = `Invoice ${savedInvoice.invoiceNumber} created for customer ${customer.first_name} ${customer.last_name}`;
    await sendNotificationLogic({
      senderId: req.user._id,
      message,
    });

    // Log audit
    await logAudit({
      userId: req.user._id,
      action: `Create Invoice`,
      userName: req.user.name || "Unknown User",
      entity: "Invoice",
      entityId: savedInvoice._id,
      oldValue: null,
      newValue: savedInvoice.toObject(),
    });

    return res.status(201).json({
      message: "Invoice created successfully",
      invoice: savedInvoice,
    });
  } catch (error) {
    console.error("Error creating invoice:", error);
    next(error);
  }
};

// Get all invoices with pagination and filters
export const getAllInvoices = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      customerId,
      startDate,
      endDate,
      search,
    } = req.query;

    const filter = {};

    if (status) filter.status = status;
    if (customerId) filter.customer = customerId;
    if (startDate || endDate) {
      filter.invoiceDate = {};
      if (startDate) filter.invoiceDate.$gte = new Date(startDate);
      if (endDate) filter.invoiceDate.$lte = new Date(endDate);
    }
    if (search) {
      filter.$or = [
        { invoiceNumber: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const invoices = await Invoice.find(filter)
      .populate("customer", "first_name last_name phone_number email")
      .populate("vehicle", "plateNumber model type insurance")
      .populate("createdBy", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Add insurance policy details to each invoice
    const invoicesWithInsurance = invoices.map((invoice) => {
      const invoiceObj = invoice.toObject();

      // Find the relevant insurance from the vehicle's insurance array
      // Since insurancePolicy field points to the vehicle, we need to find the specific insurance
      let insurancePolicy = null;
      if (invoiceObj.vehicle && invoiceObj.vehicle.insurance) {
        // For now, we'll return the most recent insurance (last in the array)
        // In a more complex scenario, you might want to match by specific criteria
        insurancePolicy =
          invoiceObj.vehicle.insurance[invoiceObj.vehicle.insurance.length - 1];
      }

      // Calculate paid percentage
      const paidAmount = invoiceObj.totalAmount - invoiceObj.balanceDue;
      const paidPercentage =
        invoiceObj.totalAmount > 0
          ? Math.round((paidAmount / invoiceObj.totalAmount) * 100)
          : 0;

      return {
        ...invoiceObj,
        insurancePolicy,
        paidAmount,
        paidPercentage,
      };
    });

    const total = await Invoice.countDocuments(filter);

    return res.status(200).json({
      message: "Invoices retrieved successfully",
      invoices: invoicesWithInsurance,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Error getting invoices:", error);
    next(error);
  }
};

// Get invoice by ID with payment history
export const getInvoiceById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const invoice = await Invoice.findById(id)
      .populate("customer", "first_name last_name phone_number email city")
      .populate("vehicle", "plateNumber model type color insurance")
      .populate("createdBy", "name")
      .populate("updatedBy", "name");

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    // Get payment history for this invoice
    const payments = await Payment.find({ invoice: id })
      .populate("createdBy", "name")
      .sort({ paymentDate: -1 });

    // Add insurance policy details to the invoice
    const invoiceObj = invoice.toObject();
    let insurancePolicy = null;

    if (invoiceObj.vehicle && invoiceObj.vehicle.insurance) {
      // For now, we'll return the most recent insurance (last in the array)
      // In a more complex scenario, you might want to match by specific criteria
      insurancePolicy =
        invoiceObj.vehicle.insurance[invoiceObj.vehicle.insurance.length - 1];
    }

    // Calculate paid percentage
    const paidAmount = invoiceObj.totalAmount - invoiceObj.balanceDue;
    const paidPercentage =
      invoiceObj.totalAmount > 0
        ? Math.round((paidAmount / invoiceObj.totalAmount) * 100)
        : 0;

    const invoiceWithInsurance = {
      ...invoiceObj,
      insurancePolicy,
      paidAmount,
      paidPercentage,
    };

    return res.status(200).json({
      message: "Invoice retrieved successfully",
      invoice: invoiceWithInsurance,
      payments,
    });
  } catch (error) {
    console.error("Error getting invoice:", error);
    next(error);
  }
};

// Update invoice
export const updateInvoice = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const invoice = await Invoice.findById(id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    // Store old values for audit
    const oldValues = invoice.toObject();

    // Update the invoice
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      id,
      {
        ...updateData,
        updatedBy: req.user._id,
      },
      { new: true }
    );

    // Update status based on new balance
    updatedInvoice.updateStatus();
    await updatedInvoice.save();

    // Send notification
    const customer = await Customer.findById(updatedInvoice.customer);
    const message = `Invoice ${updatedInvoice.invoiceNumber} updated for customer ${customer.first_name} ${customer.last_name}`;
    await sendNotificationLogic({
      senderId: req.user._id,
      message,
    });

    // Log audit
    await logAudit({
      userId: req.user._id,
      action: `Update Invoice`,
      userName: req.user.name || "Unknown User",
      entity: "Invoice",
      entityId: updatedInvoice._id,
      oldValue: oldValues,
      newValue: updatedInvoice.toObject(),
    });

    return res.status(200).json({
      message: "Invoice updated successfully",
      invoice: updatedInvoice,
    });
  } catch (error) {
    console.error("Error updating invoice:", error);
    next(error);
  }
};

// Delete invoice (soft delete or hard delete based on business rules)
export const deleteInvoice = async (req, res, next) => {
  try {
    const { id } = req.params;

    const invoice = await Invoice.findById(id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    // Check if invoice has payments
    const payments = await Payment.find({ invoice: id });
    if (payments.length > 0) {
      return res.status(400).json({
        message: "Cannot delete invoice with existing payments",
      });
    }

    const deletedInvoice = await Invoice.findByIdAndDelete(id);

    // Send notification
    const customer = await Customer.findById(deletedInvoice.customer);
    const message = `Invoice ${deletedInvoice.invoiceNumber} deleted for customer ${customer.first_name} ${customer.last_name}`;
    await sendNotificationLogic({
      senderId: req.user._id,
      message,
    });

    // Log audit
    await logAudit({
      userId: req.user._id,
      action: `Delete Invoice`,
      userName: req.user.name || "Unknown User",
      entity: "Invoice",
      entityId: deletedInvoice._id,
      oldValue: deletedInvoice.toObject(),
      newValue: null,
    });

    return res.status(200).json({
      message: "Invoice deleted successfully",
      invoice: deletedInvoice,
    });
  } catch (error) {
    console.error("Error deleting invoice:", error);
    next(error);
  }
};

// Get invoices by customer
export const getInvoicesByCustomer = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const invoices = await Invoice.find({ customer: customerId })
      .populate("vehicle", "plateNumber model type insurance")
      .populate("createdBy", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Add insurance policy details to each invoice
    const invoicesWithInsurance = invoices.map((invoice) => {
      const invoiceObj = invoice.toObject();

      let insurancePolicy = null;
      if (invoiceObj.vehicle && invoiceObj.vehicle.insurance) {
        // Return the most recent insurance (last in the array)
        insurancePolicy =
          invoiceObj.vehicle.insurance[invoiceObj.vehicle.insurance.length - 1];
      }

      // Calculate paid percentage
      const paidAmount = invoiceObj.totalAmount - invoiceObj.balanceDue;
      const paidPercentage =
        invoiceObj.totalAmount > 0
          ? Math.round((paidAmount / invoiceObj.totalAmount) * 100)
          : 0;

      return {
        ...invoiceObj,
        insurancePolicy,
        paidAmount,
        paidPercentage,
      };
    });

    const total = await Invoice.countDocuments({ customer: customerId });

    return res.status(200).json({
      message: "Customer invoices retrieved successfully",
      invoices: invoicesWithInsurance,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Error getting customer invoices:", error);
    next(error);
  }
};

// Get invoice statistics
export const getInvoiceStats = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const filter = {};
    if (startDate || endDate) {
      filter.invoiceDate = {};
      if (startDate) filter.invoiceDate.$gte = new Date(startDate);
      if (endDate) filter.invoiceDate.$lte = new Date(endDate);
    }

    const stats = await Invoice.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalInvoices: { $sum: 1 },
          totalAmount: { $sum: "$totalAmount" },
          totalBalance: { $sum: "$balanceDue" },
          paidInvoices: {
            $sum: { $cond: [{ $eq: ["$status", "Paid"] }, 1, 0] },
          },
          pendingInvoices: {
            $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] },
          },
          overdueInvoices: {
            $sum: { $cond: [{ $eq: ["$status", "Overdue"] }, 1, 0] },
          },
        },
      },
    ]);

    const statusBreakdown = await Invoice.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          totalAmount: { $sum: "$totalAmount" },
        },
      },
    ]);

    return res.status(200).json({
      message: "Invoice statistics retrieved successfully",
      stats: stats[0] || {
        totalInvoices: 0,
        totalAmount: 0,
        totalBalance: 0,
        paidInvoices: 0,
        pendingInvoices: 0,
        overdueInvoices: 0,
      },
      statusBreakdown,
    });
  } catch (error) {
    console.error("Error getting invoice stats:", error);
    next(error);
  }
};

// Mark invoice as overdue (cron job or manual)
export const markOverdueInvoices = async (req, res, next) => {
  try {
    const overdueInvoices = await Invoice.find({
      dueDate: { $lt: new Date() },
      status: { $in: ["Pending", "Partially Paid"] },
    });

    const updatePromises = overdueInvoices.map((invoice) => {
      invoice.status = "Overdue";
      return invoice.save();
    });

    await Promise.all(updatePromises);

    return res.status(200).json({
      message: `${overdueInvoices.length} invoices marked as overdue`,
      count: overdueInvoices.length,
    });
  } catch (error) {
    console.error("Error marking overdue invoices:", error);
    next(error);
  }
};
