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

        type: {
            type: DataTypes.ENUM,
            values: ['success', 'warning', 'info', 'danger'],
            field: 'type'
        },
        content: {
            type: DataTypes.JSON,
            allowNull: false
        },

        seen: {

            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: 'seen'
        },

        datetime: {
            type: DataTypes.DATE,
            allowNull: false
        },
    });

UserModel.hasMany(Notification, {
    foreignKey: 'iduser',
    sourceKey: 'iduser',
});
module.exports = Notification;