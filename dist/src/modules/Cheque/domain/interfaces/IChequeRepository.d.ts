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
    create(chequeData: any): Promise<any>;
    /**
     * Find all cheques with optional filters
     * @param {Object} filters - Query filters
     * @param {Object} options - Query options (pagination, sorting)
     * @returns {Promise<Array>} Array of cheques
     */
    findAll(filters?: any, options?: any): Promise<any[]>;
    /**
     * Find cheque by ID
     * @param {string} id - Cheque ID
     * @returns {Promise<Object|null>} The cheque or null if not found
     */
    findById(id: string): Promise<any | null>;
    /**
     * Find cheques by customer ID
     * @param {string} customerId - Customer ID
     * @param {Object} options - Query options
     * @returns {Promise<Array>} Array of cheques
     */
    findByCustomerId(customerId: string, options?: any): Promise<any[]>;
    /**
     * Find cheques by invoice ID
     * @param {string} invoiceId - Invoice ID
     * @param {Object} options - Query options
     * @returns {Promise<Array>} Array of cheques
     */
    findByInvoiceId(invoiceId: string, options?: any): Promise<any[]>;
    /**
     * Find cheques by status
     * @param {string} status - Cheque status
     * @param {Object} options - Query options
     * @returns {Promise<Array>} Array of cheques
     */
    findByStatus(status: string, options?: any): Promise<any[]>;
    /**
     * Find overdue cheques
     * @param {Object} options - Query options
     * @returns {Promise<Array>} Array of overdue cheques
     */
    findOverdueCheques(options?: any): Promise<any[]>;
    /**
     * Update cheque by ID
     * @param {string} id - Cheque ID
     * @param {Object} updateData - Data to update
     * @returns {Promise<Object|null>} The updated cheque or null if not found
     */
    updateById(id: string, updateData: any): Promise<any | null>;
    /**
     * Update cheque status
     * @param {string} id - Cheque ID
     * @param {string} status - New status
     * @returns {Promise<Object|null>} The updated cheque or null if not found
     */
    updateStatus(id: string, status: string): Promise<any | null>;
    /**
     * Delete cheque by ID
     * @param {string} id - Cheque ID
     * @returns {Promise<boolean>} True if deleted, false if not found
     */
    deleteById(id: string): Promise<boolean>;
    /**
     * Get cheque statistics
     * @param {Object} filters - Query filters
     * @returns {Promise<Object>} Statistics object
     */
    getStats(filters?: any): Promise<any>;
    /**
     * Count cheques by status
     * @returns {Promise<Object>} Count by status
     */
    countByStatus(): Promise<any>;
    /**
     * Get total amount by status
     * @returns {Promise<Object>} Total amount by status
     */
    getTotalAmountByStatus(): Promise<any>;
    /**
     * Find cheques by date range
     * @param {Date} startDate - Start date
     * @param {Date} endDate - End date
     * @param {Object} options - Query options
     * @returns {Promise<Array>} Array of cheques
     */
    findByDateRange(startDate: Date, endDate: Date, options?: any): Promise<any[]>;
    /**
     * Find cheques by bank name
     * @param {string} bankName - Bank name
     * @param {Object} options - Query options
     * @returns {Promise<Array>} Array of cheques
     */
    findByBankName(bankName: string, options?: any): Promise<any[]>;
    /**
     * Search cheques by cheque number
     * @param {string} chequeNumber - Cheque number (partial match)
     * @param {Object} options - Query options
     * @returns {Promise<Array>} Array of cheques
     */
    searchByChequeNumber(chequeNumber: string, options?: any): Promise<any[]>;
}
//# sourceMappingURL=IChequeRepository.d.ts.map