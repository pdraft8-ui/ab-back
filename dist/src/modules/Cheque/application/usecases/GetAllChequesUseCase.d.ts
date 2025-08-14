/**
 * Get All Cheques Use Case
 * Handles the business logic for retrieving cheques with filters
 */
export class GetAllChequesUseCase {
    constructor(chequeRepository: any);
    chequeRepository: any;
    /**
     * Execute the use case
     * @param {Object} filters - Query filters
     * @param {Object} options - Query options (pagination, sorting)
     * @returns {Promise<Object>} The cheques data
     */
    execute(filters?: any, options?: any): Promise<any>;
}
//# sourceMappingURL=GetAllChequesUseCase.d.ts.map