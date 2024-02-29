const { validationResult } = require("express-validator");

const validator = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map(error => ({
            // value: error.value,
            message: error.msg,
            field: error.path,
        }));
        return res.status(400).json({ errors: formattedErrors });
    }

    next();
}

module.exports = validator;
