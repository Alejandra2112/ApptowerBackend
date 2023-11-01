const { Router } = require('express');
const route = Router();
const { getPrivileges, postPrivileges, putPrivileges,deletePrivileges } = require('../Controllers/privileges.controller');


route.get('/', getPrivileges);
route.post('/', postPrivileges);
route.put('/', putPrivileges);
route.delete('/', deletePrivileges);

module.exports = route;
