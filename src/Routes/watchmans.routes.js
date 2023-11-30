const { Router } = require('express')
const route = Router()
const { getWatchman, postWatchman, putWatchman } = require('../Controllers/watchmans.controller');
const validateWatchman = require('../Middlewares/watchman.middleware');
const checkPermissions = require('../Middlewares/checkPermission');
// const pr = require('../Helpers/Privileges');
// const per = require('../Helpers/Permission');
// const verifityToken = require("../Middlewares/verifityToken");

// route.use(verifityToken);

route.get('/', getWatchman) // posicion one: privilege, posicion two: permission

route.post('/', validateWatchman, postWatchman)
route.put('/', validateWatchman, putWatchman)
// route.delete('/', checkPermissions(privilegesMap.delete_watchman, permissionMap), deleteWatchman)

module.exports = route