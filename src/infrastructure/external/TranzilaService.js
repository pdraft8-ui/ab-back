import axios from "axios";
import { ITranzilaService } from "../../core/interfaces/ITranzilaService.js";

export class TranzilaService extends ITranzilaService {
  constructor() {
    super();
    this.baseURL =
      process.env.TRANZILA_API_URL ||
      "https://secure5.tranzila.com/cgi-bin/tranzila31.cgi";
    this.supplier = process.env.TRANZILA_SUPPLIER_ID;
    this.terminal = process.env.TRANZILA_TERMINAL_ID;
    this.password = process.env.TRANZILA_PASSWORD;
  }

  async createPayment(paymentData) {
    try {
      const response = await axios.post(this.baseURL, paymentData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        timeout: 30000, // 30 seconds timeout
      });

      const responseData = response.data;
      return this.parseResponse(responseData);
    } catch (error) {
      console.error("Tranzila API Error:", error);
      return {
        success: false,
        error: error.message || "Failed to communicate with Tranzila",
        data: null,
      };
    }
  }

  async checkPaymentStatus(transactionId) {
    try {
      const statusRequest = {
        supplier: this.supplier,
        terminal: this.terminal,
        password: this.password,
        tranid: transactionId,
        action: "status",
      };

      const response = await axios.post(this.baseURL, statusRequest, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        timeout: 30000,
      });

      const responseData = response.data;
      return this.parseStatusResponse(responseData);
    } catch (error) {
      console.error("Tranzila Status Check Error:", error);
      return {
        success: false,
        error: error.message || "Failed to check payment status",
        data: null,
      };
    }
  }

  async processRefund(transactionId, amount, reason) {
    try {
      const refundRequest = {
        supplier: this.supplier,
        terminal: this.terminal,
        password: this.password,
        tranid: transactionId,
        action: "refund",
        sum: amount,
        reason: reason || "Customer request",
      };

      const response = await axios.post(this.baseURL, refundRequest, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        timeout: 30000,
      });

      const responseData = response.data;
      return this.parseRefundResponse(responseData);
    } catch (error) {
      console.error("Tranzila Refund Error:", error);
      return {
        success: false,
        error: error.message || "Failed to process refund",
        data: null,
      };
    }
  }

  async validateCredentials() {
    try {
      const testRequest = {
        supplier: this.supplier,
        terminal: this.terminal,
        password: this.password,
        action: "test",
      };

      const response = await axios.post(this.baseURL, testRequest, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        timeout: 10000,
      });

      return response.data.Response === "000";
    } catch (error) {
      console.error("Tranzila Credentials Validation Error:", error);
      return false;
    }
  }

  getPaymentUrl(paymentData) {
    // This would be called after successful payment creation
    return paymentData.url || paymentData.payment_url;
  }

  parseResponse(responseData) {
    try {
      if (responseData.Response === "000") {
        return {
          success: true,
          paymentUrl: responseData.url || responseData.payment_url,
          transactionId: responseData.tranid,
          data: responseData,
        };
      } else {
        return {
          success: false,
          error: responseData.ResponseText || "Payment creation failed",
          data: responseData,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: "Failed to parse Tranzila response",
        data: responseData,
      };
    }
  }

  parseStatusResponse(responseData) {
    try {
      if (responseData.Response === "000") {
        return {
          success: true,
          status: responseData.status,
          transactionId: responseData.tranid,
          amount: responseData.sum,
          data: responseData,
        };
      } else {
        return {
          success: false,
          error: responseData.ResponseText || "Status check failed",
          data: responseData,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: "Failed to parse status response",
        data: responseData,
      };
    }
  }

  parseRefundResponse(responseData) {
    try {
      if (responseData.Response === "000") {
        return {
          success: true,
          refundId: responseData.refundid,
          amount: responseData.sum,
          data: responseData,
        };
      } else {
        return {
          success: false,
          error: responseData.ResponseText || "Refund failed",
          data: responseData,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: "Failed to parse refund response",
        data: responseData,
      };
    }
  }

  // Helper method to build payment request
  buildPaymentRequest(paymentData) {
    return {
      supplier: this.supplier,
      terminal: this.terminal,
      password: this.password,
      sum: paymentData.amount,
      currency: paymentData.currency || "ILS",
      payment_simple: "1",
      payment_type: "1",
      ccno: "",
      expmonth: "",
      expyear: "",
      myid: paymentData.paymentId,
      cred_type: "1",
      tranmode: "1",
      oref: paymentData.invoiceNumber,
      uref: paymentData.customerName,
      lang: "he",
      email: paymentData.customerEmail,
      phone: paymentData.customerPhone,
      return_url: paymentData.returnUrl,
      cancel_url: paymentData.cancelUrl,
    };
  }
}
