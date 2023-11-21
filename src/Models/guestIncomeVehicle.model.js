const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/config');
const Parking = require('./parking.spaces.model');
const Vehicle = require('./vehicle.model');
const GuestIncome = require('./guest.income.model');
// const Visitors = require('./visitors.model');

const GuestIncomeVehicle = sequelize.define('guestincomevehicle', {

  idguestincomevehicle: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idguestincomevehicle',
  },

  // idbooking: {
  //   type: DataTypes.INTEGER,
  //   field: 'idbooking',
  // },

  idParkingSpace: {
    type: DataTypes.INTEGER,
    field: 'idParkingSpace',
  },

  // idVisitor: {
  //   type: DataTypes.INTEGER,
  //   field: 'idVisitor',
  // },
  idvehicle: {
    type: DataTypes.INTEGER,
    field: 'idvehicle',
  },
  idGuest_income: {
    type: DataTypes.INTEGER,
    field: 'idguest_income',
  },
  // plate: {
  //   type: DataTypes.STRING,
  //   field: 'plate',
  // },
  //ADICIONAR COIMENTARIO
},
  {
    timestamps: false,
  }
);

// Bookingparking.belongsTo(Booking, {
//   foreignKey: 'idbooking',
//   targetKey: 'idbooking',
// });
GuestIncomeVehicle.belongsTo(GuestIncome, {
  foreignKey: 'idGuest_income',
  targetKey: 'idGuest_income',
})
GuestIncomeVehicle.belongsTo(Parking, {
  foreignKey: 'idParkingSpace',
  targetKey: 'idParkingSpace',
});
GuestIncomeVehicle.belongsTo(Vehicle, {
  foreignKey: 'idvehicle',
  targetKey: 'idvehicle',
});
// Bookingparking.belongsTo(Visitors, {
//   foreignKey: 'idVisitor',
//   targetKey: 'idVisitor',
// });
module.exports = GuestIncomeVehicle;