export class IVehicleRepository {
  async create(vehicleData) {
    throw new Error("Method 'create' must be implemented");
  }

  async findById(id) {
    throw new Error("Method 'findById' must be implemented");
  }

  async findByPlateNumber(plateNumber) {
    throw new Error("Method 'findByPlateNumber' must be implemented");
  }

  async findAll() {
    throw new Error("Method 'findAll' must be implemented");
  }

  async findByCustomerId(customerId) {
    throw new Error("Method 'findByCustomerId' must be implemented");
  }

  async update(id, vehicleData) {
    throw new Error("Method 'update' must be implemented");
  }

  async delete(id) {
    throw new Error("Method 'delete' must be implemented");
  }

  async addInsuranceToVehicle(vehicleId, insuranceData) {
    throw new Error("Method 'addInsuranceToVehicle' must be implemented");
  }

  async removeInsuranceFromVehicle(vehicleId, insuranceId) {
    throw new Error("Method 'removeInsuranceFromVehicle' must be implemented");
  }

  async updateInsurance(vehicleId, insuranceId, insuranceData) {
    throw new Error("Method 'updateInsurance' must be implemented");
  }

  async getInsurancesForVehicle(vehicleId) {
    throw new Error("Method 'getInsurancesForVehicle' must be implemented");
  }

  async addCheckToInsurance(vehicleId, insuranceId, checkData) {
    throw new Error("Method 'addCheckToInsurance' must be implemented");
  }

  async removeCheckFromInsurance(vehicleId, insuranceId, checkId) {
    throw new Error("Method 'removeCheckFromInsurance' must be implemented");
  }

  async getChecksForInsurance(vehicleId, insuranceId) {
    throw new Error("Method 'getChecksForInsurance' must be implemented");
  }

  async getAllChecksForVehicle(vehicleId) {
    throw new Error("Method 'getAllChecksForVehicle' must be implemented");
  }

  async getStats() {
    throw new Error("Method 'getStats' must be implemented");
  }

  async countVehicles() {
    throw new Error("Method 'countVehicles' must be implemented");
  }

  async findVehiclesWithExpiredInsurance() {
    throw new Error(
      "Method 'findVehiclesWithExpiredInsurance' must be implemented"
    );
  }

  async findVehiclesWithExpiredLicense() {
    throw new Error(
      "Method 'findVehiclesWithExpiredLicense' must be implemented"
    );
  }

  async findVehiclesWithExpiredTest() {
    throw new Error("Method 'findVehiclesWithExpiredTest' must be implemented");
  }
}
