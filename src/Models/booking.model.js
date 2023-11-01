const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/config'); 
const Users = require('./users.model');
const Residents = require('./resident.model');


const Booking = sequelize.define('booking', {
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
Booking.belongsTo(Users, { 
  foreignKey: 'iduser', 
  targetKey: 'iduser',
}); 
Booking.belongsTo(Residents, {
  foreignKey: 'idResident', 
  targetKey: 'idResident', 
});

module.exports = Booking;
  