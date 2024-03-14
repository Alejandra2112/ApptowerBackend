const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');


const AssignedParking = sequelize.define('AssignedParking', {

  idAssignedParking: {

    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idAssignedParking',

  },

  idApartment: {

    type: DataTypes.INTEGER,
    field: 'idApartment',

  },

  idParkingSpace: {

    type: DataTypes.INTEGER,
    field: 'idParkingSpace',

  },
}, {
  timestamps: false,
});


module.exports = AssignedParking;
