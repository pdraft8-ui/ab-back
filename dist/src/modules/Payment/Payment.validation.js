import Joi from "joi";
export const createPaymentValidation = Joi.object({
    invoiceId: Joi.string().required().messages({
        "string.empty": "Invoice ID is required",
        "any.required": "Invoice ID is required",
    }),
    customerId: Joi.string().required().messages({
        "string.empty": "Customer ID is required",
        "any.required": "Customer ID is required",
    }),
    paymentMethod: Joi.string()
        .valid("Cash", "Credit Card", "Bank Transfer", "Check", "Online Payment")
        .required()
        .messages({
        "string.empty": "Payment method is required",
        "any.required": "Payment method is required",
        "any.only": "Payment method must be one of: Cash, Credit Card, Bank Transfer, Check, Online Payment",
    }),
    paymentAmount: Joi.number().positive().required().messages({
        "number.base": "Payment amount must be a number",
        "number.positive": "Payment amount must be positive",
        "any.required": "Payment amount is required",
    }),
    paymentDate: Joi.date().optional(),
    notes: Joi.string().optional(),
    referenceNumber: Joi.string().optional(),
});
export const updatePaymentValidation = Joi.object({
    paymentMethod: Joi.string()
        .valid("Cash", "Credit Card", "Bank Transfer", "Check", "Online Payment")
        .optional()
        .messages({
        "any.only": "Payment method must be one of: Cash, Credit Card, Bank Transfer, Check, Online Payment",
    }),
    paymentAmount: Joi.number().positive().optional().messages({
        "number.base": "Payment amount must be a number",
        "number.positive": "Payment amount must be positive",
    }),
    paymentDate: Joi.date().optional(),
    notes: Joi.string().optional(),
    referenceNumber: Joi.string().optional(),
    status: Joi.string()
        .valid("Pending", "Completed", "Failed", "Refunded")
        .optional(),
});
export const getPaymentsValidation = Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
    status: Joi.string()
        .valid("Pending", "Completed", "Failed", "Refunded")
        .optional(),
    customerId: Joi.string().optional(),
    invoiceId: Joi.string().optional(),
    paymentMethod: Joi.string()
        .valid("Cash", "Credit Card", "Bank Transfer", "Check", "Online Payment")
        .optional(),
    startDate: Joi.date().optional(),
    endDate: Joi.date().optional(),
    search: Joi.string().optional(),
});
export const getPaymentStatsValidation = Joi.object({
    startDate: Joi.date().optional(),
    endDate: Joi.date().optional(),
    paymentMethod: Joi.string()
        .valid("Cash", "Credit Card", "Bank Transfer", "Check", "Online Payment")
        .optional(),
});
export const refundPaymentValidation = Joi.object({
    refundAmount: Joi.number().positive().required().messages({
        "number.base": "Refund amount must be a number",
        "number.positive": "Refund amount must be positive",
        "any.required": "Refund amount is required",
    }),
    reason: Joi.string().required().messages({
        "string.empty": "Refund reason is required",
        "any.required": "Refund reason is required",
    }),
});
//# sourceMappingURL=Payment.validation.js.map