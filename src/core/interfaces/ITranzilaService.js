export class ITranzilaService {
  async createPayment(paymentData) {
    throw new Error("Method not implemented");
  }

  async checkPaymentStatus(transactionId) {
    throw new Error("Method not implemented");
  }

  async processRefund(transactionId, amount, reason) {
    throw new Error("Method not implemented");
  }

  async validateCredentials() {
    throw new Error("Method not implemented");
  }

  getPaymentUrl(paymentData) {
    throw new Error("Method not implemented");
  }

  parseResponse(response) {
    throw new Error("Method not implemented");
  }
}
