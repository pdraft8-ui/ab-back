export class CreateChequeUseCase {
    constructor(chequeRepository: any, customerRepository: any, invoiceRepository: any, auditService: any);
    chequeRepository: any;
    customerRepository: any;
    invoiceRepository: any;
    auditService: any;
    /**
     * Execute the use case
     * @param {Object} chequeData - The cheque data
     * @param {Object} user - The user creating the cheque
     * @returns {Promise<Object>} The created cheque
     */
    execute(chequeData: any, user: any): Promise<any>;
}
//# sourceMappingURL=CreateChequeUseCase.d.ts.map