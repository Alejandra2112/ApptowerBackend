const { Router } = require('express')
const route = Router()
const { getShifts, postShifts, deleteShifts, getAllShifts } = require('../Controllers/guardShifts.controller')

route.get('/:idwatchman', getShifts)
route.get('/', getAllShifts)
route.post('/', postShifts)
route.delete('/', deleteShifts)

module.exports = route  