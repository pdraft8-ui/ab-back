/**
 * Cheque Repository Interface
 * Defines the contract for cheque data access operations
 */

export class IChequeRepository {
  /**
   * Create a new cheque
   * @param {Object} chequeData - The cheque data
   * @returns {Promise<Object>} The created cheque
   */
  async create(chequeData) {
    throw new Error("Method not implemented");
  }

  /**
   * Find all cheques with optional filters
   * @param {Object} filters - Query filters
   * @param {Object} options - Query options (pagination, sorting)
   * @returns {Promise<Array>} Array of cheques
   */
  async findAll(filters = {}, options = {}) {
    throw new Error("Method not implemented");
  }

  /**
   * Find cheque by ID
   * @param {string} id - Cheque ID
   * @returns {Promise<Object|null>} The cheque or null if not found
   */
  async findById(id) {
    throw new Error("Method not implemented");
  }

  /**
   * Find cheques by customer ID
   * @param {string} customerId - Customer ID
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of cheques
   */
  async findByCustomerId(customerId, options = {}) {
    throw new Error("Method not implemented");
  }

  /**
   * Find cheques by invoice ID
   * @param {string} invoiceId - Invoice ID
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of cheques
   */
  async findByInvoiceId(invoiceId, options = {}) {
    throw new Error("Method not implemented");
  }

  /**
   * Find cheques by status
   * @param {string} status - Cheque status
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of cheques
   */
  async findByStatus(status, options = {}) {
    throw new Error("Method not implemented");
  }

  /**
   * Find overdue cheques
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of overdue cheques
   */
  async findOverdueCheques(options = {}) {
    throw new Error("Method not implemented");
  }

  /**
   * Update cheque by ID
   * @param {string} id - Cheque ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object|null>} The updated cheque or null if not found
   */
  async updateById(id, updateData) {
    throw new Error("Method not implemented");
  }

  /**
   * Update cheque status
   * @param {string} id - Cheque ID
   * @param {string} status - New status
   * @returns {Promise<Object|null>} The updated cheque or null if not found
   */
  async updateStatus(id, status) {
    throw new Error("Method not implemented");
  }

  /**
   * Delete cheque by ID
   * @param {string} id - Cheque ID
   * @returns {Promise<boolean>} True if deleted, false if not found
   */
  async deleteById(id) {
    throw new Error("Method not implemented");
  }

  /**
   * Get cheque statistics
   * @param {Object} filters - Query filters
   * @returns {Promise<Object>} Statistics object
   */
  async getStats(filters = {}) {
    throw new Error("Method not implemented");
  }

  /**
   * Count cheques by status
   * @returns {Promise<Object>} Count by status
   */
  async countByStatus() {
    throw new Error("Method not implemented");
  }

  /**
   * Get total amount by status
   * @returns {Promise<Object>} Total amount by status
   */
  async getTotalAmountByStatus() {
    throw new Error("Method not implemented");
  }

  /**
   * Find cheques by date range
   * @param {Date} startDate - Start date
   * @param {Date} endDate - End date
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of cheques
   */
  async findByDateRange(startDate, endDate, options = {}) {
    throw new Error("Method not implemented");
  }

  /**
   * Find cheques by bank name
   * @param {string} bankName - Bank name
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of cheques
   */
  async findByBankName(bankName, options = {}) {
    throw new Error("Method not implemented");
  }

  /**
   * Search cheques by cheque number
   * @param {string} chequeNumber - Cheque number (partial match)
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of cheques
   */
  async searchByChequeNumber(chequeNumber, options = {}) {
    throw new Error("Method not implemented");
  }
}
