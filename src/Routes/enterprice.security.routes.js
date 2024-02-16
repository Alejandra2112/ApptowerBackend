const { Router } = require('express')
const route = Router()
const { getEnterpriseSecurity, postEnterpriseSecurity, putEnterpriseSecurity, getEnterpriceEmail, getEnterpriceNIT } = require('../Controllers/enterprice.security.controller')

route.get('/', getEnterpriseSecurity)
route.get('/email/:email', getEnterpriceEmail)
route.get('/NIT/:NIT', getEnterpriceNIT)
route.post('/', postEnterpriseSecurity)
route.put('/', putEnterpriseSecurity)

module.exports = route  