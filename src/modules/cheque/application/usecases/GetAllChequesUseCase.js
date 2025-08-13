/**
 * Get All Cheques Use Case
 * Handles the business logic for retrieving cheques with filters
 */

export class GetAllChequesUseCase {
  constructor(chequeRepository) {
    this.chequeRepository = chequeRepository;
  }

  /**
   * Execute the use case
   * @param {Object} filters - Query filters
   * @param {Object} options - Query options (pagination, sorting)
   * @returns {Promise<Object>} The cheques data
   */
  async execute(filters = {}, options = {}) {
    try {
      // Set default options
      const defaultOptions = {
        page: 1,
        limit: 10,
        sortBy: "createdAt",
        sortOrder: "desc",
        ...options,
      };

      // Validate pagination
      if (defaultOptions.page < 1) {
        defaultOptions.page = 1;
      }
      if (defaultOptions.limit < 1 || defaultOptions.limit > 100) {
        defaultOptions.limit = 10;
      }

      // Validate sort order
      if (!["asc", "desc"].includes(defaultOptions.sortOrder)) {
        defaultOptions.sortOrder = "desc";
      }

      // Get cheques from repository
      const cheques = await this.chequeRepository.findAll(
        filters,
        defaultOptions
      );

      // Transform data to include business logic
      const ChequeEntity = (
        await import("../../domain/entities/Cheque.entity.js")
      ).Cheque;
      const transformedCheques = cheques.map((cheque) => {
        const chequeEntity = new ChequeEntity(cheque);
        return {
          ...cheque,
          isOverdue: chequeEntity.isOverdue(),
          daysUntilDue: chequeEntity.getDaysUntilDue(),
          daysOverdue: chequeEntity.getDaysOverdue(),
          canBeUpdated: chequeEntity.canBeUpdated(),
          canBeDeleted: chequeEntity.canBeDeleted(),
        };
      });

      return {
        success: true,
        data: transformedCheques,
        pagination: {
          page: defaultOptions.page,
          limit: defaultOptions.limit,
          total: transformedCheques.length,
        },
        message: "Cheques retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: "Failed to retrieve cheques",
      };
    }
  }
}
