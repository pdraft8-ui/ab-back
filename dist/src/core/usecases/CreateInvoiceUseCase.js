import { Invoice } from "../entities/Invoice.entity.js";
export class CreateInvoiceUseCase {
    constructor(invoiceRepository, customerRepository, notificationService, auditService) {
        this.invoiceRepository = invoiceRepository;
        this.customerRepository = customerRepository;
        this.notificationService = notificationService;
        this.auditService = auditService;
    }
    async execute(invoiceData, userId, userName) {
        try {
            // Validate input
            this.validateInput(invoiceData);
            // Check if customer exists
            const customer = await this.customerRepository.getCustomerById(invoiceData.customerId);
            if (!customer) {
                throw new Error("Customer not found");
            }
            // Check if invoice already exists for this insurance policy
            const existingInvoice = await this.invoiceRepository.getInvoiceByInsurancePolicy(invoiceData.insurancePolicyId);
            if (existingInvoice) {
                throw new Error("Invoice already exists for this insurance policy");
            }
            // Get invoice count for number generation
            const invoiceCount = await this.invoiceRepository.getInvoiceCount();
            // Create invoice entity
            const invoice = new Invoice({
                customer: invoiceData.customerId,
                insurancePolicy: invoiceData.insurancePolicyId,
                vehicle: invoiceData.vehicleId,
                totalAmount: invoiceData.totalAmount,
                balanceDue: invoiceData.totalAmount,
                description: invoiceData.description,
                notes: invoiceData.notes,
                dueDate: invoiceData.dueDate
                    ? new Date(invoiceData.dueDate)
                    : this.calculateDefaultDueDate(),
                createdBy: userId,
            });
            // Validate invoice
            if (!invoice.validateAmount()) {
                throw new Error("Total amount must be positive");
            }
            if (!invoice.validateCustomer()) {
                throw new Error("Customer is required");
            }
            if (!invoice.validateInsurancePolicy()) {
                throw new Error("Insurance policy is required");
            }
            // Generate invoice number
            invoice.invoiceNumber = invoice.generateInvoiceNumber(invoiceCount);
            // Save invoice
            const savedInvoice = await this.invoiceRepository.createInvoice(invoice);
            // Send notification
            const message = `Invoice ${savedInvoice.invoiceNumber} created for customer ${customer.firstName} ${customer.lastName}`;
            await this.notificationService.sendNotification({
                senderId: userId,
                message,
            });
            // Log audit
            await this.auditService.logAction({
                userId,
                action: "Create Invoice",
                userName,
                entity: "Invoice",
                entityId: savedInvoice.id,
                oldValue: null,
                newValue: savedInvoice.toJSON(),
            });
            return savedInvoice;
        }
        catch (error) {
            throw error;
        }
    }
    validateInput(invoiceData) {
        if (!invoiceData.customerId) {
            throw new Error("Customer ID is required");
        }
        if (!invoiceData.insurancePolicyId) {
            throw new Error("Insurance Policy ID is required");
        }
        if (!invoiceData.totalAmount || invoiceData.totalAmount <= 0) {
            throw new Error("Total amount must be positive");
        }
        if (!invoiceData.description) {
            throw new Error("Description is required");
        }
    }
    calculateDefaultDueDate() {
        const dueDate = new Date();
        dueDate.setMonth(dueDate.getMonth() + 1);
        return dueDate;
    }
}
//# sourceMappingURL=CreateInvoiceUseCase.js.map