const {Router} = require ('express')
const route = Router()
const {getSpace, postSpace, putSpace } = require ('../Controllers/spaces.controller')
const { validationSpaces, validation } = require('../Middlewares/spaces.middleware');

route.get('/', getSpace)
route.post('/', [validationSpaces, validation] ,postSpace)
route.put('/', putSpace)
// route.delete('/', deleteSpace)

module.exports = route  