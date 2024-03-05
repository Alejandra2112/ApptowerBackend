const { Router } = require('express')
const route = Router()
const { getWatchman, postWatchman, putWatchman, getWatchmanOne, getWatchmanDocument } = require('../Controllers/watchmans.controller');
const { watchmanValidations } = require('../Middlewares/watchman.middleware')
const validator = require('../Middlewares/validation.middleware');
const { userValidations } = require('../Middlewares/user.middleware');


route.get('/', getWatchman)
route.get('/:iduser', getWatchmanOne)
route.get('/document/:document', getWatchmanDocument)


route.post('/', [watchmanValidations, userValidations, validator], postWatchman)
route.put('/', [watchmanValidations, userValidations, validator], putWatchman)

module.exports = route