const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');
const SpaceModel = require('./spaces.model'); 
const ParkingSpaceModel = require('./parking.spaces.model'); 

const AssignedParking = sequelize.define('AssignedParking', { 

  idAssignedParking: {

    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idAssignedParking',

  },

  idSpace: {

    type: DataTypes.INTEGER,
    field: 'idSpace',

  },

  idParkingSpace: {

    type: DataTypes.INTEGER,
    field: 'idParkingSpace',
    
  },
}, {
  timestamps: false,
});


module.exports = AssignedParking;
