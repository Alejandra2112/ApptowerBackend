const { Router } = require('express')
const route = Router()
const { getOneSpace, getAllSpaces, postSpace, putSpace } = require('../Controllers/spaces.controller')
const { spacesCreateValidation, spacesUpdateValidation } = require('../Middlewares/spaces.middleware');
const validation = require('../Middlewares/validation.middleware');
const {UploadValidation} = require("../Middlewares/uploads.middleware")

route.get('/:idSpace', getOneSpace);
route.get('/', getAllSpaces)
route.post('/',UploadValidation, spacesCreateValidation, validation, postSpace)
route.put('/',UploadValidation, spacesUpdateValidation, validation, putSpace)
// route.delete('/', deleteSpace)

module.exports = route  