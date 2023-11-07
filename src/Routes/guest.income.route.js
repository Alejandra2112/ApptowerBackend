const {Router} = require ('express');
const route = Router()
const {getGuestIncome, postGuestIncome, putGuestIncome} = require ('../Controllers/guest.income.controller');
const validations = require ('../Middlewares/guestIncome.middleware')

route.get('/', getGuestIncome)
route.post('/', validations.postValidationGuestIncome, postGuestIncome),
route.put('/', validations.putValidationGuestIncome, putGuestIncome)


module.exports = route