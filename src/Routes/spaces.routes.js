const { Router } = require('express')
const route = Router()
const { getOneSpace, getAllSpaces, postSpace, putSpace } = require('../Controllers/spaces.controller')
const { spaceValidationForPost, spaceValidationForPut } = require('../Middlewares/spaces.middleware');
const validator = require('../Middlewares/validation.middleware');

route.get('/:idSpace', getOneSpace);
route.get('/', getAllSpaces)
route.post('/', spaceValidationForPost, validator , postSpace)
route.put('/', spaceValidationForPut, validator, putSpace)
// route.delete('/', deleteSpace)

module.exports = route  