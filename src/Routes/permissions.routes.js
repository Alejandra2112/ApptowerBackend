const { Router } = require('express');
const route = Router();
const { getPermissions, postPermissions, putPermission, deletePermissions, getNamePermissions } = require('../Controllers/permissions.controller');


route.get('/', getPermissions);
route.get('/:permission', getNamePermissions);
route.post('/', postPermissions);
route.put('/', putPermission);
route.delete('/', deletePermissions);

module.exports = route;
