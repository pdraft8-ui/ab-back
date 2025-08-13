/**
 * Database Optimizer Script
 * Monitors query performance and provides optimization recommendations
 */

import mongoose from "mongoose";
import CustomerModel from "../../DB/models/Customer.model.js";
import InvoiceModel from "../../DB/models/Invoice.model.js";
import PaymentModel from "../../DB/models/Payment.model.js";
import ChequeModel from "../../DB/models/Cheque.model.js";
import UserModel from "../../DB/models/user.model.js";
import logger from "../utils/logService.js";

interface QueryPerformance {
  collection: string;
  operation: string;
  duration: number;
  count: number;
  averageDuration: number;
  slowQueries: number;
}

interface IndexAnalysis {
  collection: string;
  indexes: any[];
  unusedIndexes: string[];
  missingIndexes: string[];
  recommendations: string[];
}

interface DatabaseStats {
  collections: {
    name: string;
    count: number;
    size: number;
    avgObjSize: number;
  }[];
  indexes: {
    collection: string;
    indexName: string;
    key: any;
    size: number;
  }[];
  performance: QueryPerformance[];
}

class DatabaseOptimizer {
  private db: mongoose.Connection;

  constructor() {
    this.db = mongoose.connection;
  }

  /**
   * Initialize database optimizer
   */
  async initialize(): Promise<void> {
    try {
      if (this.db.readyState !== 1) {
        throw new Error("Database not connected");
      }

      logger.info("Database optimizer initialized");
    } catch (error) {
      logger.error("Database optimizer initialization failed:", error);
      throw error;
    }
  }

  /**
   * Analyze query performance
   */
  async analyzeQueryPerformance(): Promise<QueryPerformance[]> {
    try {
      logger.info("Analyzing query performance...");

      const performance: QueryPerformance[] = [];
      const collections = [
        { name: "customers", model: CustomerModel },
        { name: "invoices", model: InvoiceModel },
        { name: "payments", model: PaymentModel },
        { name: "cheques", model: ChequeModel },
        { name: "users", model: UserModel },
      ];

      for (const collection of collections) {
        const stats = await this.analyzeCollectionPerformance(
          collection.name,
          collection.model
        );
        performance.push(stats);
      }

      logger.info("Query performance analysis completed");
      return performance;
    } catch (error) {
      logger.error("Query performance analysis failed:", error);
      throw error;
    }
  }

  /**
   * Analyze collection performance
   */
  private async analyzeCollectionPerformance(
    collectionName: string,
    model: any
  ): Promise<QueryPerformance> {
    const startTime = Date.now();
    const operations = ["find", "findOne", "count", "aggregate"];

    const stats: QueryPerformance = {
      collection: collectionName,
      operation: "overall",
      duration: 0,
      count: 0,
      averageDuration: 0,
      slowQueries: 0,
    };

    for (const operation of operations) {
      const operationStart = Date.now();

      try {
        switch (operation) {
          case "find":
            await model.find().limit(100).lean();
            break;
          case "findOne":
            await model.findOne().lean();
            break;
          case "count":
            await model.countDocuments();
            break;
          case "aggregate":
            await model.aggregate([{ $limit: 100 }]);
            break;
        }

        const duration = Date.now() - operationStart;
        stats.duration += duration;
        stats.count++;

        if (duration > 1000) {
          // Consider queries over 1 second as slow
          stats.slowQueries++;
        }
      } catch (error) {
        logger.warn(
          `Operation ${operation} failed for ${collectionName}:`,
          error
        );
      }
    }

    stats.averageDuration = stats.count > 0 ? stats.duration / stats.count : 0;
    return stats;
  }

  /**
   * Analyze indexes
   */
  async analyzeIndexes(): Promise<IndexAnalysis[]> {
    try {
      logger.info("Analyzing database indexes...");

      const analysis: IndexAnalysis[] = [];
      const collections = [
        "customers",
        "invoices",
        "payments",
        "cheques",
        "users",
      ];

      for (const collectionName of collections) {
        const collectionAnalysis = await this.analyzeCollectionIndexes(
          collectionName
        );
        analysis.push(collectionAnalysis);
      }

      logger.info("Index analysis completed");
      return analysis;
    } catch (error) {
      logger.error("Index analysis failed:", error);
      throw error;
    }
  }

  /**
   * Analyze collection indexes
   */
  private async analyzeCollectionIndexes(
    collectionName: string
  ): Promise<IndexAnalysis> {
    const analysis: IndexAnalysis = {
      collection: collectionName,
      indexes: [],
      unusedIndexes: [],
      missingIndexes: [],
      recommendations: [],
    };

    try {
      // Get current indexes
      const indexes =
        (await this.db?.db?.collection(collectionName)?.indexes()) || [];
      analysis.indexes = indexes;

      // Analyze based on collection type
      switch (collectionName) {
        case "customers":
          analysis.missingIndexes = this.analyzeCustomerIndexes(indexes);
          break;
        case "invoices":
          analysis.missingIndexes = this.analyzeInvoiceIndexes(indexes);
          break;
        case "payments":
          analysis.missingIndexes = this.analyzePaymentIndexes(indexes);
          break;
        case "cheques":
          analysis.missingIndexes = this.analyzeChequeIndexes(indexes);
          break;
        case "users":
          analysis.missingIndexes = this.analyzeUserIndexes(indexes);
          break;
      }

      // Generate recommendations
      analysis.recommendations = this.generateIndexRecommendations(analysis);
    } catch (error) {
      logger.error(`Index analysis failed for ${collectionName}:`, error);
    }

    return analysis;
  }

  /**
   * Analyze customer indexes
   */
  private analyzeCustomerIndexes(indexes: any[]): string[] {
    const missing: string[] = [];
    const indexNames = indexes.map((idx) => idx.name);

    if (!indexNames.includes("email_1")) {
      missing.push("email_1");
    }
    if (!indexNames.includes("phone_1")) {
      missing.push("phone_1");
    }
    if (!indexNames.includes("status_1")) {
      missing.push("status_1");
    }
    if (!indexNames.includes("insuranceType_1")) {
      missing.push("insuranceType_1");
    }

    return missing;
  }

  /**
   * Analyze invoice indexes
   */
  private analyzeInvoiceIndexes(indexes: any[]): string[] {
    const missing: string[] = [];
    const indexNames = indexes.map((idx) => idx.name);

    if (!indexNames.includes("customer_1")) {
      missing.push("customer_1");
    }
    if (!indexNames.includes("status_1")) {
      missing.push("status_1");
    }
    if (!indexNames.includes("dueDate_1")) {
      missing.push("dueDate_1");
    }
    if (!indexNames.includes("invoiceNumber_1")) {
      missing.push("invoiceNumber_1");
    }

    return missing;
  }

  /**
   * Analyze payment indexes
   */
  private analyzePaymentIndexes(indexes: any[]): string[] {
    const missing: string[] = [];
    const indexNames = indexes.map((idx) => idx.name);

    if (!indexNames.includes("invoice_1")) {
      missing.push("invoice_1");
    }
    if (!indexNames.includes("customer_1")) {
      missing.push("customer_1");
    }
    if (!indexNames.includes("status_1")) {
      missing.push("status_1");
    }
    if (!indexNames.includes("paymentMethod_1")) {
      missing.push("paymentMethod_1");
    }

    return missing;
  }

  /**
   * Analyze cheque indexes
   */
  private analyzeChequeIndexes(indexes: any[]): string[] {
    const missing: string[] = [];
    const indexNames = indexes.map((idx) => idx.name);

    if (!indexNames.includes("customer_1")) {
      missing.push("customer_1");
    }
    if (!indexNames.includes("status_1")) {
      missing.push("status_1");
    }
    if (!indexNames.includes("dueDate_1")) {
      missing.push("dueDate_1");
    }
    if (!indexNames.includes("bankName_1")) {
      missing.push("bankName_1");
    }

    return missing;
  }

  /**
   * Analyze user indexes
   */
  private analyzeUserIndexes(indexes: any[]): string[] {
    const missing: string[] = [];
    const indexNames = indexes.map((idx) => idx.name);

    if (!indexNames.includes("email_1")) {
      missing.push("email_1");
    }
    if (!indexNames.includes("role_1")) {
      missing.push("role_1");
    }
    if (!indexNames.includes("status_1")) {
      missing.push("status_1");
    }

    return missing;
  }

  /**
   * Generate index recommendations
   */
  private generateIndexRecommendations(analysis: IndexAnalysis): string[] {
    const recommendations: string[] = [];

    if (analysis.missingIndexes.length > 0) {
      recommendations.push(
        `Add missing indexes: ${analysis.missingIndexes.join(", ")}`
      );
    }

    if (analysis.indexes.length > 10) {
      recommendations.push(
        "Consider removing unused indexes to improve write performance"
      );
    }

    if (analysis.indexes.some((idx) => idx.size > 1000000)) {
      recommendations.push(
        "Large indexes detected. Consider index optimization"
      );
    }

    return recommendations;
  }

  /**
   * Get database statistics
   */
  async getDatabaseStats(): Promise<DatabaseStats> {
    try {
      logger.info("Collecting database statistics...");

      const collections = [
        "customers",
        "invoices",
        "payments",
        "cheques",
        "users",
      ];
      const collectionStats = [];
      const allIndexes = [];

      for (const collectionName of collections) {
        const stats = await (
          this.db?.db?.collection(collectionName) as any
        )?.stats();
        if (stats) {
          collectionStats.push({
            name: collectionName,
            count: stats.count,
            size: stats.size,
            avgObjSize: stats.avgObjSize,
          });
        }

        const indexes =
          (await this.db?.db?.collection(collectionName)?.indexes()) || [];
        allIndexes.push(
          ...indexes.map((idx) => ({
            collection: collectionName,
            indexName: idx.name || "unknown",
            key: idx.key,
            size: idx.size || 0,
          }))
        );
      }

      const performance = await this.analyzeQueryPerformance();

      const stats: DatabaseStats = {
        collections: collectionStats,
        indexes: allIndexes,
        performance,
      };

      logger.info("Database statistics collected");
      return stats;
    } catch (error) {
      logger.error("Database statistics collection failed:", error);
      throw error;
    }
  }

  /**
   * Generate optimization report
   */
  async generateOptimizationReport(): Promise<any> {
    try {
      logger.info("Generating optimization report...");

      const [performance, indexes, stats] = await Promise.all([
        this.analyzeQueryPerformance(),
        this.analyzeIndexes(),
        this.getDatabaseStats(),
      ]);

      const report = {
        timestamp: new Date().toISOString(),
        summary: {
          totalCollections: stats.collections.length,
          totalIndexes: stats.indexes.length,
          slowQueries: performance.reduce((sum, p) => sum + p.slowQueries, 0),
          averageQueryTime:
            performance.reduce((sum, p) => sum + p.averageDuration, 0) /
            performance.length,
        },
        performance,
        indexes,
        stats,
        recommendations: this.generateOverallRecommendations(
          performance,
          indexes
        ),
      };

      logger.info("Optimization report generated");
      return report;
    } catch (error) {
      logger.error("Optimization report generation failed:", error);
      throw error;
    }
  }

  /**
   * Generate overall recommendations
   */
  private generateOverallRecommendations(
    performance: QueryPerformance[],
    indexes: IndexAnalysis[]
  ): string[] {
    const recommendations: string[] = [];

    // Performance recommendations
    const slowQueries = performance.reduce((sum, p) => sum + p.slowQueries, 0);
    if (slowQueries > 0) {
      recommendations.push(`Optimize ${slowQueries} slow queries detected`);
    }

    const avgQueryTime =
      performance.reduce((sum, p) => sum + p.averageDuration, 0) /
      performance.length;
    if (avgQueryTime > 500) {
      recommendations.push(
        "Average query time is high. Consider query optimization"
      );
    }

    // Index recommendations
    const missingIndexes = indexes.reduce(
      (sum, idx) => sum + idx.missingIndexes.length,
      0
    );
    if (missingIndexes > 0) {
      recommendations.push(
        `Add ${missingIndexes} missing indexes for better performance`
      );
    }

    const totalIndexes = indexes.reduce(
      (sum, idx) => sum + idx.indexes.length,
      0
    );
    if (totalIndexes > 50) {
      recommendations.push(
        "High number of indexes detected. Consider index consolidation"
      );
    }

    // General recommendations
    recommendations.push("Consider implementing query result caching");
    recommendations.push("Monitor slow query logs regularly");
    recommendations.push("Consider database connection pooling optimization");

    return recommendations;
  }

  /**
   * Optimize database
   */
  async optimizeDatabase(): Promise<void> {
    try {
      logger.info("Starting database optimization...");

      const report = await this.generateOptimizationReport();

      // Apply optimizations based on recommendations
      for (const recommendation of report.recommendations) {
        logger.info(`Applying optimization: ${recommendation}`);

        if (recommendation.includes("missing indexes")) {
          await this.addMissingIndexes(report.indexes);
        }
      }

      logger.info("Database optimization completed");
    } catch (error) {
      logger.error("Database optimization failed:", error);
      throw error;
    }
  }

  /**
   * Add missing indexes
   */
  private async addMissingIndexes(indexes: IndexAnalysis[]): Promise<void> {
    for (const analysis of indexes) {
      if (analysis.missingIndexes.length > 0) {
        logger.info(
          `Adding missing indexes for ${
            analysis.collection
          }: ${analysis.missingIndexes.join(", ")}`
        );

        // This would typically involve creating the actual indexes
        // For now, we'll just log the recommendation
        logger.info(
          `Recommended: Add indexes ${analysis.missingIndexes.join(", ")} to ${
            analysis.collection
          }`
        );
      }
    }
  }
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  const optimizer = new DatabaseOptimizer();

  try {
    await optimizer.initialize();

    const report = await optimizer.generateOptimizationReport();
    console.log(
      "Database optimization report:",
      JSON.stringify(report, null, 2)
    );

    await optimizer.optimizeDatabase();

    process.exit(0);
  } catch (error) {
    console.error("Database optimization failed:", error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default DatabaseOptimizer;
