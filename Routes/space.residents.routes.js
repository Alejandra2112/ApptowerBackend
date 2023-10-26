const {Router} = require ('express')
const route = Router()
const {getSpaceResidents, postSpaceResident, putSpaceResident, deleteSpaceResident } = require ('../Controllers/space.residents.controller')

route.get('/', getSpaceResidents)
route.post('/', postSpaceResident)
route.put('/', putSpaceResident)
// route.delete('/', deleteSpaceResident)

module.exports = route  