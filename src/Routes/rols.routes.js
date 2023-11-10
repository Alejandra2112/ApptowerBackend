const { Router } = require('express')
const route = Router()
const { getRols, postRols, putRols, getRolsOne } = require('../Controllers/rols.controller')
const validateRols = require('../Middlewares/rols.middleware')

route.get('/:idrole', getRolsOne)

route.get('/', getRols)
route.post('/', validateRols, postRols)
route.put('/', validateRols, putRols)


module.exports = route  