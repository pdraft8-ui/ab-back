import joi from "joi";

// Validation for creating a new cheque
export const createChequeValidation = joi.object({
  customer: joi.string().hex().length(24).required().messages({
    "string.hex": "Customer ID must be a valid ObjectId",
    "string.length": "Customer ID must be 24 characters long",
    "any.required": "Customer is required",
  }),
  chequeNumber: joi.string().trim().min(1).max(50).required().messages({
    "string.min": "Cheque number cannot be empty",
    "string.max": "Cheque number cannot exceed 50 characters",
    "any.required": "Cheque number is required",
  }),
  chequeDate: joi.date().required().messages({
    "date.base": "Cheque date must be a valid date",
    "any.required": "Cheque date is required",
  }),
  chequeAmount: joi.number().positive().required().messages({
    "number.positive": "Cheque amount must be a positive number",
    "any.required": "Cheque amount is required",
  }),
  chequeStatus: joi
    .string()
    .valid("pending", "cleared", "bounced", "cancelled", "on_hold")
    .default("pending")
    .messages({
      "any.only":
        "Cheque status must be one of: pending, cleared, bounced, cancelled, on_hold",
    }),
  bankName: joi.string().trim().max(100).optional().messages({
    "string.max": "Bank name cannot exceed 100 characters",
  }),
  accountNumber: joi.string().trim().max(50).optional().messages({
    "string.max": "Account number cannot exceed 50 characters",
  }),
  notes: joi.string().trim().max(500).optional().messages({
    "string.max": "Notes cannot exceed 500 characters",
  }),
  clearedDate: joi.date().optional().messages({
    "date.base": "Cleared date must be a valid date",
  }),
});

// Validation for updating a cheque
export const updateChequeValidation = joi.object({
  customer: joi.string().hex().length(24).optional().messages({
    "string.hex": "Customer ID must be a valid ObjectId",
    "string.length": "Customer ID must be 24 characters long",
  }),
  chequeNumber: joi.string().trim().min(1).max(50).optional().messages({
    "string.min": "Cheque number cannot be empty",
    "string.max": "Cheque number cannot exceed 50 characters",
  }),
  chequeDate: joi.date().optional().messages({
    "date.base": "Cheque date must be a valid date",
  }),
  chequeAmount: joi.number().positive().optional().messages({
    "number.positive": "Cheque amount must be a positive number",
  }),
  chequeStatus: joi
    .string()
    .valid("pending", "cleared", "bounced", "cancelled", "on_hold")
    .optional()
    .messages({
      "any.only":
        "Cheque status must be one of: pending, cleared, bounced, cancelled, on_hold",
    }),
  bankName: joi.string().trim().max(100).optional().allow("").messages({
    "string.max": "Bank name cannot exceed 100 characters",
  }),
  accountNumber: joi.string().trim().max(50).optional().allow("").messages({
    "string.max": "Account number cannot exceed 50 characters",
  }),
  notes: joi.string().trim().max(500).optional().allow("").messages({
    "string.max": "Notes cannot exceed 500 characters",
  }),
  clearedDate: joi.date().optional().allow(null).messages({
    "date.base": "Cleared date must be a valid date",
  }),
});

// Validation for getting cheques with filters
export const getChequeFiltersValidation = joi.object({
  customer: joi.string().hex().length(24).optional().messages({
    "string.hex": "Customer ID must be a valid ObjectId",
    "string.length": "Customer ID must be 24 characters long",
  }),
  customerName: joi.string().trim().optional().messages({
    "string.base": "Customer name must be a string",
  }),
  customerPhone: joi.string().trim().optional().messages({
    "string.base": "Customer phone must be a string",
  }),
  chequeStatus: joi
    .string()
    .valid("pending", "cleared", "bounced", "cancelled", "on_hold")
    .optional()
    .messages({
      "any.only":
        "Cheque status must be one of: pending, cleared, bounced, cancelled, on_hold",
    }),
  startDate: joi.date().optional().messages({
    "date.base": "Start date must be a valid date",
  }),
  endDate: joi.date().optional().messages({
    "date.base": "End date must be a valid date",
  }),
  minAmount: joi.number().min(0).optional().messages({
    "number.min": "Minimum amount cannot be negative",
  }),
  maxAmount: joi.number().min(0).optional().messages({
    "number.min": "Maximum amount cannot be negative",
  }),
  bankName: joi.string().trim().optional().messages({
    "string.base": "Bank name must be a string",
  }),
  page: joi.number().integer().min(1).default(1).optional().messages({
    "number.integer": "Page must be an integer",
    "number.min": "Page must be at least 1",
  }),
  limit: joi
    .number()
    .integer()
    .min(1)
    .max(100)
    .default(10)
    .optional()
    .messages({
      "number.integer": "Limit must be an integer",
      "number.min": "Limit must be at least 1",
      "number.max": "Limit cannot exceed 100",
    }),
  sortBy: joi
    .string()
    .valid(
      "chequeDate",
      "chequeAmount",
      "createdAt",
      "chequeStatus",
      "customerName",
      "customerPhone"
    )
    .default("createdAt")
    .optional()
    .messages({
      "any.only":
        "Sort by must be one of: chequeDate, chequeAmount, createdAt, chequeStatus, customerName, customerPhone",
    }),
  sortOrder: joi
    .string()
    .valid("asc", "desc")
    .default("desc")
    .optional()
    .messages({
      "any.only": "Sort order must be either 'asc' or 'desc'",
    }),
});

// Validation for cheque ID parameter
export const chequeIdValidation = joi.object({
  chequeId: joi.string().hex().length(24).required().messages({
    "string.hex": "Cheque ID must be a valid ObjectId",
    "string.length": "Cheque ID must be 24 characters long",
    "any.required": "Cheque ID is required",
  }),
});

// Validation for bulk operations
export const bulkUpdateChequeValidation = joi.object({
  chequeIds: joi
    .array()
    .items(joi.string().hex().length(24))
    .min(1)
    .required()
    .messages({
      "array.min": "At least one cheque ID is required",
      "any.required": "Cheque IDs are required",
    }),
  chequeStatus: joi
    .string()
    .valid("pending", "cleared", "bounced", "cancelled", "on_hold")
    .required()
    .messages({
      "any.only":
        "Cheque status must be one of: pending, cleared, bounced, cancelled, on_hold",
      "any.required": "Cheque status is required for bulk update",
    }),
});
