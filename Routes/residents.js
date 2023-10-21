const {Router} = require ('express')
const route = Router()
const {getResidents, postResidents} = require ('../Controllers/residents')

route.get('/', getResidents)
route.post('/', postResidents)
// route.put('/', putResidents)

// bussines rules exception

    // route.delete('/', deleteResidents)

module.exports = route  