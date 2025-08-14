import { CreateCustomerUseCase } from "../../core/usecases/CreateCustomerUseCase.js";
import { GetAllCustomersUseCase } from "../../core/usecases/GetAllCustomersUseCase.js";
import { UpdateCustomerUseCase } from "../../core/usecases/UpdateCustomerUseCase.js";
import { DeleteCustomerUseCase } from "../../core/usecases/DeleteCustomerUseCase.js";
import { AddVehicleToCustomerUseCase } from "../../core/usecases/AddVehicleToCustomerUseCase.js";
import { GetCustomerStatsUseCase } from "../../core/usecases/GetCustomerStatsUseCase.js";
export class CustomerController {
    constructor(createCustomerUseCase, getAllCustomersUseCase, updateCustomerUseCase, deleteCustomerUseCase, addVehicleToCustomerUseCase, getCustomerStatsUseCase, customerRepository) {
        this.createCustomerUseCase = createCustomerUseCase;
        this.getAllCustomersUseCase = getAllCustomersUseCase;
        this.updateCustomerUseCase = updateCustomerUseCase;
        this.deleteCustomerUseCase = deleteCustomerUseCase;
        this.addVehicleToCustomerUseCase = addVehicleToCustomerUseCase;
        this.getCustomerStatsUseCase = getCustomerStatsUseCase;
        this.customerRepository = customerRepository;
    }
    async createCustomer(req, res, next) {
        try {
            const customerData = req.body;
            const userId = req.user.id;
            const userName = req.user.first_name + " " + req.user.last_name;
            const customer = await this.createCustomerUseCase.execute(customerData, userId, userName);
            res.status(201).json({
                success: true,
                message: "Customer created successfully",
                data: customer,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getAllCustomers(req, res, next) {
        try {
            const filters = {
                page: parseInt(req.query.page) || 1,
                limit: parseInt(req.query.limit) || 10,
                search: req.query.search,
                city: req.query.city,
                agentId: req.query.agentId,
                sortBy: req.query.sortBy || "createdAt",
                sortOrder: req.query.sortOrder || "desc",
            };
            const result = await this.getAllCustomersUseCase.execute(filters);
            res.status(200).json({
                success: true,
                message: "Customers retrieved successfully",
                data: result.customers,
                pagination: result.pagination,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getCustomerById(req, res, next) {
        try {
            const { id } = req.params;
            const customer = await this.customerRepository.getCustomerById(id);
            if (!customer) {
                return res.status(404).json({
                    success: false,
                    message: "Customer not found",
                });
            }
            res.status(200).json({
                success: true,
                message: "Customer retrieved successfully",
                data: customer,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async updateCustomer(req, res, next) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const userId = req.user.id;
            const userName = req.user.first_name + " " + req.user.last_name;
            const customer = await this.updateCustomerUseCase.execute(id, updateData, userId, userName);
            res.status(200).json({
                success: true,
                message: "Customer updated successfully",
                data: customer,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteCustomer(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            const userName = req.user.first_name + " " + req.user.last_name;
            const result = await this.deleteCustomerUseCase.execute(id, userId, userName);
            res.status(200).json({
                success: true,
                message: result.message,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async addVehicleToCustomer(req, res, next) {
        try {
            const { customerId } = req.params;
            const vehicleData = req.body;
            const userId = req.user.id;
            const userName = req.user.first_name + " " + req.user.last_name;
            const customer = await this.addVehicleToCustomerUseCase.execute(customerId, vehicleData, userId, userName);
            res.status(200).json({
                success: true,
                message: "Vehicle added to customer successfully",
                data: customer,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async removeVehicleFromCustomer(req, res, next) {
        try {
            const { customerId, vehicleId } = req.params;
            const customer = await this.customerRepository.removeVehicleFromCustomer(customerId, vehicleId);
            res.status(200).json({
                success: true,
                message: "Vehicle removed from customer successfully",
                data: customer,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async updateVehicle(req, res, next) {
        try {
            const { customerId, vehicleId } = req.params;
            const updateData = req.body;
            const customer = await this.customerRepository.updateVehicle(customerId, vehicleId, updateData);
            res.status(200).json({
                success: true,
                message: "Vehicle updated successfully",
                data: customer,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getCustomerVehicles(req, res, next) {
        try {
            const { id } = req.params;
            const vehicles = await this.customerRepository.getCustomerVehicles(id);
            res.status(200).json({
                success: true,
                message: "Customer vehicles retrieved successfully",
                data: vehicles,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async addInsuranceToVehicle(req, res, next) {
        try {
            const { customerId, vehicleId } = req.params;
            const insuranceData = req.body;
            const customer = await this.customerRepository.addInsuranceToVehicle(customerId, vehicleId, insuranceData);
            res.status(200).json({
                success: true,
                message: "Insurance added to vehicle successfully",
                data: customer,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async removeInsuranceFromVehicle(req, res, next) {
        try {
            const { customerId, vehicleId, insuranceId } = req.params;
            const customer = await this.customerRepository.removeInsuranceFromVehicle(customerId, vehicleId, insuranceId);
            res.status(200).json({
                success: true,
                message: "Insurance removed from vehicle successfully",
                data: customer,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getVehicleInsurances(req, res, next) {
        try {
            const { customerId, vehicleId } = req.params;
            const insurances = await this.customerRepository.getVehicleInsurances(customerId, vehicleId);
            res.status(200).json({
                success: true,
                message: "Vehicle insurances retrieved successfully",
                data: insurances,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getAllVehicleInsurances(req, res, next) {
        try {
            const insurances = await this.customerRepository.getAllVehicleInsurances();
            res.status(200).json({
                success: true,
                message: "All vehicle insurances retrieved successfully",
                data: insurances,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getAllInsurancesData(req, res, next) {
        try {
            const insurancesData = await this.customerRepository.getAllInsurancesData();
            res.status(200).json({
                success: true,
                message: "All insurances data retrieved successfully",
                data: insurancesData,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async addCustomerInsurance(req, res, next) {
        try {
            const { customerId } = req.params;
            const insuranceData = req.body;
            const customer = await this.customerRepository.addCustomerInsurance(customerId, insuranceData);
            res.status(200).json({
                success: true,
                message: "Customer insurance added successfully",
                data: customer,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getCustomerInsurances(req, res, next) {
        try {
            const { customerId } = req.params;
            const insurances = await this.customerRepository.getCustomerInsurances(customerId);
            res.status(200).json({
                success: true,
                message: "Customer insurances retrieved successfully",
                data: insurances,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getAllCustomerInsurances(req, res, next) {
        try {
            const { customerId } = req.params;
            const insurances = await this.customerRepository.getAllCustomerInsurances(customerId);
            res.status(200).json({
                success: true,
                message: "All customer insurances retrieved successfully",
                data: insurances,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getInsuranceById(req, res, next) {
        try {
            const { insuranceId } = req.params;
            const insurance = await this.customerRepository.getInsuranceById(insuranceId);
            if (!insurance) {
                return res.status(404).json({
                    success: false,
                    message: "Insurance not found",
                });
            }
            res.status(200).json({
                success: true,
                message: "Insurance retrieved successfully",
                data: insurance,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async updateInsuranceById(req, res, next) {
        try {
            const { insuranceId } = req.params;
            const updateData = req.body;
            const customer = await this.customerRepository.updateCustomerInsurance(null, insuranceId, updateData);
            res.status(200).json({
                success: true,
                message: "Insurance updated successfully",
                data: customer,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteInsuranceById(req, res, next) {
        try {
            const { insuranceId } = req.params;
            const customer = await this.customerRepository.deleteInsuranceById(insuranceId);
            res.status(200).json({
                success: true,
                message: "Insurance deleted successfully",
                data: customer,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async addCheckToInsurance(req, res, next) {
        try {
            const { customerId, vehicleId, insuranceId } = req.params;
            const checkData = req.body;
            const customer = await this.customerRepository.addCheckToInsurance(customerId, vehicleId, insuranceId, checkData);
            res.status(200).json({
                success: true,
                message: "Check added to insurance successfully",
                data: customer,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async removeCheckFromInsurance(req, res, next) {
        try {
            const { customerId, vehicleId, checkId } = req.params;
            const customer = await this.customerRepository.removeCheckFromInsurance(customerId, vehicleId, checkId);
            res.status(200).json({
                success: true,
                message: "Check removed from insurance successfully",
                data: customer,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getInsuranceChecks(req, res, next) {
        try {
            const { customerId, vehicleId, insuranceId } = req.params;
            const checks = await this.customerRepository.getInsuranceChecks(customerId, vehicleId, insuranceId);
            res.status(200).json({
                success: true,
                message: "Insurance checks retrieved successfully",
                data: checks,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getAllChecksForVehicle(req, res, next) {
        try {
            const { customerId, vehicleId } = req.params;
            const checks = await this.customerRepository.getAllChecksForVehicle(customerId, vehicleId);
            res.status(200).json({
                success: true,
                message: "All checks for vehicle retrieved successfully",
                data: checks,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getCustomerCount(req, res, next) {
        try {
            const count = await this.customerRepository.getCustomerCount();
            res.status(200).json({
                success: true,
                message: "Customer count retrieved successfully",
                data: { count },
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getCustomerByMonth(req, res, next) {
        try {
            const customersByMonth = await this.customerRepository.getCustomersByMonth();
            res.status(200).json({
                success: true,
                message: "Customers by month retrieved successfully",
                data: customersByMonth,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getCustomerStats(req, res, next) {
        try {
            const filters = {
                startDate: req.query.startDate,
                endDate: req.query.endDate,
            };
            const stats = await this.getCustomerStatsUseCase.execute(filters);
            res.status(200).json({
                success: true,
                message: "Customer statistics retrieved successfully",
                data: stats,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
//# sourceMappingURL=CustomerController.js.map