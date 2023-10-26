const yup = require("yup");

function validate (validation){
    return async (req, res, next) => {
        try {
            await validation(req.body);
            next();
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
}
function postValidationVisitor(data) {
  
    const schema = yup.object().shape({
        name: yup.string().min(3).max(50).required(),
        lastname: yup.string().min(3).max(50).required(),
        documentType: yup.string().length(2).matches(/^(CC|CE|TI|PA)$/, 'Invalid document type').required(),
        documentNumber: yup.string().min(7).max(10).required(),
        genre: yup.string().matches(/^(M|F|O)$/).required(),
        access: yup.bool().required(),
    });
    return schema.validate(data);
}

module.exports = {
    validate,
    postValidationVisitor,
}