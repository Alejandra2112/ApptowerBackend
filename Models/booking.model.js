const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/config'); 
const Users = require('./users.model');
const Residents = require('./space.residents.model');


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
  idresidents: {
      type: DataTypes.INTEGER,
      field: 'idresidents',
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
  foreignKey: 'idresidents', 
  targetKey: 'idresidents', 
});

module.exports = Booking;
  