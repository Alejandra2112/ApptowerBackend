
const { validationResult } = require('express-validator');

const validator = (req, res, next) => {
    const errors = validationResult(req).formatWith(({ msg, path }) => {
        return { field: path, message: msg };
    });

    if (!errors.isEmpty()) {
        const firstErrors = errors.array().reduce((accumulator, currentError) => {
            if (!accumulator.find(error => error.field === currentError.field)) {
                accumulator.push(currentError);
            }
            return accumulator;
        }, []);

        return res.status(400).json({ errors: firstErrors });
    }
    next();
};

module.exports = validator;


// if (!errors.isEmpty()) {
//     const formattedErrors = errors.array().map(error => ({
//         // value: error.value,

//         message: error.msg,
//         field: error.path,
//     }));
//     return res.status(400).json({ errors: formattedErrors });
// }



module.exports = validator;
