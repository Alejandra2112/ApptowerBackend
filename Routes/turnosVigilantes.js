const {Router} = require ('express')
const route = Router()
const {getTurnos} = require ('../Controllers/turnosVigilante')

route.get('/', getTurnos)

module.exports = route  