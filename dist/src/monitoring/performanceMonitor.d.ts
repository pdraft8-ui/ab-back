/**
 * Performance Monitoring System
 * Tracks API performance, system metrics, and database performance
 */
import { Request, Response, NextFunction } from "express";
import { SystemMetrics } from "../types/index.js";
export declare const performanceMonitoringMiddleware: (req: Request, res: Response, next: NextFunction) => void;
export declare const databaseMonitoringMiddleware: (req: Request, res: Response, next: NextFunction) => void;
export declare const collectSystemMetrics: () => SystemMetrics;
export declare const updateCacheMetrics: (hitCount: number, missCount: number) => void;
export declare const logSystemMetrics: (metrics: SystemMetrics) => void;
export declare const getMetrics: (req: Request, res: Response) => Promise<void>;
export declare const getHealthCheck: (req: Request, res: Response) => Promise<void>;
export declare const generatePerformanceReport: () => {
    timestamp: string;
    system: SystemMetrics;
    recommendations: string[];
};
declare const _default: {
    performanceMonitoringMiddleware: (req: Request, res: Response, next: NextFunction) => void;
    databaseMonitoringMiddleware: (req: Request, res: Response, next: NextFunction) => void;
    collectSystemMetrics: () => SystemMetrics;
    updateCacheMetrics: (hitCount: number, missCount: number) => void;
    getMetrics: (req: Request, res: Response) => Promise<void>;
    getHealthCheck: (req: Request, res: Response) => Promise<void>;
    generatePerformanceReport: () => {
        timestamp: string;
        system: SystemMetrics;
        recommendations: string[];
    };
};
export default _default;
//# sourceMappingURL=performanceMonitor.d.ts.map