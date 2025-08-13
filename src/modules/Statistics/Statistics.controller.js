import StatisticsService from "./Statistics.service.js";
import logger from "../../utils/logService.js";

// Get dashboard statistics
export const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await StatisticsService.getDashboardStats();

    res.status(200).json({
      success: true,
      message: "Dashboard statistics retrieved successfully",
      data: stats,
    });
  } catch (error) {
    logger.error("Error getting dashboard stats:", error);
    next(error);
  }
};

// Get specific statistics
export const getTotalCustomers = async (req, res, next) => {
  try {
    const stats = await StatisticsService.getTotalCustomers();

    res.status(200).json({
      success: true,
      message: "Total customers statistics retrieved successfully",
      data: stats,
    });
  } catch (error) {
    logger.error("Error getting total customers stats:", error);
    next(error);
  }
};

export const getTotalIncome = async (req, res, next) => {
  try {
    const stats = await StatisticsService.getTotalIncome();

    res.status(200).json({
      success: true,
      message: "Total income statistics retrieved successfully",
      data: stats,
    });
  } catch (error) {
    logger.error("Error getting total income stats:", error);
    next(error);
  }
};

export const getTotalExpenses = async (req, res, next) => {
  try {
    const stats = await StatisticsService.getTotalExpenses();

    res.status(200).json({
      success: true,
      message: "Total expenses statistics retrieved successfully",
      data: stats,
    });
  } catch (error) {
    logger.error("Error getting total expenses stats:", error);
    next(error);
  }
};

export const getDueAmount = async (req, res, next) => {
  try {
    const stats = await StatisticsService.getDueAmount();

    res.status(200).json({
      success: true,
      message: "Due amount statistics retrieved successfully",
      data: stats,
    });
  } catch (error) {
    logger.error("Error getting due amount stats:", error);
    next(error);
  }
};

export const getPaymentMethodStats = async (req, res, next) => {
  try {
    const stats = await StatisticsService.getPaymentMethodStats();

    res.status(200).json({
      success: true,
      message: "Payment method statistics retrieved successfully",
      data: stats,
    });
  } catch (error) {
    logger.error("Error getting payment method stats:", error);
    next(error);
  }
};

export const getTotalProfit = async (req, res, next) => {
  try {
    const stats = await StatisticsService.getTotalProfit();

    res.status(200).json({
      success: true,
      message: "Total profit statistics retrieved successfully",
      data: stats,
    });
  } catch (error) {
    logger.error("Error getting total profit stats:", error);
    next(error);
  }
};

// Clear statistics cache
export const clearStatsCache = async (req, res, next) => {
  try {
    StatisticsService.clearCache();

    res.status(200).json({
      success: true,
      message: "Statistics cache cleared successfully",
    });
  } catch (error) {
    logger.error("Error clearing statistics cache:", error);
    next(error);
  }
};

// Get payment overview
export const getPaymentOverview = async (req, res, next) => {
  try {
    const { period = "monthly" } = req.query;

    // Validate period parameter
    if (!["monthly", "yearly"].includes(period)) {
      return res.status(400).json({
        success: false,
        message: "Invalid period. Must be 'monthly' or 'yearly'",
      });
    }

    const overview = await StatisticsService.getPaymentOverview(period);

    res.status(200).json({
      success: true,
      message: `Payment overview retrieved successfully for ${period} period`,
      data: overview,
    });
  } catch (error) {
    logger.error("Error getting payment overview:", error);
    next(error);
  }
};
