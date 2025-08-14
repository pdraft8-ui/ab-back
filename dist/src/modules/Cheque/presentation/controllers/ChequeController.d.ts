/**
 * Cheque Controller
 * Handles HTTP requests for cheque operations
 */
export class ChequeController {
    constructor(createChequeUseCase: any, getAllChequesUseCase: any);
    createChequeUseCase: any;
    getAllChequesUseCase: any;
    /**
     * Create a new cheque
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    createCheque(req: any, res: any): Promise<any>;
    /**
     * Get all cheques with filters
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    getAllCheques(req: any, res: any): Promise<any>;
    /**
     * Get cheque by ID
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    getChequeById(req: any, res: any): Promise<any>;
    /**
     * Update cheque status
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    updateChequeStatus(req: any, res: any): Promise<any>;
    /**
     * Delete cheque
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    deleteCheque(req: any, res: any): Promise<any>;
    /**
     * Get cheque statistics
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    getChequeStats(req: any, res: any): Promise<any>;
}
//# sourceMappingURL=ChequeController.d.ts.map