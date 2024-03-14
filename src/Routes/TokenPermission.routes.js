const { Router } = require('express');
const route = Router();
const { getPermissionFromRole } = require('../Controllers/TokenPermission.controller');
const verifityToken = require('../Middlewares/verifityToken');

route.get('/', verifityToken, getPermissionFromRole);


module.exports = route;