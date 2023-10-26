const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');
const Visitors = require('./visitors.model');
const SpacesModel = require('./spaces.model');
const Vehicle = require('./vehicle.model');
const ParkingSpacesModel = require('./parking.spaces.model');


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
    idParking: {
        type: DataTypes.INTEGER,
        field: 'idparking',
    },

});

    Guest_income.belongsTo(Visitors, {
        foreignKey: 'idvisitor',as:'visitor'
    });
    Guest_income.belongsTo(SpacesModel, {
        foreignKey: 'idspace', as:'space'
    });
    Guest_income.belongsTo(Vehicle, {
        foreignKey: 'idvehicle', as:'vehicle', allowNull: true
    });
    Guest_income.belongsTo(ParkingSpacesModel, {
        foreignKey: 'idparking', as:'parking', allowNull: true
    });



module.exports = Guest_income;