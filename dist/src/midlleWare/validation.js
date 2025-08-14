const dataMethod = ["query", "body", "params", "headers"];
export const validation = (schema) => {
    return (req, res, next) => {
        try {
            const validationArray = [];
            let hasValidationError = false;
            dataMethod.forEach((key) => {
                if (schema[key]) {
                    const validationResult = schema[key].validate(req[key], {
                        abortEarly: false,
                    });
                    if (validationResult.error) {
                        validationArray.push(validationResult.error.details);
                        hasValidationError = true;
                    }
                }
            });
            if (hasValidationError) {
                return res.status(400).json({
                    success: false,
                    message: "Validation error",
                    errors: validationArray.flat(),
                });
            }
            next();
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: `Catch error: ${error}`,
                errors: [error],
            });
        }
    };
};
//# sourceMappingURL=validation.js.map