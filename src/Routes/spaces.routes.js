const { Router } = require('express')
const route = Router()
const { getOneSpace, getAllSpaces, postSpace, putSpace } = require('../Controllers/spaces.controller')
const { spacesCreateValidation, spacesUpdateValidation } = require('../Middlewares/spaces.middleware');
const validation = require('../Middlewares/validation.middleware');
const { UploadValidation } = require("../Middlewares/uploads.middleware")

route.get('/:idSpace', getOneSpace);
route.get('/', getAllSpaces)
route.post('/', postSpace)
route.put('/', putSpace)
// route.delete('/', deleteSpace)

module.exports = route  