const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');

const GuestIncomeToApartments = sequelize.define('guestIncomeToApartment', {
    idGuestIncomeToApartment: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idGuestIncomeToApartment',
    },
    idApartment: {
        type: DataTypes.INTEGER,
        field: 'idApartment',
    },
    idGuest_income: {
        type: DataTypes.INTEGER,
        field: 'idGuest_income',
    }
}, {

    timestamps: false

});

module.exports = GuestIncomeToApartments;

// GuestIncomeToApartments.belongsTo(ApartmentModel, {
//     foreignKey: 'idApartment',
//     targetKey: 'apartmenToVisit',
//   });
  
//   GuestIncomeToApartments.belongsTo(Visitors, {
//     foreignKey: 'idVisitor', as: 'asociatedVisitor'
// });