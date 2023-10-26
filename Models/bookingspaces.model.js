const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/config'); 
const User = require('./users.model');
const Residents = require('./resident.model');
const Booking = require('./booking.model');
const Spaces = require('./spaces.model');

const Bookingspaces = sequelize.define('bookingspaces', {
  idbookingspaces: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true,
  field: 'idbookingspaces', 
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

  idSpace: {
      type: DataTypes.INTEGER,
      field: 'idSpace',
  },

  idResident: {
      type: DataTypes.INTEGER,
      field: 'idResident',
  },
},
{
  timestamps: false,
}
);

Bookingspaces.belongsTo(User, {
foreignKey: 'iduser',
targetKey: 'iduser',
}); 
Bookingspaces.belongsTo(Residents, { 
foreignKey: 'idResident', 
targetKey: 'idResident', 
});
Bookingspaces.belongsTo(Booking,{
foreignKey: 'idbooking',
targetKey: 'idbooking',
});
Bookingspaces.belongsTo(Spaces,{
foreignKey: 'idSpace',
targetKey: 'idSpace',
});
module.exports = Bookingspaces;