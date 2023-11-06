const {check, validationResult} = require('express-validator');


const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
};

const postValidationVisitor = [
    check('name', 'Name is required or its value is invalid').not().isEmpty().isString().isLength({min: 3, max: 50}),
    check('lastname', 'Lastname is required or its value is invalid').not().isEmpty().isString().isLength({min: 3, max: 50}),
    check('documentType', 'Document type is required or its value is invalid').not().isEmpty().matches(/CC|CE|TI|PA/).isLength({min: 2, max: 2}),
    check('documentNumber', 'Document number is required or its value is invalid').not().isEmpty().isLength({min: 7, max: 10}),
    check('genre', 'Genre is required or its value is invalid').not().isEmpty().matches(/M|F|O/),
    check('access', 'Access is required').not().isEmpty().isBoolean(),
    (req, res, next)=>{
        validateResult(req, res, next);
    }
];

const putValidationVisitor = [
    check('access', 'Access is required').not().isEmpty().isBoolean(),
    (req, res, next)=>{
        validateResult(req, res, next);
    }
];

module.exports = {
    postValidationVisitor,
    putValidationVisitor,
};



// const yup = require("yup");

// function validate (validation){
//     return async (req, res, next) => {
//         try {
//             await validation(req.body);
//             next();
//         } catch (error) {
//             res.status(400).json({message: error.message});
//         }
//     }
// }
// function postValidationVisitor(data) {
  
//     const schema = yup.object().shape({
//         name: yup.string().min(3).max(50).required(),
//         lastname: yup.string().min(3).max(50).required(),
//         documentType: yup.string().length(2).matches(/^(CC|CE|TI|PA)$/, 'Invalid document type').required(),
//         documentNumber: yup.string().min(7).max(10).required(),
//         genre: yup.string().matches(/^(M|F|O)$/).required(),
//         access: yup.bool().required(),
//     });
//     return schema.validate(data);
// }

// module.exports = {
//     validate,
//     postValidationVisitor,
// }