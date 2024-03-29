const { Router } = require('express')
const route = Router()
const { getShifts, postShifts, deleteShifts, getAllShifts, putShifts } = require('../Controllers/guardShifts.controller')
const { postShiftsValidations, putShiftsValidations } = require('../Middlewares/shiftsGuard.middleware')
const validator = require('../Middlewares/validation.middleware');

route.get('/:idwatchman', getShifts)
route.get('/', getAllShifts)
route.post('/', postShiftsValidations, validator, postShifts)
route.put('/:idshifts', putShiftsValidations, validator, putShifts)
route.delete('/', deleteShifts)

module.exports = route  