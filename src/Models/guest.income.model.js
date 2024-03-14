const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');
const Visitors = require('./visitors.model');

const Guest_income = sequelize.define('guest_income', {
    idGuest_income: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idGuest_income',
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
    observations: {
        type: DataTypes.STRING,
        field: 'observations',
        defaultValue: "Without observations",
    },
    idVisitor: {
        type: DataTypes.INTEGER,
        field: 'idVisitor',
    },
});



Guest_income.belongsTo(Visitors, {
    foreignKey: 'idVisitor', as: 'asociatedVisitor'
});


module.exports = Guest_income;