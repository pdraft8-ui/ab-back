/**
 * TypeScript Type Definitions
 * Centralized type definitions for the insurance backend application
 */

// ============================================================================
// CORE TYPES
// ============================================================================

export interface User {
  id: string;
  email: string;
  password?: string;
  role: "admin" | "user" | "manager";
  status: "active" | "inactive" | "suspended";
  departmentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  insuranceType: string;
  policyNumber: string;
  status: "active" | "inactive" | "expired";
  createdAt: Date;
  updatedAt: Date;
}

export interface Invoice {
  id: string;
  customer: string;
  invoiceNumber: string;
  amount: number;
  balanceDue: number;
  status: "pending" | "paid" | "overdue" | "cancelled";
  dueDate: Date;
  invoiceDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  invoice: string;
  customer: string;
  amount: number;
  paymentMethod: "cash" | "card" | "bank_transfer" | "cheque";
  status: "pending" | "completed" | "failed" | "refunded";
  referenceNumber?: string;
  paymentDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Cheque {
  id: string;
  chequeNumber: string;
  amount: number;
  bankName: string;
  branchName: string;
  accountNumber: string;
  issueDate: Date;
  dueDate: Date;
  status: "Pending" | "Processing" | "Cleared" | "Bounced" | "Cancelled";
  customer: string;
  invoice: string;
  notes?: string;
  imageUrl?: string;
  createdBy: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// API TYPES
// ============================================================================

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  errors?: any[];
  stack?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface FilterOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

// ============================================================================
// REQUEST TYPES
// ============================================================================

export interface CreateCustomerRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
  insuranceType: string;
  policyNumber: string;
}

export interface CreateInvoiceRequest {
  customer: string;
  invoiceNumber: string;
  amount: number;
  dueDate: Date;
  description?: string;
}

export interface CreatePaymentRequest {
  invoice: string;
  amount: number;
  paymentMethod: "cash" | "card" | "bank_transfer" | "cheque";
  referenceNumber?: string;
}

export interface CreateChequeRequest {
  customer: string;
  customerName: string;
  customerPhone: string;
  chequeNumber: string;
  chequeAmount: number;
  chequeDate: Date;
  bankName: string;
  accountNumber: string;
  chequeImage?: string;
  notes?: string;
}

// ============================================================================
// CACHE TYPES
// ============================================================================

export interface CacheStats {
  connected: boolean;
  keyspace?: number;
  info?: Record<string, string>;
  error?: string;
}

export interface CacheOptions {
  ttl?: number;
  keyPrefix?: string;
  includeQuery?: boolean;
  includeBody?: boolean;
  includeHeaders?: boolean;
  skipCache?: boolean;
}

// ============================================================================
// MONITORING TYPES
// ============================================================================

export interface PerformanceMetrics {
  timestamp: Date;
  endpoint: string;
  method: string;
  duration: number;
  statusCode: number;
  userAgent?: string;
  ip: string;
}

export interface SystemMetrics {
  cpu: number;
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  uptime: number;
  activeConnections: number;
}

export interface DatabaseMetrics {
  queryCount: number;
  slowQueries: number;
  averageQueryTime: number;
  connectionPool: {
    active: number;
    idle: number;
    total: number;
  };
}

// ============================================================================
// SECURITY TYPES
// ============================================================================

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export interface AuthRequest extends Request {
  user?: User;
}

export interface SanitizedRequest extends Request {
  body: any;
  query: any;
  params: any;
  headers: any;
}

// ============================================================================
// VALIDATION TYPES
// ============================================================================

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface ValidationSchema {
  body?: any;
  query?: any;
  params?: any;
  headers?: any;
}

// ============================================================================
// FILE UPLOAD TYPES
// ============================================================================

export interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer?: Buffer;
}

export interface FileValidationOptions {
  allowedTypes: string[];
  maxSize: number;
  maxFiles?: number;
}

// ============================================================================
// ERROR TYPES
// ============================================================================

export interface AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  code?: string;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

// ============================================================================
// CONFIGURATION TYPES
// ============================================================================

export interface DatabaseConfig {
  url: string;
  options: {
    serverSelectionTimeoutMS: number;
    socketTimeoutMS: number;
    maxPoolSize: number;
    minPoolSize: number;
    maxIdleTimeMS: number;
  };
}

export interface RedisConfig {
  url: string;
  password?: string;
  retryStrategy?: (options: any) => number | Error;
}

export interface SecurityConfig {
  jwtSecret: string;
  jwtExpiresIn: string;
  bcryptRounds: number;
  rateLimitWindow: number;
  rateLimitMax: number;
  corsOrigins: string[];
}

// ============================================================================
// ENVIRONMENT TYPES
// ============================================================================

export interface Environment {
  NODE_ENV: "development" | "production" | "test";
  PORT: number;
  DBURL: string;
  REDIS_URL: string;
  REDIS_PASSWORD?: string;
  TokenSignIn: string;
  authBearerToken: string;
  ALLOWED_ORIGINS?: string;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// ============================================================================
// GENERIC TYPES
// ============================================================================

export type Repository<T> = {
  create(data: Partial<T>): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(filters?: any): Promise<T[]>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
  count(filters?: any): Promise<number>;
};

export type UseCase<TInput, TOutput> = {
  execute(input: TInput): Promise<TOutput>;
};

export type Controller<TRequest, TResponse> = {
  handle(request: TRequest): Promise<TResponse>;
};
