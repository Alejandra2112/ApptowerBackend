const {Route} = require('express');
const route = Route();

const {getNotification, postNotification, deleteNotification} = require('../Controllers/notification.controller');

route.get('/', getNotification);
route.post('/', postNotification);
route.delete('/', deleteNotification);

module.exports = route;