const {Router} = require ('express');
const route = Router()
const {getGuestIncome, postGuestIncome, putGuestIncome, deleteGuestIncome} = require ('../Controllers/guest.income.controller');

route.get('/', getGuestIncome)
route.post('/', postGuestIncome)
route.put('/', putGuestIncome)
route.delete('/', deleteGuestIncome)

module.exports = route