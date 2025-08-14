/**
 * Create Cheque Use Case
 * Handles the business logic for creating a new cheque
 */
import { Cheque } from "../../domain/entities/Cheque.entity.js";
export class CreateChequeUseCase {
    constructor(chequeRepository, customerRepository, invoiceRepository, auditService) {
        this.chequeRepository = chequeRepository;
        this.customerRepository = customerRepository;
        this.invoiceRepository = invoiceRepository;
        this.auditService = auditService;
    }
    /**
     * Execute the use case
     * @param {Object} chequeData - The cheque data
     * @param {Object} user - The user creating the cheque
     * @returns {Promise<Object>} The created cheque
     */
    async execute(chequeData, user) {
        try {
            // Validate input data
            const validation = Cheque.validate(chequeData);
            if (!validation.isValid) {
                throw new Error(`Validation failed: ${validation.errors.join(", ")}`);
            }
            // Verify customer exists
            const customer = await this.customerRepository.findById(chequeData.customer);
            if (!customer) {
                throw new Error("Customer not found");
            }
            // Verify invoice exists
            const invoice = await this.invoiceRepository.findById(chequeData.invoice);
            if (!invoice) {
                throw new Error("Invoice not found");
            }
            // Check if invoice belongs to customer
            if (invoice.customer.toString() !== chequeData.customer) {
                throw new Error("Invoice does not belong to the specified customer");
            }
            // Check if cheque amount exceeds invoice balance
            if (chequeData.amount > invoice.balanceDue) {
                throw new Error("Cheque amount cannot exceed invoice balance");
            }
            // Create cheque entity
            const cheque = new Cheque({
                ...chequeData,
                createdBy: user.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            // Save to repository
            const createdCheque = await this.chequeRepository.create(cheque.toJSON());
            // Audit log
            await this.auditService.logAction({
                action: "CREATE_CHEQUE",
                userId: user.id,
                resourceType: "Cheque",
                resourceId: createdCheque.id,
                details: {
                    chequeNumber: createdCheque.chequeNumber,
                    amount: createdCheque.amount,
                    customerId: createdCheque.customer,
                    invoiceId: createdCheque.invoice,
                },
            });
            return {
                success: true,
                data: createdCheque,
                message: "Cheque created successfully",
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: "Failed to create cheque",
            };
        }
    }
}
//# sourceMappingURL=CreateChequeUseCase.js.map