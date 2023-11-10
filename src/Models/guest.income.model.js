const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');
const Visitors = require('./visitors.model');
const ApartmentModel = require('./apartment.model');


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
    // state:{
    //     type: DataTypes.STRING,
    //     field: 'state',	
    //     allowNull: false,
    // },
    observations: {
        type: DataTypes.STRING,
        field: 'observations',
        defaultValue: "Without observations",
    },
    idVisitor: {
        type: DataTypes.INTEGER,
        field: 'idvisitor',
    },
    idApartment: {
        type: DataTypes.INTEGER,
        field: 'idAPartment',
    }

});

Guest_income.belongsTo(Visitors, {
    foreignKey: 'idvisitor', as: 'visitor'
});
Guest_income.belongsTo(ApartmentModel, {
    foreignKey: 'idApartment',
    as: 'apartment'
});



module.exports = Guest_income;