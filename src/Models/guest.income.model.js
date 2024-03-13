const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');
const Visitors = require('./visitors.model');
const ApartmentModel = require('./apartment.model');
const GuestIncomeToApartments = require('./guest.income.to.apartents.model');


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
    // idApartment: {
    //     type: DataTypes.INTEGER,
    //     field: 'idApartment',
    // }

});


Guest_income.belongsToMany(ApartmentModel, {
    through: GuestIncomeToApartments,
    foreignKey: 'idGuest_income',
    otherKey: 'idGuest_income'
});

ApartmentModel.belongsToMany(Guest_income, {
    through: GuestIncomeToApartments,
    foreignKey: 'idApartment',
    otherKey: 'idApartment'
});


Guest_income.belongsTo(Visitors, {
    foreignKey: 'idVisitor', as: 'asociatedVisitor'
});
// Guest_income.belongsTo(ApartmentModel, {
//     foreignKey: 'idApartment',
//     as: 'asociatedApartment'
// });



module.exports = Guest_income;