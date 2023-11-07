const {Router} = require ('express')
const route = Router()
const {getVisitors, postVisitors, putVisitors} = require ('../Controllers/visitors.controller');
const validations = require ('../Middlewares/visitors.middleware')

route.get('/', getVisitors)
route.post('/', validations.postValidationVisitor ,postVisitors)
route.put('/', validations.putValidationVisitor , putVisitors)




module.exports = route