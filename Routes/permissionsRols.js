const { Router } = require('express');
const route = Router();
const { getRolPermissions, postRolPermissions } = require('../Controllers/permissionsRols');


route.get('/', getRolPermissions);
route.post('/', postRolPermissions);

module.exports = route;
