import Joi from "joi";

export const createInvoiceValidation = Joi.object({
  customerId: Joi.string().required().messages({
    "string.empty": "Customer ID is required",
    "any.required": "Customer ID is required",
  }),
  insurancePolicyId: Joi.string().required().messages({
    "string.empty": "Insurance Policy ID is required",
    "any.required": "Insurance Policy ID is required",
  }),
  vehicleId: Joi.string().required().messages({
    "string.empty": "Vehicle ID is required",
    "any.required": "Vehicle ID is required",
  }),
  totalAmount: Joi.number().positive().required().messages({
    "number.base": "Total amount must be a number",
    "number.positive": "Total amount must be positive",
    "any.required": "Total amount is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Description is required",
    "any.required": "Description is required",
  }),
  notes: Joi.string().optional(),
  dueDate: Joi.date().optional(),
});

export const updateInvoiceValidation = Joi.object({
  totalAmount: Joi.number().positive().optional().messages({
    "number.base": "Total amount must be a number",
    "number.positive": "Total amount must be positive",
  }),
  description: Joi.string().optional(),
  notes: Joi.string().optional(),
  dueDate: Joi.date().optional(),
  status: Joi.string()
    .valid("Pending", "Partially Paid", "Paid", "Overdue")
    .optional(),
});

export const getInvoicesValidation = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(100).optional(),
  status: Joi.string()
    .valid("Pending", "Partially Paid", "Paid", "Overdue")
    .optional(),
  customerId: Joi.string().optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  search: Joi.string().optional(),
});

export const getInvoiceStatsValidation = Joi.object({
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
});
