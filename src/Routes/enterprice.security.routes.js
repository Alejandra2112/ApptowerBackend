const { Router } = require('express')
const route = Router()
const { getEnterpriseSecurity, postEnterpriseSecurity, putEnterpriseSecurity, getEnterpriceEmail, getEnterpriceNIT } = require('../Controllers/enterprice.security.controller')

const { enterpriceValidations } = require('../Middlewares/enterprice.middleware')

route.get('/', getEnterpriseSecurity)
route.get('/email/:email', getEnterpriceEmail)
route.get('/NIT/:NIT', getEnterpriceNIT)
route.post('/', enterpriceValidations, postEnterpriseSecurity)
route.put('/', enterpriceValidations, putEnterpriseSecurity)

module.exports = route  