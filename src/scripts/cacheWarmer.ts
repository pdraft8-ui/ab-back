/**
 * Cache Warmer Script
 * Preloads frequently accessed data into Redis cache for better performance
 */

import { CacheService } from "../infrastructure/services/CacheService.js";
import CustomerModel from "../../DB/models/Customer.model.js";
import InvoiceModel from "../../DB/models/Invoice.model.js";
import PaymentModel from "../../DB/models/Payment.model.js";
import ChequeModel from "../../DB/models/Cheque.model.js";
import UserModel from "../../DB/models/user.model.js";
import logger from "../utils/logService.js";

interface CacheWarmingConfig {
  customerLimit: number;
  invoiceLimit: number;
  paymentLimit: number;
  chequeLimit: number;
  userLimit: number;
  ttl: number;
  batchSize: number;
}

class CacheWarmer {
  private cacheService: CacheService;
  private config: CacheWarmingConfig;

  constructor() {
    this.cacheService = new CacheService();
    this.config = {
      customerLimit: 100,
      invoiceLimit: 200,
      paymentLimit: 150,
      chequeLimit: 100,
      userLimit: 50,
      ttl: 3600, // 1 hour
      batchSize: 10,
    };
  }

  /**
   * Initialize cache warming
   */
  async initialize(): Promise<void> {
    try {
      logger.info("Starting cache warming process...");

      const connected = await this.cacheService.connect();
      if (!connected) {
        throw new Error("Failed to connect to Redis");
      }

      logger.info("Cache warming initialized successfully");
    } catch (error) {
      logger.error("Cache warming initialization failed:", error);
      throw error;
    }
  }

  /**
   * Warm customer cache
   */
  async warmCustomerCache(): Promise<void> {
    try {
      logger.info("Warming customer cache...");

      const customers = await CustomerModel.find()
        .limit(this.config.customerLimit)
        .select("-__v")
        .lean();

      const batches = this.chunkArray(customers, this.config.batchSize);

      for (const batch of batches) {
        await Promise.all(
          batch.map(async (customer) => {
            const cacheKey = `customer:${customer._id}`;
            await this.cacheService.set(cacheKey, customer, this.config.ttl);
          })
        );
      }

      // Cache customer list
      await this.cacheService.set(
        "customers:list",
        customers.map((c) => ({
          id: c._id,
          name: `${c.first_name} ${c.last_name}`,
          email: c.email,
        })),
        this.config.ttl
      );

      logger.info(`Customer cache warmed with ${customers.length} records`);
    } catch (error) {
      logger.error("Customer cache warming failed:", error);
    }
  }

  /**
   * Warm invoice cache
   */
  async warmInvoiceCache(): Promise<void> {
    try {
      logger.info("Warming invoice cache...");

      const invoices = await InvoiceModel.find()
        .limit(this.config.invoiceLimit)
        .select("-__v")
        .populate("customer", "name email")
        .lean();

      const batches = this.chunkArray(invoices, this.config.batchSize);

      for (const batch of batches) {
        await Promise.all(
          batch.map(async (invoice) => {
            const cacheKey = `invoice:${invoice._id}`;
            await this.cacheService.set(cacheKey, invoice, this.config.ttl);
          })
        );
      }

      // Cache invoice statistics
      const stats = await InvoiceModel.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
            totalAmount: { $sum: "$amount" },
          },
        },
      ]);

      await this.cacheService.set("invoices:stats", stats, this.config.ttl);

      logger.info(`Invoice cache warmed with ${invoices.length} records`);
    } catch (error) {
      logger.error("Invoice cache warming failed:", error);
    }
  }

  /**
   * Warm payment cache
   */
  async warmPaymentCache(): Promise<void> {
    try {
      logger.info("Warming payment cache...");

      const payments = await PaymentModel.find()
        .limit(this.config.paymentLimit)
        .select("-__v")
        .populate("customer", "name email")
        .populate("invoice", "invoiceNumber amount")
        .lean();

      const batches = this.chunkArray(payments, this.config.batchSize);

      for (const batch of batches) {
        await Promise.all(
          batch.map(async (payment) => {
            const cacheKey = `payment:${payment._id}`;
            await this.cacheService.set(cacheKey, payment, this.config.ttl);
          })
        );
      }

      // Cache payment statistics
      const stats = await PaymentModel.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
            totalAmount: { $sum: "$amount" },
          },
        },
      ]);

      await this.cacheService.set("payments:stats", stats, this.config.ttl);

      logger.info(`Payment cache warmed with ${payments.length} records`);
    } catch (error) {
      logger.error("Payment cache warming failed:", error);
    }
  }

  /**
   * Warm cheque cache
   */
  async warmChequeCache(): Promise<void> {
    try {
      logger.info("Warming cheque cache...");

      const cheques = await ChequeModel.find()
        .limit(this.config.chequeLimit)
        .select("-__v")
        .populate("customer", "name email")
        .lean();

      const batches = this.chunkArray(cheques, this.config.batchSize);

      for (const batch of batches) {
        await Promise.all(
          batch.map(async (cheque) => {
            const cacheKey = `cheque:${cheque._id}`;
            await this.cacheService.set(cacheKey, cheque, this.config.ttl);
          })
        );
      }

      // Cache cheque statistics
      const stats = await ChequeModel.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
            totalAmount: { $sum: "$amount" },
          },
        },
      ]);

      await this.cacheService.set("cheques:stats", stats, this.config.ttl);

      logger.info(`Cheque cache warmed with ${cheques.length} records`);
    } catch (error) {
      logger.error("Cheque cache warming failed:", error);
    }
  }

  /**
   * Warm user cache
   */
  async warmUserCache(): Promise<void> {
    try {
      logger.info("Warming user cache...");

      const users = await UserModel.find()
        .limit(this.config.userLimit)
        .select("-password -__v")
        .lean();

      const batches = this.chunkArray(users, this.config.batchSize);

      for (const batch of batches) {
        await Promise.all(
          batch.map(async (user) => {
            const cacheKey = `user:${user._id}`;
            await this.cacheService.set(cacheKey, user, this.config.ttl);
          })
        );
      }

      logger.info(`User cache warmed with ${users.length} records`);
    } catch (error) {
      logger.error("User cache warming failed:", error);
    }
  }

  /**
   * Warm API response cache
   */
  async warmApiResponseCache(): Promise<void> {
    try {
      logger.info("Warming API response cache...");

      // Cache common API responses
      const commonEndpoints = [
        "/api/v1/customer",
        "/api/v1/invoice",
        "/api/v1/payment",
        "/api/v1/cheques",
        "/api/v1/user",
      ];

      for (const endpoint of commonEndpoints) {
        const cacheKey = `api:${endpoint}:list`;
        await this.cacheService.set(
          cacheKey,
          { cached: true, timestamp: Date.now() },
          this.config.ttl
        );
      }

      logger.info("API response cache warmed");
    } catch (error) {
      logger.error("API response cache warming failed:", error);
    }
  }

  /**
   * Warm dashboard cache
   */
  async warmDashboardCache(): Promise<void> {
    try {
      logger.info("Warming dashboard cache...");

      // Cache dashboard statistics
      const dashboardStats = {
        totalCustomers: await CustomerModel.countDocuments(),
        totalInvoices: await InvoiceModel.countDocuments(),
        totalPayments: await PaymentModel.countDocuments(),
        totalCheques: await ChequeModel.countDocuments(),
        totalUsers: await UserModel.countDocuments(),
        recentActivity: await this.getRecentActivity(),
        timestamp: Date.now(),
      };

      await this.cacheService.set(
        "dashboard:stats",
        dashboardStats,
        this.config.ttl
      );

      logger.info("Dashboard cache warmed");
    } catch (error) {
      logger.error("Dashboard cache warming failed:", error);
    }
  }

  /**
   * Get recent activity for dashboard
   */
  private async getRecentActivity(): Promise<any[]> {
    try {
      const recentCustomers = await CustomerModel.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name email createdAt")
        .lean();

      const recentInvoices = await InvoiceModel.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("invoiceNumber amount status createdAt")
        .lean();

      const recentPayments = await PaymentModel.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("amount paymentMethod status createdAt")
        .lean();

      return [
        ...recentCustomers.map((c) => ({ type: "customer", data: c })),
        ...recentInvoices.map((i) => ({ type: "invoice", data: i })),
        ...recentPayments.map((p) => ({ type: "payment", data: p })),
      ].sort(
        (a, b) =>
          new Date(b.data.createdAt).getTime() -
          new Date(a.data.createdAt).getTime()
      );
    } catch (error) {
      logger.error("Failed to get recent activity:", error);
      return [];
    }
  }

  /**
   * Warm all caches
   */
  async warmAllCaches(): Promise<void> {
    try {
      logger.info("Starting comprehensive cache warming...");

      await this.initialize();

      // Warm all caches in parallel
      await Promise.all([
        this.warmCustomerCache(),
        this.warmInvoiceCache(),
        this.warmPaymentCache(),
        this.warmChequeCache(),
        this.warmUserCache(),
        this.warmApiResponseCache(),
        this.warmDashboardCache(),
      ]);

      logger.info("Cache warming completed successfully");
    } catch (error) {
      logger.error("Cache warming failed:", error);
      throw error;
    } finally {
      await this.cacheService.disconnect();
    }
  }

  /**
   * Utility function to chunk array
   */
  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  /**
   * Get cache warming statistics
   */
  async getWarmingStats(): Promise<any> {
    try {
      const stats = await this.cacheService.getStats();
      return {
        connected: stats.connected,
        keyspace: stats.keyspace,
        timestamp: Date.now(),
      };
    } catch (error) {
      logger.error("Failed to get warming stats:", error);
      return {
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  const warmer = new CacheWarmer();

  try {
    await warmer.warmAllCaches();

    const stats = await warmer.getWarmingStats();
    // Cache warming completed with stats

    process.exit(0);
  } catch (error) {
    // Cache warming failed: ${error.message}
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default CacheWarmer;
