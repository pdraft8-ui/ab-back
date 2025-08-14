import { Customer } from "../entities/Customer.entity.js";
export class ICustomerRepository {
    // Basic CRUD operations
    async createCustomer(customerData) {
        throw new Error("Method not implemented");
    }
    async getCustomerById(id) {
        throw new Error("Method not implemented");
    }
    async getAllCustomers(filters = {}) {
        throw new Error("Method not implemented");
    }
    async updateCustomer(id, updateData) {
        throw new Error("Method not implemented");
    }
    async deleteCustomer(id) {
        throw new Error("Method not implemented");
    }
    // Customer queries
    async getCustomerByInvoiceId(invoiceId) {
        throw new Error("Method not implemented");
    }
    async getCustomerByIdNumber(idNumber) {
        throw new Error("Method not implemented");
    }
    async getCustomerByPhoneNumber(phoneNumber) {
        throw new Error("Method not implemented");
    }
    async getCustomersByAgent(agentId) {
        throw new Error("Method not implemented");
    }
    async getCustomersByCity(city) {
        throw new Error("Method not implemented");
    }
    async getCustomerCount() {
        throw new Error("Method not implemented");
    }
    async getCustomersByMonth() {
        throw new Error("Method not implemented");
    }
    async getCustomersByDateRange(startDate, endDate) {
        throw new Error("Method not implemented");
    }
    // Vehicle operations
    async addVehicleToCustomer(customerId, vehicleData) {
        throw new Error("Method not implemented");
    }
    async removeVehicleFromCustomer(customerId, vehicleId) {
        throw new Error("Method not implemented");
    }
    async updateVehicle(customerId, vehicleId, updateData) {
        throw new Error("Method not implemented");
    }
    async getCustomerVehicles(customerId) {
        throw new Error("Method not implemented");
    }
    async getVehicleByPlateNumber(plateNumber) {
        throw new Error("Method not implemented");
    }
    // Insurance operations
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
    // Customer insurance operations
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
    // Check operations
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
    // Statistics and analytics
    async getCustomerStats(filters = {}) {
        throw new Error("Method not implemented");
    }
    async getVehicleStats() {
        throw new Error("Method not implemented");
    }
    async getInsuranceStats() {
        throw new Error("Method not implemented");
    }
}
//# sourceMappingURL=ICustomerRepository.js.map