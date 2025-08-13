/**
 * Cheque Controller
 * Handles HTTP requests for cheque operations
 */

export class ChequeController {
  constructor(createChequeUseCase, getAllChequesUseCase) {
    this.createChequeUseCase = createChequeUseCase;
    this.getAllChequesUseCase = getAllChequesUseCase;
  }

  /**
   * Create a new cheque
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async createCheque(req, res) {
    try {
      const chequeData = {
        customer: req.body.customer,
        customerName: req.body.customerName,
        customerPhone: req.body.customerPhone,
        chequeNumber: req.body.chequeNumber,
        chequeAmount: req.body.chequeAmount,
        chequeDate: req.body.chequeDate,
        bankName: req.body.bankName,
        accountNumber: req.body.accountNumber,
        chequeImage: req.body.chequeImage,
        notes: req.body.notes,
      };

      const result = await this.createChequeUseCase.execute(
        chequeData,
        req.user
      );

      if (result.success) {
        return res.status(201).json({
          success: true,
          message: result.message,
          data: result.data,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: result.message,
          error: result.error,
        });
      }
    } catch (error) {
      console.error("Create cheque error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  /**
   * Get all cheques with filters
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getAllCheques(req, res) {
    try {
      const filters = {};
      const options = {};

      // Apply filters
      if (req.query.customer) {
        filters.customer = req.query.customer;
      }
      if (req.query.status) {
        filters.chequeStatus = req.query.status;
      }
      if (req.query.bankName) {
        filters.bankName = { $regex: req.query.bankName, $options: "i" };
      }
      if (req.query.startDate && req.query.endDate) {
        filters.chequeDate = {
          $gte: new Date(req.query.startDate),
          $lte: new Date(req.query.endDate),
        };
      }

      // Apply pagination
      if (req.query.page) {
        options.page = parseInt(req.query.page);
      }
      if (req.query.limit) {
        options.limit = parseInt(req.query.limit);
      }

      // Apply sorting
      if (req.query.sortBy) {
        options.sortBy = req.query.sortBy;
      }
      if (req.query.sortOrder) {
        options.sortOrder = req.query.sortOrder;
      }

      const result = await this.getAllChequesUseCase.execute(filters, options);

      if (result.success) {
        return res.status(200).json({
          success: true,
          message: result.message,
          data: result.data,
          pagination: result.pagination,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: result.message,
          error: result.error,
        });
      }
    } catch (error) {
      console.error("Get all cheques error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  /**
   * Get cheque by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getChequeById(req, res) {
    try {
      const { id } = req.params;
      const cheque = await this.chequeRepository.findById(id);

      if (!cheque) {
        return res.status(404).json({
          success: false,
          message: "Cheque not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Cheque retrieved successfully",
        data: cheque,
      });
    } catch (error) {
      console.error("Get cheque by ID error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  /**
   * Update cheque status
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async updateChequeStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updatedCheque = await this.chequeRepository.updateStatus(
        id,
        status
      );

      if (!updatedCheque) {
        return res.status(404).json({
          success: false,
          message: "Cheque not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Cheque status updated successfully",
        data: updatedCheque,
      });
    } catch (error) {
      console.error("Update cheque status error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  /**
   * Delete cheque
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async deleteCheque(req, res) {
    try {
      const { id } = req.params;
      const deleted = await this.chequeRepository.deleteById(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Cheque not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Cheque deleted successfully",
      });
    } catch (error) {
      console.error("Delete cheque error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  /**
   * Get cheque statistics
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getChequeStats(req, res) {
    try {
      const stats = await this.chequeRepository.getStats();
      const countByStatus = await this.chequeRepository.countByStatus();
      const totalAmountByStatus =
        await this.chequeRepository.getTotalAmountByStatus();

      return res.status(200).json({
        success: true,
        message: "Cheque statistics retrieved successfully",
        data: {
          stats,
          countByStatus,
          totalAmountByStatus,
        },
      });
    } catch (error) {
      console.error("Get cheque stats error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }
}
