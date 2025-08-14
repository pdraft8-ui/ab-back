import { CreateInvoiceUseCase } from "../../core/usecases/CreateInvoiceUseCase.js";
import { GetAllInvoicesUseCase } from "../../core/usecases/GetAllInvoicesUseCase.js";
import { UpdateInvoiceUseCase } from "../../core/usecases/UpdateInvoiceUseCase.js";
import { GetInvoiceStatsUseCase } from "../../core/usecases/GetInvoiceStatsUseCase.js";
import { MarkOverdueInvoicesUseCase } from "../../core/usecases/MarkOverdueInvoicesUseCase.js";
export class InvoiceController {
    constructor(createInvoiceUseCase, getAllInvoicesUseCase, updateInvoiceUseCase, getInvoiceStatsUseCase, markOverdueInvoicesUseCase, invoiceRepository) {
        this.createInvoiceUseCase = createInvoiceUseCase;
        this.getAllInvoicesUseCase = getAllInvoicesUseCase;
        this.updateInvoiceUseCase = updateInvoiceUseCase;
        this.getInvoiceStatsUseCase = getInvoiceStatsUseCase;
        this.markOverdueInvoicesUseCase = markOverdueInvoicesUseCase;
        this.invoiceRepository = invoiceRepository;
    }
    async createInvoice(req, res, next) {
        try {
            const invoiceData = req.body;
            const userId = req.user._id;
            const userName = req.user.name || req.user.firstName || "Unknown User";
            const invoice = await this.createInvoiceUseCase.execute(invoiceData, userId, userName);
            return res.status(201).json({
                success: true,
                message: "Invoice created successfully",
                data: invoice.toJSON(),
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
                error: error.message,
            });
        }
    }
    async getAllInvoices(req, res, next) {
        try {
            const filters = req.query;
            const result = await this.getAllInvoicesUseCase.execute(filters);
            return res.status(200).json({
                success: true,
                message: "Invoices retrieved successfully",
                data: {
                    invoices: result.invoices.map((invoice) => invoice.toJSON()),
                    pagination: result.pagination,
                },
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
                error: error.message,
            });
        }
    }
    async getInvoiceById(req, res, next) {
        try {
            const { id } = req.params;
            const invoice = await this.invoiceRepository.getInvoiceById(id);
            if (!invoice) {
                return res.status(404).json({
                    success: false,
                    message: "Invoice not found",
                    error: "Invoice not found",
                });
            }
            return res.status(200).json({
                success: true,
                message: "Invoice retrieved successfully",
                data: invoice.toJSON(),
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
                error: error.message,
            });
        }
    }
    async updateInvoice(req, res, next) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const userId = req.user._id;
            const userName = req.user.name || req.user.firstName || "Unknown User";
            const invoice = await this.updateInvoiceUseCase.execute(id, updateData, userId, userName);
            return res.status(200).json({
                success: true,
                message: "Invoice updated successfully",
                data: invoice.toJSON(),
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
                error: error.message,
            });
        }
    }
    async deleteInvoice(req, res, next) {
        try {
            const { id } = req.params;
            const invoice = await this.invoiceRepository.getInvoiceById(id);
            if (!invoice) {
                return res.status(404).json({
                    success: false,
                    message: "Invoice not found",
                    error: "Invoice not found",
                });
            }
            if (!invoice.canBeDeleted()) {
                return res.status(400).json({
                    success: false,
                    message: "Invoice cannot be deleted in its current status",
                    error: "Invoice cannot be deleted",
                });
            }
            await this.invoiceRepository.deleteInvoice(id);
            return res.status(200).json({
                success: true,
                message: "Invoice deleted successfully",
                data: null,
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
                error: error.message,
            });
        }
    }
    async getInvoicesByCustomer(req, res, next) {
        try {
            const { customerId } = req.params;
            const filters = req.query;
            const invoices = await this.invoiceRepository.getInvoicesByCustomer(customerId, filters);
            return res.status(200).json({
                success: true,
                message: "Customer invoices retrieved successfully",
                data: invoices.map((invoice) => invoice.toJSON()),
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
                error: error.message,
            });
        }
    }
    async getInvoiceStats(req, res, next) {
        try {
            const filters = req.query;
            const stats = await this.getInvoiceStatsUseCase.execute(filters);
            return res.status(200).json({
                success: true,
                message: "Invoice statistics retrieved successfully",
                data: stats,
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
                error: error.message,
            });
        }
    }
    async markOverdueInvoices(req, res, next) {
        try {
            const userId = req.user._id;
            const userName = req.user.name || req.user.firstName || "Unknown User";
            const result = await this.markOverdueInvoicesUseCase.execute(userId, userName);
            return res.status(200).json({
                success: true,
                message: result.message,
                data: {
                    overdueCount: result.overdueCount,
                    invoices: result.invoices.map((invoice) => invoice.toJSON()),
                },
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
                error: error.message,
            });
        }
    }
}
//# sourceMappingURL=InvoiceController.js.map