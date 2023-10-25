const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');
const Visitors = require('./visitors.model');


const Guest_income = sequelize.define('ingresos', {
    idGuest_income: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idingreso',
    },
    startingDate: {
        type: DataTypes.Date,
        field: 'fechaIngreso',
    },
    departureDate: {
        type: DataTypes.Date,
        field: 'fechaSalida',
    },
    personAllowsAccess: {
        type: DataTypes.STRING,
        field: 'personaPermiteAcceso',
    },
    states:{
        type: DataTypes.STRING,
        field: 'estado',	
    },
    observations:{
        type: DataTypes.STRING,
        field: 'observaciones',
    },
    idVisitor: {
        type: DataTypes.INTEGER,
        field: 'idvisitante',
    },
    idSpace: {
        type: DataTypes.INTEGER,
        field: 'idespacio',
    },
    idVehicle: {
        type: DataTypes.INTEGER,
        field: 'idvehiculo',
    },
    phoneNumber: {
        type: DataTypes.STRING,
        field: 'telefono',
    },
    documentNumber: {
        type: DataTypes.STRING,
        field: 'numero_documento',
    },
    idParking: {
        type: DataTypes.INTEGER,
        field: 'idparqueadero',
    },

});

Guest_income.associate = (models) => {
    Guest_income.belongsTo(models.Visitors, {
        foreignKey: 'idVisitor',
    });
    Guest_income.belongsTo(models.Spaces, {
        foreignKey: 'idSpace',
    });
    Guest_income.belongsTo(models.Vehicles, {
        foreignKey: 'idVehicle',
    });
    Guest_income.belongsTo(models.Parking, {
        foreignKey: 'idParking',
    });
};


module.exports = Guest_income;