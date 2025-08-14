import Joi from "joi";
export const createDirectPaymentValidation = {
    body: Joi.object({
        invoiceId: Joi.string().required().messages({
            "string.empty": "Invoice ID is required",
            "any.required": "Invoice ID is required",
        }),
        customerId: Joi.string().required().messages({
            "string.empty": "Customer ID is required",
            "any.required": "Customer ID is required",
        }),
        amount: Joi.number().positive().required().messages({
            "number.base": "Amount must be a number",
            "number.positive": "Amount must be positive",
            "any.required": "Amount is required",
        }),
        currency: Joi.string().valid("ILS", "USD", "EUR").default("ILS").messages({
            "any.only": "Currency must be ILS, USD, or EUR",
        }),
        description: Joi.string().max(255).optional().messages({
            "string.max": "Description cannot exceed 255 characters",
        }),
        customerEmail: Joi.string().email().optional().messages({
            "string.email": "Customer email must be a valid email address",
        }),
        customerPhone: Joi.string().optional().messages({
            "string.empty": "Customer phone cannot be empty",
        }),
        returnUrl: Joi.string().uri().optional().messages({
            "string.uri": "Return URL must be a valid URI",
        }),
        cancelUrl: Joi.string().uri().optional().messages({
            "string.uri": "Cancel URL must be a valid URI",
        }),
    }),
};
export const getPaymentStatusValidation = {
    params: Joi.object({
        paymentId: Joi.string().required().messages({
            "string.empty": "Payment ID is required",
            "any.required": "Payment ID is required",
        }),
    }),
};
export const refundDirectPaymentValidation = {
    params: Joi.object({
        paymentId: Joi.string().required().messages({
            "string.empty": "Payment ID is required",
            "any.required": "Payment ID is required",
        }),
    }),
    body: Joi.object({
        amount: Joi.number().positive().optional().messages({
            "number.base": "Amount must be a number",
            "number.positive": "Amount must be positive",
        }),
        reason: Joi.string().max(255).optional().messages({
            "string.max": "Reason cannot exceed 255 characters",
        }),
    }),
};
export const getPaymentHistoryValidation = {
    query: Joi.object({
        page: Joi.number().integer().min(1).default(1).messages({
            "number.base": "Page must be a number",
            "number.integer": "Page must be an integer",
            "number.min": "Page must be at least 1",
        }),
        limit: Joi.number().integer().min(1).max(100).default(10).messages({
            "number.base": "Limit must be a number",
            "number.integer": "Limit must be an integer",
            "number.min": "Limit must be at least 1",
            "number.max": "Limit cannot exceed 100",
        }),
        status: Joi.string()
            .valid("pending", "completed", "failed", "refunded")
            .optional()
            .messages({
            "any.only": "Status must be pending, completed, failed, or refunded",
        }),
        startDate: Joi.date().optional().messages({
            "date.base": "Start date must be a valid date",
        }),
        endDate: Joi.date().optional().messages({
            "date.base": "End date must be a valid date",
        }),
    }),
};
//# sourceMappingURL=TranzilaPayment.validation.js.map