const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');
const ParkingSpacesModel = require('./parking.spaces.model');
const Guest_income = require('./guest.income.model');



const GuestIncomeParking = sequelize.define('guestincomevehicle', {

  idguestincomevehicle: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idGuestIncomeParking',
  },

  idParkingSpace: {
    type: DataTypes.INTEGER,
    field: 'idParkingSpace',
  },

  idGuest_income: {
    type: DataTypes.INTEGER,
    field: 'idGuest_income',
  },
});

GuestIncomeParking.belongsTo(Guest_income, {
  foreignKey: 'idGuest_income',
  as : 'asociatedGuestIncome',
})
GuestIncomeParking.belongsTo(ParkingSpacesModel, {
  foreignKey: 'idParkingSpace',
  as : 'asociatedParkingSpace',
});
module.exports = GuestIncomeParking;