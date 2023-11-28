const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');

const RecoveryCode = sequelize.define('RecoveryCode', {
    idRecoveyCode: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    code: {
        type: DataTypes.STRING,
    },
    userEmail: {
        type: DataTypes.STRING,
    },
    expiresAt: {
        type: DataTypes.DATE,
    },
});


module.exports = RecoveryCode;
