const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/config'); 
const User = require('./users.model');

const Notification = sequelize.define('notification', 
{
    content:{
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Notification;