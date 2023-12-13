const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');
const UserModel = require('./users.model');

const OwnersModel = sequelize.define('Owners', {

    idOwner: {

        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idOwner'

    },
    
    idUser: {

        type: DataTypes.INTEGER,
        field: "idUser"
    },

    status: {

        type: DataTypes.STRING(20),
        defaultValue: 'Active',
        field: 'status',
        validate: {
            isIn: [['Active', 'Inactive']]
        }
    }
}, {

    timestamps: true
    
});


UserModel.hasMany(OwnersModel, {
    foreignKey: 'idUser',
    sourceKey: 'idUser',
});

OwnersModel.belongsTo(UserModel, {
    foreignKey: 'idUser',
    targetKey: 'idUser',
});

module.exports = OwnersModel;
