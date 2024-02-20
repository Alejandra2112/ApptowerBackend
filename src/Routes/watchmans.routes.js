const { Router } = require('express')
const route = Router()
const { getWatchman, postWatchman, putWatchman, getWatchmanOne, getWatchmanDocument } = require('../Controllers/watchmans.controller');
const { watchmanValidations } = require('../Middlewares/watchman.middleware')


route.get('/', getWatchman)
route.get('/:iduser', getWatchmanOne)
route.get('/document/:document', getWatchmanDocument)


route.post('/', watchmanValidations, postWatchman)
route.put('/', watchmanValidations, putWatchman)
// route.delete('/', checkPermissions(privilegesMap.delete_watchman, permissionMap), deleteWatchman)

module.exports = route