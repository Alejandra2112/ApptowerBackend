  const {check, validationResult} = require('express-validator');


const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
};

const postValidationGuestIncome = [
    check('idVisitor', 'Visitor is required or its value is invalid').not().isEmpty().isInt(),
    check('idSpace', 'Space is required or its value is invalid').not().isEmpty().isInt(),
    check('startingDate', 'Starting date is required or its value is invalid').not().isEmpty().isDate(),
    check('personalAllowsAccess', 'Personal allows access is required or its value is invalid').not().isEmpty().isString().isLength({min: 3, max: 50}),
    ( req, res, next ) => {
        validateResult(req, res, next);
    }
];

const putValidationGuestIncome = [
    check('idguest_income', 'Guest income is required or its value is invalid').not().isEmpty().isInt(),
    check('departureDate', 'Departure date is required or its value is invalid').not().isEmpty().isDate(),
    ( req, res, next ) => {
        validateResult(req, res, next);
    }
];

module.exports = {
    postValidationGuestIncome,
    putValidationGuestIncome,
};