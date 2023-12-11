const { Router } = require('express')
const route = Router()
const { getShifts, postShifts, deleteShifts } = require('../Controllers/guardShifts.controller')

route.get('/:idwatchman', getShifts)
route.post('/', postShifts)
route.delete('/', deleteShifts)

module.exports = route  