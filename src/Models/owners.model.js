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
    
    iduser: {

        type: DataTypes.INTEGER,
        field: "iduser"
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
    foreignKey: 'iduser',
    sourceKey: 'iduser',
});

OwnersModel.belongsTo(UserModel, {
    foreignKey: 'iduser',
    targetKey: 'iduser',
});

module.exports = OwnersModel;
