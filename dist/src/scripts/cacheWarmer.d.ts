/**
 * Cache Warmer Script
 * Preloads frequently accessed data into Redis cache for better performance
 */
declare class CacheWarmer {
    private cacheService;
    private config;
    constructor();
    /**
     * Initialize cache warming
     */
    initialize(): Promise<void>;
    /**
     * Warm customer cache
     */
    warmCustomerCache(): Promise<void>;
    /**
     * Warm invoice cache
     */
    warmInvoiceCache(): Promise<void>;
    /**
     * Warm payment cache
     */
    warmPaymentCache(): Promise<void>;
    /**
     * Warm cheque cache
     */
    warmChequeCache(): Promise<void>;
    /**
     * Warm user cache
     */
    warmUserCache(): Promise<void>;
    /**
     * Warm API response cache
     */
    warmApiResponseCache(): Promise<void>;
    /**
     * Warm dashboard cache
     */
    warmDashboardCache(): Promise<void>;
    /**
     * Get recent activity for dashboard
     */
    private getRecentActivity;
    /**
     * Warm all caches
     */
    warmAllCaches(): Promise<void>;
    /**
     * Utility function to chunk array
     */
    private chunkArray;
    /**
     * Get cache warming statistics
     */
    getWarmingStats(): Promise<any>;
}
export default CacheWarmer;
//# sourceMappingURL=cacheWarmer.d.ts.map