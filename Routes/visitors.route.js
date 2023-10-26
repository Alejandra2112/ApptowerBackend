const {Router} = require ('express')
const route = Router()
const {getVisitors, postVisitors, putVisitors, deleteVisitors} = require ('../Controllers/visitors.controller');
const validations = require ('../Middlewares/visitors.middleware')

route.get('/', getVisitors)
route.post('/', validations.validate(validations.postValidationVisitor) ,postVisitors)
route.put('/', putVisitors)
route.delete('/', deleteVisitors)



module.exports = route