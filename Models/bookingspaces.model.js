const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/config'); 
const User = require('./user');
const Residents = require('./residents');
const Booking = require('./booking');
const Spaces = require('./spaces');

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

  idspaces: {
      type: DataTypes.INTEGER,
      field: 'idspaces',
  },

  idresidents: {
      type: DataTypes.INTEGER,
      field: 'idresidents',
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
foreignKey: 'idresidents', 
targetKey: 'idresidents', 
});
Bookingspaces.belongsTo(Booking,{
foreignKey: 'idbooking',
targetKey: 'idbooking',
});
Bookingspaces.belongsTo(Spaces,{
foreignKey: 'idspaces',
targetKey: 'idspaces',
});
module.exports = Bookingspaces;