/**
 * Cache Middleware
 * Provides caching functionality for Express routes
 */
import { CacheService } from "../infrastructure/services/CacheService.js";
const cacheService = new CacheService();
// Initialize cache service
cacheService.connect().catch(console.error);
/**
 * Cache middleware factory
 * @param {Object} options - Cache options
 * @returns {Function} Express middleware function
 */
export const cacheMiddleware = (options = {}) => {
    const { ttl = 3600, // 1 hour default
    keyPrefix = "api", includeQuery = true, includeBody = false, includeHeaders = false, skipCache = false, } = options;
    return async (req, res, next) => {
        // Skip cache if explicitly disabled
        if (skipCache || req.headers["x-skip-cache"] === "true") {
            return next();
        }
        try {
            // Generate cache key
            const cacheKey = generateCacheKey(req, keyPrefix, {
                includeQuery,
                includeBody,
                includeHeaders,
            });
            // Try to get from cache
            const cachedData = await cacheService.get(cacheKey);
            if (cachedData) {
                return res.status(200).json({
                    success: true,
                    message: "Data retrieved from cache",
                    data: cachedData,
                    cached: true,
                });
            }
            // Store original send method
            const originalSend = res.send;
            // Override send method to cache response
            res.send = function (data) {
                try {
                    // Only cache successful responses
                    if (res.statusCode === 200 && data) {
                        let parsedData;
                        try {
                            parsedData = JSON.parse(data);
                        }
                        catch {
                            parsedData = data;
                        }
                        // Cache the response
                        cacheService.set(cacheKey, parsedData, ttl);
                    }
                }
                catch (error) {
                    console.error("Cache middleware error:", error);
                }
                // Call original send method
                return originalSend.call(this, data);
            };
            next();
        }
        catch (error) {
            console.error("Cache middleware error:", error);
            next();
        }
    };
};
/**
 * Generate cache key from request
 * @param {Object} req - Express request object
 * @param {string} prefix - Key prefix
 * @param {Object} options - Key generation options
 * @returns {string} Cache key
 */
function generateCacheKey(req, prefix, options = {}) {
    const { includeQuery = true, includeBody = false, includeHeaders = false, } = options;
    const keyParts = [prefix, req.method, req.originalUrl || req.url];
    // Include query parameters
    if (includeQuery && Object.keys(req.query).length > 0) {
        const queryString = Object.keys(req.query)
            .sort()
            .map((key) => `${key}=${req.query[key]}`)
            .join("&");
        keyParts.push(`query:${queryString}`);
    }
    // Include body (for POST/PUT requests)
    if (includeBody &&
        ["POST", "PUT", "PATCH"].includes(req.method) &&
        req.body) {
        const bodyString = JSON.stringify(req.body);
        keyParts.push(`body:${bodyString}`);
    }
    // Include specific headers
    if (includeHeaders) {
        const relevantHeaders = ["authorization", "content-type", "accept"];
        const headerString = relevantHeaders
            .map((header) => `${header}:${req.headers[header] || ""}`)
            .join("|");
        keyParts.push(`headers:${headerString}`);
    }
    return keyParts.join(":");
}
/**
 * Cache invalidation middleware
 * @param {string} pattern - Cache pattern to invalidate
 * @returns {Function} Express middleware function
 */
export const invalidateCache = (pattern) => {
    return async (req, res, next) => {
        try {
            await cacheService.invalidatePattern(pattern);
            next();
        }
        catch (error) {
            console.error("Cache invalidation error:", error);
            next();
        }
    };
};
/**
 * Cache statistics middleware
 * @returns {Function} Express middleware function
 */
export const cacheStats = () => {
    return async (req, res) => {
        try {
            const stats = await cacheService.getStats();
            res.json({
                success: true,
                message: "Cache statistics retrieved",
                data: stats,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get cache statistics",
                error: error.message,
            });
        }
    };
};
/**
 * Clear cache middleware
 * @returns {Function} Express middleware function
 */
export const clearCache = () => {
    return async (req, res) => {
        try {
            await cacheService.clear();
            res.json({
                success: true,
                message: "Cache cleared successfully",
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to clear cache",
                error: error.message,
            });
        }
    };
};
/**
 * Cache service getter
 * @returns {CacheService} Cache service instance
 */
export const getCacheService = () => {
    return cacheService;
};
//# sourceMappingURL=cache.js.map