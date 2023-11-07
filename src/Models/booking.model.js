const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/config'); 

const Residents = require('./resident.model');
const Space = require('./spaces.model');

const Booking = sequelize.define('booking', {
  idbooking: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idbooking', 
  },
  idSpaceResident: {
    type: DataTypes.INTEGER,
    field: 'idSpaceResident',
  },
  idResident: {
      type: DataTypes.INTEGER,
      field: 'idResident',
    },
  bookingtype: {
      type: DataTypes.INTEGER,
      field: 'bookingtype',
  },
  bookingdate: {
    type: DataTypes.DATE,
    field: 'bookingdate', 
  }
},
{
  timestamps: false, 
});
Booking.belongsTo(Space, {
  foreignKey: 'idSpace', 
  targetKey: 'idSpace', 
});
Booking.belongsTo(Residents, {
  foreignKey: 'idResident', 
  targetKey: 'idResident', 
});

module.exports = Booking;
  