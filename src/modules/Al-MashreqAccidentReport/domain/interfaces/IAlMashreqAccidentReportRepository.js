export class IAlMashreqAccidentReportRepository {
  async create(alMashreqAccidentReport) {
    throw new Error("Method 'create' must be implemented");
  }

  async findById(id) {
    throw new Error("Method 'findById' must be implemented");
  }

  async findByCustomerId(customerId) {
    throw new Error("Method 'findByCustomerId' must be implemented");
  }

  async findByPlateNumber(plateNumber) {
    throw new Error("Method 'findByPlateNumber' must be implemented");
  }

  async findAll() {
    throw new Error("Method 'findAll' must be implemented");
  }

  async update(id, alMashreqAccidentReport) {
    throw new Error("Method 'update' must be implemented");
  }

  async delete(id) {
    throw new Error("Method 'delete' must be implemented");
  }

  async getStats() {
    throw new Error("Method 'getStats' must be implemented");
  }

  async countAccidentReports() {
    throw new Error("Method 'countAccidentReports' must be implemented");
  }

  async findByDateRange(startDate, endDate) {
    throw new Error("Method 'findByDateRange' must be implemented");
  }

  async findByAccidentType(accidentType) {
    throw new Error("Method 'findByAccidentType' must be implemented");
  }
}
