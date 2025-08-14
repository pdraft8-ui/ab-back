/**
 * Database Optimizer Script
 * Monitors query performance and provides optimization recommendations
 */
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
declare class DatabaseOptimizer {
    private db;
    constructor();
    /**
     * Initialize database optimizer
     */
    initialize(): Promise<void>;
    /**
     * Analyze query performance
     */
    analyzeQueryPerformance(): Promise<QueryPerformance[]>;
    /**
     * Analyze collection performance
     */
    private analyzeCollectionPerformance;
    /**
     * Analyze indexes
     */
    analyzeIndexes(): Promise<IndexAnalysis[]>;
    /**
     * Analyze collection indexes
     */
    private analyzeCollectionIndexes;
    /**
     * Analyze customer indexes
     */
    private analyzeCustomerIndexes;
    /**
     * Analyze invoice indexes
     */
    private analyzeInvoiceIndexes;
    /**
     * Analyze payment indexes
     */
    private analyzePaymentIndexes;
    /**
     * Analyze cheque indexes
     */
    private analyzeChequeIndexes;
    /**
     * Analyze user indexes
     */
    private analyzeUserIndexes;
    /**
     * Generate index recommendations
     */
    private generateIndexRecommendations;
    /**
     * Get database statistics
     */
    getDatabaseStats(): Promise<DatabaseStats>;
    /**
     * Generate optimization report
     */
    generateOptimizationReport(): Promise<any>;
    /**
     * Generate overall recommendations
     */
    private generateOverallRecommendations;
    /**
     * Optimize database
     */
    optimizeDatabase(): Promise<void>;
    /**
     * Add missing indexes
     */
    private addMissingIndexes;
}
export default DatabaseOptimizer;
//# sourceMappingURL=databaseOptimizer.d.ts.map