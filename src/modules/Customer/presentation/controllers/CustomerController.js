export class CustomerController {
  constructor(
    createCustomerUseCase,
    getAllCustomersUseCase,
    updateCustomerUseCase,
    deleteCustomerUseCase,
    addVehicleToCustomerUseCase,
    getCustomerStatsUseCase,
    customerRepository
  ) {
    this.createCustomerUseCase = createCustomerUseCase;
    this.getAllCustomersUseCase = getAllCustomersUseCase;
    this.updateCustomerUseCase = updateCustomerUseCase;
    this.deleteCustomerUseCase = deleteCustomerUseCase;
    this.addVehicleToCustomerUseCase = addVehicleToCustomerUseCase;
    this.getCustomerStatsUseCase = getCustomerStatsUseCase;
    this.customerRepository = customerRepository;
  }

  async createCustomer(req, res, next) {
    try {
      const customerData = req.body;
      const userId = req.user.id;
      const userName = req.user.first_name + " " + req.user.last_name;

      const customer = await this.createCustomerUseCase.execute(
        customerData,
        userId,
        userName
      );

      res.status(201).json({
        success: true,
        message: "Customer created successfully",
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllCustomers(req, res, next) {
    try {
      const filters = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
        search: req.query.search,
        city: req.query.city,
        agentId: req.query.agentId,
        sortBy: req.query.sortBy || "createdAt",
        sortOrder: req.query.sortOrder || "desc",
      };

      const result = await this.getAllCustomersUseCase.execute(filters);

      res.status(200).json({
        success: true,
        message: "Customers retrieved successfully",
        data: result.customers,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCustomerById(req, res, next) {
    try {
      const { id } = req.params;
      const customer = await this.customerRepository.getCustomerById(id);

      if (!customer) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Customer retrieved successfully",
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCustomer(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const userId = req.user.id;
      const userName = req.user.first_name + " " + req.user.last_name;

      const customer = await this.updateCustomerUseCase.execute(
        id,
        updateData,
        userId,
        userName
      );

      res.status(200).json({
        success: true,
        message: "Customer updated successfully",
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCustomer(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const userName = req.user.first_name + " " + req.user.last_name;

      const result = await this.deleteCustomerUseCase.execute(
        id,
        userId,
        userName
      );

      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }

  async addVehicleToCustomer(req, res, next) {
    try {
      const { customerId } = req.params;
      const vehicleData = req.body;
      const userId = req.user.id;
      const userName = req.user.first_name + " " + req.user.last_name;

      const customer = await this.addVehicleToCustomerUseCase.execute(
        customerId,
        vehicleData,
        userId,
        userName
      );

      res.status(200).json({
        success: true,
        message: "Vehicle added to customer successfully",
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCustomerStats(req, res, next) {
    try {
      const filters = req.query;
      const stats = await this.getCustomerStatsUseCase.execute(filters);

      res.status(200).json({
        success: true,
        message: "Customer statistics retrieved successfully",
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  }
}
