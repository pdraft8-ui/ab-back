import { TranzilaPayment } from "../entities/TranzilaPayment.entity.js";

export class ITranzilaPaymentRepository {
  async createTranzilaPayment(paymentData) {
    throw new Error("Method not implemented");
  }

  async findTranzilaPaymentByPaymentId(paymentId) {
    throw new Error("Method not implemented");
  }

  async updateTranzilaPayment(id, updateData) {
    throw new Error("Method not implemented");
  }

  async getAllTranzilaPayments(filters = {}) {
    throw new Error("Method not implemented");
  }

  async getTranzilaPaymentById(id) {
    throw new Error("Method not implemented");
  }

  async deleteTranzilaPayment(id) {
    throw new Error("Method not implemented");
  }

  async getTranzilaPaymentStats() {
    throw new Error("Method not implemented");
  }
}
