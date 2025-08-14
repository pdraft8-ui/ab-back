import ReportsService from "./Reports.service.js";
import logger from "../../utils/logService.js";
// 1. Get cheque report
export const getChequeReport = async (req, res, next) => {
    try {
        const filters = {
            startDate: req.query.startDate,
            endDate: req.query.endDate,
            status: req.query.status,
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
            sortBy: req.query.sortBy || "createdAt",
            sortOrder: req.query.sortOrder || "desc",
        };
        const report = await ReportsService.getChequeReport(filters);
        res.status(200).json({
            success: true,
            message: "Cheque report retrieved successfully",
            data: report,
        });
    }
    catch (error) {
        logger.error("Error getting cheque report:", error);
        next(error);
    }
};
// 2. Get due amounts report
export const getDueAmountsReport = async (req, res, next) => {
    try {
        const filters = {
            startDate: req.query.startDate,
            endDate: req.query.endDate,
            status: req.query.status,
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
            sortBy: req.query.sortBy || "balanceDue",
            sortOrder: req.query.sortOrder || "desc",
        };
        const report = await ReportsService.getDueAmountsReport(filters);
        res.status(200).json({
            success: true,
            message: "Due amounts report retrieved successfully",
            data: report,
        });
    }
    catch (error) {
        logger.error("Error getting due amounts report:", error);
        next(error);
    }
};
// 3. Get agent customers report
export const getAgentCustomersReport = async (req, res, next) => {
    try {
        const filters = {
            agentId: req.query.agentId,
            startDate: req.query.startDate,
            endDate: req.query.endDate,
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
            sortBy: req.query.sortBy || "createdAt",
            sortOrder: req.query.sortOrder || "desc",
        };
        const report = await ReportsService.getAgentCustomersReport(filters);
        res.status(200).json({
            success: true,
            message: "Agent customers report retrieved successfully",
            data: report,
        });
    }
    catch (error) {
        logger.error("Error getting agent customers report:", error);
        next(error);
    }
};
// 4. Get agent insurances report
export const getAgentInsurancesReport = async (req, res, next) => {
    try {
        const filters = {
            agentId: req.query.agentId,
            insuranceType: req.query.insuranceType,
            startDate: req.query.startDate,
            endDate: req.query.endDate,
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
            sortBy: req.query.sortBy || "createdAt",
            sortOrder: req.query.sortOrder || "desc",
        };
        const report = await ReportsService.getAgentInsurancesReport(filters);
        res.status(200).json({
            success: true,
            message: "Agent insurances report retrieved successfully",
            data: report,
        });
    }
    catch (error) {
        logger.error("Error getting agent insurances report:", error);
        next(error);
    }
};
// 5. Get expired insurance report
export const getExpiredInsuranceReport = async (req, res, next) => {
    try {
        const filters = {
            daysThreshold: parseInt(req.query.daysThreshold) || 3,
            includeExpired: req.query.includeExpired === "true",
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
            sortBy: req.query.sortBy || "expiryDate",
            sortOrder: req.query.sortOrder || "asc",
        };
        const report = await ReportsService.getExpiredInsuranceReport(filters);
        res.status(200).json({
            success: true,
            message: "Expired insurance report retrieved successfully",
            data: report,
        });
    }
    catch (error) {
        logger.error("Error getting expired insurance report:", error);
        next(error);
    }
};
// Clear reports cache
export const clearReportsCache = async (req, res, next) => {
    try {
        ReportsService.clearCache();
        res.status(200).json({
            success: true,
            message: "Reports cache cleared successfully",
        });
    }
    catch (error) {
        logger.error("Error clearing reports cache:", error);
        next(error);
    }
};
//# sourceMappingURL=Reports.controller.js.map