const {check , validationResult} = require('express-validator');
const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
};

const postFinesValidation = [
    check('iduser', 'User is required or its value is invalid').not().isEmpty().isInt(),
    check('fineType', 'Fine type is required or its value is invalid').not().isEmpty().isString().isLength({min: 3, max: 50}),
    check('incidentDate', 'Incident date is required or its value is invalid').not().isEmpty().isISO8601(),
    check('paymentDate', 'Payment date is required or its value is invalid').not().isEmpty().isISO8601(),
    check('amount', 'Amount is required or its value is invalid').not().isEmpty().isInt(),
    check('idApartment', 'Aparment is required or its value is invalid').not().isEmpty().isInt(),
    check('state', 'State is required or its value is invalid').not().isEmpty().isString().isLength({min: 3, max: 50}),
    (req, res, next)=>{
        validateResult(req, res, next);
    }
];

const putFinesValidation = [
    check('idfines', 'Fines is required or its value is invalid').not().isEmpty().isInt(),
    check('state', 'State is required or its value is invalid').not().isEmpty().isString().isLength({min: 3, max: 50}),
    ( req, res, next ) => {
        validateResult(req, res, next);
    }
];

module.exports = {
    postFinesValidation,
    putFinesValidation,
};