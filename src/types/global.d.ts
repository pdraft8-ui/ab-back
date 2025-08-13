// Global type declarations for JavaScript modules and external packages

declare module "express" {
  export * from "express";
}

declare module "prom-client" {
  export const register: any;
  export const collectDefaultMetrics: any;
  export const Counter: any;
  export const Histogram: any;
  export const Gauge: any;
}

declare module "*.js" {
  const content: any;
  export default content;
  export * from content;
}

declare module "*.json" {
  const content: any;
  export default content;
}

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      apiVersion?: string;
    }
  }
}

// Ensure this file is treated as a module
export {}; 