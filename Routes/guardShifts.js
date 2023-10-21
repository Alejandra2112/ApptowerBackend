const {Router} = require ('express')
const route = Router()
const {getShifts, postShifts, deleteShifts} = require ('../Controllers/guardShifts')

route.get('/', getShifts)
route.post('/', postShifts)
route.delete('/', deleteShifts)

module.exports = route  