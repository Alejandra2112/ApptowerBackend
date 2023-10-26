const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');
const Visitors = require('./visitors.model');


const Guest_income = sequelize.define('guest_income', {
    idGuest_income: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idguest_income',
    },
    startingDate: {
        type: DataTypes.DATE,
        field: 'starting_date',
    },
    departureDate: {
        type: DataTypes.DATE,
        field: 'departure_date',
    },
    personAllowsAccess: {
        type: DataTypes.STRING,
        field: 'person_allows_access',
    },
    state:{
        type: DataTypes.STRING,
        field: 'state',	
    },
    observations:{
        type: DataTypes.STRING,
        field: 'observations',
    },
    idVisitor: {
        type: DataTypes.INTEGER,
        field: 'idvisitor',
    },
    idSpace: {
        type: DataTypes.INTEGER,
        field: 'idspace',
    },
    idVehicle: {
        type: DataTypes.INTEGER,
        field: 'idvehicle',
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
    // Guest_income.belongsTo(models.Spaces, {
    //     foreignKey: 'idSpace',
    // });
    // Guest_income.belongsTo(models.Vehicles, {
    //     foreignKey: 'idVehicle',
    // });
    // Guest_income.belongsTo(models.Parking, {
    //     foreignKey: 'idParking',
    // });
};


module.exports = Guest_income;