const { Router } = require('express')
const route = Router()
const { getEnterpriseSecurity, postEnterpriseSecurity, putEnterpriseSecurity } = require('../Controllers/enterprice.security.controller')

route.get('/', getEnterpriseSecurity)
route.post('/', postEnterpriseSecurity)
route.put('/:idEnterpriseSecurity', putEnterpriseSecurity)

module.exports = route  