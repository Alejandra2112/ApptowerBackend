const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');

const SpaceResidentModel = sequelize.define('SpaceResidents', {

  idSpaceResident: {

    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idSpaceResident',

  },

  idSpace: {

    type: DataTypes.INTEGER,
    field: 'idSpace',

  },

  idResident: {

    type: DataTypes.INTEGER,
    field: 'idResident',

  },

  residentStartDate: {

    type: DataTypes.DATE,
    field: 'residentStartDate',

  },

  residentEndDate: {

    type: DataTypes.DATE,
    field: 'residentEndDate',

  },

  status: {
    type: DataTypes.STRING,
    field: 'status',
    validate: {
      isIn: [['Active', 'Inactive']],
    },
    defaultValue: 'Active',
  },

}, {

  timestamps: false,

});


module.exports = SpaceResidentModel;
