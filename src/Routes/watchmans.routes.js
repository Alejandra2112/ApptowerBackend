// const { Router } = require('express')
// const route = Router()
// const { getWatchman, postWatchman, putWatchman } = require('../Controllers/watchmans.controller');
// const validateWatchman = require('../Middlewares/watchman.middleware');
// const verifityToken = require('../Middlewares/verifityToken');

// route.use(verifityToken);

// route.get('/', checkPermissions(privilegesMap.get_watchman, permissionMap.vigilantes), getWatchman) // posicion one: privilege, posicion two: permission

// route.post('/', validateWatchman, checkPermissions(privilegesMap.post_watchman, permissionMap.vigilantes), postWatchman)
// route.put('/', validateWatchman, checkPermissions(privilegesMap.put_watchman, permissionMap.vigilantes), putWatchman)
// // route.delete('/', checkPermissions(privilegesMap.delete_watchman, permissionMap), deleteWatchman)

// module.exports = route


const { Router } = require('express')
const route = Router()
const { getWatchman, postWatchman, putWatchman } = require('../Controllers/watchmans.controller');
const validateWatchman = require('../Middlewares/watchman.middleware');
const checkPermissions = require('../Middlewares/checkPermission');
const privilegesMap = require('../Helpers/Privileges.js');
const permissionMap = require('../Helpers/Permission.js');


route.get('/', getWatchman) // posicion one: privilege, posicion two: permission

route.post('/', validateWatchman, checkPermissions(privilegesMap.post_watchman, permissionMap.vigilantes), postWatchman)
route.put('/', validateWatchman, checkPermissions(privilegesMap.put_watchman, permissionMap.vigilantes), putWatchman)
// route.delete('/', checkPermissions(privilegesMap.delete_watchman, permissionMap), deleteWatchman)

module.exports = route