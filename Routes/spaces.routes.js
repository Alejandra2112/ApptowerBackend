const {Router} = require ('express')
const route = Router()
const {getSpace, postSpace, putSpace } = require ('../Controllers/spaces.controller')
const { spacesCreateValidation, spacesUpdateValidation } = require('../Middlewares/spaces.middleware');
const validation = require('../Middlewares/validation.middleware');

route.get('/', getSpace)
route.post('/', spacesCreateValidation, validation ,postSpace)
route.put('/', spacesUpdateValidation, validation , putSpace)
// route.delete('/', deleteSpace)

module.exports = route  