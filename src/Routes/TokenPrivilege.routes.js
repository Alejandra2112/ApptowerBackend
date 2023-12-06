const { Router } = require('express');
const route = Router();
const { getPrivilegeFromRole } = require('../Controllers/TokenPermission.controller');
const verifityToken = require('../Middlewares/verifityToken');

route.get('/', verifityToken, getPrivilegeFromRole);


module.exports = route;