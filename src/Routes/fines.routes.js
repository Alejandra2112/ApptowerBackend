const {Router} = require ('express');
const route = Router();
const {getFines, postFines, putFines, deleteFines} = require('../Controllers/fines.controller');
const validations = require('../Middlewares/fines.middleware');

route.get('/', getFines)
route.post('/', validations.postFinesValidation ,postFines)
route.put('/', validations.putFinesValidation , putFines)
// route.delete('/', deleteFines)

module.exports = route