import { TrustAccidentReport } from "../entities/TrustAccidentReport.entity.js";

export class ITrustAccidentReportRepository {
  async create(trustAccidentReport) {
    throw new Error("Method not implemented");
  }

  async findById(id) {
    throw new Error("Method not implemented");
  }

  async findByCustomerId(customerId) {
    throw new Error("Method not implemented");
  }

  async findByPlateNumber(plateNumber) {
    throw new Error("Method not implemented");
  }

  async findAll() {
    throw new Error("Method not implemented");
  }

  async update(id, trustAccidentReport) {
    throw new Error("Method not implemented");
  }

  async delete(id) {
    throw new Error("Method not implemented");
  }

  async getStats() {
    throw new Error("Method not implemented");
  }

  async countAccidentReports() {
    throw new Error("Method not implemented");
  }

  async findByDateRange(startDate, endDate) {
    throw new Error("Method not implemented");
  }

  async findByAccidentType(accidentType) {
    throw new Error("Method not implemented");
  }
}
