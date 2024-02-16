const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/config'); 
const UserModel = require('./users.model');

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
        required: true,
    },
    content:{
        type: DataTypes.STRING,
        allowNull: false
    },
    datetime:{
        type: DataTypes.DATE,
        allowNull: false
    },
});

UserModel.hasMany(Notification, {
    foreignKey: 'iduser',
    sourceKey: 'iduser',
});
module.exports = Notification;