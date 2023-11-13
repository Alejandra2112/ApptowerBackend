const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/config'); 
const User = require('./users.model');

const Notification = sequelize.define('notification', 
{
    idnotification: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idnotification', 
    },
    iduser: {
        type: DataTypes.INTEGER,
        field: 'iduser',
    },
    notificationtype: {
        type: DataTypes.INTEGER,
        field: 'notificationtype',
    },
    notificationtext: {
        type: DataTypes.STRING,
        field: 'notificationtext',
    },
},
{
    timestamps: false, 
});
Notification.belongsTo(User, {foreignKey: 'iduser', targetKey: 'iduser'});
module.exports = Notification;