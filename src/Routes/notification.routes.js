const {Router} = require('express');
const route = Router();

const {getNotification, postNotification} = require('../Controllers/notification.controller');

route.get('/', getNotification);
route.post('/', postNotification);
// route.delete('/', deleteNotification);

module.exports = route;