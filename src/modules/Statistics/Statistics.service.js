import Customer from "../../../DB/models/Customer.model.js";
import Payment from "../../../DB/models/Payment.model.js";
import Invoice from "../../../DB/models/Invoice.model.js";
import logger from "../../utils/logService.js";

class StatisticsService {
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

  // Calculate total customers
  async getTotalCustomers() {
    try {
      const totalCustomers = await Customer.countDocuments();
      const previousPeriod = await Customer.countDocuments({
        createdAt: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      });

      const percentageChange =
        previousPeriod > 0
          ? ((totalCustomers - previousPeriod) / previousPeriod) * 100
          : 0;

      return {
        value: totalCustomers,
        percentageChange: 0,
        trend: "neutral",
      };
    } catch (error) {
      logger.error("Error calculating total customers:", error);
      return { value: 0, percentageChange: 0, trend: "neutral" };
    }
  }

  // Calculate total income (completed payments)
  async getTotalIncome() {
    try {
      const result = await Payment.aggregate([
        { $match: { status: "Completed" } },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$paymentAmount" },
          },
        },
      ]);

      const totalIncome = result[0]?.totalAmount || 0;

      // Calculate previous period (last 30 days vs previous 30 days)
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);

      const currentPeriod = await Payment.aggregate([
        {
          $match: {
            status: "Completed",
            paymentDate: { $gte: thirtyDaysAgo },
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$paymentAmount" },
          },
        },
      ]);

      const previousPeriod = await Payment.aggregate([
        {
          $match: {
            status: "Completed",
            paymentDate: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo },
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$paymentAmount" },
          },
        },
      ]);

      const currentAmount = currentPeriod[0]?.totalAmount || 0;
      const previousAmount = previousPeriod[0]?.totalAmount || 0;

      const percentageChange =
        previousAmount > 0
          ? ((currentAmount - previousAmount) / previousAmount) * 100
          : 0;

      return {
        value: totalIncome,
        percentageChange: 0,
        trend: "neutral",
      };
    } catch (error) {
      logger.error("Error calculating total income:", error);
      return { value: 0, percentageChange: 0, trend: "neutral" };
    }
  }

  // Calculate total expenses (this would be based on business logic)
  async getTotalExpenses() {
    try {
      // For now, we'll calculate expenses as a percentage of income
      // In a real application, you'd have an expenses collection
      const incomeResult = await Payment.aggregate([
        { $match: { status: "Completed" } },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$paymentAmount" },
          },
        },
      ]);

      const totalIncome = incomeResult[0]?.totalAmount || 0;
      const totalExpenses = totalIncome * 0.76; // Assuming 76% of income goes to expenses

      const percentageChange = 0.43; // Placeholder for expense trend

      return {
        value: totalExpenses,
        percentageChange: 0,
        trend: "neutral",
      };
    } catch (error) {
      logger.error("Error calculating total expenses:", error);
      return { value: 0, percentageChange: 0, trend: "neutral" };
    }
  }

  // Calculate due amount (unpaid invoices)
  async getDueAmount() {
    try {
      const result = await Invoice.aggregate([
        {
          $match: { status: { $in: ["Pending", "Partially Paid", "Overdue"] } },
        },
        {
          $group: {
            _id: null,
            totalBalance: { $sum: "$balanceDue" },
          },
        },
      ]);

      const dueAmount = result[0]?.totalBalance || 0;

      // Calculate percentage change based on previous period
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);

      const currentPeriod = await Invoice.aggregate([
        {
          $match: {
            status: { $in: ["Pending", "Partially Paid", "Overdue"] },
            createdAt: { $gte: thirtyDaysAgo },
          },
        },
        {
          $group: {
            _id: null,
            totalBalance: { $sum: "$balanceDue" },
          },
        },
      ]);

      const previousPeriod = await Invoice.aggregate([
        {
          $match: {
            status: { $in: ["Pending", "Partially Paid", "Overdue"] },
            createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo },
          },
        },
        {
          $group: {
            _id: null,
            totalBalance: { $sum: "$balanceDue" },
          },
        },
      ]);

      const currentAmount = currentPeriod[0]?.totalBalance || 0;
      const previousAmount = previousPeriod[0]?.totalBalance || 0;

      const percentageChange =
        previousAmount > 0
          ? ((currentAmount - previousAmount) / previousAmount) * 100
          : 0;

      return {
        value: dueAmount,
        percentageChange: 0,
        trend: "neutral",
      };
    } catch (error) {
      logger.error("Error calculating due amount:", error);
      return { value: 0, percentageChange: 0, trend: "neutral" };
    }
  }

  // Calculate payment method breakdowns
  async getPaymentMethodStats() {
    try {
      const result = await Payment.aggregate([
        { $match: { status: "Completed" } },
        {
          $group: {
            _id: "$paymentMethod",
            count: { $sum: 1 },
            totalAmount: { $sum: "$paymentAmount" },
          },
        },
      ]);

      const paymentMethods = {};
      let totalAmount = 0;

      result.forEach((item) => {
        paymentMethods[item._id] = {
          count: item.count,
          amount: item.totalAmount,
        };
        totalAmount += item.totalAmount;
      });

      // Calculate percentages and format data
      const visa = paymentMethods["Credit Card"] || { count: 0, amount: 0 };
      const cash = paymentMethods["Cash"] || { count: 0, amount: 0 };
      const bank = paymentMethods["Bank Transfer"] || { count: 0, amount: 0 };

      // Calculate percentage changes (placeholder logic)
      const percentageChange = 18.0; // Placeholder

      return {
        visa: {
          value: visa.amount,
          percentageChange: 0,
          trend: "neutral",
        },
        cash: {
          value: cash.amount,
          percentageChange: 0,
          trend: "neutral",
        },
        bank: {
          value: bank.amount,
          percentageChange: 0,
          trend: "neutral",
        },
      };
    } catch (error) {
      logger.error("Error calculating payment method stats:", error);
      return {
        visa: { value: 0, percentageChange: 0, trend: "neutral" },
        cash: { value: 0, percentageChange: 0, trend: "neutral" },
        bank: { value: 0, percentageChange: 0, trend: "neutral" },
      };
    }
  }

  // Calculate total profit (income - expenses)
  async getTotalProfit() {
    try {
      const income = await this.getTotalIncome();
      const expenses = await this.getTotalExpenses();

      const profit = income.value - expenses.value;
      const percentageChange = 0.43; // Placeholder

      return {
        value: profit,
        percentageChange: 0,
        trend: "neutral",
      };
    } catch (error) {
      logger.error("Error calculating total profit:", error);
      return { value: 0, percentageChange: 0, trend: "neutral" };
    }
  }

  // Get all dashboard statistics
  async getDashboardStats() {
    try {
      const [
        totalCustomers,
        totalIncome,
        totalExpenses,
        dueAmount,
        paymentMethods,
        totalProfit,
      ] = await Promise.all([
        this.getCachedData("totalCustomers", () => this.getTotalCustomers()),
        this.getCachedData("totalIncome", () => this.getTotalIncome()),
        this.getCachedData("totalExpenses", () => this.getTotalExpenses()),
        this.getCachedData("dueAmount", () => this.getDueAmount()),
        this.getCachedData("paymentMethods", () =>
          this.getPaymentMethodStats()
        ),
        this.getCachedData("totalProfit", () => this.getTotalProfit()),
      ]);

      return {
        totalCustomers,
        totalIncome,
        totalExpenses,
        dueAmount,
        totalVisa: paymentMethods.visa,
        totalCash: paymentMethods.cash,
        totalBank: paymentMethods.bank,
        totalProfit,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      logger.error("Error getting dashboard stats:", error);
      throw error;
    }
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
    logger.info("Statistics cache cleared");
  }

  // Get payment overview with monthly and annual data
  async getPaymentOverview(period = "monthly") {
    try {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();

      let dateFilter = {};
      let groupBy = {};

      if (period === "monthly") {
        // Get data for current year
        dateFilter = {
          $gte: new Date(currentYear, 0, 1), // January 1st of current year
          $lte: new Date(currentYear, 11, 31, 23, 59, 59), // December 31st of current year
        };
        groupBy = {
          year: { $year: "$paymentDate" },
          month: { $month: "$paymentDate" },
        };
      } else if (period === "yearly") {
        // Get data for last 5 years
        dateFilter = {
          $gte: new Date(currentYear - 5, 0, 1),
          $lte: new Date(currentYear, 11, 31, 23, 59, 59),
        };
        groupBy = {
          year: { $year: "$paymentDate" },
        };
      }

      // Get payment data
      const paymentData = await Payment.aggregate([
        {
          $match: {
            status: "Completed",
            paymentDate: dateFilter,
          },
        },
        {
          $group: {
            _id: groupBy,
            totalAmount: { $sum: "$paymentAmount" },
            count: { $sum: 1 },
          },
        },
        {
          $sort:
            period === "monthly"
              ? { "_id.year": 1, "_id.month": 1 }
              : { "_id.year": 1 },
        },
      ]);

      // Get invoice due amount data
      const invoiceData = await Invoice.aggregate([
        {
          $match: {
            status: { $in: ["Pending", "Partially Paid", "Overdue"] },
            invoiceDate: dateFilter,
          },
        },
        {
          $group: {
            _id: groupBy,
            totalBalance: { $sum: "$balanceDue" },
            count: { $sum: 1 },
          },
        },
        {
          $sort:
            period === "monthly"
              ? { "_id.year": 1, "_id.month": 1 }
              : { "_id.year": 1 },
        },
      ]);

      // Format the data
      const formattedData = [];
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      if (period === "monthly") {
        // Create data for all months of current year
        for (let month = 0; month < 12; month++) {
          const paymentRecord = paymentData.find(
            (p) => p._id.year === currentYear && p._id.month === month + 1
          );
          const invoiceRecord = invoiceData.find(
            (i) => i._id.year === currentYear && i._id.month === month + 1
          );

          formattedData.push({
            period: monthNames[month],
            year: currentYear,
            month: month + 1,
            amountReceived: paymentRecord?.totalAmount || 0,
            amountDue: invoiceRecord?.totalBalance || 0,
            paymentCount: paymentRecord?.count || 0,
            invoiceCount: invoiceRecord?.count || 0,
          });
        }
      } else {
        // Create data for years
        for (let year = currentYear - 5; year <= currentYear; year++) {
          const paymentRecord = paymentData.find((p) => p._id.year === year);
          const invoiceRecord = invoiceData.find((i) => i._id.year === year);

          formattedData.push({
            period: year.toString(),
            year: year,
            amountReceived: paymentRecord?.totalAmount || 0,
            amountDue: invoiceRecord?.totalBalance || 0,
            paymentCount: paymentRecord?.count || 0,
            invoiceCount: invoiceRecord?.count || 0,
          });
        }
      }

      // Calculate totals
      const totalAmountReceived = formattedData.reduce(
        (sum, item) => sum + item.amountReceived,
        0
      );
      const totalAmountDue = formattedData.reduce(
        (sum, item) => sum + item.amountDue,
        0
      );

      return {
        period: period,
        data: formattedData,
        summary: {
          totalAmountReceived: totalAmountReceived,
          totalAmountDue: totalAmountDue,
          totalPayments: formattedData.reduce(
            (sum, item) => sum + item.paymentCount,
            0
          ),
          totalInvoices: formattedData.reduce(
            (sum, item) => sum + item.invoiceCount,
            0
          ),
        },
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      logger.error("Error getting payment overview:", error);
      throw error;
    }
  }
}

export default new StatisticsService();
