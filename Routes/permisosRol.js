const { Router } = require('express');
const route = Router();
const { getPermisoRol, postPermisoRol } = require('../Controllers/permisosRol');


route.get('/', getPermisoRol);
route.post('/', postPermisoRol);

module.exports = route;
