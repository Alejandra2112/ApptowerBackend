const {Router} = require ('express');
const route = Router();
const {getFines, postFines, putFines, deleteFines} = require('../Controllers/fines.controller');

route.get('/', getFines)
route.post('/', postFines)
route.put('/', putFines)
route.delete('/', deleteFines)

module.exports = route