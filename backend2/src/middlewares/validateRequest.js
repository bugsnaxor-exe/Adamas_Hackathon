const validateRequest = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        const formatErrors = error.details.map((detail) => ({
            field: detail.path.join("."),
            message: detail.message,
        }));

        return res.status(400).json({
            message: "Validation error",
            errors: formatErrors,
        });
    }
    next();
};

const validateParams = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.params, { abortEarly: false });
    if (error) {
        return res
            .status(400)
            .json({
                message: "Invalid URL parameters",
                errors: error.details.map((e) => e.message),
            });
    }
    next();
};

const validateQuery = (schema) => (req, res, next) => {
    // Joi will automatically convert valid string numbers to integers and set defaults
    const { error, value } = schema.validate(req.query, { abortEarly: false });
    if (error) {
        return res
            .status(400)
            .json({
                message: "Invalid query parameters",
                errors: error.details.map((e) => e.message),
            });
    }
    req.query = value; // Assign parsed/defaulted values back to req.query
    next();
};

module.exports = { validateRequest, validateParams, validateQuery };
