export class GetAllInvoicesUseCase {
  constructor(invoiceRepository) {
    this.invoiceRepository = invoiceRepository;
  }

  async execute(filters = {}) {
    try {
      // Validate filters
      this.validateFilters(filters);

      // Get invoices with filters
      const invoices = await this.invoiceRepository.getAllInvoices(filters);

      return invoices;
    } catch (error) {
      throw error;
    }
  }

  validateFilters(filters) {
    if (filters.page && (filters.page < 1 || !Number.isInteger(filters.page))) {
      throw new Error("Page must be a positive integer");
    }

    if (
      filters.limit &&
      (filters.limit < 1 ||
        filters.limit > 100 ||
        !Number.isInteger(filters.limit))
    ) {
      throw new Error("Limit must be between 1 and 100");
    }

    if (
      filters.status &&
      !["Pending", "Partially Paid", "Paid", "Overdue"].includes(filters.status)
    ) {
      throw new Error("Invalid status filter");
    }

    if (filters.startDate && filters.endDate) {
      const startDate = new Date(filters.startDate);
      const endDate = new Date(filters.endDate);
      if (startDate > endDate) {
        throw new Error("Start date cannot be after end date");
      }
    }
  }
}
