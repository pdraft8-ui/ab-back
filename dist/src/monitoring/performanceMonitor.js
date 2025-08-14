/**
 * Performance Monitoring System
 * Tracks API performance, system metrics, and database performance
 */
import { performance } from "perf_hooks";
import { register, collectDefaultMetrics, Counter, Histogram, Gauge, } from "prom-client";
import logger from "../utils/logService.js";
// ============================================================================
// PROMETHEUS METRICS
// ============================================================================
// Collect default metrics (CPU, memory, etc.)
collectDefaultMetrics();
// Custom metrics
const httpRequestDuration = new Histogram({
    name: "http_request_duration_seconds",
    help: "Duration of HTTP requests in seconds",
    labelNames: ["method", "route", "status_code"],
    buckets: [0.1, 0.5, 1, 2, 5, 10],
});
const httpRequestTotal = new Counter({
    name: "http_requests_total",
    help: "Total number of HTTP requests",
    labelNames: ["method", "route", "status_code"],
});
const httpRequestErrors = new Counter({
    name: "http_request_errors_total",
    help: "Total number of HTTP request errors",
    labelNames: ["method", "route", "error_type"],
});
const databaseQueryDuration = new Histogram({
    name: "database_query_duration_seconds",
    help: "Duration of database queries in seconds",
    labelNames: ["collection", "operation"],
    buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
});
const databaseQueryTotal = new Counter({
    name: "database_queries_total",
    help: "Total number of database queries",
    labelNames: ["collection", "operation"],
});
const cacheHitRatio = new Gauge({
    name: "cache_hit_ratio",
    help: "Cache hit ratio percentage",
});
const activeConnections = new Gauge({
    name: "active_connections",
    help: "Number of active connections",
});
const memoryUsage = new Gauge({
    name: "memory_usage_bytes",
    help: "Memory usage in bytes",
    labelNames: ["type"],
});
const cpuUsage = new Gauge({
    name: "cpu_usage_percentage",
    help: "CPU usage percentage",
});
// ============================================================================
// PERFORMANCE MONITORING MIDDLEWARE
// ============================================================================
export const performanceMonitoringMiddleware = (req, res, next) => {
    const start = performance.now();
    const startTime = Date.now();
    // Override res.end to capture response time
    const originalEnd = res.end;
    res.end = function (chunk, encoding) {
        const duration = performance.now() - start;
        const responseTime = Date.now() - startTime;
        // Record metrics
        const route = req.route?.path || req.path;
        const method = req.method;
        const statusCode = res.statusCode;
        // Prometheus metrics
        httpRequestDuration.observe({ method, route, status_code: statusCode }, duration / 1000);
        httpRequestTotal.inc({ method, route, status_code: statusCode });
        if (statusCode >= 400) {
            httpRequestErrors.inc({ method, route, error_type: "http_error" });
        }
        // Log performance metrics
        const metrics = {
            timestamp: new Date(),
            endpoint: route,
            method,
            duration: responseTime,
            statusCode,
            userAgent: req.get("User-Agent"),
            ip: req.ip,
        };
        logPerformanceMetrics(metrics);
        // Call original end method
        return originalEnd.call(this, chunk, encoding);
    };
    next();
};
// ============================================================================
// DATABASE MONITORING
// ============================================================================
export const databaseMonitoringMiddleware = (req, res, next) => {
    const originalQuery = req.app.locals.mongoose?.connection?.db?.collection;
    if (originalQuery) {
        // Override collection methods to track database performance
        const collections = [
            "customers",
            "invoices",
            "payments",
            "cheques",
            "users",
        ];
        collections.forEach((collectionName) => {
            const collection = req.app.locals.mongoose?.connection?.db?.collection(collectionName);
            if (collection) {
                const originalFind = collection.find;
                const originalFindOne = collection.findOne;
                const originalInsertOne = collection.insertOne;
                const originalUpdateOne = collection.updateOne;
                const originalDeleteOne = collection.deleteOne;
                collection.find = function (...args) {
                    const start = performance.now();
                    const result = originalFind.apply(this, args);
                    result.toArray().then(() => {
                        const duration = performance.now() - start;
                        databaseQueryDuration.observe({ collection: collectionName, operation: "find" }, duration / 1000);
                        databaseQueryTotal.inc({
                            collection: collectionName,
                            operation: "find",
                        });
                    });
                    return result;
                };
                collection.findOne = function (...args) {
                    const start = performance.now();
                    const result = originalFindOne.apply(this, args);
                    result.then(() => {
                        const duration = performance.now() - start;
                        databaseQueryDuration.observe({ collection: collectionName, operation: "findOne" }, duration / 1000);
                        databaseQueryTotal.inc({
                            collection: collectionName,
                            operation: "findOne",
                        });
                    });
                    return result;
                };
                collection.insertOne = function (...args) {
                    const start = performance.now();
                    const result = originalInsertOne.apply(this, args);
                    result.then(() => {
                        const duration = performance.now() - start;
                        databaseQueryDuration.observe({ collection: collectionName, operation: "insertOne" }, duration / 1000);
                        databaseQueryTotal.inc({
                            collection: collectionName,
                            operation: "insertOne",
                        });
                    });
                    return result;
                };
                collection.updateOne = function (...args) {
                    const start = performance.now();
                    const result = originalUpdateOne.apply(this, args);
                    result.then(() => {
                        const duration = performance.now() - start;
                        databaseQueryDuration.observe({ collection: collectionName, operation: "updateOne" }, duration / 1000);
                        databaseQueryTotal.inc({
                            collection: collectionName,
                            operation: "updateOne",
                        });
                    });
                    return result;
                };
                collection.deleteOne = function (...args) {
                    const start = performance.now();
                    const result = originalDeleteOne.apply(this, args);
                    result.then(() => {
                        const duration = performance.now() - start;
                        databaseQueryDuration.observe({ collection: collectionName, operation: "deleteOne" }, duration / 1000);
                        databaseQueryTotal.inc({
                            collection: collectionName,
                            operation: "deleteOne",
                        });
                    });
                    return result;
                };
            }
        });
    }
    next();
};
// ============================================================================
// SYSTEM METRICS COLLECTION
// ============================================================================
export const collectSystemMetrics = () => {
    const usage = process.memoryUsage();
    const uptime = process.uptime();
    const metrics = {
        cpu: process.cpuUsage().user / 1000000, // Convert to seconds
        memory: {
            used: usage.heapUsed,
            total: usage.heapTotal,
            percentage: (usage.heapUsed / usage.heapTotal) * 100,
        },
        uptime,
        activeConnections: global.activeConnections || 0,
    };
    // Update Prometheus gauges
    memoryUsage.set({ type: "heap_used" }, usage.heapUsed);
    memoryUsage.set({ type: "heap_total" }, usage.heapTotal);
    cpuUsage.set(metrics.cpu);
    activeConnections.set(metrics.activeConnections);
    return metrics;
};
// ============================================================================
// CACHE MONITORING
// ============================================================================
export const updateCacheMetrics = (hitCount, missCount) => {
    const total = hitCount + missCount;
    const hitRatio = total > 0 ? (hitCount / total) * 100 : 0;
    cacheHitRatio.set(hitRatio);
};
// ============================================================================
// LOGGING FUNCTIONS
// ============================================================================
const logPerformanceMetrics = (metrics) => {
    const logLevel = metrics.duration > 1000 ? "warn" : "info";
    const message = `${metrics.method} ${metrics.endpoint} - ${metrics.duration}ms - ${metrics.statusCode}`;
    logger[logLevel](message, {
        performance: metrics,
        userAgent: metrics.userAgent,
        ip: metrics.ip,
    });
};
export const logSystemMetrics = (metrics) => {
    logger.info("System metrics collected", {
        system: metrics,
        timestamp: new Date().toISOString(),
    });
};
// ============================================================================
// METRICS ENDPOINTS
// ============================================================================
export const getMetrics = async (req, res) => {
    try {
        const metrics = await register.metrics();
        res.set("Content-Type", register.contentType);
        res.end(metrics);
    }
    catch (error) {
        logger.error("Error collecting metrics:", error);
        res.status(500).json({ error: "Failed to collect metrics" });
    }
};
export const getHealthCheck = async (req, res) => {
    try {
        const systemMetrics = collectSystemMetrics();
        res.json({
            status: "healthy",
            timestamp: new Date().toISOString(),
            uptime: systemMetrics.uptime,
            memory: systemMetrics.memory,
            activeConnections: systemMetrics.activeConnections,
        });
    }
    catch (error) {
        logger.error("Health check failed:", error);
        res.status(503).json({
            status: "unhealthy",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
// ============================================================================
// PERFORMANCE REPORTS
// ============================================================================
export const generatePerformanceReport = () => {
    const systemMetrics = collectSystemMetrics();
    return {
        timestamp: new Date().toISOString(),
        system: systemMetrics,
        recommendations: generateRecommendations(systemMetrics),
    };
};
const generateRecommendations = (metrics) => {
    const recommendations = [];
    if (metrics.memory.percentage > 80) {
        recommendations.push("High memory usage detected. Consider optimizing memory usage or scaling up.");
    }
    if (metrics.cpu > 70) {
        recommendations.push("High CPU usage detected. Consider optimizing CPU-intensive operations.");
    }
    if (metrics.activeConnections > 100) {
        recommendations.push("High number of active connections. Consider connection pooling optimization.");
    }
    return recommendations;
};
// ============================================================================
// EXPORTS
// ============================================================================
export default {
    performanceMonitoringMiddleware,
    databaseMonitoringMiddleware,
    collectSystemMetrics,
    updateCacheMetrics,
    getMetrics,
    getHealthCheck,
    generatePerformanceReport,
};
//# sourceMappingURL=performanceMonitor.js.map