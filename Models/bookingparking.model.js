const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/config'); 
const User = require('./users.model');
const Booking = require('./booking.model');
const Parking = require('./parking.spaces.model');
const Vehicle = require('./vehicle.model');

const Bookingparking = sequelize.define('reservasparqueadero', {

    idbookingparking: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idbookingoparking', 
    },

    idbooking: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idbooking', 
    },

    iduser: {
      type: DataTypes.INTEGER,
      field: 'iduser',
    },

    idparking: {
        type: DataTypes.INTEGER,
        field: 'idparking',
    },

    idvehicle: {
        type: DataTypes.INTEGER,
        field: 'idvehicle',
    },
  },
  {
    timestamps: false,
}
);

Bookingparking.belongsTo(User, {
  foreignKey: 'iduser',
  targetKey: 'iduser',
}); 
Bookingparking.belongsTo(Booking,{
  foreignKey: 'idbooking',
  targetKey: 'idbooking',
});
Bookingparking.belongsTo(Parking,{
foreignKey: 'idparking',
targetKey: 'idparking',
});
Bookingparking.belongsTo(Vehicle,{
foreignKey: 'idvehicle',
targetKey: 'idvehicle',
});
module.exports = Bookingparking;