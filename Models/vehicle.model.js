const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/config');
const Users = require('./users.model');

const Vehicle = sequelize.define('vehicle', {
    idvehicle: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idvehicle',
    },

    iduser: {
        type: DataTypes.INTEGER,
        field: 'iduser',
    },

    typeuser: {
        type: DataTypes.STRING,
        field: 'typeuser',
    },

    licenseplate: {
        type: DataTypes.STRING,
        field: 'licenseplate',
    },

},
{
    timestamps: false,
},
Vehicle.belongsTo(Users, { 
    foreignKey: 'iduser', 
    targetKey: 'iduser',
  }) 
);
module.exports = Vehicle;