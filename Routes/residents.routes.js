const {Router} = require ('express')
const route = Router()
const {getResidents, postResident, putResident, deleteResident } = require ('../Controllers/resident.controller')

route.get('/', getResidents)
route.post('/', postResident)
route.put('/', putResident)
route.delete('/', deleteResident)

module.exports = route  