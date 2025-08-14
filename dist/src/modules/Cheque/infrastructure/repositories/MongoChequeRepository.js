/**
 * MongoDB Cheque Repository Implementation
 * Implements the IChequeRepository interface using MongoDB
 */
// import ChequeModel from "../../../../DB/models/Cheque.model.js";
// Temporary fix - will be resolved after TypeScript compilation
const ChequeModel = null;
export class MongoChequeRepository {
    /**
     * Create a new cheque
     * @param {Object} chequeData - The cheque data
     * @returns {Promise<Object>} The created cheque
     */
    async create(chequeData) {
        try {
            const cheque = new ChequeModel(chequeData);
            const savedCheque = await cheque.save();
            return savedCheque.toObject();
        }
        catch (error) {
            throw new Error(`Failed to create cheque: ${error.message}`);
        }
    }
    /**
     * Find all cheques with optional filters
     * @param {Object} filters - Query filters
     * @param {Object} options - Query options (pagination, sorting)
     * @returns {Promise<Array>} Array of cheques
     */
    async findAll(filters = {}, options = {}) {
        try {
            const { page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc", populate = [], } = options;
            const skip = (page - 1) * limit;
            const sort = { [sortBy]: sortOrder === "desc" ? -1 : 1 };
            let query = ChequeModel.find(filters);
            // Populate related fields
            if (populate.length > 0) {
                query = query.populate(populate);
            }
            const cheques = await query.sort(sort).skip(skip).limit(limit).lean();
            return cheques;
        }
        catch (error) {
            throw new Error(`Failed to find cheques: ${error.message}`);
        }
    }
    /**
     * Find cheque by ID
     * @param {string} id - Cheque ID
     * @returns {Promise<Object|null>} The cheque or null if not found
     */
    async findById(id) {
        try {
            const cheque = await ChequeModel.findById(id)
                .populate("customer", "name email phone")
                .populate("invoice", "invoiceNumber totalAmount balanceDue")
                .populate("createdBy", "name email")
                .populate("updatedBy", "name email")
                .lean();
            return cheque;
        }
        catch (error) {
            throw new Error(`Failed to find cheque by ID: ${error.message}`);
        }
    }
    /**
     * Find cheques by customer ID
     * @param {string} customerId - Customer ID
     * @param {Object} options - Query options
     * @returns {Promise<Array>} Array of cheques
     */
    async findByCustomerId(customerId, options = {}) {
        try {
            return await this.findAll({ customer: customerId }, options);
        }
        catch (error) {
            throw new Error(`Failed to find cheques by customer ID: ${error.message}`);
        }
    }
    /**
     * Find cheques by invoice ID
     * @param {string} invoiceId - Invoice ID
     * @param {Object} options - Query options
     * @returns {Promise<Array>} Array of cheques
     */
    async findByInvoiceId(invoiceId, options = {}) {
        try {
            return await this.findAll({ invoice: invoiceId }, options);
        }
        catch (error) {
            throw new Error(`Failed to find cheques by invoice ID: ${error.message}`);
        }
    }
    /**
     * Find cheques by status
     * @param {string} status - Cheque status
     * @param {Object} options - Query options
     * @returns {Promise<Array>} Array of cheques
     */
    async findByStatus(status, options = {}) {
        try {
            return await this.findAll({ status }, options);
        }
        catch (error) {
            throw new Error(`Failed to find cheques by status: ${error.message}`);
        }
    }
    /**
     * Find overdue cheques
     * @param {Object} options - Query options
     * @returns {Promise<Array>} Array of overdue cheques
     */
    async findOverdueCheques(options = {}) {
        try {
            const today = new Date();
            const filters = {
                dueDate: { $lt: today },
                status: { $nin: ["Cleared", "Cancelled"] },
            };
            return await this.findAll(filters, options);
        }
        catch (error) {
            throw new Error(`Failed to find overdue cheques: ${error.message}`);
        }
    }
    /**
     * Update cheque by ID
     * @param {string} id - Cheque ID
     * @param {Object} updateData - Data to update
     * @returns {Promise<Object|null>} The updated cheque or null if not found
     */
    async updateById(id, updateData) {
        try {
            const updatedCheque = await ChequeModel.findByIdAndUpdate(id, { ...updateData, updatedAt: new Date() }, { new: true, runValidators: true }).lean();
            return updatedCheque;
        }
        catch (error) {
            throw new Error(`Failed to update cheque: ${error.message}`);
        }
    }
    /**
     * Update cheque status
     * @param {string} id - Cheque ID
     * @param {string} status - New status
     * @returns {Promise<Object|null>} The updated cheque or null if not found
     */
    async updateStatus(id, status) {
        try {
            const validStatuses = [
                "Pending",
                "Processing",
                "Cleared",
                "Bounced",
                "Cancelled",
            ];
            if (!validStatuses.includes(status)) {
                throw new Error("Invalid cheque status");
            }
            return await this.updateById(id, { status });
        }
        catch (error) {
            throw new Error(`Failed to update cheque status: ${error.message}`);
        }
    }
    /**
     * Delete cheque by ID
     * @param {string} id - Cheque ID
     * @returns {Promise<boolean>} True if deleted, false if not found
     */
    async deleteById(id) {
        try {
            const result = await ChequeModel.findByIdAndDelete(id);
            return !!result;
        }
        catch (error) {
            throw new Error(`Failed to delete cheque: ${error.message}`);
        }
    }
    /**
     * Get cheque statistics
     * @param {Object} filters - Query filters
     * @returns {Promise<Object>} Statistics object
     */
    async getStats(filters = {}) {
        try {
            const stats = await ChequeModel.aggregate([
                { $match: filters },
                {
                    $group: {
                        _id: null,
                        totalCheques: { $sum: 1 },
                        totalAmount: { $sum: "$amount" },
                        averageAmount: { $avg: "$amount" },
                        minAmount: { $min: "$amount" },
                        maxAmount: { $max: "$amount" },
                    },
                },
            ]);
            return (stats[0] || {
                totalCheques: 0,
                totalAmount: 0,
                averageAmount: 0,
                minAmount: 0,
                maxAmount: 0,
            });
        }
        catch (error) {
            throw new Error(`Failed to get cheque stats: ${error.message}`);
        }
    }
    /**
     * Count cheques by status
     * @returns {Promise<Object>} Count by status
     */
    async countByStatus() {
        try {
            const counts = await ChequeModel.aggregate([
                {
                    $group: {
                        _id: "$status",
                        count: { $sum: 1 },
                    },
                },
            ]);
            const result = {};
            counts.forEach((item) => {
                result[item._id] = item.count;
            });
            return result;
        }
        catch (error) {
            throw new Error(`Failed to count cheques by status: ${error.message}`);
        }
    }
    /**
     * Get total amount by status
     * @returns {Promise<Object>} Total amount by status
     */
    async getTotalAmountByStatus() {
        try {
            const amounts = await ChequeModel.aggregate([
                {
                    $group: {
                        _id: "$status",
                        totalAmount: { $sum: "$amount" },
                    },
                },
            ]);
            const result = {};
            amounts.forEach((item) => {
                result[item._id] = item.totalAmount;
            });
            return result;
        }
        catch (error) {
            throw new Error(`Failed to get total amount by status: ${error.message}`);
        }
    }
    /**
     * Find cheques by date range
     * @param {Date} startDate - Start date
     * @param {Date} endDate - End date
     * @param {Object} options - Query options
     * @returns {Promise<Array>} Array of cheques
     */
    async findByDateRange(startDate, endDate, options = {}) {
        try {
            const filters = {
                createdAt: {
                    $gte: startDate,
                    $lte: endDate,
                },
            };
            return await this.findAll(filters, options);
        }
        catch (error) {
            throw new Error(`Failed to find cheques by date range: ${error.message}`);
        }
    }
    /**
     * Find cheques by bank name
     * @param {string} bankName - Bank name
     * @param {Object} options - Query options
     * @returns {Promise<Array>} Array of cheques
     */
    async findByBankName(bankName, options = {}) {
        try {
            const filters = {
                bankName: { $regex: bankName, $options: "i" },
            };
            return await this.findAll(filters, options);
        }
        catch (error) {
            throw new Error(`Failed to find cheques by bank name: ${error.message}`);
        }
    }
    /**
     * Search cheques by cheque number
     * @param {string} chequeNumber - Cheque number (partial match)
     * @param {Object} options - Query options
     * @returns {Promise<Array>} Array of cheques
     */
    async searchByChequeNumber(chequeNumber, options = {}) {
        try {
            const filters = {
                chequeNumber: { $regex: chequeNumber, $options: "i" },
            };
            return await this.findAll(filters, options);
        }
        catch (error) {
            throw new Error(`Failed to search cheques by cheque number: ${error.message}`);
        }
    }
}
//# sourceMappingURL=MongoChequeRepository.js.map