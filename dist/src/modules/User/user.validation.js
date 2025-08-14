import Joi from "joi";
export const signin = {
    body: Joi.object({
        email: Joi.string().email().required().messages({
            "string.email": "يرجى ادخال عنوان بريد الكتروني صحيح",
        }),
        password: Joi.string().required().min(7).messages({
            "string.min": "يجب ان تتكون كلمة المرور على الاقل من 7 حروف",
        }),
    }).required(),
};
export const forgetPassword = {
    body: Joi.object({
        newPassword: Joi.string().required().min(7).messages({
            "string.min": "يجب ان يتكون كلمة المرور من 7 حرفًا على الاقل ",
        }),
        email: Joi.string().email().required().messages({
            "string.email": "يرجى ادخال عنوان بريد الكتروني صحيح",
        }),
        code: Joi.string().required(),
    }).required(),
};
export const sendCode = {
    body: Joi.object({
        email: Joi.string().required().email().messages({
            "string.email": "يرجى ادخال عنوان بريد الكتروني صحيح",
        }),
    }).required(),
};
export const addAgent = {
    body: Joi.object({
        name: Joi.string().required().min(3).max(25).messages({
            "string.min": "يجب ان يكون اسم المستخدم على الاقل حرفان ",
            "string.max": "يجب ان يكون اسم المستخدم على الاكثر 25 حرف",
        }),
        email: Joi.string().required().email().messages({
            "string.email": "يرجى ادخال عنوان بريد الكتروني صحيح",
        }),
        password: Joi.string().optional().min(7).messages({
            "string.min": "يجب ان تتكون كلمة المرور على الاقل من 7 حروف",
        }),
    }).required(),
};
export const addHeadOfDepartmentToDepartment = {
    body: Joi.object({
        name: Joi.string().required().min(3).max(25).messages({
            "string.min": "يجب ان يكون اسم المستخدم على الاقل حرفان ",
            "string.max": "يجب ان يكون اسم المستخدم على الاكثر 25 حرف",
        }),
        email: Joi.string().required().email().messages({
            "string.email": "يرجى ادخال عنوان بريد الكتروني صحيح",
        }),
        phone: Joi.string()
            .optional()
            .pattern(/^\+?[\d\s\-\(\)]+$/)
            .messages({
            "string.pattern.base": "يرجى ادخال رقم هاتف صحيح",
        }),
        password: Joi.string().required().min(7).messages({
            "string.min": "يجب ان تتكون كلمة المرور على الاقل من 7 حروف",
        }),
    }).required(),
};
export const AddEmployee = {
    body: Joi.object({
        name: Joi.string().required().min(3).max(25).messages({
            "string.min": "يجب ان يكون اسم المستخدم على الاقل حرفان ",
            "string.max": "يجب ان يكون اسم المستخدم على الاكثر 25 حرف",
        }),
        email: Joi.string().required().email().messages({
            "string.email": "يرجى ادخال عنوان بريد الكتروني صحيح",
        }),
        phone: Joi.string()
            .optional()
            .pattern(/^\+?[\d\s\-\(\)]+$/)
            .messages({
            "string.pattern.base": "يرجى ادخال رقم هاتف صحيح",
        }),
        password: Joi.string().required().min(7).messages({
            "string.min": "يجب ان تتكون كلمة المرور على الاقل من 7 حروف",
        }),
    }).required(),
};
export const updateEmployee = {
    body: Joi.object({
        name: Joi.string().optional().min(3).max(25).messages({
            "string.min": "يجب ان يكون اسم المستخدم على الاقل حرفان ",
            "string.max": "يجب ان يكون اسم المستخدم على الاكثر 25 حرف",
        }),
        email: Joi.string().optional().email().messages({
            "string.email": "يرجى ادخال عنوان بريد الكتروني صحيح",
        }),
        phone: Joi.string()
            .optional()
            .pattern(/^\+?[\d\s\-\(\)]+$/)
            .messages({
            "string.pattern.base": "يرجى ادخال رقم هاتف صحيح",
        }),
        status: Joi.string().optional().valid("active", "inactive").messages({
            "any.only": "يجب ان تكون الحالة active أو inactive",
        }),
    }).required(),
};
export const resetEmployeePassword = {
    body: Joi.object({
        newPassword: Joi.string().required().min(7).messages({
            "string.min": "يجب ان تتكون كلمة المرور على الاقل من 7 حروف",
        }),
    }).required(),
};
export const toggleEmployeeStatus = {
    body: Joi.object({
        status: Joi.string().required().valid("active", "inactive").messages({
            "any.only": "يجب ان تكون الحالة active أو inactive",
        }),
    }).required(),
};
export const sendCustomEmail = {
    body: Joi.object({
        to: Joi.string().email().required().messages({
            "string.email": "يرجى ادخال عنوان بريد الكتروني صحيح",
            "any.required": "عنوان البريد الإلكتروني مطلوب",
        }),
        subject: Joi.string().min(1).max(200).required().messages({
            "any.required": "موضوع البريد الإلكتروني مطلوب",
            "string.max": "موضوع البريد الإلكتروني يجب أن يكون أقل من 200 حرف",
        }),
        html: Joi.string().optional(),
        text: Joi.string().optional(),
        cc: Joi.array().items(Joi.string().email()).optional(),
        bcc: Joi.array().items(Joi.string().email()).optional(),
        attachments: Joi.array().optional(),
        replyTo: Joi.string().email().optional(),
    }).required(),
};
export const sendBulkEmails = {
    body: Joi.object({
        emails: Joi.array().items(Joi.string().email()).min(1).required().messages({
            "array.min": "يجب إدخال عنوان بريد إلكتروني واحد على الأقل",
            "any.required": "عناوين البريد الإلكتروني مطلوبة",
        }),
        subject: Joi.string().min(1).max(200).required().messages({
            "any.required": "موضوع البريد الإلكتروني مطلوب",
            "string.max": "موضوع البريد الإلكتروني يجب أن يكون أقل من 200 حرف",
        }),
        html: Joi.string().optional(),
        text: Joi.string().optional(),
        cc: Joi.array().items(Joi.string().email()).optional(),
        bcc: Joi.array().items(Joi.string().email()).optional(),
        attachments: Joi.array().optional(),
    }).required(),
};
// Inbox email validation schemas
export const getInboxEmails = {
    query: Joi.object({
        limit: Joi.number().integer().min(1).max(100).optional().default(50),
        page: Joi.number().integer().min(1).optional().default(1),
        search: Joi.string().optional(),
        from: Joi.string().email().optional(),
        to: Joi.string().email().optional(),
        subject: Joi.string().optional(),
        dateFrom: Joi.date().iso().optional(),
        dateTo: Joi.date().iso().optional(),
        unreadOnly: Joi.boolean().optional(),
    }).optional(),
};
export const getEmailById = {
    params: Joi.object({
        uid: Joi.number().integer().min(1).required().messages({
            "any.required": "Email UID is required",
            "number.base": "Email UID must be a number",
            "number.integer": "Email UID must be an integer",
            "number.min": "Email UID must be greater than 0",
        }),
    }).required(),
};
export const markEmailReadStatus = {
    params: Joi.object({
        uid: Joi.number().integer().min(1).required().messages({
            "any.required": "Email UID is required",
            "number.base": "Email UID must be a number",
            "number.integer": "Email UID must be an integer",
            "number.min": "Email UID must be greater than 0",
        }),
    }).required(),
    body: Joi.object({
        read: Joi.boolean().optional().default(true),
    }).optional(),
};
export const deleteInboxEmail = {
    params: Joi.object({
        uid: Joi.number().integer().min(1).required().messages({
            "any.required": "Email UID is required",
            "number.base": "Email UID must be a number",
            "number.integer": "Email UID must be an integer",
            "number.min": "Email UID must be greater than 0",
        }),
    }).required(),
};
//# sourceMappingURL=user.validation.js.map